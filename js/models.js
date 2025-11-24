// Data models and business logic

const Models = {
    // Exercise model
    Exercise: {
        create(data) {
            return {
                name: data.name || '',
                category: data.category || 'strength', // strength, cardio, flexibility, mobility
                muscleGroups: data.muscleGroups || [], // chest, back, legs, shoulders, arms, core
                equipment: data.equipment || 'bodyweight', // bodyweight, barbell, dumbbell, machine, etc.
                difficulty: data.difficulty || 'intermediate', // beginner, intermediate, advanced
                description: data.description || '',
                imageUrl: data.imageUrl || '',
                videoUrl: data.videoUrl || '',
                variants: data.variants || [] // [{ name: 'variant name', url: 'https://...' }]
            };
        },

        save(exercise) {
            return DB.add('exercises', exercise);
        },

        getAll() {
            return DB.getAll('exercises');
        },

        getById(id) {
            return DB.getById('exercises', id);
        },

        update(id, updates) {
            return DB.update('exercises', id, updates);
        },

        delete(id) {
            return DB.delete('exercises', id);
        }
    },

    // Workout model
    Workout: {
        create(data) {
            return {
                name: data.name || '',
                date: data.date || new Date().toISOString().split('T')[0],
                duration: data.duration || 0, // minutes
                exercises: data.exercises || [], // [{ exerciseId, sets: [{ reps, weight, notes }] }]
                notes: data.notes || '',
                difficulty: data.difficulty || 'medium' // easy, medium, hard
            };
        },

        save(workout) {
            return DB.add('workouts', workout);
        },

        getAll() {
            return DB.getAll('workouts').sort((a, b) => new Date(b.date) - new Date(a.date));
        },

        getById(id) {
            return DB.getById('workouts', id);
        },

        update(id, updates) {
            return DB.update('workouts', id, updates);
        },

        delete(id) {
            return DB.delete('workouts', id);
        },

        getRecent(limit = 10) {
            return this.getAll().slice(0, limit);
        }
    },

    // Nutrition model
    Nutrition: {
        create(data) {
            return {
                date: data.date || new Date().toISOString().split('T')[0],
                meal: data.meal || 'breakfast', // breakfast, lunch, dinner, snack
                food: data.food || '',
                calories: data.calories || 0,
                protein: data.protein || 0, // grams
                carbs: data.carbs || 0, // grams
                fats: data.fats || 0, // grams
                notes: data.notes || ''
            };
        },

        save(nutrition) {
            return DB.add('nutrition', nutrition);
        },

        getAll() {
            return DB.getAll('nutrition').sort((a, b) => new Date(b.date) - new Date(a.date));
        },

        getById(id) {
            return DB.getById('nutrition', id);
        },

        update(id, updates) {
            return DB.update('nutrition', id, updates);
        },

        delete(id) {
            return DB.delete('nutrition', id);
        },

        getByDate(date) {
            return DB.query('nutrition', item => item.date === date);
        },

        getDailySummary(date) {
            const entries = this.getByDate(date);
            return {
                totalCalories: entries.reduce((sum, e) => sum + e.calories, 0),
                totalProtein: entries.reduce((sum, e) => sum + e.protein, 0),
                totalCarbs: entries.reduce((sum, e) => sum + e.carbs, 0),
                totalFats: entries.reduce((sum, e) => sum + e.fats, 0),
                meals: entries.length
            };
        }
    },

    // Physiology model (body metrics)
    Physiology: {
        create(data) {
            return {
                date: data.date || new Date().toISOString().split('T')[0],
                weight: data.weight || 0, // kg
                bodyFat: data.bodyFat || 0, // percentage
                muscleMass: data.muscleMass || 0, // kg
                restingHR: data.restingHR || 0, // bpm
                bloodPressure: data.bloodPressure || '', // e.g., "120/80"
                sleep: data.sleep || 0, // hours
                energy: data.energy || 5, // 1-10 scale
                stress: data.stress || 5, // 1-10 scale
                notes: data.notes || ''
            };
        },

        save(physiology) {
            return DB.add('physiology', physiology);
        },

        getAll() {
            return DB.getAll('physiology').sort((a, b) => new Date(b.date) - new Date(a.date));
        },

        getById(id) {
            return DB.getById('physiology', id);
        },

        update(id, updates) {
            return DB.update('physiology', id, updates);
        },

        delete(id) {
            return DB.delete('physiology', id);
        },

        getRecent(limit = 30) {
            return this.getAll().slice(0, limit);
        }
    },

    // Profile model
    Profile: {
        get() {
            const profiles = DB.getAll('profile');
            return profiles.length > 0 ? profiles[0] : this.create({});
        },

        create(data) {
            return {
                name: data.name || '',
                age: data.age || 0,
                gender: data.gender || '',
                height: data.height || 0, // cm
                targetWeight: data.targetWeight || 0, // kg
                fitnessGoal: data.fitnessGoal || 'general', // strength, endurance, flexibility, weight-loss, muscle-gain, general
                activityLevel: data.activityLevel || 'moderate', // sedentary, light, moderate, active, very-active
                notes: data.notes || ''
            };
        },

        save(profile) {
            const existing = this.get();
            if (existing.id) {
                return DB.update('profile', existing.id, profile);
            }
            return DB.add('profile', profile);
        }
    }
};
