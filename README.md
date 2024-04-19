# Task Manager
Blockchain based Task Manager: A task management web application where users can create, assign, and track tasks using blockchain technology.
- Smart contracts can be used to automate task assignments and ensure accountability.

# Task Manager Structure

### **Task Struct**:
   - Inside the contract, there is a `struct` named `Task`, which represents a task.
   - It contains four fields:
     - `taskId`: A unique identifier for each task.
     - `taskName`: A string describing the task.
     - `assignedTo`: The Ethereum address of the user to whom the task is assigned.
     - `completed`: A boolean indicating whether the task is completed.

### **State Variables**:
   - `tasks`: An array to store instances of the `Task` struct, representing all tasks in the system.
   - `tasksByCreator`: A mapping that maps the address of a task creator to an array of task IDs created by that address.
   - `users`: An array to store the Ethereum addresses of all users in the system.
   - `userExists`: A mapping that stores whether a user exists based on their Ethereum address.

### **Events**:
   - Three events are declared to facilitate logging and external communication:
     - `TaskCreated`: Logged when a new task is created. It includes the `taskId`, `taskName`, and `assignedTo` address.
     - `TaskCompleted`: Logged when a task is marked as completed. It includes the `taskId`.
     - `UserAdded`: Logged when a new user is added. It includes the user's Ethereum address.

### **Functions**:
   - `createTask`: Creates a new task with the given `taskName` and assigns it to the specified `assignedTo` address. It emits the `TaskCreated` event.
   - `completeTask`: Marks a task with the given `taskId` as completed, assuming the caller is authorized to do so. It emits the `TaskCompleted` event.
   - `getTotalTasks`: Returns the total number of tasks in the system.
   - `getTasksByUser`: Takes a user's Ethereum address as input and returns an array of task IDs assigned to that user.
   - `addUser`: Adds a new user to the system with the specified Ethereum address. It emits the `UserAdded` event.
   - `getAllUsers`: Returns an array containing the Ethereum addresses of all users in the system.