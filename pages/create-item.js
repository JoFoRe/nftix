import { useState } from 'react'
import { ethers } from 'ethers'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { useRouter } from 'next/router'
import Web3Modal from 'web3modal'

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0') //infura url to send items to ipfs

// const ipfsClient = require('ipfs-http-client');

// const projectId = process.env.PROJECT_ID;
// const projectSecret = process.env.PROJECT_SECRET;
// const auth =
//     'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

// const client = ipfsClient.create({
//     host: 'ipfs.infura.io',
//     port: 5001,
//     protocol: 'https',
//     headers: {
//         authorization: auth,
//     },
// });

// client.pin.add('QmeGAVddnBSnKc1DLE7DLV9uuTqo5F7QbaveTjr45JUdQn').then((res) => {
//     console.log(res);
// });

import {
  nftaddress, nftmarketaddress
} from '../config'

import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json'

export default function CreateItem() {
  const [fileUrl, setFileUrl] = useState(null)
  const [formInput, updateFormInput] = useState({ price: '', name: '', description: '' }) //pass object instead of boolen to change state
  const router = useRouter()

  async function onChange(e) {    //invoked with event
    const file = e.target.files[0]
    try {
      const added = await client.add(
        file,
        {
          progress: (prog) => console.log(`received: ${prog}`)
        }
      )
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      setFileUrl(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }

  async function createMarket() {
    const { name, description, price } = formInput
    if (!name || !description || !price || !fileUrl) return
    /* first, upload to IPFS */
    const data = JSON.stringify({
      name, description, image : fileUrl, video: fileUrl
    })
    try {
      const added = await client.add(data)
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
      createSale(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
      
    }  
  }

  async function createSale(url) {
    // const web3Modal = new Web3Modal()
    // const connection = await web3Modal.connect()
    // const provider = new ethers.providers.Web3Provider(connection)    
    // const signer = provider.getSigner()
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any")
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner()
    console.log("Account:", await signer.getAddress());
    /* next, create the item */
    let contract = new ethers.Contract(nftaddress, NFT.abi, signer)
    let transaction = await contract.createToken(url)
    let tx = await transaction.wait()
    let event = tx.events[0]
    let value = event.args[2]
    let tokenId = value.toNumber()

    const price = ethers.utils.parseUnits(formInput.price, 'ether')
  
    /* then list the item for sale on the marketplace */
    contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
    let listingPrice = await contract.getListingPrice()
    listingPrice = listingPrice.toString()

    transaction = await contract.createMarketItem(nftaddress, tokenId, price, { value: listingPrice })
    await transaction.wait()
    router.push('/')// reroute to homepage after transaction
  }

  return (
    <div className="my-10 flex justify-center">
      <div className="w-1/2 flex flex-col pb-12">
        <input 
          placeholder="NFTix Name"
          className="mt-8 border rounded p-4"
          onChange={e => updateFormInput({ ...formInput, name: e.target.value })}
        />
        <textarea
          placeholder="NFTix Description"
          className="mt-2 border rounded p-4"
          onChange={e => updateFormInput({ ...formInput, description: e.target.value })}
        />
        <input
          placeholder="NFTix Price in Matic"
          className="mt-2 border rounded p-4"
          onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
        />
        <input
          type="file"
          name="NFTix"
          className="my-4 rounded mt-4"
          onChange={onChange}
          accept="video/mp4,video/x-m4v,video/*, image/*"
          
        />
        {
          fileUrl && (
            <video poster={fileUrl} src={fileUrl} className="rounded mt-4" width="350" type="video/mp4" loop autoPlay/>            
          )
        }
        <button onClick={createMarket} className="flex flex-row text-white justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]">
          Create NFTix
        </button>
      </div>
    </div>
  )
}