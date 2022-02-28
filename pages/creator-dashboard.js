import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from "web3modal"
//import detectEthereumProvider from '@metamask/detect-provider';

import {
  nftmarketaddress, nftaddress
} from '../config'

import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json'
import NFT from '../artifacts/contracts/NFT.sol/NFT.json'

export default function CreatorDashboard() {
  const [nfts, setNfts] = useState([])
  const [sold, setSold] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  useEffect(() => {
    loadNFTs()
  }, [])

  async function loadNFTs() {
    // const web3Modal = new Web3Modal({
    //   network: "Matic Mumbai",
    //   cacheProvider: true,
    //   chainId: 80001
    // })

    //const connection = await web3Modal.connect()
    //const provider = new ethers.providers.Web3Provider(connection)
    //const signer = provider.getSigner()
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any")
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner()
    console.log("Account:", await signer.getAddress()); 
    

    const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
    const data = await marketContract.fetchItemsCreated()
    
    const items = await Promise.all(data.map(async i => {
      const tokenUri = await tokenContract.tokenURI(i.tokenId) 
      // JFO: deleted "virtual override" from NFT.sol tokenURI function to use the tokenURI function from the ERC721URIStorage.sol 
      const meta = await axios.get(tokenUri)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        sold: i.sold,
        image: meta.data.image,
        video: meta.data.video,
        name: meta.data.name,
        description: meta.data.description,
      }
      return item
    }))

    /* create a filtered array of items that have been sold */
    const soldItems = items.filter(i => i.sold)
    setSold(soldItems)
    setNfts(items)
    setLoadingState('loaded') 
  }
  
  async function buyNft(nft) {
    // const web3Modal = new Web3Modal()
    // const connection = await web3Modal.connect()
    // const provider = new ethers.providers.Web3Provider(connection)
    // const signer = provider.getSigner()
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any")
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner()
    console.log("Account:", await signer.getAddress());
    const contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
  
    const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')
    const transaction = await contract.createMarketSale(nftaddress, nft.itemId, {
      value: price
    })
    await transaction.wait()
    loadNFTs()
  }

  if (loadingState === 'loaded' && !nfts.length) return (<h1 className="py-10 px-20 text-3xl">No assets created</h1>)
  return (
    
      <div>
        <div className="flex m-8 p-2 rounded-xl bg-[#d6c8a027]">
          <div className="px-5">
            <h2 className="flex justify-start py-2 text-xl mb-4 font-bold text-[#ffffff]">Items Created</h2>
              <div className="flex justify-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
              {
                nfts.map((nft, i) => (
                  <div key={i} className="bg-[#3e3f41] rounded-xl shadow overflow-hidden" style={{ maxWidth: '250px' }}>
                    <div className="flex justify-content p-4" style={{ height: '250px', width: '250px'}} >
                        <video poster={nft.image} src={nft.video} className="rounded bg-[#00000046]" width="350" type="video/*, audio/*" autoPlay readystate="true" loop muted controlsList="nodownload"/>
                    </div>  
                    <div className="p-4 bg-[#3e3f41]">
                      <p style={{ height: '40px' }} className="text-[#ffffff] text-xl font-semibold">{nft.name}</p>
                      <div style={{ height: '80px', overflow: 'hidden' }} >
                        <p className="text-white " >{nft.description}</p>
                      </div>
                    </div>
                    <div className="p-4 bg-[#3e3f41]">
                      <p className="text-xl mb-4 font-bold text-[#ffffff]">{nft.price} Matic</p>
                      <button className="w-full bg-[#2952e3] text-[#ffffff] font-bold py-2 px-12 rounded cursor-pointer hover:bg-[#2546bd]" onClick={() => buyNft(nft)}>Buy</button>
                    </div>
                  </div>
                ))
              }
              </div>
          </div>
        </div>
      </div>
      <div>
          <div className="flex m-8 p-2 rounded-xl bg-[#4a5c7562]">
            <div className="px-5">
            {
              Boolean(sold.length) && (
                <div className=' jusitfy-center'>
                  <h2 className="flex justify-start py-2 text-xl mb-4 font-bold text-[#ffffff]">Items sold</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                    {
                      sold.map((nft, i) => (
                      <div key={i} className="bg-[#3e3f41] rounded-xl shadow overflow-hidden" style={{ width: '250px'}}>
                      <div className="flex justify-content p-4" style={{ height: '250px', width: '250px'}} >
                        <video poster={nft.image} src={nft.video} className="rounded bg-[#00000046]" width="350" type="video/*, audio/*" autoPlay readystate="true" loop muted controlsList="nodownload"/>
                      </div> 
                      <div className="p-4 bg-[#3e3f41]">
                        <p style={{ height: '40px' }} className="text-[#ffffff] text-xl font-semibold">{nft.name}</p>
                          <div style={{ height: '80px', overflow: 'hidden' }} >
                            <p className="text-white " >{nft.description}</p>
                          </div>
                      </div>
                      <div className="p-4 bg-[#3e3f41]">
                        <p className="text-xl mb-4 font-bold text-[#ffffff]">{nft.price} Matic</p>
                        <button className="w-full bg-[#2952e3] text-[#ffffff] font-bold py-2 px-12 rounded cursor-pointer hover:bg-[#2546bd]" onClick={() => buyNft(nft)}>Buy</button>
                      </div>
                      </div>
                ))
                    }
                  </div>
            </div>
              )
            }
          </div>
        </div>
      </div>
    </div>   
  )
}