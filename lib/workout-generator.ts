export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rest: string;
  tip: string;
}

export interface WorkoutDay {
  day: string;
  type: "training" | "rest";
  name: string;
  exercises: Exercise[];
}

interface FormData {
  level: string;
  goal: string;
  daysPerWeek: number;
  equipment: string[];
}

const dayNames = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const fingerStrengthExercises: Record<string, Exercise[]> = {
  hangboard: [
    {
      name: "Hangboard Repeaters",
      sets: 6,
      reps: "7s hang / 3s rest",
      rest: "3 min between sets",
      tip: "Focus on open-hand grip to build tendon strength",
    },
    {
      name: "Max Hangs (Half Crimp)",
      sets: 3,
      reps: "10s hang",
      rest: "3 min between sets",
      tip: "Start bodyweight, add load progressively",
    },
    {
      name: "One-Arm Hangs (Assisted)",
      sets: 3,
      reps: "5s each hand",
      rest: "2 min between hands",
      tip: "Use pulley system or resistance band for assistance",
    },
  ],
  weights: [
    {
      name: "Finger Curls with Dumbbells",
      sets: 3,
      reps: "15 reps",
      rest: "90s between sets",
      tip: "Control the eccentric phase for tendon health",
    },
    {
      name: "Wrist Rollers",
      sets: 3,
      reps: "3 rolls up/down",
      rest: "2 min between sets",
      tip: "Keep arms extended for maximum effect",
    },
  ],
  "resistance-bands": [
    {
      name: "Band Finger Extensions",
      sets: 3,
      reps: "20 reps",
      rest: "60s between sets",
      tip: "Important for antagonist muscle balance",
    },
  ],
  "gym-access": [
    {
      name: "Boulder Problems (Crimpy)",
      sets: 8,
      reps: "1-2 attempts each",
      rest: "3 min between problems",
      tip: "Focus on problems with small holds",
    },
    {
      name: "System Board Training",
      sets: 6,
      reps: "8 moves each",
      rest: "3 min between sets",
      tip: "Work specific grip positions deliberately",
    },
  ],
};

const powerExercises: Record<string, Exercise[]> = {
  "campus-board": [
    {
      name: "Campus Ladders",
      sets: 5,
      reps: "1-3-5 pattern",
      rest: "3 min between sets",
      tip: "Start with feet on until comfortable",
    },
    {
      name: "Campus Bumps",
      sets: 4,
      reps: "1-2-2-3 pattern",
      rest: "3 min between sets",
      tip: "Focus on explosive movement initiation",
    },
    {
      name: "Campus Doubles",
      sets: 4,
      reps: "1-4 x 3",
      rest: "3 min between sets",
      tip: "Both hands move together",
    },
  ],
  weights: [
    {
      name: "Explosive Pull-ups",
      sets: 4,
      reps: "5 reps",
      rest: "2 min between sets",
      tip: "Pull as fast as possible",
    },
    {
      name: "Weighted Pull-ups",
      sets: 4,
      reps: "5 reps",
      rest: "3 min between sets",
      tip: "Add weight progressively",
    },
    {
      name: "Medicine Ball Slams",
      sets: 3,
      reps: "10 reps",
      rest: "90s between sets",
      tip: "Full body explosive power",
    },
  ],
  "gym-access": [
    {
      name: "Limit Bouldering",
      sets: 6,
      reps: "3-5 moves each",
      rest: "4-5 min between attempts",
      tip: "Work at or above your limit grade",
    },
    {
      name: "Dyno Practice",
      sets: 8,
      reps: "2-3 attempts each",
      rest: "3 min between attempts",
      tip: "Focus on coordination and timing",
    },
  ],
  hangboard: [
    {
      name: "Campus-style Pulls",
      sets: 4,
      reps: "3 reps",
      rest: "3 min between sets",
      tip: "Quick catches between large holds",
    },
  ],
  "resistance-bands": [
    {
      name: "Band-assisted Plyo Pull-ups",
      sets: 4,
      reps: "5 reps",
      rest: "2 min between sets",
      tip: "Use band for deloading, still pull explosively",
    },
  ],
};

const enduranceExercises: Record<string, Exercise[]> = {
  "gym-access": [
    {
      name: "4x4s",
      sets: 4,
      reps: "4 problems back-to-back",
      rest: "4 min between sets",
      tip: "Choose problems 3-4 grades below max",
    },
    {
      name: "Continuous Traversing",
      sets: 3,
      reps: "5 min continuous",
      rest: "3 min between sets",
      tip: "Maintain steady breathing throughout",
    },
    {
      name: "Volume Climbing",
      sets: 1,
      reps: "45 min total",
      rest: "As needed",
      tip: "Stay on easy terrain, maximize time on wall",
    },
    {
      name: "ARC Training",
      sets: 2,
      reps: "20 min continuous",
      rest: "10 min between sets",
      tip: "Keep intensity low, focus on blood flow",
    },
  ],
  hangboard: [
    {
      name: "Hangboard Intervals",
      sets: 6,
      reps: "20s on / 10s off",
      rest: "2 min between sets",
      tip: "Use larger holds for endurance focus",
    },
  ],
  "resistance-bands": [
    {
      name: "Band Pull-apart Circuits",
      sets: 3,
      reps: "30 reps",
      rest: "30s between sets",
      tip: "Continuous movement for stamina",
    },
  ],
  weights: [
    {
      name: "Lightweight High Rep Rows",
      sets: 3,
      reps: "20 reps",
      rest: "60s between sets",
      tip: "Focus on muscle endurance",
    },
  ],
};

const techniqueExercises: Record<string, Exercise[]> = {
  "gym-access": [
    {
      name: "Silent Feet Drill",
      sets: 5,
      reps: "1 problem each",
      rest: "2 min between problems",
      tip: "Place feet precisely without sound",
    },
    {
      name: "Hover Hands Drill",
      sets: 4,
      reps: "1 problem each",
      rest: "2 min between problems",
      tip: "Hover hand over hold before grabbing",
    },
    {
      name: "Glue Hands Drill",
      sets: 4,
      reps: "1 problem each",
      rest: "2 min between problems",
      tip: "No readjusting once you grab a hold",
    },
    {
      name: "Elimination Climbing",
      sets: 4,
      reps: "1 problem each",
      rest: "3 min between problems",
      tip: "Remove certain holds to force creative beta",
    },
    {
      name: "Slow Motion Climbing",
      sets: 3,
      reps: "1 problem each",
      rest: "2 min between problems",
      tip: "Move as slowly as possible to build control",
    },
  ],
  hangboard: [
    {
      name: "Dead Hang Focus",
      sets: 4,
      reps: "20s hold",
      rest: "2 min between sets",
      tip: "Focus on body tension and position",
    },
  ],
  "resistance-bands": [
    {
      name: "Hip Opener Stretches",
      sets: 3,
      reps: "30s each side",
      rest: "15s between sides",
      tip: "Critical for high steps and flags",
    },
  ],
  weights: [
    {
      name: "Core Stability Holds",
      sets: 3,
      reps: "30s hold",
      rest: "60s between sets",
      tip: "Hollow body and L-sits for body tension",
    },
  ],
};

const restDayActivities: Exercise[] = [
  {
    name: "Shoulder Mobility Circles",
    sets: 3,
    reps: "10 each direction",
    rest: "30s",
    tip: "Slow and controlled movements",
  },
  {
    name: "Hip Flexor Stretches",
    sets: 2,
    reps: "45s each side",
    rest: "15s",
    tip: "Keep core engaged throughout",
  },
  {
    name: "Foam Rolling",
    sets: 1,
    reps: "10 min total",
    rest: "N/A",
    tip: "Focus on forearms and upper back",
  },
  {
    name: "Wrist Circles & Stretches",
    sets: 2,
    reps: "20 each direction",
    rest: "30s",
    tip: "Critical for injury prevention",
  },
  {
    name: "Light Walking or Cycling",
    sets: 1,
    reps: "20-30 min",
    rest: "N/A",
    tip: "Keep it easy, just move your body",
  },
  {
    name: "Yoga or Light Stretching",
    sets: 1,
    reps: "20-30 min",
    rest: "N/A",
    tip: "Focus on hip openers and shoulders",
  },
  {
    name: "Antagonist Exercises",
    sets: 2,
    reps: "15 reps each",
    rest: "60s",
    tip: "Push-ups and reverse wrist curls",
  },
];

function getExercisesForGoal(goal: string): Record<string, Exercise[]> {
  switch (goal) {
    case "finger-strength":
      return fingerStrengthExercises;
    case "power":
      return powerExercises;
    case "endurance":
      return enduranceExercises;
    case "technique":
      return techniqueExercises;
    default:
      return fingerStrengthExercises;
  }
}

function getWorkoutName(goal: string, dayIndex: number): string {
  const names: Record<string, string[]> = {
    "finger-strength": [
      "Max Strength Session",
      "Finger Power Day",
      "Crimp Training",
      "Grip Intensity",
    ],
    power: [
      "Explosive Power Day",
      "Dynamic Movement",
      "Power Endurance Mix",
      "Contact Strength",
    ],
    endurance: [
      "Pump Training",
      "Stamina Builder",
      "Capacity Day",
      "Aerobic Power",
    ],
    technique: [
      "Movement Mastery",
      "Precision Practice",
      "Flow Session",
      "Skill Development",
    ],
  };
  const goalNames = names[goal] || names["finger-strength"];
  return goalNames[dayIndex % goalNames.length];
}

function selectExercises(
  exercises: Record<string, Exercise[]>,
  equipment: string[],
  count: number
): Exercise[] {
  const available: Exercise[] = [];

  for (const equip of equipment) {
    if (exercises[equip]) {
      available.push(...exercises[equip]);
    }
  }

  // Shuffle and select
  const shuffled = available.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

function selectRestActivities(count: number): Exercise[] {
  const shuffled = [...restDayActivities].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function adjustForLevel(exercises: Exercise[], level: string): Exercise[] {
  return exercises.map((ex) => {
    let sets = ex.sets;
    let reps = ex.reps;

    switch (level) {
      case "beginner":
        sets = Math.max(2, Math.floor(ex.sets * 0.6));
        break;
      case "intermediate":
        sets = Math.floor(ex.sets * 0.8);
        break;
      case "advanced":
        // Keep as is
        break;
      case "expert":
        sets = Math.min(ex.sets + 1, 10);
        break;
    }

    return { ...ex, sets, reps };
  });
}

export function generateWorkoutPlan(formData: FormData): WorkoutDay[] {
  const { level, goal, daysPerWeek, equipment } = formData;
  const exercisePool = getExercisesForGoal(goal);

  const plan: WorkoutDay[] = [];
  const trainingDays = daysPerWeek;
  const restDays = 7 - trainingDays;

  // Distribute training and rest days
  const trainingPattern: boolean[] = [];

  // Create a balanced distribution
  if (trainingDays === 2) {
    trainingPattern.push(true, false, false, true, false, false, false);
  } else if (trainingDays === 3) {
    trainingPattern.push(true, false, true, false, true, false, false);
  } else if (trainingDays === 4) {
    trainingPattern.push(true, false, true, false, true, false, true);
  } else if (trainingDays === 5) {
    trainingPattern.push(true, true, false, true, true, false, true);
  } else if (trainingDays === 6) {
    trainingPattern.push(true, true, true, false, true, true, true);
  }

  let trainingDayIndex = 0;
  let restDayIndex = 0;

  for (let i = 0; i < 7; i++) {
    const isTraining = trainingPattern[i];

    if (isTraining) {
      const exercises = selectExercises(exercisePool, equipment, 3 + Math.floor(Math.random() * 2));
      const adjustedExercises = adjustForLevel(exercises, level);

      plan.push({
        day: dayNames[i],
        type: "training",
        name: getWorkoutName(goal, trainingDayIndex),
        exercises:
          adjustedExercises.length > 0
            ? adjustedExercises
            : [
                {
                  name: "General Climbing",
                  sets: 1,
                  reps: "60 min session",
                  rest: "As needed",
                  tip: "Focus on your goal: " + goal.replace("-", " "),
                },
              ],
      });
      trainingDayIndex++;
    } else {
      const restActivities = selectRestActivities(2 + Math.floor(Math.random() * 2));

      const restNames = [
        "Active Recovery",
        "Mobility Focus",
        "Full Rest Day",
        "Recovery & Stretch",
      ];

      plan.push({
        day: dayNames[i],
        type: "rest",
        name: restNames[restDayIndex % restNames.length],
        exercises: restActivities,
      });
      restDayIndex++;
    }
  }

  return plan;
}
