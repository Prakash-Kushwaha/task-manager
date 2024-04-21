// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

// Sample user address: 0x94A4402D19F380b8340137F11C7233afdE4b8168, 0x9DA5A55d5df6f6378963caA76C27655f75Bbf070

contract TaskManager {
    uint public taskCount = 0;

    // Struct to represent a task
    struct Task {
        uint taskId;
        string taskName;
        address assignedTo;
        bool completed;
    }

    // Array to store tasks
    mapping(uint => Task) public tasks;

    // Mapping to store the address of task creator
    mapping(address => string[]) public tasksByCreator;

    // Mapping to store user existence
    mapping(address => bool) public userExists;

    // Event to emit when a new task is created
    event TaskCreated(uint _taskId, string _taskName, address _assignedTo);

    // Event to emit when a task is completed
    event TaskCompleted(uint _taskId, string _taskName);

    // Declare an event to log user additions
    event UserAdded(address _uaddress);

    // Function to create a new task
    function createTask(string calldata _taskName, address _assignedTo) public {
        uint taskId = taskCount; // Store the current taskCount

        tasks[taskId] = Task(taskId, _taskName, _assignedTo, false);
        tasksByCreator[_assignedTo].push(_taskName);

        // Increment taskCount after using it
        taskCount++;

        emit TaskCreated(taskId, _taskName, _assignedTo);
    }

    // Function to mark a task as completed
    function completeTask(uint _taskId) public {
        require(_taskId < taskCount, "Task ID does not exist");

        Task storage task = tasks[_taskId]; // Use storage instead of memory to update the task in the mapping
        // require(task.assignedTo == msg.sender, "You are not authorized to complete this task");
        require(!task.completed, "Task already completed");

        task.completed = true;

        emit TaskCompleted(_taskId, task.taskName);
    }

    // Function to get tasks assigned to a specific user
    function getTasksByUser(
        address _uaddress
    ) public view returns (string[] memory) {
        return tasksByCreator[_uaddress];
    }

    // Function to add a new user
    function addUser(address _uaddress) public {
        require(_uaddress != address(0), "Invalid address");
        require(!userExists[_uaddress], "User already exists");

        // Store the user's name directly in the mapping
        userExists[_uaddress] = true;

        emit UserAdded(_uaddress);
    }
}
