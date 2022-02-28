//contracts/NFTMarket.sol
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

// import NFT costum codes from Node_Modules
import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol"; 
import "../node_modules/@openzeppelin/contracts/security/ReentrancyGuard.sol"; // inheritance ->prevent re-entrancy attacks multiple transactions
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";



contract NFTMarket is ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _itemIds; //all items in marketplace
    Counters.Counter private _itemsSold; // total number of items sold

    address payable public owner; // owner of the smart contract
    // amount customers should pay to put their NFT on this marketplace
    uint public listingPrice = 0.25 ether; //acts as matic


    constructor(){
        owner = payable(msg.sender);
    }
    
    struct MarketItem {
        uint itemId;
        address nftContract;
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
    }
    // access values of the MArketItem struct above by passing integer ID
    mapping(uint256 => MarketItem) private idMarketItem;
    
    // log message (when item is sold)
    event MarketItemCreated(
        uint indexed itemId,
        address indexed nftContract,
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );

    
    ///@notice function to get market listing price
    function getListingPrice() public view returns(uint256){
        return listingPrice;
    }


    function setListingPrice(uint _price) public returns(uint){
        if(msg.sender == address(this)){
            listingPrice = _price;}
        return listingPrice;
    }


    // @notice function to create market item (nonReentrant modifier)
    function createMarketItem(
        address nftContract, 
        uint256 tokenId, 
        uint256 price
        ) public payable nonReentrant {
        require(price > 0, "Price must be greater than zero" );
        require(msg.value == listingPrice, "Price must equal listing price");

        _itemIds.increment();
        uint256 itemId = _itemIds.current();
        
        //call struct as a function
        idMarketItem[itemId] = MarketItem(
            itemId,
            nftContract,
            tokenId, 
            payable(msg.sender),    // address of the seller putting nft up for sale
            payable(address(0)), // no owner yet so set owner address to empty
            price,
            false           //check whether it has been sold.
        );

        //transfer ownership of the nft to the contract itself
        ERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);

        //use event previously created (msg.sender is the seller) and log the transaction
        emit MarketItemCreated(
            itemId,
            nftContract,
            tokenId,
            msg.sender,
            address(0),
            price,
            false
        );
    }


    ///@notice function to create a sale
    // Creates the sale of a marketplace item 
    //Transfers ownership of the item, as well as funds between parties
    function createMarketSale(
        address nftContract,
        uint256 itemId
        ) public payable nonReentrant {
        uint price = idMarketItem[itemId].price;
        uint tokenId = idMarketItem[itemId].tokenId;
        require(msg.value == price, "Submit ask price to complete tx");
        
        //pay the seller the amount
        idMarketItem[itemId].seller.transfer(msg.value);
        //transfer ownership of the nft from the contract itself to buyer
        IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);
        idMarketItem[itemId].owner = payable(msg.sender); //define buyer as new owner
        idMarketItem[itemId].sold = true; //mark nft as sold
        _itemsSold.increment(); //increment the total number of items sold by 1
        payable(owner).transfer(listingPrice);
    }


    /// @notice total number of items unsold on our platform
    function fetchMarketItems() public view returns(MarketItem[] memory){
        uint itemCount = _itemIds.current();                                   //total number of items ever created
        uint unsoldItemCount = _itemIds.current() - _itemsSold.current();   //total number of items unsold
        uint currentIndex = 0;

        MarketItem[] memory items = new MarketItem[] (unsoldItemCount);
        // loop through all items ever created
        for(uint i = 0; i< itemCount; i++) {
            //check that all items ever created have not been sold (is owner field empty?), check the mapped struct to find history
            if(idMarketItem[i+1].owner == address(0)){
                //yes this item has never been sold
                uint currentId = idMarketItem[i + 1].itemId;
                MarketItem storage currentItem = idMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;


            }
        }    
        return items; // returnarray of all unsold items
    }

    ///@notice fetch list of NFTs owned by this user
    function fetchMyNFTs() public view returns(MarketItem[] memory) {
        //get total number of items ever created
        uint totalItemCount = _itemIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;

        for(uint i=0; i < totalItemCount; i++){
            if(idMarketItem[i+1].owner == msg.sender){ // owner is a global variable
                itemCount +=1;  //total length
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        for(uint i = 0; i < itemCount; i++){
            if(idMarketItem[i+1].owner == msg.sender){
                uint currentId = idMarketItem[i + 1].itemId;
                MarketItem storage currentItem = idMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    ///@notice fetch list of NFTs owned/bought by this user
    function fetchItemsCreated() public view returns(MarketItem[] memory){
        //get total number of items ever created
        uint totalItemCount = _itemIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;

        for(uint i=0; i < totalItemCount; i++){
            if(idMarketItem[i+1].seller == msg.sender){ //get only the items that this user has bought/is the owner of
                itemCount +=1;  //total length
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        for(uint i = 0; i < itemCount; i++){
            if(idMarketItem[i+1].seller == msg.sender){
                uint currentId = idMarketItem[i + 1].itemId;
                MarketItem storage currentItem = idMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;

        }
    }
    return items;
    }
    
    // potential future feature find how much user has made in Marketplace
    // 



}











