import React, { useContext } from "react";
//import metamask from 'https://github.com/JoFoRe/nftix/blob/main/images/metamask.png?raw=true'; changed to url for export
//import Image from 'next/image' 

const companyCommonStyles = " min-h-[80px] sm:px-2 sm:min-w-[120px] flex justify-center items-center border-[.7px] border-gray-400 text-sm font-light text-white";


const tutorials = () => {

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
          <h1 className="text-3xl sm:text-5xl text-white py-1">
            Create and find your next experience!
          </h1>
          <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
            Explore the crypto world. Create and share new experiences with NFTix.
          </p>
        
          <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
            <div className={`text-right:2px sm:rounded-tl-2xl ${companyCommonStyles}`}>
              <a className="text-center">1. Connect your wallet with Metamask    <img width="18" height="18" src='https://github.com/JoFoRe/nftix/blob/main/images/metamask.png?raw=true'/></a>
            </div> {/* potentially create a button to switch between networks*/}
            <div className={companyCommonStyles}>
            <a className="text-center">2. Create a design and save it as a .jpg, .gif, or mp4 file</a>
              </div>
            <div className={`sm:rounded-tr-2xl ${companyCommonStyles}`}>
            <a className="text-center">3. In the tab, costumize the name, description and cost of your NFTix.</a>{/* Button to create multiple NFTix, should be layer 2 to avoid super high gas*/}
            </div>
            <div className={`sm:rounded-bl-2xl ${companyCommonStyles}`}>
            <a className="text-center">4. Upload your design and check the preview before minting</a>
            </div>
            <div className={companyCommonStyles}>
              <a className="text-center"> 5. Mint your NFTix and find it in the marketplace</a>
            </div>
            <div className={`rounded-br-2xl ${companyCommonStyles}`}>
            <a className="text-center">6. Find and Buy NFTix in the Home Marketplace, and find your creation selling history in the Dashboard</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default tutorials;