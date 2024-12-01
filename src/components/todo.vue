<template>
    <div class="container">
        <h1>To-Do List</h1>
        <input type="text" v-model="taskInput" placeholder="添加新任务..." @keyup.enter="addTask">
        <button @click="addTask">添加任务</button>
        <ul>
            <li v-for="(task, index) in tasks" :key="index" :class="{ completed: task.completed }">
                <span>{{ task.text }}</span>
                <button @click="toggleComplete(task)">
                    {{ task.completed ? '已完成' : '完成' }}
                </button>
                <button @click="deleteTask(index)">删除</button>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            taskInput: '',
            tasks: []
        };
    },
    methods: {
        addTask() {
            const text = this.taskInput.trim();
            if (text === '') return;
            this.tasks.push({ text, completed: false });
            this.taskInput = '';
            this.saveTasks();
        },
        toggleComplete(task) {
            task.completed = !task.completed;
            this.saveTasks();
        },
        deleteTask(index) {
            this.tasks.splice(index, 1);
            this.saveTasks();
        },
        saveTasks() {
            localStorage.setItem('tasks', JSON.stringify(this.tasks));
        },
        loadTasks() {
            const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            this.tasks = tasks;
        }
    },
    created() {
        this.loadTasks();
    }
};
</script>

<style scoped>
.container {
    margin: 0 auto;
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 300px;
    text-align: center;
}

h1 {
    margin-bottom: 20px;
}

input[type="text"] {
    width: calc(100% - 22px);
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

button {
    padding: 10px 20px;
    border: none;
    background-color: #28a745;
    color: #fff;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #218838;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    background-color: #f8f9fa;
    margin-bottom: 5px;
    padding: 10px;
    border-radius: 4px;
    display: flex;
    align-items: center;
}

li.completed span {
    text-decoration: line-through;
    color: #868e96;
}

li span {
    flex-grow: 1;
}

li button {
    margin-left: 5px;
    background-color: #007bff;
    border: none;
    color: #fff;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
}

li button:hover {
    background-color: #0056b3;
}

li button:last-child {
    background-color: #dc3545;
}

li button:last-child:hover {
    background-color: #c82333;
}
</style>