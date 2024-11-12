import { backend } from "declarations/backend";

let sights = [];
const sightsList = document.getElementById('sightsList');
const addSightForm = document.getElementById('addSightForm');
const loadingSpinner = document.getElementById('loadingSpinner');

// Show/hide loading spinner
const toggleLoading = (show) => {
    loadingSpinner.classList.toggle('d-none', !show);
};

// Render all sights
const renderSights = () => {
    sightsList.innerHTML = sights
        .sort((a, b) => a.id - b.id)
        .map(sight => `
            <li class="list-group-item d-flex align-items-center">
                <input type="checkbox" 
                       class="form-check-input me-2" 
                       ${sight.completed ? 'checked' : ''}
                       onchange="window.toggleSight(${sight.id})"
                       id="sight-${sight.id}">
                <label class="form-check-label ${sight.completed ? 'text-decoration-line-through' : ''}" 
                       for="sight-${sight.id}">
                    ${sight.name}
                </label>
            </li>
        `)
        .join('');
};

// Load all sights
const loadSights = async () => {
    toggleLoading(true);
    try {
        sights = await backend.getAllSights();
        renderSights();
    } catch (error) {
        console.error('Error loading sights:', error);
    } finally {
        toggleLoading(false);
    }
};

// Add new sight
addSightForm.onsubmit = async (e) => {
    e.preventDefault();
    const input = document.getElementById('newSight');
    const name = input.value.trim();
    
    if (name) {
        toggleLoading(true);
        try {
            await backend.addSight(name);
            input.value = '';
            await loadSights();
        } catch (error) {
            console.error('Error adding sight:', error);
        } finally {
            toggleLoading(false);
        }
    }
};

// Toggle sight completion
window.toggleSight = async (id) => {
    toggleLoading(true);
    try {
        await backend.toggleSight(id);
        await loadSights();
    } catch (error) {
        console.error('Error toggling sight:', error);
    } finally {
        toggleLoading(false);
    }
};

// Initial load
loadSights();
