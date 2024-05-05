// connect wallet
document.getElementById('connect-button').addEventListener('click', event => {
    ethereum.request({ method: 'eth_requestAccounts' }).then(accounts => {
        let account = accounts[0];
        console.log(account);
        event.target.textContent = "Metamask Connected! ";

        // Display account address in the HTML page
        document.getElementById('account-info').textContent = "Account Address: " + account;

        ethereum.request({ method: 'eth_getBalance', params: [account, 'latest'] }).then(result => {
            console.log(result);
            let wei = parseInt(result, 16);
            let balance = wei / (10 ** 18);
            console.log(balance + " ETH");

            // Display account balance in the HTML page
            document.getElementById('balance-info').textContent = "Account Balance: " + balance + " ETH";
        });
    }).catch(error => {
        console.error("Error connecting to MetaMask:", error);
    });
});

 import {ethers} from "/node_modules/ethers/dist/ethers.esm.js";

document.getElementById('listItemForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let price = document.getElementById('price').value;
    console.log(price) // Convert price to wei

    ethereum.request({ method: 'eth_requestAccounts' }).then(accounts => {
        let account = accounts[0];
        let provider = new ethers.providers.Web3Provider(window.ethereum);
        let signer = provider.getSigner();

        // Instantiate the contract
        let contractAddress = '0xcc71cc601775a01b1ecf4f5a4f3526e460ac214d'; // Replace with your contract address
        let abi = [
            {
                "inputs": [],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "uint256",
                        "name": "itemId",
                        "type": "uint256"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "seller",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "string",
                        "name": "title",
                        "type": "string"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "price",
                        "type": "uint256"
                    }
                ],
                "name": "ItemListed",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "uint256",
                        "name": "itemId",
                        "type": "uint256"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "buyer",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "price",
                        "type": "uint256"
                    }
                ],
                "name": "ItemPurchased",
                "type": "event"
            },
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "_title",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "_description",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_price",
                        "type": "uint256"
                    }
                ],
                "name": "listItem",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_itemId",
                        "type": "uint256"
                    }
                ],
                "name": "purchaseItem",
                "outputs": [],
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_buyer",
                        "type": "address"
                    }
                ],
                "name": "getBuyerItems",
                "outputs": [
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "id",
                                "type": "uint256"
                            },
                            {
                                "internalType": "address",
                                "name": "seller",
                                "type": "address"
                            },
                            {
                                "internalType": "string",
                                "name": "title",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "description",
                                "type": "string"
                            },
                            {
                                "internalType": "uint256",
                                "name": "price",
                                "type": "uint256"
                            },
                            {
                                "internalType": "bool",
                                "name": "sold",
                                "type": "bool"
                            }
                        ],
                        "internalType": "struct Marketplace.Item[]",
                        "name": "",
                        "type": "tuple[]"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getItemsForSale",
                "outputs": [
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "id",
                                "type": "uint256"
                            },
                            {
                                "internalType": "address",
                                "name": "seller",
                                "type": "address"
                            },
                            {
                                "internalType": "string",
                                "name": "title",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "description",
                                "type": "string"
                            },
                            {
                                "internalType": "uint256",
                                "name": "price",
                                "type": "uint256"
                            },
                            {
                                "internalType": "bool",
                                "name": "sold",
                                "type": "bool"
                            }
                        ],
                        "internalType": "struct Marketplace.Item[]",
                        "name": "",
                        "type": "tuple[]"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_seller",
                        "type": "address"
                    }
                ],
                "name": "getSellerItems",
                "outputs": [
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "id",
                                "type": "uint256"
                            },
                            {
                                "internalType": "address",
                                "name": "seller",
                                "type": "address"
                            },
                            {
                                "internalType": "string",
                                "name": "title",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "description",
                                "type": "string"
                            },
                            {
                                "internalType": "uint256",
                                "name": "price",
                                "type": "uint256"
                            },
                            {
                                "internalType": "bool",
                                "name": "sold",
                                "type": "bool"
                            }
                        ],
                        "internalType": "struct Marketplace.Item[]",
                        "name": "",
                        "type": "tuple[]"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "items",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "seller",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "title",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "description",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "price",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "sold",
                        "type": "bool"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            }
        ];
        let contract = new ethers.Contract(contractAddress, abi, signer);

        // Call the listItem function in your contract
        contract.listItem(title, description, price).then(result => {
            console.log(result);
            alert('Item listed successfully! Transaction hash: ' + result.hash);
            let transactionLink = document.createElement('a');
              transactionLink.textContent = result.hash;
              transactionLink.href = 'https://sepolia.etherscan.io/tx/' + result.hash;
              transactionLink.target = '_blank'; // Open link in a new tab
    document.getElementById('app').appendChild(transactionLink);
        }).catch(error => {
            console.error("Error listing item:", error);
            alert('Failed to list item. Check the console for error details.');
        });
    }).catch(error => {
        console.error("Error connecting to MetaMask:", error);
        alert('Error connecting to MetaMask. Please check the console for details.');
    });
});

window.addEventListener('DOMContentLoaded', (event) => {
    displayItemsForSale();
});

function displayItemsForSale() {
    ethereum.request({ method: 'eth_requestAccounts' }).then(accounts => {
        let userAccount = accounts[0];
        let provider = new ethers.providers.Web3Provider(window.ethereum);
        let contractAddress = '0xcc71cc601775a01b1ecf4f5a4f3526e460ac214d'; // Replace with your contract address
        let abi = [
            {
                "inputs": [],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "uint256",
                        "name": "itemId",
                        "type": "uint256"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "seller",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "string",
                        "name": "title",
                        "type": "string"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "price",
                        "type": "uint256"
                    }
                ],
                "name": "ItemListed",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "uint256",
                        "name": "itemId",
                        "type": "uint256"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "buyer",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "price",
                        "type": "uint256"
                    }
                ],
                "name": "ItemPurchased",
                "type": "event"
            },
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "_title",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "_description",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_price",
                        "type": "uint256"
                    }
                ],
                "name": "listItem",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_itemId",
                        "type": "uint256"
                    }
                ],
                "name": "purchaseItem",
                "outputs": [],
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_buyer",
                        "type": "address"
                    }
                ],
                "name": "getBuyerItems",
                "outputs": [
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "id",
                                "type": "uint256"
                            },
                            {
                                "internalType": "address",
                                "name": "seller",
                                "type": "address"
                            },
                            {
                                "internalType": "string",
                                "name": "title",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "description",
                                "type": "string"
                            },
                            {
                                "internalType": "uint256",
                                "name": "price",
                                "type": "uint256"
                            },
                            {
                                "internalType": "bool",
                                "name": "sold",
                                "type": "bool"
                            }
                        ],
                        "internalType": "struct Marketplace.Item[]",
                        "name": "",
                        "type": "tuple[]"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getItemsForSale",
                "outputs": [
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "id",
                                "type": "uint256"
                            },
                            {
                                "internalType": "address",
                                "name": "seller",
                                "type": "address"
                            },
                            {
                                "internalType": "string",
                                "name": "title",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "description",
                                "type": "string"
                            },
                            {
                                "internalType": "uint256",
                                "name": "price",
                                "type": "uint256"
                            },
                            {
                                "internalType": "bool",
                                "name": "sold",
                                "type": "bool"
                            }
                        ],
                        "internalType": "struct Marketplace.Item[]",
                        "name": "",
                        "type": "tuple[]"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_seller",
                        "type": "address"
                    }
                ],
                "name": "getSellerItems",
                "outputs": [
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "id",
                                "type": "uint256"
                            },
                            {
                                "internalType": "address",
                                "name": "seller",
                                "type": "address"
                            },
                            {
                                "internalType": "string",
                                "name": "title",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "description",
                                "type": "string"
                            },
                            {
                                "internalType": "uint256",
                                "name": "price",
                                "type": "uint256"
                            },
                            {
                                "internalType": "bool",
                                "name": "sold",
                                "type": "bool"
                            }
                        ],
                        "internalType": "struct Marketplace.Item[]",
                        "name": "",
                        "type": "tuple[]"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "items",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "seller",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "title",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "description",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "price",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "sold",
                        "type": "bool"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            }
        ];
        let contract = new ethers.Contract(contractAddress, abi, provider);

        // Call the getItemsForSale function in your contract
        contract.getItemsForSale().then(items => {
            
            let itemsList = document.getElementById('itemsList');
            itemsList.innerHTML = ''; // Clear previous items

            items.forEach((item) => {
                if (item.seller !== '0x0000000000000000000000000000000000000000') {
                let listItem = document.createElement('li');
                listItem.textContent = `Title: ${item.title}, Description: ${item.description}, Price: ${ethers.utils.formatEther(item.price)} `;
                console.log(item.seller);
                console.log(userAccount);
                if (item.seller.toLowerCase() !== userAccount ) {
                let buyButton = document.createElement('button');
                buyButton.textContent = 'Purchase';
                buyButton.dataset.itemId = item.id;
                console.log(item.id); // Set item ID as a data attribute
                listItem.appendChild(buyButton);
            }
                itemsList.appendChild(listItem);
        }
            });
            
        }).catch(error => {
            console.error("Error fetching items for sale:", error);
            alert('Failed to fetch items for sale. Check the console for error details.');
        });
    }).catch(error => {
        console.error("Error connecting to MetaMask:", error);
        alert('Error connecting to MetaMask. Please check the console for details.');
    });
}

document.getElementById('itemsList').addEventListener('click', function(event) {
    if (event.target && event.target.nodeName === 'BUTTON') {
        let itemId = event.target.dataset.itemId;
        purchaseItem(itemId);
    }
});

function purchaseItem(itemId) {
    console.log(itemId);
    ethereum.request({ method: 'eth_requestAccounts' }).then(accounts => {
        let account = accounts[0];
        let provider = new ethers.providers.Web3Provider(window.ethereum);
        let signer = provider.getSigner();
        let contractAddress = '0xcc71cc601775a01b1ecf4f5a4f3526e460ac214d'; // Replace with your contract address
        let abi = [
            {
                "inputs": [],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "uint256",
                        "name": "itemId",
                        "type": "uint256"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "seller",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "string",
                        "name": "title",
                        "type": "string"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "price",
                        "type": "uint256"
                    }
                ],
                "name": "ItemListed",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "uint256",
                        "name": "itemId",
                        "type": "uint256"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "buyer",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "price",
                        "type": "uint256"
                    }
                ],
                "name": "ItemPurchased",
                "type": "event"
            },
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "_title",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "_description",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_price",
                        "type": "uint256"
                    }
                ],
                "name": "listItem",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_itemId",
                        "type": "uint256"
                    }
                ],
                "name": "purchaseItem",
                "outputs": [],
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_buyer",
                        "type": "address"
                    }
                ],
                "name": "getBuyerItems",
                "outputs": [
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "id",
                                "type": "uint256"
                            },
                            {
                                "internalType": "address",
                                "name": "seller",
                                "type": "address"
                            },
                            {
                                "internalType": "string",
                                "name": "title",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "description",
                                "type": "string"
                            },
                            {
                                "internalType": "uint256",
                                "name": "price",
                                "type": "uint256"
                            },
                            {
                                "internalType": "bool",
                                "name": "sold",
                                "type": "bool"
                            }
                        ],
                        "internalType": "struct Marketplace.Item[]",
                        "name": "",
                        "type": "tuple[]"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getItemsForSale",
                "outputs": [
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "id",
                                "type": "uint256"
                            },
                            {
                                "internalType": "address",
                                "name": "seller",
                                "type": "address"
                            },
                            {
                                "internalType": "string",
                                "name": "title",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "description",
                                "type": "string"
                            },
                            {
                                "internalType": "uint256",
                                "name": "price",
                                "type": "uint256"
                            },
                            {
                                "internalType": "bool",
                                "name": "sold",
                                "type": "bool"
                            }
                        ],
                        "internalType": "struct Marketplace.Item[]",
                        "name": "",
                        "type": "tuple[]"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_seller",
                        "type": "address"
                    }
                ],
                "name": "getSellerItems",
                "outputs": [
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "id",
                                "type": "uint256"
                            },
                            {
                                "internalType": "address",
                                "name": "seller",
                                "type": "address"
                            },
                            {
                                "internalType": "string",
                                "name": "title",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "description",
                                "type": "string"
                            },
                            {
                                "internalType": "uint256",
                                "name": "price",
                                "type": "uint256"
                            },
                            {
                                "internalType": "bool",
                                "name": "sold",
                                "type": "bool"
                            }
                        ],
                        "internalType": "struct Marketplace.Item[]",
                        "name": "",
                        "type": "tuple[]"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "items",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "seller",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "title",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "description",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "price",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "sold",
                        "type": "bool"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            }
        ];
        let contract = new ethers.Contract(contractAddress, abi, signer);

        // Call the purchaseItem function in your contract
        contract.purchaseItem(itemId, {value: ethers.utils.parseEther('0.1')}).then(result => {
            //console.log(result);
            alert('Item purchased successfully! Transaction hash: ' + result.hash);
            // Display transaction hash on the website
            // let transactionHashElement = document.createElement('p');
            // transactionHashElement.textContent = 'Transaction Hash: ' + result.hash;
            // document.getElementById('app').appendChild(transactionHashElement);
            let transactionLin = document.createElement('a');
              transactionLin.textContent = result.hash;
              transactionLin.href = 'https://sepolia.etherscan.io/address/' + result.hash;
              transactionLin.target = '_blank'; // Open link in a new tab
        }).catch(error => {
            console.error("Error purchasing item:", error);
            alert(error.error.message);
        });
    }).catch(error => {
        console.error("Error connecting to MetaMask:", error);
        alert('Error connecting to MetaMask. Please check the console for details.');
    });
}  