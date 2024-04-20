document.addEventListener('DOMContentLoaded', function () {
    const createTaskForm = document.getElementById('createTaskForm');
    const taskList = document.getElementById('taskList');

    // Connect to contract
    let contract;
    const contractAddress = 'YOUR_CONTRACT_ADDRESS'; // Replace with your contract address
    const contractABI = [/* Your contract ABI here */]; // Replace with your contract ABI

    // Use Web3 library to connect to the blockchain
    const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));

    // Get contract instance
    contract = new web3.eth.Contract(contractABI, contractAddress);

    // Function to create a task
    createTaskForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const taskName = document.getElementById('taskName').value;
        const assignedTo = document.getElementById('assignedTo').value;

        // Call the createTask function of the smart contract
        contract.methods.createTask(taskName, assignedTo).send({ from: web3.eth.defaultAccount })
            .then(function (receipt) {
                console.log(receipt);
                // Reload tasks after creating a new one
                getTasks();
            })
            .catch(function (error) {
                console.error(error);
            });
    });

    // Function to get tasks and display them
    function getTasks() {
        contract.methods.getTotalTasks().call()
            .then(function (totalTasks) {
                taskList.innerHTML = ''; // Clear existing tasks

                // Loop through all tasks and display them
                for (let i = 0; i < totalTasks; i++) {
                    contract.methods.tasks(i).call()
                        .then(function (task) {
                            const taskItem = document.createElement('li');
                            taskItem.textContent = task.taskName + ' - Assigned to: ' + task.assignedTo + ' - Completed: ' + task.completed;
                            taskList.appendChild(taskItem);
                        })
                        .catch(function (error) {
                            console.error(error);
                        });
                }
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    // Initial call to get tasks when the page loads
    getTasks();
});
