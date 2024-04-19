// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Sample user address: 0x94A4402D19F380b8340137F11C7233afdE4b8168

contract TaskManager {
    // Struct to represent a task
    struct Task {
        uint taskId;
        string taskName;
        address assignedTo;
        bool completed;
    }

    // Array to store tasks
    Task[] public tasks;

    // Mapping to store the address of task creator
    mapping(address => uint[]) public tasksByCreator;

    // Array to store users
    address[] public users;

    // Mapping to store user existence
    mapping(address => bool) public userExists;

    // Event to emit when a new task is created
    event TaskCreated(uint indexed taskId, string taskName, address indexed assignedTo);

    // Event to emit when a task is completed
    event TaskCompleted(uint indexed taskId);

    // Event to emit when a new user is added
    event UserAdded(address indexed user);

    // Function to create a new task
    function createTask(string memory taskName, address assignedTo) public {
        uint taskId = tasks.length;

        tasks.push(Task(taskId, taskName, assignedTo, false));
        tasksByCreator[msg.sender].push(taskId);

        emit TaskCreated(taskId, taskName, assignedTo);
    }

    // Function to mark a task as completed
    function completeTask(uint taskId) public {
        require(taskId < tasks.length, "Task ID does not exist");

        Task storage task = tasks[taskId];
        require(task.assignedTo == msg.sender, "You are not authorized to complete this task");
        require(!task.completed, "Task already completed");

        task.completed = true;

        emit TaskCompleted(taskId);
    }

    // Function to get total number of tasks
    function getTotalTasks() public view returns (uint) {
        return tasks.length;
    }

    // Function to get tasks assigned to a specific user
    function getTasksByUser(address user) public view returns (uint[] memory) {
        return tasksByCreator[user];
    }

    // Function to add a new user
    function addUser(address user) public {
        require(!userExists[user], "User already exists");

        users.push(user);
        userExists[user] = true;

        emit UserAdded(user);
    }

    // Function to get all current users on the chain
    function getAllUsers() public view returns (address[] memory) {
        return users;
    }
}
