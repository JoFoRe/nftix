//This component is not implemented

import { useWeb3 } from "@3rdweb/hooks" 

const ConnectMetaMask = () => {
    const { connectWallet, address, error } = useWeb3();
    error ? console.log(error) : null;
    return (
        <div className="flex float-right">
        {address ? (
          <p className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 font-mono font-medium cursor-pointer duration-100">
            Account:{address}
          </p>
        ) : (
          <button
            className="rounded bg-[#1c1c7cde] cursor-pointer hover:bg-[#1c1c7c85] text-xl font-semibold duration-100 text-white"
            onClick={()=>connectWallet("injected")}
          >
            Connect Wallet
          </button>
          
        )}
      </div>
    );
    
}

export default ConnectMetaMask;