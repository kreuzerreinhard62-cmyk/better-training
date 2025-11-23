// Simple LocalStorage database layer
const DB = {
    // Get all items from a collection
    getAll(collection) {
        const data = localStorage.getItem(collection);
        return data ? JSON.parse(data) : [];
    },

    // Get item by ID
    getById(collection, id) {
        const items = this.getAll(collection);
        return items.find(item => item.id === id);
    },

    // Add item to collection
    add(collection, item) {
        const items = this.getAll(collection);
        item.id = item.id || this.generateId();
        item.createdAt = item.createdAt || new Date().toISOString();
        item.updatedAt = new Date().toISOString();
        items.push(item);
        localStorage.setItem(collection, JSON.stringify(items));
        return item;
    },

    // Update item in collection
    update(collection, id, updates) {
        const items = this.getAll(collection);
        const index = items.findIndex(item => item.id === id);
        if (index !== -1) {
            items[index] = { ...items[index], ...updates, updatedAt: new Date().toISOString() };
            localStorage.setItem(collection, JSON.stringify(items));
            return items[index];
        }
        return null;
    },

    // Delete item from collection
    delete(collection, id) {
        const items = this.getAll(collection);
        const filtered = items.filter(item => item.id !== id);
        localStorage.setItem(collection, JSON.stringify(filtered));
        return true;
    },

    // Query items with filter function
    query(collection, filterFn) {
        const items = this.getAll(collection);
        return items.filter(filterFn);
    },

    // Generate unique ID
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    },

    // Clear all data (use with caution)
    clearAll() {
        localStorage.clear();
    },

    // Export all data
    exportData() {
        const data = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            data[key] = JSON.parse(localStorage.getItem(key));
        }
        return data;
    },

    // Import data
    importData(data) {
        Object.keys(data).forEach(key => {
            localStorage.setItem(key, JSON.stringify(data[key]));
        });
    }
};
