// taskmanager.js

async function main() {
  // To get the wallet address of current deployer
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log(
    "Account balance:",
    await deployer.provider.getBalance(deployer.address)
  );

  // To deploy the contract
  const TaskManager = await ethers.getContractFactory("TaskManager");
  console.log("Deploying TaskManager...");
  const taskManager = await TaskManager.deploy();

  // await taskManager.waitForDeployment();

  // To get the deployed contract target address
  const address = await taskManager.target;
  console.log("TaskManager deployed to:", address);

  // Optionally, you can interact with the deployed contract here
  // For example:
  const taskCount = await taskManager.taskCount();
  console.log("Initial task count:", taskCount);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
