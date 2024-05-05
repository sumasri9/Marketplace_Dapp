// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Marketplace {
    struct Item {
        uint id;
        address seller;
        string title;
        string description;
        uint256 price;
        bool sold;
    }
    uint itemId;
    constructor(){
    itemId = 0;
    }

    Item[] public items;
    mapping(address => uint[]) sellerItems;
    mapping(address => uint[]) buyerItems;

    event ItemListed(uint indexed itemId, address indexed seller, string title, uint256 price);
    event ItemPurchased(uint indexed itemId, address indexed buyer, uint256 price);

    function listItem(string memory _title, string memory _description, uint256 _price) public {
        require(_price > 0, "Price must be greater than zero");
        

        //uint itemId = items.length;
        items.push(Item(itemId,msg.sender, _title, _description, _price, false));
        itemId += 1;
        sellerItems[msg.sender].push(itemId);
        emit ItemListed(itemId, msg.sender, _title, _price);
    }

    function purchaseItem(uint _itemId) public payable {
        require(_itemId < items.length, "Item does not exist");
        Item storage item = items[_itemId];
        require(!item.sold, "Item already sold");
        require(msg.value >= item.price, "Insufficient funds");
        
        item.sold = true;
       payable(item.seller).transfer(item.price);
        // item.seller.transfer(msg.value);
        // item.seller.payable(msg.sender);
        buyerItems[msg.sender].push(_itemId);
        emit ItemPurchased(_itemId, msg.sender, item.price);
    }

    function getItemsForSale() public view returns (Item[] memory) {
        Item[] memory availableItems = new Item[](items.length);
        uint itemCount = 0;
        for (uint i = 0; i < items.length; i++) {
            if (!items[i].sold) {
                availableItems[itemCount] = items[i];
                itemCount++;
            }
        }
        return availableItems;
    }

    function getSellerItems(address _seller) public view returns (Item[] memory) {
        uint[] memory sellerItemIds = sellerItems[_seller];
        Item[] memory sellerItemsList = new Item[](sellerItemIds.length);
        for (uint i = 0; i < sellerItemIds.length; i++) {
            sellerItemsList[i] = items[sellerItemIds[i]];
        }
        return sellerItemsList;
    }

    function getBuyerItems(address _buyer) public view returns (Item[] memory) {
        uint[] memory buyerItemIds = buyerItems[_buyer];
        Item[] memory buyerItemsList = new Item[](buyerItemIds.length);
        for (uint i = 0; i < buyerItemIds.length; i++) {
            buyerItemsList[i] = items[buyerItemIds[i]];
        }
        return buyerItemsList;
    }
}
