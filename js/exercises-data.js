// Comprehensive exercise database
const EXERCISE_DATABASE = [
    // BEGINNER - BODYWEIGHT
    {
        name: 'push-up',
        category: 'strength',
        difficulty: 'beginner',
        muscleGroups: ['chest', 'triceps', 'shoulders', 'core'],
        equipment: 'bodyweight',
        description: 'Classic bodyweight exercise. Start in plank position, lower chest to ground, push back up. Keep core tight and body in straight line throughout movement.',
        videoUrl: 'https://youtube.com/watch?v=IODxDxX7oi4',
        variants: [
            { name: 'incline push-up', url: 'https://youtube.com/watch?v=XOOqr8ksxTE' },
            { name: 'diamond push-up', url: 'https://youtube.com/watch?v=J0DnG1_S92I' }
        ]
    },
    {
        name: 'squat',
        category: 'strength',
        difficulty: 'beginner',
        muscleGroups: ['legs', 'glutes', 'core'],
        equipment: 'bodyweight',
        description: 'Fundamental lower body movement. Stand with feet shoulder-width apart, sit back as if into chair, keep chest up. Drive through heels to stand.',
        videoUrl: 'https://youtube.com/watch?v=aclHkVaku9U',
        variants: [
            { name: 'goblet squat', url: 'https://youtube.com/watch?v=MeIiIdhvXT4' },
            { name: 'sumo squat', url: 'https://youtube.com/watch?v=fCQ0SWdaa90' }
        ]
    },
    {
        name: 'plank',
        category: 'strength',
        difficulty: 'beginner',
        muscleGroups: ['core', 'shoulders'],
        equipment: 'bodyweight',
        description: 'Isometric core exercise. Hold forearm plank position with body in straight line from head to heels. Engage core and glutes, avoid sagging hips.',
        videoUrl: 'https://youtube.com/watch?v=pSHjTRCQxIw'
    },
    {
        name: 'glute bridge',
        category: 'strength',
        difficulty: 'beginner',
        muscleGroups: ['glutes', 'core'],
        equipment: 'bodyweight',
        description: 'Lie on back, feet flat on floor, drive hips up squeezing glutes at top. Excellent for glute activation and lower back health.',
        videoUrl: 'https://youtube.com/watch?v=wPM8icPu6H8'
    },
    {
        name: 'walking',
        category: 'cardio',
        difficulty: 'beginner',
        muscleGroups: ['legs'],
        equipment: 'bodyweight',
        description: 'Low-impact cardiovascular activity. Maintain brisk pace for sustained periods. Great for recovery and general health.',
        videoUrl: 'https://youtube.com/watch?v=fFItlsQ7u0I'
    },
    {
        name: 'bird dog',
        category: 'strength',
        difficulty: 'beginner',
        muscleGroups: ['core', 'back'],
        equipment: 'bodyweight',
        description: 'Start on hands and knees, extend opposite arm and leg while maintaining neutral spine. Excellent for core stability and balance.',
        videoUrl: 'https://youtube.com/watch?v=wiFNA3sqjCA'
    },
    {
        name: 'wall sit',
        category: 'strength',
        difficulty: 'beginner',
        muscleGroups: ['legs', 'glutes'],
        equipment: 'bodyweight',
        description: 'Isometric quad exercise. Sit against wall with thighs parallel to ground, hold position. Build time progressively.',
        videoUrl: 'https://youtube.com/watch?v=y-wV4Venusw'
    },
    {
        name: 'dead bug',
        category: 'strength',
        difficulty: 'beginner',
        muscleGroups: ['core'],
        equipment: 'bodyweight',
        description: 'Lie on back, extend opposite arm and leg while keeping lower back pressed to floor. Teaches core stability and coordination.',
        videoUrl: 'https://youtube.com/watch?v=g_BYB0R-4Ws'
    },

    // INTERMEDIATE - BODYWEIGHT
    {
        name: 'pull-up',
        category: 'strength',
        difficulty: 'intermediate',
        muscleGroups: ['back', 'biceps'],
        equipment: 'bodyweight',
        description: 'Vertical pulling exercise. Hang from bar, pull chest to bar, lower with control. King of back exercises.',
        videoUrl: 'https://youtube.com/watch?v=eGo4IYlbE5g',
        variants: [
            { name: 'chin-up', url: 'https://youtube.com/watch?v=brhzXqCdN90' },
            { name: 'neutral grip pull-up', url: 'https://youtube.com/watch?v=YoAu0RQYIj4' }
        ]
    },
    {
        name: 'dip',
        category: 'strength',
        difficulty: 'intermediate',
        muscleGroups: ['chest', 'triceps', 'shoulders'],
        equipment: 'bodyweight',
        description: 'Bodyweight pressing movement on parallel bars. Lower body with control, press back up. Lean forward for chest emphasis.',
        videoUrl: 'https://youtube.com/watch?v=2z8JmcrW-As'
    },
    {
        name: 'burpees',
        category: 'cardio',
        difficulty: 'intermediate',
        muscleGroups: ['legs', 'chest', 'core'],
        equipment: 'bodyweight',
        description: 'Full-body explosive movement. Drop to plank, perform push-up, jump feet forward, explosive jump. High-intensity cardio.',
        videoUrl: 'https://youtube.com/watch?v=dZgVxmf6jkA'
    },
    {
        name: 'mountain climber',
        category: 'cardio',
        difficulty: 'intermediate',
        muscleGroups: ['core', 'shoulders', 'legs'],
        equipment: 'bodyweight',
        description: 'Start in plank position, alternate driving knees to chest. Keep hips low and core engaged. Great cardio and core work.',
        videoUrl: 'https://youtube.com/watch?v=nmwgirgXLYM'
    },
    {
        name: 'bulgarian split squat',
        category: 'strength',
        difficulty: 'intermediate',
        muscleGroups: ['legs', 'glutes'],
        equipment: 'bodyweight',
        description: 'Single-leg squat with rear foot elevated. Excellent for leg strength and balance. Can add weight for progression.',
        videoUrl: 'https://youtube.com/watch?v=2C-uNgKwPLE'
    },
    {
        name: 'pike push-up',
        category: 'strength',
        difficulty: 'intermediate',
        muscleGroups: ['shoulders', 'triceps'],
        equipment: 'bodyweight',
        description: 'Start in downward dog position, bend elbows to lower head toward floor. Progression toward handstand push-ups.',
        videoUrl: 'https://youtube.com/watch?v=spoSDjF0AQk'
    },

    // ADVANCED - BODYWEIGHT
    {
        name: 'pistol squat',
        category: 'strength',
        difficulty: 'advanced',
        muscleGroups: ['legs', 'glutes', 'core'],
        equipment: 'bodyweight',
        description: 'Single-leg squat to full depth with opposite leg extended forward. Requires strength, mobility, and balance.',
        videoUrl: 'https://youtube.com/watch?v=vq5-vdgJc0I'
    },
    {
        name: 'muscle-up',
        category: 'strength',
        difficulty: 'advanced',
        muscleGroups: ['back', 'chest', 'triceps', 'core'],
        equipment: 'bodyweight',
        description: 'Advanced calisthenics movement combining explosive pull-up with straight bar dip. Requires significant upper body strength.',
        videoUrl: 'https://youtube.com/watch?v=5aDmYE4bkbQ'
    },
    {
        name: 'handstand push-up',
        category: 'strength',
        difficulty: 'advanced',
        muscleGroups: ['shoulders', 'triceps', 'core'],
        equipment: 'bodyweight',
        description: 'Inverted pressing movement against wall or freestanding. Ultimate shoulder strength exercise.',
        videoUrl: 'https://youtube.com/watch?v=tQhrk6WMcKw'
    },
    {
        name: 'l-sit',
        category: 'strength',
        difficulty: 'advanced',
        muscleGroups: ['core', 'shoulders'],
        equipment: 'bodyweight',
        description: 'Hold body suspended with legs extended parallel to ground. Requires tremendous core and shoulder strength.',
        videoUrl: 'https://youtube.com/watch?v=IUZJrTBoR3A'
    },
    {
        name: 'front lever',
        category: 'strength',
        difficulty: 'advanced',
        muscleGroups: ['back', 'core'],
        equipment: 'bodyweight',
        description: 'Hold body horizontal while hanging from bar. Pinnacle of pulling strength and core control.',
        videoUrl: 'https://youtube.com/watch?v=Vdoys3LW8TI'
    },

    // INTERMEDIATE - BARBELL
    {
        name: 'bench press',
        category: 'strength',
        difficulty: 'intermediate',
        muscleGroups: ['chest', 'triceps', 'shoulders'],
        equipment: 'barbell',
        description: 'Compound pressing movement. Lie on bench, lower bar to chest, press up. Keep feet planted and maintain arch.',
        videoUrl: 'https://youtube.com/watch?v=rT7DgCr-3pg',
        variants: [
            { name: 'incline bench press', url: 'https://youtube.com/watch?v=DbFgADa2IUA' },
            { name: 'close-grip bench press', url: 'https://youtube.com/watch?v=nEF0bv2FW94' }
        ]
    },
    {
        name: 'deadlift',
        category: 'strength',
        difficulty: 'intermediate',
        muscleGroups: ['back', 'legs', 'glutes', 'core'],
        equipment: 'barbell',
        description: 'Hip hinge movement pattern. Lift bar from ground to standing, keep bar close to body. King of exercises.',
        videoUrl: 'https://youtube.com/watch?v=op9kVnSso6Q',
        variants: [
            { name: 'sumo deadlift', url: 'https://youtube.com/watch?v=8op5fIA8KRo' },
            { name: 'romanian deadlift', url: 'https://youtube.com/watch?v=JCXUYuzwNrM' }
        ]
    },
    {
        name: 'overhead press',
        category: 'strength',
        difficulty: 'intermediate',
        muscleGroups: ['shoulders', 'triceps', 'core'],
        equipment: 'barbell',
        description: 'Standing vertical press. Press bar from shoulders to overhead, keep core tight. Best shoulder strength builder.',
        videoUrl: 'https://youtube.com/watch?v=2yjwXTZQDDI'
    },
    {
        name: 'barbell row',
        category: 'strength',
        difficulty: 'intermediate',
        muscleGroups: ['back', 'biceps'],
        equipment: 'barbell',
        description: 'Bent over rowing movement. Hinge at hips, pull bar to lower chest/upper abs. Build thick back.',
        videoUrl: 'https://youtube.com/watch?v=FWJR5Ve8bnQ'
    },
    {
        name: 'back squat',
        category: 'strength',
        difficulty: 'intermediate',
        muscleGroups: ['legs', 'glutes', 'core'],
        equipment: 'barbell',
        description: 'Barbell on upper back, squat to depth, drive up. Fundamental lower body strength exercise.',
        videoUrl: 'https://youtube.com/watch?v=ultWZbUMPL8',
        variants: [
            { name: 'front squat', url: 'https://youtube.com/watch?v=uYumuL_G_V0' },
            { name: 'box squat', url: 'https://youtube.com/watch?v=JjB1aOmAgr0' }
        ]
    },

    // ADVANCED - BARBELL
    {
        name: 'front squat',
        category: 'strength',
        difficulty: 'advanced',
        muscleGroups: ['legs', 'core'],
        equipment: 'barbell',
        description: 'Barbell in front rack position, squat maintaining upright torso. Quad-dominant variation requiring mobility.',
        videoUrl: 'https://youtube.com/watch?v=uYumuL_G_V0'
    },
    {
        name: 'power clean',
        category: 'strength',
        difficulty: 'advanced',
        muscleGroups: ['legs', 'back', 'shoulders'],
        equipment: 'barbell',
        description: 'Olympic lift variation. Explosive pull from ground to front rack. Builds power and athleticism.',
        videoUrl: 'https://youtube.com/watch?v=KwYJTpQ_x5A'
    },
    {
        name: 'snatch',
        category: 'strength',
        difficulty: 'advanced',
        muscleGroups: ['legs', 'back', 'shoulders'],
        equipment: 'barbell',
        description: 'Olympic lift. Pull bar from ground to overhead in one motion. Requires technique, mobility, and power.',
        videoUrl: 'https://youtube.com/watch?v=L_tkT2UF0dA'
    },

    // DUMBBELL EXERCISES
    {
        name: 'dumbbell row',
        category: 'strength',
        difficulty: 'intermediate',
        muscleGroups: ['back', 'biceps'],
        equipment: 'dumbbell',
        description: 'Single-arm rowing movement. Support on bench, pull dumbbell to hip. Allows greater range than barbell.',
        videoUrl: 'https://youtube.com/watch?v=roCP6wCXPqo'
    },
    {
        name: 'dumbbell bench press',
        category: 'strength',
        difficulty: 'intermediate',
        muscleGroups: ['chest', 'triceps', 'shoulders'],
        equipment: 'dumbbell',
        description: 'Press dumbbells from chest. Greater range of motion than barbell, more stabilizer activation.',
        videoUrl: 'https://youtube.com/watch?v=VmB1G1K7v94'
    },
    {
        name: 'dumbbell shoulder press',
        category: 'strength',
        difficulty: 'intermediate',
        muscleGroups: ['shoulders', 'triceps'],
        equipment: 'dumbbell',
        description: 'Seated or standing, press dumbbells overhead. Allows natural shoulder movement pattern.',
        videoUrl: 'https://youtube.com/watch?v=qEwKCR5JCog'
    },
    {
        name: 'goblet squat',
        category: 'strength',
        difficulty: 'beginner',
        muscleGroups: ['legs', 'glutes', 'core'],
        equipment: 'dumbbell',
        description: 'Hold single dumbbell at chest, squat. Excellent for learning squat pattern and building legs.',
        videoUrl: 'https://youtube.com/watch?v=MeIiIdhvXT4'
    },
    {
        name: 'dumbbell lunge',
        category: 'strength',
        difficulty: 'intermediate',
        muscleGroups: ['legs', 'glutes'],
        equipment: 'dumbbell',
        description: 'Step forward into lunge holding dumbbells. Great for single-leg strength and balance.',
        videoUrl: 'https://youtube.com/watch?v=D7KaRcUTQeE'
    },
    {
        name: 'dumbbell fly',
        category: 'strength',
        difficulty: 'intermediate',
        muscleGroups: ['chest'],
        equipment: 'dumbbell',
        description: 'Lying on bench, arc dumbbells down and up with slight bend in elbows. Excellent chest isolation.',
        videoUrl: 'https://youtube.com/watch?v=eozdVDA78K0'
    },
    {
        name: 'lateral raise',
        category: 'strength',
        difficulty: 'beginner',
        muscleGroups: ['shoulders'],
        equipment: 'dumbbell',
        description: 'Raise dumbbells to sides until parallel with ground. Builds shoulder width and definition.',
        videoUrl: 'https://youtube.com/watch?v=3VcKaXpzqRo'
    },
    {
        name: 'bicep curl',
        category: 'strength',
        difficulty: 'beginner',
        muscleGroups: ['biceps'],
        equipment: 'dumbbell',
        description: 'Curl dumbbells from extended to flexed arm. Classic bicep builder with many variations.',
        videoUrl: 'https://youtube.com/watch?v=ykJmrZ5v0Oo'
    },
    {
        name: 'tricep extension',
        category: 'strength',
        difficulty: 'beginner',
        muscleGroups: ['triceps'],
        equipment: 'dumbbell',
        description: 'Overhead or lying, extend arm from bent to straight. Excellent tricep isolation.',
        videoUrl: 'https://youtube.com/watch?v=YbX7Wd8jQ-Q'
    },

    // KETTLEBELL EXERCISES
    {
        name: 'kettlebell swing',
        category: 'strength',
        difficulty: 'intermediate',
        muscleGroups: ['glutes', 'back', 'core'],
        equipment: 'kettlebell',
        description: 'Explosive hip hinge. Swing kettlebell from between legs to chest height using hip power. Builds power and conditioning.',
        videoUrl: 'https://youtube.com/watch?v=YSxHifyI6s8'
    },
    {
        name: 'turkish get-up',
        category: 'strength',
        difficulty: 'advanced',
        muscleGroups: ['shoulders', 'core', 'legs'],
        equipment: 'kettlebell',
        description: 'Complex movement from lying to standing with weight overhead. Total body strength and stability.',
        videoUrl: 'https://youtube.com/watch?v=0bWRPC49-KI'
    },
    {
        name: 'kettlebell snatch',
        category: 'strength',
        difficulty: 'advanced',
        muscleGroups: ['shoulders', 'back', 'legs'],
        equipment: 'kettlebell',
        description: 'Explosive movement from ground to overhead in one motion. Builds power and conditioning.',
        videoUrl: 'https://youtube.com/watch?v=_J8eT-1TDzI'
    },
    {
        name: 'kettlebell clean',
        category: 'strength',
        difficulty: 'intermediate',
        muscleGroups: ['shoulders', 'back', 'legs'],
        equipment: 'kettlebell',
        description: 'Pull kettlebell from ground to rack position. Technical movement building power.',
        videoUrl: 'https://youtube.com/watch?v=NjZ2ju3RBX0'
    },

    // CARDIO EXERCISES
    {
        name: 'running',
        category: 'cardio',
        difficulty: 'beginner',
        muscleGroups: ['legs', 'core'],
        equipment: 'bodyweight',
        description: 'Classic cardiovascular exercise. Start with manageable pace and distance, progress gradually. Build aerobic base.',
        videoUrl: 'https://youtube.com/watch?v=oo1Oyk8qIGs'
    },
    {
        name: 'cycling',
        category: 'cardio',
        difficulty: 'beginner',
        muscleGroups: ['legs'],
        equipment: 'machine',
        description: 'Low-impact cardiovascular exercise. Excellent for aerobic fitness without joint stress. Can be done outdoors or on stationary bike.',
        videoUrl: 'https://youtube.com/watch?v=e0BvSe4cjdI'
    },
    {
        name: 'rowing',
        category: 'cardio',
        difficulty: 'intermediate',
        muscleGroups: ['back', 'legs', 'core'],
        equipment: 'machine',
        description: 'Full-body cardio. Drive with legs, finish with back pull. Excellent for conditioning and back development.',
        videoUrl: 'https://youtube.com/watch?v=zQ82RYIFLN8'
    },
    {
        name: 'jump rope',
        category: 'cardio',
        difficulty: 'intermediate',
        muscleGroups: ['legs', 'shoulders', 'calves'],
        equipment: 'bands',
        description: 'High-intensity cardio with coordination component. Great for warming up or standalone conditioning work.',
        videoUrl: 'https://youtube.com/watch?v=FJmRQ5iTXKE'
    },
    {
        name: 'battle ropes',
        category: 'cardio',
        difficulty: 'intermediate',
        muscleGroups: ['shoulders', 'core'],
        equipment: 'cables',
        description: 'Wave heavy ropes for intervals. Intense shoulder and core conditioning with cardio component.',
        videoUrl: 'https://youtube.com/watch?v=wFhQ-JEsT1I'
    },
    {
        name: 'box jump',
        category: 'strength',
        difficulty: 'intermediate',
        muscleGroups: ['legs', 'glutes'],
        equipment: 'bodyweight',
        description: 'Jump onto elevated platform. Builds explosive power and leg strength. Start low, progress height.',
        videoUrl: 'https://youtube.com/watch?v=52r_Ul5k03g'
    },

    // FLEXIBILITY & MOBILITY
    {
        name: 'hamstring stretch',
        category: 'flexibility',
        difficulty: 'beginner',
        muscleGroups: ['legs'],
        equipment: 'bodyweight',
        description: 'Seated or standing, reach toward toes. Hold 30+ seconds. Essential for posterior chain flexibility.',
        videoUrl: 'https://youtube.com/watch?v=CYthPYq-PRI'
    },
    {
        name: 'pigeon pose',
        category: 'flexibility',
        difficulty: 'beginner',
        muscleGroups: ['glutes', 'legs'],
        equipment: 'bodyweight',
        description: 'Hip flexor and glute stretch. Front leg bent, back leg extended. Hold and breathe into stretch.',
        videoUrl: 'https://youtube.com/watch?v=0_zPqA65Nok'
    },
    {
        name: 'cat-cow stretch',
        category: 'mobility',
        difficulty: 'beginner',
        muscleGroups: ['core', 'back'],
        equipment: 'bodyweight',
        description: 'Spinal mobility drill. Alternate between arched and rounded back positions. Great for back health.',
        videoUrl: 'https://youtube.com/watch?v=kqnua4rHVVA'
    },
    {
        name: 'shoulder dislocations',
        category: 'mobility',
        difficulty: 'beginner',
        muscleGroups: ['shoulders'],
        equipment: 'bands',
        description: 'Hold band wide, rotate overhead to back. Improves shoulder mobility and health. Use PVC or band.',
        videoUrl: 'https://youtube.com/watch?v=33P5AI27eiU'
    },
    {
        name: 'world\\'s greatest stretch',
        category: 'mobility',
        difficulty: 'intermediate',
        muscleGroups: ['legs', 'core'],
        equipment: 'bodyweight',
        description: 'Dynamic stretch combining lunge, rotation, and thoracic extension. Excellent warm-up movement.',
        videoUrl: 'https://youtube.com/watch?v=0GSe0YMe4Fc'
    },

    // MACHINE EXERCISES
    {
        name: 'leg press',
        category: 'strength',
        difficulty: 'beginner',
        muscleGroups: ['legs', 'glutes'],
        equipment: 'machine',
        description: 'Seated leg press machine. Drive weight up with legs. Good for leg strength with reduced back loading.',
        videoUrl: 'https://youtube.com/watch?v=IZxyjW7MPJQ'
    },
    {
        name: 'lat pulldown',
        category: 'strength',
        difficulty: 'beginner',
        muscleGroups: ['back', 'biceps'],
        equipment: 'machine',
        description: 'Seated cable pulldown. Pull bar to upper chest. Great for building pulling strength and back width.',
        videoUrl: 'https://youtube.com/watch?v=CAwf7n6Luuc'
    },
    {
        name: 'cable row',
        category: 'strength',
        difficulty: 'beginner',
        muscleGroups: ['back', 'biceps'],
        equipment: 'cables',
        description: 'Seated cable row. Pull handle to torso. Excellent for back thickness and rowing strength.',
        videoUrl: 'https://youtube.com/watch?v=GZbfZ033f74'
    },
    {
        name: 'leg curl',
        category: 'strength',
        difficulty: 'beginner',
        muscleGroups: ['legs'],
        equipment: 'machine',
        description: 'Lying or seated, curl weight toward glutes. Isolates hamstrings for strength and development.',
        videoUrl: 'https://youtube.com/watch?v=ELOCsoDSmrg'
    },
    {
        name: 'leg extension',
        category: 'strength',
        difficulty: 'beginner',
        muscleGroups: ['legs'],
        equipment: 'machine',
        description: 'Seated, extend legs against resistance. Quad isolation exercise. Use controlled tempo.',
        videoUrl: 'https://youtube.com/watch?v=YyvSfEjZIeo'
    },
    {
        name: 'cable fly',
        category: 'strength',
        difficulty: 'intermediate',
        muscleGroups: ['chest'],
        equipment: 'cables',
        description: 'Cable crossover movement. Brings hands together in front of chest. Excellent chest isolation with constant tension.',
        videoUrl: 'https://youtube.com/watch?v=taI4XduLpTk'
    },
    {
        name: 'face pull',
        category: 'strength',
        difficulty: 'beginner',
        muscleGroups: ['shoulders', 'back'],
        equipment: 'cables',
        description: 'Pull rope attachment to face, external rotation at end. Crucial for shoulder health and posture.',
        videoUrl: 'https://youtube.com/watch?v=rep-qVOkqgk'
    }
];
