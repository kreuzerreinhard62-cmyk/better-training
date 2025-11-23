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
            window.location.hash = '#dashboard';
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
            case 'dashboard':
                this.renderDashboard();
                break;
            case 'workouts':
                this.renderWorkouts();
                break;
            case 'exercises':
                if (params[0] === 'detail' && params[1]) {
                    this.renderExerciseDetail(params[1]);
                } else {
                    this.renderExercises();
                }
                break;
            case 'nutrition':
                this.renderNutrition();
                break;
            case 'physiology':
                this.renderPhysiology();
                break;
            case 'profile':
                this.renderProfile();
                break;
            default:
                this.renderDashboard();
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
                    <div class="card">
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
                    <div class="card">
                        <div class="card-title">${w.name}</div>
                        <div class="card-meta">${w.date} • ${w.duration} min</div>
                        <p>${w.exercises.length} exercises • ${w.difficulty}</p>
                        ${w.notes ? `<p style="color: #777; margin-top: 0.5rem;">${w.notes}</p>` : ''}
                        <button onclick="App.deleteWorkout('${w.id}')" class="btn-secondary" style="margin-top: 1rem;">delete</button>
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

    // Exercises view
    renderExercises() {
        const exercises = Models.Exercise.getAll();

        this.render(`
            <div class="flex-between mb-2">
                <h2>exercises</h2>
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
                        <input type="text" name="equipment" placeholder="equipment (e.g., barbell)">
                    </div>
                    <input type="text" name="muscleGroups" placeholder="muscle groups (comma separated)">
                    <textarea name="description" placeholder="description..." rows="3"></textarea>
                    <input type="text" name="videoUrl" placeholder="video url (optional)">
                    <textarea name="variants" placeholder="exercise variants (one per line: name | url)" rows="3"></textarea>
                    <div class="flex">
                        <button type="submit">save exercise</button>
                        <button type="button" class="btn-secondary" onclick="App.hideExerciseForm()">cancel</button>
                    </div>
                </form>
            </div>

            <div class="grid">
                ${exercises.map(ex => `
                    <div class="card" style="cursor: pointer;" onclick="window.location.hash = '#exercises/detail/${ex.id}'">
                        <div class="card-title">${ex.name}</div>
                        <div class="card-meta">${ex.category} • ${ex.equipment}</div>
                        ${ex.muscleGroups.length > 0 ? `<p>${ex.muscleGroups.join(', ')}</p>` : ''}
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
            equipment: formData.get('equipment'),
            muscleGroups: muscleGroups,
            description: formData.get('description'),
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
            <div class="card-meta mb-2">${exercise.category} • ${exercise.equipment}</div>

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
                        <input type="text" name="equipment" placeholder="equipment (e.g., barbell)" value="${exercise.equipment}">
                    </div>
                    <input type="text" name="muscleGroups" placeholder="muscle groups (comma separated)" value="${exercise.muscleGroups.join(', ')}">
                    <textarea name="description" placeholder="description..." rows="4">${exercise.description}</textarea>
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
            equipment: formData.get('equipment'),
            muscleGroups: muscleGroups,
            description: formData.get('description'),
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
            // Sample exercises
            Models.Exercise.save(Models.Exercise.create({
                name: 'bench press',
                category: 'strength',
                muscleGroups: ['chest', 'triceps', 'shoulders'],
                equipment: 'barbell'
            }));
            Models.Exercise.save(Models.Exercise.create({
                name: 'squat',
                category: 'strength',
                muscleGroups: ['legs', 'glutes', 'core'],
                equipment: 'barbell'
            }));
            Models.Exercise.save(Models.Exercise.create({
                name: 'pull-up',
                category: 'strength',
                muscleGroups: ['back', 'biceps'],
                equipment: 'bodyweight'
            }));
        }
    }
};

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => App.init());
} else {
    App.init();
}
