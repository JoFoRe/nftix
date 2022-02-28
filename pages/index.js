import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from "web3modal"

import {
nftaddress, nftmarketaddress
} from '../config'

import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json'
// Infura RPCendpoint reject the transactions in mumbai testnet
// let rpcEndpoint = null

// if (process.env.MUMBAI_URL) {
// rpcEndpoint = process.env.MUMBAI_URL
// }

export default function Home() {
const [nfts, setNfts] = useState([])
const [loadingState, setLoadingState] = useState('not-loaded')
useEffect(() => {
  loadNFTs()
  }, [])
  async function loadNFTs() {    
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any")
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
    const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, provider)
    const data = await marketContract.fetchMarketItems()
    
    const items = await Promise.all(data.map(async i => {
      const tokenUri = await tokenContract.tokenURI(i.tokenId)//unique identifier of what the NFT looks like
      const meta = await axios.get(tokenUri)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
        price,
        itemId: i.itemId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
        video: meta.data.video,
        name: meta.data.name,
        description: meta.data.description,
      }
      return item
    }))
    setNfts(items)
    setLoadingState('loaded') 
  }
  async function buyNft(nft) {
    //const web3Modal = new Web3Modal()
    //const connection = await web3Modal.connect()
    
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

  if (loadingState === 'loaded' && !nfts.length) return (<h1 className="px-20 py-10 text-3xl">No items in marketplace</h1>)
  //return all NFTs that have not yet sold
  return (
    <div className="m-8 p-2 justify-center">
      <div className="flex justify-start py-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {
            nfts.map((nft, i) => (
              //create div with image or video(alt) in a addition to the Name, description and price
              <div key={i} className="bg-[#3e3f41] rounded-xl shadow overflow-hidden" style={{ width: '250px'}}>
                <div className="flex justify-content p-4" style={{ height: '250px', width: '250px'}} >
                  <video poster={nft.image} src={nft.video} className="rounded bg-[#00000046]" width="350" type="video/*, audio/*" autoPlay readystate="true" loop muted controlsList="nodownload"/>
                </div> 
                <div className="p-4 bg-[#3e3f41]">
                  <p style={{ height: '40px' }} className="text-[#ffffff] text-xl font-semibold center">{nft.name}</p>
                  <div style={{ height: '80px', overflow: 'hidden' }} className="">
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
  )
}