      // the below script code is convention in web3 in forming the communication with Web
      let account;
      const connectMetamask = async () => {
        if (window.ethereum !== "undefined") {
          const accounts = await ethereum.request({
            method: "eth_requestAccounts",
          });
          account = accounts[0];
          document.getElementById(
            "userArea"
          ).innerHTML = `User Account: ${account}`;
        }

        //contract ABI
        const ABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "serialNumber",
				"type": "string"
			}
		],
		"name": "AssetRegistered",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "serialNumber",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "to",
				"type": "address"
			}
		],
		"name": "AssetTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "serialNumber",
				"type": "string"
			}
		],
		"name": "AssetUpdated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "serialNumber",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "maintenanceInfo",
				"type": "string"
			}
		],
		"name": "MaintenancePerformed",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_serialNumber",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_maintenanceInfo",
				"type": "string"
			}
		],
		"name": "performMaintenance",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_serialNumber",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_assetType",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_make",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_model",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_RAM",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_hardDriveType",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_hardDriveSize",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_location",
				"type": "string"
			}
		],
		"name": "registerAsset",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_serialNumber",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_newOwner",
				"type": "address"
			}
		],
		"name": "transferAsset",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_serialNumber",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_assetType",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_make",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_model",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_RAM",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_hardDriveType",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_hardDriveSize",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_location",
				"type": "string"
			}
		],
		"name": "updateAsset",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_serialNumber",
				"type": "string"
			}
		],
		"name": "getAssetDetails",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_serialNumber",
				"type": "string"
			}
		],
		"name": "getMaintenance",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

        const Address = "0x52c27a9eeaab21e603c30ac8933d221749037ed4"; //conrtact address
        window.web3 = await new Web3(window.ethereum);
        window.contract = await new window.web3.eth.Contract(ABI, Address);
        document.getElementById("contractArea").innerHTML =
          "Connected to Contract"; //calling the elementID and replacing
      };