import '../styles/globals.css'
import Link from 'next/link' 
import Image from 'next/image'
import logo_gb from '../images/logo_gb.png'
import Footer from '../components/footer.js'  
import ConnectMetaMask from '../components/connectWallet'
import { ThirdwebWeb3Provider } from "@3rdweb/hooks";

import "regenerator-runtime/runtime";


function MyApp({ Component, pageProps }) {
  const supportedChainIds = [80001, 4];

  const connectors = {
    injected: {},
  };
  
  
  return (
  <div className="min-h-screen"> 
    <div>
    <ThirdwebWeb3Provider
          supportedChainIds={supportedChainIds}
          connectors={connectors}
          >
      <nav className='border- p-4'>
        <Image 
          src={logo_gb} 
          alt="Sonneck-io"         
          width={130}
          height={130}/> 
        <ConnectMetaMask className="float-right"/>
        <div></div>
          <Link href="/">
            <a className='mr-4 text-blue-900'>Home</a>
          </Link>
          <Link href="/creator-dashboard">
            <a className='mr-4 text-blue-900'>Dashboard</a>
          </Link>
          <Link href="/my-assets">
            <a className='mr-4 text-blue-900'>My Assets</a>
          </Link>
          <Link href="/create-item">
            <a className='mr-4 text-blue-900'>Create NFTix</a>
          </Link>
          <Link href="/tutorials">
            <a className='mr-4 text-blue-900'>Tutorials</a>
          </Link>
      </nav>
      <div className="sm:w-[95%] w-full h-[1.5px] bg-gray-400 mt-5 " />
      <Component {...pageProps} />
      </ThirdwebWeb3Provider>
    </div>
    <Footer/>
  </div>
  
  )
}

export default MyApp;
