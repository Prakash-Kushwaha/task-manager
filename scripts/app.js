async function createTask() {
    const taskName = document.getElementById("taskName").value;
    const assignedTo = document.getElementById("assignedTo").value;

    // Connect to MetaMask provider
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    // Request access to user's accounts
    await window.ethereum.request({ method: 'eth_requestAccounts' });

    // Get signer from MetaMask
    const signer = provider.getSigner();

    // // Connect to Ethereum network
    // const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");

    // Load smart contract
    const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3"; // Address of deployed TaskManager contract
    const contract = new ethers.Contract(contractAddress, [
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "_taskId",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "_taskName",
                    "type": "string"
                }
            ],
            "name": "TaskCompleted",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "_taskId",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "_taskName",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "_assignedTo",
                    "type": "address"
                }
            ],
            "name": "TaskCreated",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "_uaddress",
                    "type": "address"
                }
            ],
            "name": "UserAdded",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_uaddress",
                    "type": "address"
                }
            ],
            "name": "addUser",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_taskId",
                    "type": "uint256"
                }
            ],
            "name": "completeTask",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_taskName",
                    "type": "string"
                },
                {
                    "internalType": "address",
                    "name": "_assignedTo",
                    "type": "address"
                }
            ],
            "name": "createTask",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_uaddress",
                    "type": "address"
                }
            ],
            "name": "getTasksByUser",
            "outputs": [
                {
                    "internalType": "string[]",
                    "name": "",
                    "type": "string[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "taskCount",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
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
            "name": "tasks",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "taskId",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "taskName",
                    "type": "string"
                },
                {
                    "internalType": "address",
                    "name": "assignedTo",
                    "type": "address"
                },
                {
                    "internalType": "bool",
                    "name": "completed",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "tasksByCreator",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "userExists",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ], signer);

    // Call createTask function
    await contract.createTask(taskName, assignedTo);

    // Update task count
    const taskCount = await contract.taskCount();
    document.getElementById("taskCount").innerText = "Total Tasks: " + taskCount.toString();
}