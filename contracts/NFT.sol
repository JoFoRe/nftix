// contracts/NFT.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

// import NFT costum codes from Node_Modules
import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol"; 
import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";


contract NFT is ERC721URIStorage {
    
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    // auto-increment field for each token
    address public contractAddress;
   
    constructor(address marketplaceAddress) ERC721("NFT Ticket", "NFTix") {
        contractAddress = marketplaceAddress;
    }

    /// @notice create a new token 
    /// tokenURI : token URI
    function createToken(string memory tokenURI) public returns(uint){
        //set new tokenID for the token minted
        _tokenIds.increment(); 
        uint256 newItemId = _tokenIds.current();
    
        // mint function inherited from openzeppelin  
        _mint(msg.sender, newItemId);                // mint token
        _setTokenURI(newItemId, tokenURI);          //generate the URI
        setApprovalForAll(contractAddress, true);   //grant transaction permission to marketplace
        
        //retrun token ID
        return newItemId;

    }

}

