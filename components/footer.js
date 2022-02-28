import React from "react";
import Image from 'next/image'
import logo_wb_sig from '../images/logo_wb_sig.png'
import Link from 'next/link' 

const Footer = () => (
  <div className="w-full flex md:justify-center justify-between items-center flex-col p-4 gradient-bg-welcome">
    <div className="w-full flex sm:flex-row flex-col justify-between items-center my-4">
      <div className="flex flex-[0.5] justify-center items-center">
        <Image src={logo_wb_sig} alt="Sonneck-io"/>
      </div>
      <div className="flex flex-1 justify-evenly items-center flex-wrap sm:mt-0 mt-5 w-full">
        <Link href="/">
          <a className='mr-4 text-white'>Home</a>
        </Link>
        <Link href="/creator-dashboard">
          <a className='mr-4 text-white'>Dashboard</a>
        </Link>
        <Link href="/create-item">
          <a className='mr-4 text-white'>Create NFTix</a>
        </Link>
        <Link href="/create-item">
          <a className='mr-4 text-white'>Tutorials</a>
        </Link>
      </div>
    </div>

    <div className="flex justify-center items-center flex-col mt-5">
      <p className="text-white text-sm text-center">For more information please feel free to contact us!</p>
      <p className="text-white text-sm text-center font-medium mt-2">info@Sonneck-io.com</p>
    </div>

    <div className="sm:w-[90%] w-full h-[0.25px] bg-gray-400 mt-5 " />

    <div className="sm:w-[90%] w-full flex justify-between items-center mt-3">
      <p className="text-white text-left text-xs">Sonneck-io 2022</p>
      <p className="text-white text-right text-xs">All rights reserved</p>
    </div>
  </div>
);

export default Footer;