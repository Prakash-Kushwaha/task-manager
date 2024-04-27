const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
    // Load the compiled TaskManager contract
    const TaskManager = await ethers.getContractFactory("TaskManager");

    // Connect to a local Hardhat network
    const network = "http://localhost:8545"; // Update this with your local Hardhat network URL
    const provider = new ethers.providers.JsonRpcProvider(network);

    // Use the local Hardhat account for interactions
    const [owner, user1, user2] = await ethers.getSigners();

    // Connect to the deployed TaskManager contract
    const contractAddress = "0xYOURCONTRACTADDRESS"; // Update this with your deployed contract address
    const taskManager = TaskManager.attach(contractAddress);

    // Example usage: create a task
    await taskManager.connect(owner).createTask("Sample Task", user1.address);

    // Example usage: complete a task
    // Assuming taskId is known, you can fetch it from the task list and then complete it
    // await taskManager.connect(user1).completeTask(taskId);

    // Example usage: get tasks by user
    const tasksByUser = await taskManager.getTasksByUser(user1.address);
    console.log("Tasks assigned to User 1:", tasksByUser);

    // Example usage: add a new user
    // await taskManager.connect(owner).addUser("0xANOTHERUSERADDRESS");
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
