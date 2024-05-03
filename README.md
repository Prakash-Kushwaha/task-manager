# Task Manager
- Blockchain based Task Manager
    - A task management web application where users can create, assign, and track tasks using blockchain technology.
    - Smart contracts can be used to automate task assignments and ensure accountability.

# Installation

1. Change the current directory to this repo directory.
2. Install the hardhat and ether: `npm install hardhat` & `npm install ether`
3. Then, run the command: `npm install` (to install the dependecies of the project)

### Run Project

1. First, start the hardhat network for private blockchain: `npx hardhat node`
2. Then, to deploy the smart contract on the blockchain run the command: `npx hardhat run scripts\deploy.js`

# Smart Contract Structure

### **State Variables**:
   - `uint public taskCount`: This variable keeps track of the total number of tasks created.
   - `mapping(uint => Task) public tasks`: This mapping associates task IDs (uintegers) with Task structs.
   - `mapping(address => string[]) public tasksByCreator`: This mapping associates Ethereum addresses with arrays of task names. It keeps track of tasks created by each address.
   - `mapping(address => bool) public userExists`: This mapping checks whether a user (address) exists.

### **Struct Definition**:
   ```solidity
   struct Task {
       uint taskId;
       string taskName;
       address assignedTo;
       bool completed;
   }
   ```
   This struct represents a task with four properties: taskId (uint), taskName (string), assignedTo (Ethereum address), and completed (boolean).

### **Events**:
   - `event TaskCreated(uint _taskId, string _taskName, address _assignedTo)`: This event is emitted when a new task is created. It logs the task ID, task name, and the address to which the task is assigned.
   - `event TaskCompleted(uint _taskId, string _taskName)`: This event is emitted when a task is marked as completed. It logs the task ID and task name.
   - `event UserAdded(address _uaddress)`: This event is emitted when a new user is added. It logs the address of the newly added user.

### **Functions**:
   - `createTask`: Function to create a new task. It takes a task name and an address to assign the task to.
   - `completeTask`: Function to mark a task as completed. It takes the task ID as input and sets the completed flag to true.
   - `getTasksByUser`: Function to retrieve tasks assigned to a specific user. It takes the user's address as input and returns an array of task names.
   - `addUser`: Function to add a new user. It takes the user's address as input and sets the userExists flag to true.