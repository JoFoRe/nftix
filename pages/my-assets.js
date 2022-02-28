import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
//import Web3Modal from "web3modal"
//import detectEthereumProvider from '@metamask/detect-provider';

import {
  nftmarketaddress, nftaddress
} from '../config'

import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json'
import NFT from '../artifacts/contracts/NFT.sol/NFT.json'

export default function MyAssets() {
  const [nfts, setNfts] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  
  useEffect(() => {
    loadNFTs()
  }, [])

  async function loadNFTs() {
    // const web3Modal = new Web3Modal({
    //   network: "Matic mumbai",
    //   cacheProvider: true,
    //   chainId: 80001
    // })

    // const connection = await web3Modal.connect()
    // const provider = new ethers.providers.Web3Provider(connection)
    // const signer = provider.getSigner()
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any")
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner()
    console.log("Account:", await signer.getAddress());

    
    const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
    const data = await marketContract.fetchMyNFTs()
    
    const items = await Promise.all(data.map(async i => {
      const tokenUri = await tokenContract.tokenURI(i.tokenId)
      const meta = await axios.get(tokenUri)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
        video:meta.data.video,
        name: meta.data.name,
        description: meta.data.description,
      }

      return item
    }))

    setNfts(items)
    setLoadingState('loaded') 
  }

  if (loadingState === 'loaded' && !nfts.length) return (<h1 className="py-10 px-20 text-3xl">No assets owned</h1>)
  return (
    <div className="flex justify-center">
      <div className="p-4">
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
                      <p className="text-xl mb-4 font-bold text-[#ffffff]">Bought for {nft.price} Matic</p>
                    </div>
                  </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}