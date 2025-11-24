// Main app controller and router
const App = {
    container: null,

    init() {
        this.container = document.getElementById('app');
        this.setupRouter();
        this.loadSampleData();
    },

    setupRouter() {
        // Handle route changes
        window.addEventListener('hashchange', () => this.route());

        // Handle initial load
        if (!window.location.hash) {
            window.location.hash = '#exercises';
        }
        this.route();

        // Update active nav link
        this.updateActiveNav();
    },

    route() {
        const hash = window.location.hash.slice(1);
        const [view, ...params] = hash.split('/');

        this.updateActiveNav();

        switch(view) {
            case 'workouts':
                if (params[0] === 'detail' && params[1]) {
                    this.renderWorkoutDetail(params[1]);
                } else {
                    this.renderWorkouts();
                }
                break;
            case 'exercises':
                if (params[0] === 'detail' && params[1]) {
                    this.renderExerciseDetail(params[1]);
                } else {
                    this.renderExercises();
                }
                break;
            case 'profile':
                this.renderProfile();
                break;
            default:
                this.renderExercises();
        }
    },

    updateActiveNav() {
        const hash = window.location.hash;
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === hash);
        });
    },

    render(html) {
        this.container.innerHTML = html;
    },

    // Dashboard view
    renderDashboard() {
        const workouts = Models.Workout.getRecent(5);
        const physiology = Models.Physiology.getRecent(1)[0];
        const today = new Date().toISOString().split('T')[0];
        const nutritionToday = Models.Nutrition.getDailySummary(today);

        this.render(`
            <h2>dashboard</h2>

            <div class="stats">
                <div class="stat">
                    <div class="stat-value">${workouts.length}</div>
                    <div class="stat-label">recent workouts</div>
                </div>
                <div class="stat">
                    <div class="stat-value">${physiology?.weight || '--'}</div>
                    <div class="stat-label">weight (kg)</div>
                </div>
                <div class="stat">
                    <div class="stat-value">${nutritionToday.totalCalories}</div>
                    <div class="stat-label">calories today</div>
                </div>
                <div class="stat">
                    <div class="stat-value">${Models.Exercise.getAll().length}</div>
                    <div class="stat-label">exercises</div>
                </div>
            </div>

            <h3>recent workouts</h3>
            <div class="grid">
                ${workouts.length > 0 ? workouts.map(w => `
                    <div class="card" style="cursor: pointer;" onclick="window.location.hash = '#workouts/detail/${w.id}'">
                        <div class="card-title">${w.name}</div>
                        <div class="card-meta">${w.date} • ${w.duration} min</div>
                        <p>${w.exercises.length} exercises • ${w.difficulty}</p>
                    </div>
                `).join('') : '<p>no workouts yet. <a href="#workouts">create one</a></p>'}
            </div>
        `);
    },

    // Workouts view
    renderWorkouts() {
        const workouts = Models.Workout.getAll();

        this.render(`
            <div class="flex-between mb-2">
                <h2>workouts</h2>
                <button onclick="App.showWorkoutForm()">+ new workout</button>
            </div>

            <div id="workout-form" class="hidden mb-2">
                <h3>new workout</h3>
                <form onsubmit="App.saveWorkout(event)">
                    <div class="form-grid">
                        <input type="text" name="name" placeholder="workout name" required>
                        <input type="date" name="date" value="${new Date().toISOString().split('T')[0]}" required>
                        <input type="number" name="duration" placeholder="duration (min)" required>
                        <select name="difficulty">
                            <option value="easy">easy</option>
                            <option value="medium" selected>medium</option>
                            <option value="hard">hard</option>
                        </select>
                    </div>
                    <textarea name="notes" placeholder="notes..." rows="3"></textarea>
                    <div class="flex">
                        <button type="submit">save workout</button>
                        <button type="button" class="btn-secondary" onclick="App.hideWorkoutForm()">cancel</button>
                    </div>
                </form>
            </div>

            <div class="grid">
                ${workouts.map(w => `
                    <div class="card" style="cursor: pointer;" onclick="window.location.hash = '#workouts/detail/${w.id}'">
                        <div class="card-title">${w.name}</div>
                        <div class="card-meta">${w.date} • ${w.duration} min</div>
                        <p>${w.exercises.length} exercises • ${w.difficulty}</p>
                        ${w.notes ? `<p style="color: #777; margin-top: 0.5rem;">${w.notes}</p>` : ''}
                        <button onclick="event.stopPropagation(); App.deleteWorkout('${w.id}')" class="btn-secondary" style="margin-top: 1rem;">delete</button>
                    </div>
                `).join('')}
            </div>
        `);
    },

    showWorkoutForm() {
        document.getElementById('workout-form').classList.remove('hidden');
    },

    hideWorkoutForm() {
        document.getElementById('workout-form').classList.add('hidden');
    },

    saveWorkout(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const workout = Models.Workout.create({
            name: formData.get('name'),
            date: formData.get('date'),
            duration: parseInt(formData.get('duration')),
            difficulty: formData.get('difficulty'),
            notes: formData.get('notes'),
            exercises: []
        });
        Models.Workout.save(workout);
        e.target.reset();
        this.renderWorkouts();
    },

    deleteWorkout(id) {
        if (confirm('delete this workout?')) {
            Models.Workout.delete(id);
            this.renderWorkouts();
        }
    },

    // Workout detail view
    renderWorkoutDetail(id) {
        const workout = Models.Workout.getById(id);

        if (!workout) {
            this.render('<h2>workout not found</h2><p><a href="#workouts">back to workouts</a></p>');
            return;
        }

        const allExercises = Models.Exercise.getAll();

        this.render(`
            <div class="mb-2">
                <a href="#workouts" class="btn-secondary" style="display: inline-block; margin-bottom: 1rem;">← back to workouts</a>
            </div>

            <h2>${workout.name}</h2>
            <div class="card-meta mb-2">${workout.date} • ${workout.duration} min • ${workout.difficulty}</div>
            ${workout.notes ? `<p style="margin-bottom: 2rem;">${workout.notes}</p>` : ''}

            <div class="flex-between mb-2">
                <h3>exercises</h3>
                <button onclick="App.showAddExerciseForm('${id}')">+ add exercise</button>
            </div>

            <div id="add-exercise-form" class="hidden mb-2">
                <h4>select exercise</h4>
                <form onsubmit="App.addExerciseToWorkout(event, '${id}')">
                    <select name="exerciseId" required style="width: 100%; margin-bottom: 1rem;">
                        <option value="">choose an exercise...</option>
                        ${allExercises.map(ex => `
                            <option value="${ex.id}">${ex.name} (${ex.category})</option>
                        `).join('')}
                    </select>
                    <div class="flex">
                        <button type="submit">add to workout</button>
                        <button type="button" class="btn-secondary" onclick="App.hideAddExerciseForm()">cancel</button>
                    </div>
                </form>
            </div>

            <div class="mb-2">
                ${workout.exercises.length === 0 ? `
                    <p style="color: #777;">no exercises yet. add one to start tracking sets.</p>
                ` : workout.exercises.map((workoutEx, exIndex) => {
                    const exercise = Models.Exercise.getById(workoutEx.exerciseId);
                    if (!exercise) return '';

                    return `
                        <div class="card mb-2" style="margin-bottom: 1rem;">
                            <div class="flex-between">
                                <div>
                                    <div class="card-title">${exercise.name}</div>
                                    <div class="card-meta">${exercise.category} • ${exercise.equipment}</div>
                                </div>
                                <button onclick="App.removeExerciseFromWorkout('${id}', ${exIndex})" class="btn-secondary">remove</button>
                            </div>

                            <h4 style="margin-top: 1rem;">sets</h4>
                            ${workoutEx.sets.length === 0 ? `
                                <p style="color: #777; font-size: 0.9rem;">no sets logged yet</p>
                            ` : `
                                <table style="margin-bottom: 1rem;">
                                    <thead>
                                        <tr>
                                            <th>set</th>
                                            <th>reps</th>
                                            <th>weight (kg)</th>
                                            <th>notes</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${workoutEx.sets.map((set, setIndex) => `
                                            <tr>
                                                <td>${setIndex + 1}</td>
                                                <td>${set.reps || '-'}</td>
                                                <td>${set.weight || '-'}</td>
                                                <td style="color: #777; font-size: 0.85rem;">${set.notes || '-'}</td>
                                                <td><button onclick="App.removeSetFromExercise('${id}', ${exIndex}, ${setIndex})" class="btn-secondary">×</button></td>
                                            </tr>
                                        `).join('')}
                                    </tbody>
                                </table>
                            `}

                            <button onclick="App.showAddSetForm('${id}', ${exIndex})" class="btn-secondary">+ add set</button>

                            <div id="add-set-form-${exIndex}" class="hidden" style="margin-top: 1rem; padding: 1rem; border: 1px solid var(--border); background: var(--bg-dark);">
                                <h5>add set</h5>
                                <form onsubmit="App.addSetToExercise(event, '${id}', ${exIndex})">
                                    <div class="form-grid">
                                        <input type="number" name="reps" placeholder="reps" min="0">
                                        <input type="number" name="weight" placeholder="weight (kg)" step="0.5" min="0">
                                    </div>
                                    <input type="text" name="notes" placeholder="notes (optional)" style="margin-bottom: 1rem;">
                                    <div class="flex">
                                        <button type="submit">save set</button>
                                        <button type="button" class="btn-secondary" onclick="App.hideAddSetForm(${exIndex})">cancel</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>

            <div class="flex mt-2" style="margin-top: 2rem;">
                <button onclick="App.deleteWorkout('${id}')" class="btn-secondary" style="border-color: var(--accent); color: var(--accent);">delete workout</button>
            </div>
        `);
    },

    showAddExerciseForm() {
        document.getElementById('add-exercise-form').classList.remove('hidden');
    },

    hideAddExerciseForm() {
        document.getElementById('add-exercise-form').classList.add('hidden');
    },

    addExerciseToWorkout(e, workoutId) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const exerciseId = formData.get('exerciseId');

        if (!exerciseId) return;

        const workout = Models.Workout.getById(workoutId);

        // Check if exercise already exists in workout
        const alreadyExists = workout.exercises.some(ex => ex.exerciseId === exerciseId);
        if (alreadyExists) {
            alert('this exercise is already in the workout');
            return;
        }

        workout.exercises.push({
            exerciseId: exerciseId,
            sets: []
        });

        Models.Workout.update(workoutId, { exercises: workout.exercises });
        this.renderWorkoutDetail(workoutId);
    },

    removeExerciseFromWorkout(workoutId, exerciseIndex) {
        if (confirm('remove this exercise from the workout?')) {
            const workout = Models.Workout.getById(workoutId);
            workout.exercises.splice(exerciseIndex, 1);
            Models.Workout.update(workoutId, { exercises: workout.exercises });
            this.renderWorkoutDetail(workoutId);
        }
    },

    showAddSetForm(workoutId, exerciseIndex) {
        document.getElementById(`add-set-form-${exerciseIndex}`).classList.remove('hidden');
    },

    hideAddSetForm(exerciseIndex) {
        document.getElementById(`add-set-form-${exerciseIndex}`).classList.add('hidden');
    },

    addSetToExercise(e, workoutId, exerciseIndex) {
        e.preventDefault();
        const formData = new FormData(e.target);

        const workout = Models.Workout.getById(workoutId);
        workout.exercises[exerciseIndex].sets.push({
            reps: parseInt(formData.get('reps')) || 0,
            weight: parseFloat(formData.get('weight')) || 0,
            notes: formData.get('notes') || ''
        });

        Models.Workout.update(workoutId, { exercises: workout.exercises });
        this.renderWorkoutDetail(workoutId);
    },

    removeSetFromExercise(workoutId, exerciseIndex, setIndex) {
        const workout = Models.Workout.getById(workoutId);
        workout.exercises[exerciseIndex].sets.splice(setIndex, 1);
        Models.Workout.update(workoutId, { exercises: workout.exercises });
        this.renderWorkoutDetail(workoutId);
    },

    // Exercises view
    renderExercises() {
        const exercises = Models.Exercise.getAll();

        this.render(`
            <div class="flex-between mb-2">
                <h2>exercise database</h2>
                <button onclick="App.showExerciseForm()">+ new exercise</button>
            </div>

            <div id="exercise-form" class="hidden mb-2">
                <h3>new exercise</h3>
                <form onsubmit="App.saveExercise(event)">
                    <div class="form-grid">
                        <input type="text" name="name" placeholder="exercise name" required>
                        <select name="category">
                            <option value="strength">strength</option>
                            <option value="cardio">cardio</option>
                            <option value="flexibility">flexibility</option>
                            <option value="mobility">mobility</option>
                        </select>
                        <select name="difficulty">
                            <option value="beginner">beginner</option>
                            <option value="intermediate" selected>intermediate</option>
                            <option value="advanced">advanced</option>
                        </select>
                        <input type="text" name="equipment" placeholder="equipment (e.g., barbell)">
                    </div>
                    <input type="text" name="muscleGroups" placeholder="muscle groups (comma separated)">
                    <textarea name="description" placeholder="description..." rows="3"></textarea>
                    <input type="text" name="imageUrl" placeholder="image url (optional)">
                    <input type="text" name="videoUrl" placeholder="video url (optional)">
                    <textarea name="variants" placeholder="exercise variants (one per line: name | url)" rows="3"></textarea>
                    <div class="flex">
                        <button type="submit">save exercise</button>
                        <button type="button" class="btn-secondary" onclick="App.hideExerciseForm()">cancel</button>
                    </div>
                </form>
            </div>

            <div class="filters-section mb-2">
                <h3>search & filter</h3>
                <div class="search-bar mb-2">
                    <input type="text" id="search-input" placeholder="search exercises..." oninput="App.applyFilters()">
                </div>
                <div class="form-grid">
                    <select id="filter-difficulty" onchange="App.applyFilters()">
                        <option value="">all difficulties</option>
                        <option value="beginner">beginner</option>
                        <option value="intermediate">intermediate</option>
                        <option value="advanced">advanced</option>
                    </select>
                    <select id="filter-category" onchange="App.applyFilters()">
                        <option value="">all categories</option>
                        <option value="strength">strength</option>
                        <option value="cardio">cardio</option>
                        <option value="flexibility">flexibility</option>
                        <option value="mobility">mobility</option>
                    </select>
                    <select id="filter-equipment" onchange="App.applyFilters()">
                        <option value="">all equipment</option>
                        <option value="bodyweight">bodyweight</option>
                        <option value="barbell">barbell</option>
                        <option value="dumbbell">dumbbell</option>
                        <option value="kettlebell">kettlebell</option>
                        <option value="machine">machine</option>
                        <option value="cables">cables</option>
                        <option value="bands">bands</option>
                    </select>
                    <select id="filter-muscle" onchange="App.applyFilters()">
                        <option value="">all muscles</option>
                        <option value="chest">chest</option>
                        <option value="back">back</option>
                        <option value="legs">legs</option>
                        <option value="shoulders">shoulders</option>
                        <option value="arms">arms</option>
                        <option value="biceps">biceps</option>
                        <option value="triceps">triceps</option>
                        <option value="core">core</option>
                        <option value="glutes">glutes</option>
                        <option value="calves">calves</option>
                        <option value="forearms">forearms</option>
                    </select>
                </div>
                <div class="flex">
                    <button class="btn-secondary" onclick="App.clearFilters()">clear filters</button>
                    <div class="stat-label" style="margin-left: auto;">
                        <span id="results-count">${exercises.length}</span> exercises found
                    </div>
                </div>
            </div>

            <div id="exercises-grid" class="grid">
                ${exercises.map(ex => `
                    <div class="card exercise-card" data-name="${ex.name.toLowerCase()}" data-difficulty="${ex.difficulty}" data-category="${ex.category}" data-equipment="${ex.equipment}" data-muscles="${ex.muscleGroups.join(',').toLowerCase()}" style="cursor: pointer;" onclick="window.location.hash = '#exercises/detail/${ex.id}'">
                        <div class="card-title">${ex.name}</div>
                        <div class="card-meta">${ex.category} • ${ex.equipment} • ${ex.difficulty}</div>
                        ${ex.muscleGroups.length > 0 ? `<p><strong>targets:</strong> ${ex.muscleGroups.join(', ')}</p>` : ''}
                        ${ex.description ? `<p style="color: #777; margin-top: 0.5rem; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">${ex.description}</p>` : ''}
                        <button onclick="event.stopPropagation(); App.deleteExercise('${ex.id}')" class="btn-secondary" style="margin-top: 1rem;">delete</button>
                    </div>
                `).join('')}
            </div>
        `);
    },

    showExerciseForm() {
        document.getElementById('exercise-form').classList.remove('hidden');
    },

    hideExerciseForm() {
        document.getElementById('exercise-form').classList.add('hidden');
    },

    saveExercise(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const muscleGroups = formData.get('muscleGroups').split(',').map(m => m.trim()).filter(m => m);

        // Parse variants from textarea (format: "name | url" per line)
        const variantsText = formData.get('variants') || '';
        const variants = variantsText
            .split('\n')
            .map(line => line.trim())
            .filter(line => line && line.includes('|'))
            .map(line => {
                const [name, url] = line.split('|').map(s => s.trim());
                return { name, url };
            });

        const exercise = Models.Exercise.create({
            name: formData.get('name'),
            category: formData.get('category'),
            difficulty: formData.get('difficulty'),
            equipment: formData.get('equipment'),
            muscleGroups: muscleGroups,
            description: formData.get('description'),
            imageUrl: formData.get('imageUrl'),
            videoUrl: formData.get('videoUrl'),
            variants: variants
        });
        Models.Exercise.save(exercise);
        e.target.reset();
        this.renderExercises();
    },

    deleteExercise(id) {
        if (confirm('delete this exercise?')) {
            Models.Exercise.delete(id);
            // Redirect to exercises list if we're on detail page, otherwise just re-render
            if (window.location.hash.includes('/detail/')) {
                window.location.hash = '#exercises';
            } else {
                this.renderExercises();
            }
        }
    },

    applyFilters() {
        const searchTerm = document.getElementById('search-input').value.toLowerCase();
        const difficultyFilter = document.getElementById('filter-difficulty').value;
        const categoryFilter = document.getElementById('filter-category').value;
        const equipmentFilter = document.getElementById('filter-equipment').value;
        const muscleFilter = document.getElementById('filter-muscle').value;

        const cards = document.querySelectorAll('.exercise-card');
        let visibleCount = 0;

        cards.forEach(card => {
            const name = card.dataset.name;
            const difficulty = card.dataset.difficulty;
            const category = card.dataset.category;
            const equipment = card.dataset.equipment;
            const muscles = card.dataset.muscles;

            const matchesSearch = !searchTerm || name.includes(searchTerm);
            const matchesDifficulty = !difficultyFilter || difficulty === difficultyFilter;
            const matchesCategory = !categoryFilter || category === categoryFilter;
            const matchesEquipment = !equipmentFilter || equipment === equipmentFilter;
            const matchesMuscle = !muscleFilter || muscles.includes(muscleFilter);

            if (matchesSearch && matchesDifficulty && matchesCategory && matchesEquipment && matchesMuscle) {
                card.style.display = '';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        document.getElementById('results-count').textContent = visibleCount;
    },

    clearFilters() {
        document.getElementById('search-input').value = '';
        document.getElementById('filter-difficulty').value = '';
        document.getElementById('filter-category').value = '';
        document.getElementById('filter-equipment').value = '';
        document.getElementById('filter-muscle').value = '';
        this.applyFilters();
    },

    // Exercise detail view
    renderExerciseDetail(id) {
        const exercise = Models.Exercise.getById(id);

        if (!exercise) {
            this.render('<h2>exercise not found</h2><p><a href="#exercises">back to exercises</a></p>');
            return;
        }

        this.render(`
            <div class="mb-2">
                <a href="#exercises" class="btn-secondary" style="display: inline-block; margin-bottom: 1rem;">← back to exercises</a>
            </div>

            <h2>${exercise.name}</h2>
            <div class="card-meta mb-2">${exercise.category} • ${exercise.equipment} • ${exercise.difficulty}</div>

            <div class="mb-2">
                <h3>muscle groups</h3>
                ${exercise.muscleGroups.length > 0
                    ? `<p>${exercise.muscleGroups.map(mg => `<span style="display: inline-block; background: var(--bg-dark); border: 1px solid var(--border); padding: 0.25rem 0.5rem; margin: 0.25rem 0.25rem 0.25rem 0;">${mg}</span>`).join('')}</p>`
                    : '<p style="color: #777;">no muscle groups specified</p>'}
            </div>

            <div class="mb-2">
                <h3>description</h3>
                ${exercise.description
                    ? `<p>${exercise.description}</p>`
                    : '<p style="color: #777;">no description available</p>'}
            </div>

            ${exercise.videoUrl ? `
            <div class="mb-2">
                <h3>video reference</h3>
                <p><a href="${exercise.videoUrl}" target="_blank" rel="noopener noreferrer">${exercise.videoUrl}</a></p>
            </div>
            ` : ''}

            <div class="mb-2">
                <h3>exercise variants</h3>
                ${exercise.variants && exercise.variants.length > 0
                    ? `<ul>${exercise.variants.map(v => `<li><a href="${v.url}" target="_blank" rel="noopener noreferrer">${v.name}</a></li>`).join('')}</ul>`
                    : '<p style="color: #777;">no variants available</p>'}
            </div>

            <div class="flex mt-2" style="margin-top: 2rem;">
                <button onclick="App.showEditExerciseForm('${id}')" class="btn-secondary">edit exercise</button>
                <button onclick="App.deleteExercise('${id}')" class="btn-secondary" style="border-color: var(--accent); color: var(--accent);">delete exercise</button>
            </div>

            <div id="edit-exercise-form" class="hidden mt-2" style="margin-top: 2rem;">
                <h3>edit exercise</h3>
                <form onsubmit="App.updateExercise(event, '${id}')">
                    <div class="form-grid">
                        <input type="text" name="name" placeholder="exercise name" value="${exercise.name}" required>
                        <select name="category">
                            <option value="strength" ${exercise.category === 'strength' ? 'selected' : ''}>strength</option>
                            <option value="cardio" ${exercise.category === 'cardio' ? 'selected' : ''}>cardio</option>
                            <option value="flexibility" ${exercise.category === 'flexibility' ? 'selected' : ''}>flexibility</option>
                            <option value="mobility" ${exercise.category === 'mobility' ? 'selected' : ''}>mobility</option>
                        </select>
                        <select name="difficulty">
                            <option value="beginner" ${exercise.difficulty === 'beginner' ? 'selected' : ''}>beginner</option>
                            <option value="intermediate" ${exercise.difficulty === 'intermediate' ? 'selected' : ''}>intermediate</option>
                            <option value="advanced" ${exercise.difficulty === 'advanced' ? 'selected' : ''}>advanced</option>
                        </select>
                        <input type="text" name="equipment" placeholder="equipment (e.g., barbell)" value="${exercise.equipment}">
                    </div>
                    <input type="text" name="muscleGroups" placeholder="muscle groups (comma separated)" value="${exercise.muscleGroups.join(', ')}">
                    <textarea name="description" placeholder="description..." rows="4">${exercise.description}</textarea>
                    <input type="text" name="imageUrl" placeholder="image url (optional)" value="${exercise.imageUrl}">
                    <input type="text" name="videoUrl" placeholder="video url (optional)" value="${exercise.videoUrl}">
                    <textarea name="variants" placeholder="variants (one per line: name | url)" rows="4">${exercise.variants.map(v => `${v.name} | ${v.url}`).join('\n')}</textarea>
                    <div class="flex">
                        <button type="submit">update exercise</button>
                        <button type="button" class="btn-secondary" onclick="App.hideEditExerciseForm()">cancel</button>
                    </div>
                </form>
            </div>
        `);
    },

    showEditExerciseForm() {
        document.getElementById('edit-exercise-form').classList.remove('hidden');
    },

    hideEditExerciseForm() {
        document.getElementById('edit-exercise-form').classList.add('hidden');
    },

    updateExercise(e, id) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const muscleGroups = formData.get('muscleGroups').split(',').map(m => m.trim()).filter(m => m);

        // Parse variants from textarea (format: "name | url" per line)
        const variantsText = formData.get('variants');
        const variants = variantsText
            .split('\n')
            .map(line => line.trim())
            .filter(line => line && line.includes('|'))
            .map(line => {
                const [name, url] = line.split('|').map(s => s.trim());
                return { name, url };
            });

        const updates = {
            name: formData.get('name'),
            category: formData.get('category'),
            difficulty: formData.get('difficulty'),
            equipment: formData.get('equipment'),
            muscleGroups: muscleGroups,
            description: formData.get('description'),
            imageUrl: formData.get('imageUrl'),
            videoUrl: formData.get('videoUrl'),
            variants: variants
        };

        Models.Exercise.update(id, updates);
        this.renderExerciseDetail(id);
    },

    // Nutrition view
    renderNutrition() {
        const today = new Date().toISOString().split('T')[0];
        const nutrition = Models.Nutrition.getAll();
        const todaysSummary = Models.Nutrition.getDailySummary(today);

        this.render(`
            <h2>nutrition</h2>

            <div class="stats mb-2">
                <div class="stat">
                    <div class="stat-value">${todaysSummary.totalCalories}</div>
                    <div class="stat-label">calories</div>
                </div>
                <div class="stat">
                    <div class="stat-value">${todaysSummary.totalProtein}g</div>
                    <div class="stat-label">protein</div>
                </div>
                <div class="stat">
                    <div class="stat-value">${todaysSummary.totalCarbs}g</div>
                    <div class="stat-label">carbs</div>
                </div>
                <div class="stat">
                    <div class="stat-value">${todaysSummary.totalFats}g</div>
                    <div class="stat-label">fats</div>
                </div>
            </div>

            <div class="mb-2">
                <h3>add meal</h3>
                <form onsubmit="App.saveNutrition(event)">
                    <div class="form-grid">
                        <input type="date" name="date" value="${today}" required>
                        <select name="meal">
                            <option value="breakfast">breakfast</option>
                            <option value="lunch">lunch</option>
                            <option value="dinner">dinner</option>
                            <option value="snack">snack</option>
                        </select>
                        <input type="text" name="food" placeholder="food" required>
                    </div>
                    <div class="form-grid">
                        <input type="number" name="calories" placeholder="calories" required>
                        <input type="number" name="protein" placeholder="protein (g)" step="0.1">
                        <input type="number" name="carbs" placeholder="carbs (g)" step="0.1">
                        <input type="number" name="fats" placeholder="fats (g)" step="0.1">
                    </div>
                    <button type="submit">add meal</button>
                </form>
            </div>

            <h3>recent meals</h3>
            <table>
                <thead>
                    <tr>
                        <th>date</th>
                        <th>meal</th>
                        <th>food</th>
                        <th>calories</th>
                        <th>protein</th>
                        <th>carbs</th>
                        <th>fats</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    ${nutrition.map(n => `
                        <tr>
                            <td>${n.date}</td>
                            <td>${n.meal}</td>
                            <td>${n.food}</td>
                            <td>${n.calories}</td>
                            <td>${n.protein}g</td>
                            <td>${n.carbs}g</td>
                            <td>${n.fats}g</td>
                            <td><button onclick="App.deleteNutrition('${n.id}')" class="btn-secondary">×</button></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `);
    },

    saveNutrition(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const nutrition = Models.Nutrition.create({
            date: formData.get('date'),
            meal: formData.get('meal'),
            food: formData.get('food'),
            calories: parseFloat(formData.get('calories')) || 0,
            protein: parseFloat(formData.get('protein')) || 0,
            carbs: parseFloat(formData.get('carbs')) || 0,
            fats: parseFloat(formData.get('fats')) || 0
        });
        Models.Nutrition.save(nutrition);
        e.target.reset();
        this.renderNutrition();
    },

    deleteNutrition(id) {
        if (confirm('delete this meal?')) {
            Models.Nutrition.delete(id);
            this.renderNutrition();
        }
    },

    // Physiology view
    renderPhysiology() {
        const physiology = Models.Physiology.getAll();
        const latest = physiology[0];

        this.render(`
            <h2>physiology</h2>

            ${latest ? `
            <div class="stats mb-2">
                <div class="stat">
                    <div class="stat-value">${latest.weight}</div>
                    <div class="stat-label">weight (kg)</div>
                </div>
                <div class="stat">
                    <div class="stat-value">${latest.bodyFat}%</div>
                    <div class="stat-label">body fat</div>
                </div>
                <div class="stat">
                    <div class="stat-value">${latest.sleep}h</div>
                    <div class="stat-label">sleep</div>
                </div>
                <div class="stat">
                    <div class="stat-value">${latest.restingHR}</div>
                    <div class="stat-label">resting hr</div>
                </div>
            </div>
            ` : ''}

            <div class="mb-2">
                <h3>add measurement</h3>
                <form onsubmit="App.savePhysiology(event)">
                    <div class="form-grid">
                        <input type="date" name="date" value="${new Date().toISOString().split('T')[0]}" required>
                        <input type="number" name="weight" placeholder="weight (kg)" step="0.1">
                        <input type="number" name="bodyFat" placeholder="body fat %" step="0.1">
                        <input type="number" name="muscleMass" placeholder="muscle mass (kg)" step="0.1">
                        <input type="number" name="restingHR" placeholder="resting hr (bpm)">
                        <input type="text" name="bloodPressure" placeholder="blood pressure (120/80)">
                        <input type="number" name="sleep" placeholder="sleep (hours)" step="0.5">
                        <input type="number" name="energy" placeholder="energy (1-10)" min="1" max="10">
                        <input type="number" name="stress" placeholder="stress (1-10)" min="1" max="10">
                    </div>
                    <textarea name="notes" placeholder="notes..." rows="2"></textarea>
                    <button type="submit">save measurement</button>
                </form>
            </div>

            <h3>history</h3>
            <table>
                <thead>
                    <tr>
                        <th>date</th>
                        <th>weight</th>
                        <th>body fat</th>
                        <th>sleep</th>
                        <th>energy</th>
                        <th>stress</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    ${physiology.map(p => `
                        <tr>
                            <td>${p.date}</td>
                            <td>${p.weight} kg</td>
                            <td>${p.bodyFat}%</td>
                            <td>${p.sleep}h</td>
                            <td>${p.energy}/10</td>
                            <td>${p.stress}/10</td>
                            <td><button onclick="App.deletePhysiology('${p.id}')" class="btn-secondary">×</button></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `);
    },

    savePhysiology(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const physiology = Models.Physiology.create({
            date: formData.get('date'),
            weight: parseFloat(formData.get('weight')) || 0,
            bodyFat: parseFloat(formData.get('bodyFat')) || 0,
            muscleMass: parseFloat(formData.get('muscleMass')) || 0,
            restingHR: parseInt(formData.get('restingHR')) || 0,
            bloodPressure: formData.get('bloodPressure'),
            sleep: parseFloat(formData.get('sleep')) || 0,
            energy: parseInt(formData.get('energy')) || 5,
            stress: parseInt(formData.get('stress')) || 5,
            notes: formData.get('notes')
        });
        Models.Physiology.save(physiology);
        e.target.reset();
        this.renderPhysiology();
    },

    deletePhysiology(id) {
        if (confirm('delete this measurement?')) {
            Models.Physiology.delete(id);
            this.renderPhysiology();
        }
    },

    // Profile view
    renderProfile() {
        const profile = Models.Profile.get();

        this.render(`
            <h2>profile</h2>

            <form onsubmit="App.saveProfile(event)">
                <div class="form-grid">
                    <input type="text" name="name" placeholder="name" value="${profile.name || ''}">
                    <input type="number" name="age" placeholder="age" value="${profile.age || ''}">
                    <select name="gender">
                        <option value="">select gender</option>
                        <option value="male" ${profile.gender === 'male' ? 'selected' : ''}>male</option>
                        <option value="female" ${profile.gender === 'female' ? 'selected' : ''}>female</option>
                        <option value="other" ${profile.gender === 'other' ? 'selected' : ''}>other</option>
                    </select>
                    <input type="number" name="height" placeholder="height (cm)" value="${profile.height || ''}" step="0.1">
                    <input type="number" name="targetWeight" placeholder="target weight (kg)" value="${profile.targetWeight || ''}" step="0.1">
                </div>
                <div class="form-grid">
                    <select name="fitnessGoal">
                        <option value="general" ${profile.fitnessGoal === 'general' ? 'selected' : ''}>general fitness</option>
                        <option value="strength" ${profile.fitnessGoal === 'strength' ? 'selected' : ''}>strength</option>
                        <option value="endurance" ${profile.fitnessGoal === 'endurance' ? 'selected' : ''}>endurance</option>
                        <option value="flexibility" ${profile.fitnessGoal === 'flexibility' ? 'selected' : ''}>flexibility</option>
                        <option value="weight-loss" ${profile.fitnessGoal === 'weight-loss' ? 'selected' : ''}>weight loss</option>
                        <option value="muscle-gain" ${profile.fitnessGoal === 'muscle-gain' ? 'selected' : ''}>muscle gain</option>
                    </select>
                    <select name="activityLevel">
                        <option value="sedentary" ${profile.activityLevel === 'sedentary' ? 'selected' : ''}>sedentary</option>
                        <option value="light" ${profile.activityLevel === 'light' ? 'selected' : ''}>light</option>
                        <option value="moderate" ${profile.activityLevel === 'moderate' ? 'selected' : ''}>moderate</option>
                        <option value="active" ${profile.activityLevel === 'active' ? 'selected' : ''}>active</option>
                        <option value="very-active" ${profile.activityLevel === 'very-active' ? 'selected' : ''}>very active</option>
                    </select>
                </div>
                <textarea name="notes" placeholder="notes..." rows="4">${profile.notes || ''}</textarea>
                <button type="submit">save profile</button>
            </form>

            <div class="mt-2" style="margin-top: 2rem;">
                <h3>data management</h3>
                <div class="flex">
                    <button onclick="App.exportData()" class="btn-secondary">export data</button>
                    <button onclick="App.importData()" class="btn-secondary">import data</button>
                    <button onclick="App.clearData()" class="btn-secondary" style="border-color: var(--accent); color: var(--accent);">clear all data</button>
                </div>
            </div>
        `);
    },

    saveProfile(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const profile = Models.Profile.create({
            name: formData.get('name'),
            age: parseInt(formData.get('age')) || 0,
            gender: formData.get('gender'),
            height: parseFloat(formData.get('height')) || 0,
            targetWeight: parseFloat(formData.get('targetWeight')) || 0,
            fitnessGoal: formData.get('fitnessGoal'),
            activityLevel: formData.get('activityLevel'),
            notes: formData.get('notes')
        });
        Models.Profile.save(profile);
        alert('profile saved');
    },

    exportData() {
        const data = DB.exportData();
        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `better-training-export-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
    },

    importData() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'application/json';
        input.onchange = (e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const data = JSON.parse(event.target.result);
                    DB.importData(data);
                    alert('data imported successfully');
                    this.route();
                } catch (err) {
                    alert('error importing data: ' + err.message);
                }
            };
            reader.readAsText(file);
        };
        input.click();
    },

    clearData() {
        if (confirm('are you sure you want to clear all data? this cannot be undone.')) {
            if (confirm('seriously, all your data will be lost. continue?')) {
                DB.clearAll();
                alert('all data cleared');
                this.route();
            }
        }
    },

    // Load sample data for demo
    loadSampleData() {
        // Only load if no data exists
        if (Models.Exercise.getAll().length === 0) {
            // Load comprehensive exercise database from exercises-data.js
            EXERCISE_DATABASE.forEach(ex => {
                Models.Exercise.save(Models.Exercise.create(ex));
            });
        }
    }
};

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => App.init());
} else {
    App.init();
}
