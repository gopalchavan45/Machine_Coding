import React, { useState, useEffect, useMemo } from 'react';

export default function IndustrialTodoApp() {
  // 1. STATE MANAGEMENT (Dynamic initialization with localStorage persistence)
  const [todos, setTodos] = useState(() => {
    try {
      const savedTodos = localStorage.getItem('industrial_todos');
      return savedTodos ? JSON.parse(savedTodos) : [];
    } catch (error) {
      console.error('Failed to load todos from localStorage', error);
      return [];
    }
  });

  // Form state for creating/editing
  const [formData, setFormData] = useState({ title: '', description: '', priority: 'Medium' });
  const [editingId, setEditingId] = useState(null);
  
  // UI filter & search state
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL'); // ALL, ACTIVE, COMPLETED
  const [error, setError] = useState('');

  // Persist state changes to localStorage automatically
  useEffect(() => {
    try {
      localStorage.setItem('industrial_todos', JSON.stringify(todos));
    } catch (error) {
      console.error('Failed to save todos to localStorage', error);
    }
  }, [todos]);

  // 2. CREATE & UPDATE HANDLER (Unified submit flow)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setError('Task title is required.');
      return;
    }
    setError('');

    if (editingId) {
      // UPDATE Operation
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === editingId
            ? { ...todo, ...formData, updatedAt: new Date().toISOString() }
            : todo
        )
      );
      setEditingId(null);
    } else {
      // CREATE Operation
      const newTodo = {
        id: crypto.randomUUID(),
        title: formData.title.trim(),
        description: formData.description.trim(),
        priority: formData.priority,
        completed: false,
        createdAt: new Date().toISOString(),
      };
      setTodos((prevTodos) => [newTodo, ...prevTodos]);
    }

    // Reset Form
    setFormData({ title: '', description: '', priority: 'Medium' });
  };

  // 3. EDIT INITIATION
  const handleEditClick = (todo) => {
    setEditingId(todo.id);
    setFormData({ title: todo.title, description: todo.description, priority: todo.priority });
  };

  // 4. DELETE OPERATION
  const handleDelete = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setFormData({ title: '', description: '', priority: 'Medium' });
    }
  };

  // 5. TOGGLE STATUS OPERATION
  const handleToggleComplete = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // 6. FILTERED & SEARCHED DATA COMPUTATION (Optimized with useMemo)
  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      const matchesSearch =
        todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        todo.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (filterStatus === 'ACTIVE') return matchesSearch && !todo.completed;
      if (filterStatus === 'COMPLETED') return matchesSearch && todo.completed;
      return matchesSearch;
    });
  }, [todos, searchQuery, filterStatus]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-8 flex justify-center">
      <div className="w-full max-w-3xl space-y-6">
        
        {/* Header */}
        <header className="border-b border-slate-800 pb-4">
          <h1 className="text-3xl font-bold tracking-tight text-indigo-400">Task Management Engine</h1>
          <p className="text-sm text-slate-400 mt-1">Industrial-grade dynamic CRUD workflow with local persistence.</p>
        </header>

        {/* Input Form Section (Create / Update) */}
        <section className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-xl">
          <h2 className="text-lg font-semibold mb-4 text-slate-200">
            {editingId ? 'Edit Task Record' : 'Create New Task'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium uppercase text-slate-400 mb-1">Task Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter task title..."
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
              />
              {error && <p className="text-rose-400 text-xs mt-1">{error}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium uppercase text-slate-400 mb-1">Description</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Optional details..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium uppercase text-slate-400 mb-1">Priority Level</label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                >
                  <option value="Low">Low Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="High">High Priority</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setFormData({ title: '', description: '', priority: 'Medium' });
                  }}
                  className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-sm font-medium transition-colors"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm font-semibold shadow-md transition-colors"
              >
                {editingId ? 'Update Task' : 'Add Task'}
              </button>
            </div>
          </form>
        </section>

        {/* Filters & Search Toolbar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-800/50 p-4 rounded-xl border border-slate-800">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks..."
            className="w-full sm:w-72 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
          />

          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-700 w-full sm:w-auto justify-center">
            {['ALL', 'ACTIVE', 'COMPLETED'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                  filterStatus === status ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Data Display List (Read & CRUD Action Dispatchers) */}
        <div className="space-y-3">
          {filteredTodos.length === 0 ? (
            <div className="text-center py-12 bg-slate-800/30 rounded-xl border border-slate-800/80">
              <p className="text-slate-500 text-sm">No tasks found matching current filters.</p>
            </div>
          ) : (
            filteredTodos.map((todo) => (
              <div
                key={todo.id}
                className={`flex items-start justify-between p-4 rounded-xl border transition-all bg-slate-800 ${
                  todo.completed ? 'border-emerald-500/30 opacity-75' : 'border-slate-700 shadow-md'
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggleComplete(todo.id)}
                    className="mt-1.5 h-4 w-4 rounded border-slate-700 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                  />
                  <div>
                    <h3 className={`font-medium text-slate-100 ${todo.completed ? 'line-through text-slate-400' : ''}`}>
                      {todo.title}
                    </h3>
                    {todo.description && (
                      <p className="text-sm text-slate-400 mt-0.5">{todo.description}</p>
                    )}
                    <div className="flex items-center gap-2 mt-2">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider ${
                          todo.priority === 'High'
                            ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                            : todo.priority === 'Medium'
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        }`}
                      >
                        {todo.priority}
                      </span>
                      <span className="text-[11px] text-slate-500">
                        {new Date(todo.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEditClick(todo)}
                    className="p-2 text-slate-400 hover:text-indigo-400 hover:bg-slate-700/50 rounded-lg transition-colors text-xs font-semibold"
                    title="Edit Record"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(todo.id)}
                    className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-700/50 rounded-lg transition-colors text-xs font-semibold"
                    title="Delete Record"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
} 