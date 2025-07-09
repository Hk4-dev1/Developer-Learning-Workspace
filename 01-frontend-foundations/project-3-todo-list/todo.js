// Todo List JavaScript - ChainSmoke Developer
// Advanced todo app with LocalStorage, filtering, and editing
// This is my second JavaScript project! 🚀

// Global variables
let todos = [];
let currentFilter = 'all';
let editingId = null;

// DOM elements
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const emptyState = document.getElementById('emptyState');
const taskCount = document.getElementById('taskCount');
const totalTasks = document.getElementById('totalTasks');
const completedTasks = document.getElementById('completedTasks');
const activeTasks = document.getElementById('activeTasks');

/**
 * Initialize the app when page loads
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('📝 Todo List App loaded successfully!');
    console.log('Made by ChainSmoke Developer - Learning JavaScript!');
    
    // Load saved todos from localStorage
    loadTodos();
    
    // Set up event listeners
    setupEventListeners();
    
    // Initial render
    renderTodos();
    updateStats();
    
    // Focus on input
    taskInput.focus();
});

/**
 * Set up all event listeners
 */
function setupEventListeners() {
    // Add task on Enter key
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    
    // Add task on button click
    addBtn.addEventListener('click', addTask);
    
    // Prevent form submission if wrapped in form
    taskInput.addEventListener('submit', function(e) {
        e.preventDefault();
        addTask();
    });
}

/**
 * Load todos from localStorage
 */
function loadTodos() {
    try {
        const savedTodos = localStorage.getItem('chainsmoke_todos');
        if (savedTodos) {
            todos = JSON.parse(savedTodos);
            console.log(`📥 Loaded ${todos.length} todos from localStorage`);
        }
    } catch (error) {
        console.error('Error loading todos:', error);
        todos = [];
    }
}

/**
 * Save todos to localStorage
 */
function saveTodos() {
    try {
        localStorage.setItem('chainsmoke_todos', JSON.stringify(todos));
        console.log(`💾 Saved ${todos.length} todos to localStorage`);
    } catch (error) {
        console.error('Error saving todos:', error);
    }
}

/**
 * Generate unique ID for new tasks
 */
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Add a new task
 */
function addTask() {
    const text = taskInput.value.trim();
    
    // Validation
    if (!text) {
        taskInput.focus();
        return;
    }
    
    if (text.length > 100) {
        alert('Task is too long! Please keep it under 100 characters.');
        return;
    }
    
    // Create new todo object
    const newTodo = {
        id: generateId(),
        text: text,
        completed: false,
        createdAt: new Date().toISOString(),
        completedAt: null
    };
    
    // Add to beginning of array (newest first)
    todos.unshift(newTodo);
    
    // Clear input
    taskInput.value = '';
    
    // Save and render
    saveTodos();
    renderTodos();
    updateStats();
    
    // Show success feedback
    showFeedback('Task added successfully! 🎉');
    
    console.log('✅ Added new task:', newTodo.text);
}

/**
 * Toggle task completion status
 */
function toggleTask(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        todo.completedAt = todo.completed ? new Date().toISOString() : null;
        
        saveTodos();
        renderTodos();
        updateStats();
        
        const status = todo.completed ? 'completed' : 'uncompleted';
        console.log(`🔄 Task ${status}:`, todo.text);
    }
}

/**
 * Delete a task
 */
function deleteTask(id) {
    const todo = todos.find(t => t.id === id);
    if (todo && confirm(`Are you sure you want to delete "${todo.text}"?`)) {
        // Add removing animation class
        const taskElement = document.querySelector(`[data-id="${id}"]`);
        if (taskElement) {
            taskElement.classList.add('removing');
            
            // Remove after animation
            setTimeout(() => {
                todos = todos.filter(t => t.id !== id);
                saveTodos();
                renderTodos();
                updateStats();
                showFeedback('Task deleted! 🗑️');
            }, 300);
        }
        
        console.log('🗑️ Deleted task:', todo.text);
    }
}

/**
 * Start editing a task
 */
function editTask(id) {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;
    
    editingId = id;
    renderTodos(); // Re-render to show edit input
    
    // Focus on edit input
    const editInput = document.querySelector('.task-edit-input');
    if (editInput) {
        editInput.focus();
        editInput.select();
    }
}

/**
 * Save edited task
 */
function saveEdit(id, newText) {
    const todo = todos.find(t => t.id === id);
    if (todo && newText.trim()) {
        todo.text = newText.trim();
        editingId = null;
        
        saveTodos();
        renderTodos();
        showFeedback('Task updated! ✏️');
        
        console.log('✏️ Updated task:', todo.text);
    }
}

/**
 * Cancel editing
 */
function cancelEdit() {
    editingId = null;
    renderTodos();
}

/**
 * Filter tasks by status
 */
function filterTasks(filter) {
    currentFilter = filter;
    
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    renderTodos();
    console.log('🔍 Filter applied:', filter);
}

/**
 * Clear all completed tasks
 */
function clearCompleted() {
    const completedCount = todos.filter(t => t.completed).length;
    
    if (completedCount === 0) {
        showFeedback('No completed tasks to clear! 🤷‍♂️');
        return;
    }
    
    if (confirm(`Are you sure you want to delete ${completedCount} completed task(s)?`)) {
        todos = todos.filter(t => !t.completed);
        
        saveTodos();
        renderTodos();
        updateStats();
        showFeedback(`Cleared ${completedCount} completed tasks! 🧹`);
        
        console.log(`🧹 Cleared ${completedCount} completed tasks`);
    }
}

/**
 * Clear all tasks
 */
function clearAll() {
    if (todos.length === 0) {
        showFeedback('No tasks to clear! 🤷‍♂️');
        return;
    }
    
    if (confirm(`Are you sure you want to delete ALL ${todos.length} task(s)? This cannot be undone!`)) {
        const count = todos.length;
        todos = [];
        
        saveTodos();
        renderTodos();
        updateStats();
        showFeedback(`Cleared all ${count} tasks! 🧹`);
        
        console.log(`🧹 Cleared all ${count} tasks`);
    }
}

/**
 * Get filtered todos based on current filter
 */
function getFilteredTodos() {
    switch (currentFilter) {
        case 'active':
            return todos.filter(t => !t.completed);
        case 'completed':
            return todos.filter(t => t.completed);
        default:
            return todos;
    }
}

/**
 * Render todos to the DOM
 */
function renderTodos() {
    const filteredTodos = getFilteredTodos();
    
    // Clear existing todos
    todoList.innerHTML = '';
    
    // Show/hide empty state
    if (filteredTodos.length === 0) {
        emptyState.classList.remove('hidden');
        emptyState.style.display = 'block';
    } else {
        emptyState.classList.add('hidden');
        emptyState.style.display = 'none';
    }
    
    // Render each todo
    filteredTodos.forEach(todo => {
        const li = createTodoElement(todo);
        todoList.appendChild(li);
    });
    
    console.log(`🎨 Rendered ${filteredTodos.length} todos (filter: ${currentFilter})`);
}

/**
 * Create a todo list item element
 */
function createTodoElement(todo) {
    const li = document.createElement('li');
    li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
    li.dataset.id = todo.id;
    
    // If editing this task, show edit input
    if (editingId === todo.id) {
        li.innerHTML = `
            <input 
                type="text" 
                class="task-edit-input" 
                value="${escapeHtml(todo.text)}"
                onkeypress="handleEditKeypress(event, '${todo.id}')"
                onblur="saveEdit('${todo.id}', this.value)"
                maxlength="100"
            >
            <div class="task-actions">
                <button class="task-btn" onclick="saveEdit('${todo.id}', document.querySelector('.task-edit-input').value)" title="Save">
                    <i class="fas fa-check"></i>
                </button>
                <button class="task-btn" onclick="cancelEdit()" title="Cancel">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
    } else {
        li.innerHTML = `
            <div class="task-checkbox ${todo.completed ? 'checked' : ''}" 
                 onclick="toggleTask('${todo.id}')" 
                 title="${todo.completed ? 'Mark as incomplete' : 'Mark as complete'}">
            </div>
            <span class="task-text" 
                  ondblclick="editTask('${todo.id}')"
                  title="Double-click to edit">
                ${escapeHtml(todo.text)}
            </span>
            <div class="task-actions">
                <button class="task-btn edit" 
                        onclick="editTask('${todo.id}')" 
                        title="Edit task">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="task-btn delete" 
                        onclick="deleteTask('${todo.id}')" 
                        title="Delete task">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
    }
    
    return li;
}

/**
 * Handle keypress events in edit input
 */
function handleEditKeypress(event, id) {
    if (event.key === 'Enter') {
        saveEdit(id, event.target.value);
    } else if (event.key === 'Escape') {
        cancelEdit();
    }
}

/**
 * Update statistics display
 */
function updateStats() {
    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;
    const active = total - completed;
    
    // Update counters
    totalTasks.textContent = total;
    completedTasks.textContent = completed;
    activeTasks.textContent = active;
    
    // Update task count text
    if (active === 0) {
        taskCount.textContent = total === 0 ? '0 tasks' : 'All tasks completed! 🎉';
    } else {
        taskCount.textContent = `${active} task${active === 1 ? '' : 's'} remaining`;
    }
    
    console.log(`📊 Stats updated - Total: ${total}, Active: ${active}, Completed: ${completed}`);
}

/**
 * Show feedback message to user
 */
function showFeedback(message) {
    // Create feedback element
    const feedback = document.createElement('div');
    feedback.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(145deg, #28a745, #20c997);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        font-weight: 500;
        animation: slideInRight 0.3s ease;
    `;
    feedback.textContent = message;
    
    // Add to body
    document.body.appendChild(feedback);
    
    // Remove after 3 seconds
    setTimeout(() => {
        feedback.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => {
            if (feedback.parentNode) {
                feedback.parentNode.removeChild(feedback);
            }
        }, 300);
    }, 3000);
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Get app statistics for console
 */
function getAppStats() {
    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;
    const active = total - completed;
    const oldestTask = todos.length > 0 ? 
        new Date(Math.min(...todos.map(t => new Date(t.createdAt)))).toLocaleDateString() : 'None';
    
    return {
        totalTasks: total,
        activeTasks: active,
        completedTasks: completed,
        completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
        oldestTask: oldestTask,
        currentFilter: currentFilter
    };
}

// Add CSS animations for feedback
const feedbackStyles = document.createElement('style');
feedbackStyles.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(feedbackStyles);

// Console welcome message
console.log(`
🎉 Todo List App Ready!
======================
Made by ChainSmoke Developer

Features:
✅ Add, edit, delete tasks
✅ Mark tasks as complete
✅ Filter by status (all/active/completed)  
✅ Persistent storage with localStorage
✅ Keyboard shortcuts
✅ Responsive design
✅ Real-time statistics

Try typing: getAppStats() in console for app statistics!
`);

// Make getAppStats available globally for console
window.getAppStats = getAppStats;
