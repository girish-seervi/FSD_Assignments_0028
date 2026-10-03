class TaskManager {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('proTasks')) || [];
        this.currentFilter = 'all';
        this.currentCategory = null;
        
        // DOM Elements
        this.taskForm = document.getElementById('taskForm');
        this.taskTitle = document.getElementById('taskTitle');
        this.taskCategory = document.getElementById('taskCategory');
        this.taskDate = document.getElementById('taskDate');
        this.importantToggle = document.getElementById('importantToggle');
        this.taskList = document.getElementById('taskList');
        this.emptyState = document.getElementById('emptyState');
        this.searchInput = document.getElementById('searchInput');
        this.themeToggle = document.getElementById('themeToggle');
        this.progressBar = document.getElementById('progressBar');
        this.progressText = document.getElementById('progressText');
        this.currentViewTitle = document.getElementById('currentViewTitle');
        
        // State
        this.isImportantPending = false;
        
        this.init();
    }

    init() {
        this.initTheme();
        this.initDate();
        this.bindEvents();
        this.renderTasks();
    }

    initTheme() {
        const savedTheme = localStorage.getItem('proTheme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        this.updateThemeButton(savedTheme);
    }

    initDate() {
        const options = { weekday: 'long', month: 'short', day: 'numeric' };
        document.getElementById('dateDisplay').textContent = new Date().toLocaleDateString('en-US', options);
        // Set min date to today for input
        this.taskDate.min = new Date().toISOString().split("T")[0];
    }

    bindEvents() {
        // Form Submit
        this.taskForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addTask();
        });

        // Important Toggle in Form
        this.importantToggle.addEventListener('click', () => {
            this.isImportantPending = !this.isImportantPending;
            this.importantToggle.classList.toggle('active', this.isImportantPending);
            this.importantToggle.innerHTML = this.isImportantPending ? '<i class="fa-solid fa-star"></i>' : '<i class="fa-regular fa-star"></i>';
        });

        // Theme Toggle
        this.themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('proTheme', newTheme);
            this.updateThemeButton(newTheme);
        });

        // Filters (Views)
        document.querySelectorAll('.nav-menu ul:first-of-type li').forEach(li => {
            li.addEventListener('click', (e) => {
                this.setActiveNav(e.currentTarget);
                this.currentFilter = e.currentTarget.dataset.filter;
                this.currentCategory = null;
                this.currentViewTitle.textContent = e.currentTarget.textContent.trim();
                this.renderTasks();
            });
        });

        // Category Filters
        document.querySelectorAll('#categoryList li').forEach(li => {
            li.addEventListener('click', (e) => {
                this.setActiveNav(e.currentTarget);
                this.currentCategory = e.currentTarget.dataset.category;
                this.currentFilter = 'category';
                this.currentViewTitle.textContent = e.currentTarget.textContent.trim() + ' Tasks';
                this.renderTasks();
            });
        });

        // Search
        this.searchInput.addEventListener('input', () => this.renderTasks());
    }

    updateThemeButton(theme) {
        if (theme === 'dark') {
            this.themeToggle.innerHTML = '<i class="fa-regular fa-sun"></i> Light Mode';
        } else {
            this.themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i> Dark Mode';
        }
    }

    setActiveNav(element) {
        document.querySelectorAll('.nav-menu li').forEach(li => li.classList.remove('active'));
        element.classList.add('active');
    }

    addTask() {
        const title = this.taskTitle.value.trim();
        if (!title) return;

        const newTask = {
            id: Date.now().toString(),
            title: title,
            category: this.taskCategory.value,
            dueDate: this.taskDate.value || null,
            important: this.isImportantPending,
            completed: false,
            createdAt: new Date().toISOString()
        };

        this.tasks.unshift(newTask);
        this.saveTasks();
        
        // Reset form
        this.taskTitle.value = '';
        this.taskDate.value = '';
        this.isImportantPending = false;
        this.importantToggle.classList.remove('active');
        this.importantToggle.innerHTML = '<i class="fa-regular fa-star"></i>';
        
        this.showToast('Task added successfully!');
        this.renderTasks();
    }

    toggleTaskStatus(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
            this.renderTasks();
        }
    }

    toggleImportant(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.important = !task.important;
            this.saveTasks();
            this.renderTasks();
        }
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(t => t.id !== id);
        this.saveTasks();
        this.showToast('Task deleted');
        this.renderTasks();
    }

    saveTasks() {
        localStorage.setItem('proTasks', JSON.stringify(this.tasks));
        this.updateProgress();
    }

    updateProgress() {
        if (this.tasks.length === 0) {
            this.progressBar.style.width = '0%';
            this.progressText.textContent = '0% Complete';
            return;
        }

        const completed = this.tasks.filter(t => t.completed).length;
        const percentage = Math.round((completed / this.tasks.length) * 100);
        
        this.progressBar.style.width = `${percentage}%`;
        this.progressText.textContent = `${percentage}% Complete`;
    }

    getFilteredTasks() {
        let filtered = this.tasks;
        const query = this.searchInput.value.toLowerCase();

        // Search filter
        if (query) {
            filtered = filtered.filter(t => t.title.toLowerCase().includes(query));
        }

        // View/Category filter
        const todayStr = new Date().toISOString().split("T")[0];

        switch (this.currentFilter) {
            case 'today':
                filtered = filtered.filter(t => t.dueDate === todayStr);
                break;
            case 'important':
                filtered = filtered.filter(t => t.important);
                break;
            case 'completed':
                filtered = filtered.filter(t => t.completed);
                break;
            case 'category':
                filtered = filtered.filter(t => t.category === this.currentCategory);
                break;
        }

        return filtered;
    }

    renderTasks() {
        const tasksToRender = this.getFilteredTasks();
        this.taskList.innerHTML = '';

        if (tasksToRender.length === 0) {
            this.emptyState.classList.remove('hidden');
            this.taskList.classList.add('hidden');
        } else {
            this.emptyState.classList.add('hidden');
            this.taskList.classList.remove('hidden');

            tasksToRender.forEach(task => {
                const li = document.createElement('li');
                li.className = `task-card ${task.completed ? 'completed' : ''}`;
                
                // Format Date
                let dateHtml = '';
                if (task.dueDate) {
                    const dateObj = new Date(task.dueDate);
                    const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                    
                    // Check if overdue (and not completed)
                    const isOverdue = !task.completed && (new Date(task.dueDate) < new Date(new Date().setHours(0,0,0,0)));
                    dateHtml = `<span style="color: ${isOverdue ? 'var(--danger)' : 'inherit'}"><i class="fa-regular fa-calendar"></i> ${formattedDate}</span>`;
                }

                li.innerHTML = `
                    <div class="task-info-group">
                        <input type="checkbox" class="custom-checkbox" ${task.completed ? 'checked' : ''}>
                        <div class="task-details">
                            <span class="task-title">${task.title}</span>
                            <div class="task-meta">
                                <span class="tag ${task.category}">${task.category.charAt(0).toUpperCase() + task.category.slice(1)}</span>
                                ${dateHtml}
                            </div>
                        </div>
                    </div>
                    <div class="task-actions">
                        <button class="action-btn star" title="Mark Important">
                            ${task.important ? '<i class="fa-solid fa-star"></i>' : '<i class="fa-regular fa-star"></i>'}
                        </button>
                        <button class="action-btn delete" title="Delete Task">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                `;

                // Event Listeners for generated elements
                const checkbox = li.querySelector('.custom-checkbox');
                checkbox.addEventListener('change', () => this.toggleTaskStatus(task.id));

                const starBtn = li.querySelector('.star');
                starBtn.addEventListener('click', () => this.toggleImportant(task.id));

                const deleteBtn = li.querySelector('.delete');
                deleteBtn.addEventListener('click', () => this.deleteTask(task.id));

                this.taskList.appendChild(li);
            });
        }
        this.updateProgress();
    }

    showToast(message) {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.classList.remove('hidden');
        
        // Trigger reflow
        void toast.offsetWidth;
        
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.classList.add('hidden'), 400); // Wait for transition
        }, 3000);
    }
}

// Initialize app when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    new TaskManager();
});
