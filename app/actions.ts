"use server";

import type { WorkoutDay } from "@/lib/workout-generator";

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

// Plan 1: Beginner focused on Finger Strength
const beginnerFingerStrengthPlan: WorkoutDay[] = [
  {
    day: "Monday",
    type: "training",
    name: "Intro Finger Session",
    exercises: [
      {
        name: "Large Hold Hangs",
        sets: 3,
        reps: "10s hang",
        rest: "2 min between sets",
        tip: "Use a jug or large edge to build base strength",
      },
      {
        name: "Bodyweight Dead Hangs",
        sets: 3,
        reps: "5s hang",
        rest: "2 min between sets",
        tip: "Focus on engaging your shoulders, not just gripping",
      },
      {
        name: "Easy Bouldering (Jug Hauls)",
        sets: 5,
        reps: "1 problem each",
        rest: "3 min between problems",
        tip: "Choose problems with large holds to build confidence",
      },
    ],
  },
  {
    day: "Tuesday",
    type: "rest",
    name: "Active Recovery",
    exercises: [
      {
        name: "Wrist Circles & Stretches",
        sets: 2,
        reps: "20 each direction",
        rest: "30s",
        tip: "Critical for injury prevention at all levels",
      },
      {
        name: "Light Walking",
        sets: 1,
        reps: "20 min",
        rest: "N/A",
        tip: "Get blood flowing without taxing your system",
      },
    ],
  },
  {
    day: "Wednesday",
    type: "training",
    name: "Technique & Grip Basics",
    exercises: [
      {
        name: "Silent Feet Drill",
        sets: 4,
        reps: "1 easy problem each",
        rest: "2 min between problems",
        tip: "Place feet precisely without making noise",
      },
      {
        name: "Open Hand Hangs",
        sets: 3,
        reps: "8s hang",
        rest: "2 min between sets",
        tip: "Open hand grip is safest for beginners",
      },
      {
        name: "Antagonist Push-ups",
        sets: 2,
        reps: "10 reps",
        rest: "60s between sets",
        tip: "Balance pulling with pushing for shoulder health",
      },
    ],
  },
  {
    day: "Thursday",
    type: "rest",
    name: "Mobility Focus",
    exercises: [
      {
        name: "Hip Flexor Stretches",
        sets: 2,
        reps: "45s each side",
        rest: "15s",
        tip: "Essential for improving high steps",
      },
      {
        name: "Shoulder Mobility Circles",
        sets: 2,
        reps: "10 each direction",
        rest: "30s",
        tip: "Slow and controlled movements",
      },
      {
        name: "Foam Rolling Forearms",
        sets: 1,
        reps: "5 min total",
        rest: "N/A",
        tip: "Roll slowly over any tight spots",
      },
    ],
  },
  {
    day: "Friday",
    type: "training",
    name: "Grip Endurance Intro",
    exercises: [
      {
        name: "Easy Traversing",
        sets: 3,
        reps: "2 min continuous",
        rest: "3 min between sets",
        tip: "Stay on the wall, use rests when needed",
      },
      {
        name: "Repeat Hangs",
        sets: 4,
        reps: "5s on / 5s off x 4",
        rest: "2 min between sets",
        tip: "Use large holds, focus on consistency",
      },
    ],
  },
  {
    day: "Saturday",
    type: "rest",
    name: "Full Rest Day",
    exercises: [
      {
        name: "Yoga or Light Stretching",
        sets: 1,
        reps: "20 min",
        rest: "N/A",
        tip: "Focus on hip openers and shoulders",
      },
      {
        name: "Light Walking or Cycling",
        sets: 1,
        reps: "20-30 min",
        rest: "N/A",
        tip: "Keep it easy, just move your body",
      },
    ],
  },
  {
    day: "Sunday",
    type: "rest",
    name: "Recovery & Stretch",
    exercises: [
      {
        name: "Full Body Stretch Routine",
        sets: 1,
        reps: "15 min",
        rest: "N/A",
        tip: "Hold each stretch 30-45 seconds",
      },
      {
        name: "Band Finger Extensions",
        sets: 2,
        reps: "15 reps",
        rest: "60s",
        tip: "Balances flexor work, prevents imbalances",
      },
    ],
  },
];

// Plan 2: Intermediate focused on Power/Explosiveness
const intermediatePowerPlan: WorkoutDay[] = [
  {
    day: "Monday",
    type: "training",
    name: "Power Development",
    exercises: [
      {
        name: "Limit Bouldering",
        sets: 6,
        reps: "3-5 moves each",
        rest: "4 min between attempts",
        tip: "Work problems 1-2 grades above your flash level",
      },
      {
        name: "Explosive Pull-ups",
        sets: 4,
        reps: "5 reps",
        rest: "2 min between sets",
        tip: "Pull as fast as possible, touch chest to bar",
      },
      {
        name: "Campus Touches (Feet On)",
        sets: 4,
        reps: "6 touches",
        rest: "3 min between sets",
        tip: "Build coordination before removing feet",
      },
    ],
  },
  {
    day: "Tuesday",
    type: "rest",
    name: "Active Recovery",
    exercises: [
      {
        name: "Foam Rolling",
        sets: 1,
        reps: "15 min total",
        rest: "N/A",
        tip: "Focus on lats, forearms, and hip flexors",
      },
      {
        name: "Light Antagonist Work",
        sets: 2,
        reps: "15 reps each",
        rest: "60s",
        tip: "Push-ups and reverse wrist curls",
      },
    ],
  },
  {
    day: "Wednesday",
    type: "training",
    name: "Dynamic Movement",
    exercises: [
      {
        name: "Dyno Practice",
        sets: 8,
        reps: "3 attempts each",
        rest: "3 min between dynos",
        tip: "Focus on timing and coordination over distance",
      },
      {
        name: "Box Jumps",
        sets: 4,
        reps: "6 reps",
        rest: "2 min between sets",
        tip: "Land softly, full hip extension at top",
      },
      {
        name: "Weighted Pull-ups",
        sets: 4,
        reps: "5 reps",
        rest: "3 min between sets",
        tip: "Start with 10-15% bodyweight added",
      },
    ],
  },
  {
    day: "Thursday",
    type: "rest",
    name: "Mobility Focus",
    exercises: [
      {
        name: "Hip Opener Sequence",
        sets: 1,
        reps: "10 min",
        rest: "N/A",
        tip: "Frog pose, pigeon, and 90/90 stretches",
      },
      {
        name: "Shoulder Mobility",
        sets: 2,
        reps: "10 each direction",
        rest: "30s",
        tip: "Wall slides and band pull-aparts",
      },
      {
        name: "Wrist Stretches",
        sets: 2,
        reps: "30s each position",
        rest: "15s",
        tip: "Essential after power days",
      },
    ],
  },
  {
    day: "Friday",
    type: "training",
    name: "Contact Strength",
    exercises: [
      {
        name: "Campus Ladders (Feet On)",
        sets: 5,
        reps: "1-2-3-4 pattern",
        rest: "3 min between sets",
        tip: "Focus on quick, accurate catches",
      },
      {
        name: "One-Move Wonder Problems",
        sets: 8,
        reps: "1 hard move each",
        rest: "3 min between moves",
        tip: "Isolate single powerful moves at your limit",
      },
      {
        name: "Hangboard Pulls",
        sets: 4,
        reps: "3 quick pulls",
        rest: "3 min between sets",
        tip: "Fast catch and release on medium edges",
      },
    ],
  },
  {
    day: "Saturday",
    type: "training",
    name: "Power Endurance Mix",
    exercises: [
      {
        name: "Boulder Circuits",
        sets: 3,
        reps: "4 problems back-to-back",
        rest: "5 min between sets",
        tip: "Choose dynamic problems 2 grades below max",
      },
      {
        name: "Medicine Ball Slams",
        sets: 3,
        reps: "10 reps",
        rest: "90s between sets",
        tip: "Full body explosive power transfer",
      },
    ],
  },
  {
    day: "Sunday",
    type: "rest",
    name: "Full Rest Day",
    exercises: [
      {
        name: "Yoga or Light Stretching",
        sets: 1,
        reps: "30 min",
        rest: "N/A",
        tip: "Focus on recovery, not intensity",
      },
      {
        name: "Light Walking",
        sets: 1,
        reps: "20-30 min",
        rest: "N/A",
        tip: "Fresh air and easy movement",
      },
    ],
  },
];

// Plan 3: Advanced focused on Endurance
const advancedEndurancePlan: WorkoutDay[] = [
  {
    day: "Monday",
    type: "training",
    name: "Capacity Building",
    exercises: [
      {
        name: "4x4s",
        sets: 4,
        reps: "4 problems back-to-back",
        rest: "4 min between sets",
        tip: "Choose problems at V4-V5 (3-4 grades below max)",
      },
      {
        name: "Hangboard Repeaters",
        sets: 6,
        reps: "7s on / 3s off x 6",
        rest: "3 min between sets",
        tip: "Use medium edges, focus on consistency",
      },
      {
        name: "Core Circuit",
        sets: 3,
        reps: "30s each exercise",
        rest: "60s between rounds",
        tip: "Hollow holds, side planks, leg raises",
      },
    ],
  },
  {
    day: "Tuesday",
    type: "rest",
    name: "Active Recovery",
    exercises: [
      {
        name: "Easy Traversing",
        sets: 2,
        reps: "10 min continuous",
        rest: "5 min between sets",
        tip: "Very easy terrain, blood flow only",
      },
      {
        name: "Foam Rolling",
        sets: 1,
        reps: "15 min",
        rest: "N/A",
        tip: "Target forearms, lats, and hip flexors",
      },
    ],
  },
  {
    day: "Wednesday",
    type: "training",
    name: "Volume Session",
    exercises: [
      {
        name: "Pyramid Sets",
        sets: 1,
        reps: "V2-V3-V4-V5-V4-V3-V2",
        rest: "2 min between problems",
        tip: "Complete the full pyramid without falling",
      },
      {
        name: "Continuous Climbing",
        sets: 3,
        reps: "15 min on wall",
        rest: "5 min between sets",
        tip: "Stay on easy terrain, don't pump out",
      },
      {
        name: "Lightweight Row Intervals",
        sets: 3,
        reps: "20 reps",
        rest: "60s between sets",
        tip: "Focus on muscle endurance, not strength",
      },
    ],
  },
  {
    day: "Thursday",
    type: "rest",
    name: "Mobility Focus",
    exercises: [
      {
        name: "Yoga Flow",
        sets: 1,
        reps: "30 min",
        rest: "N/A",
        tip: "Sun salutations and hip openers",
      },
      {
        name: "Band Shoulder Work",
        sets: 3,
        reps: "15 reps each",
        rest: "30s",
        tip: "Face pulls and external rotations",
      },
    ],
  },
  {
    day: "Friday",
    type: "training",
    name: "Threshold Training",
    exercises: [
      {
        name: "Long Boulder Links",
        sets: 4,
        reps: "2 problems linked",
        rest: "4 min between links",
        tip: "Link problems at your onsight level",
      },
      {
        name: "Hangboard Intervals",
        sets: 5,
        reps: "20s on / 10s off x 5",
        rest: "3 min between sets",
        tip: "Maintain grip quality throughout",
      },
      {
        name: "Campus Endurance",
        sets: 4,
        reps: "Up-down ladder x 3",
        rest: "3 min between sets",
        tip: "Focus on rhythm and breathing",
      },
    ],
  },
  {
    day: "Saturday",
    type: "training",
    name: "ARC Session",
    exercises: [
      {
        name: "ARC Training",
        sets: 2,
        reps: "25 min continuous",
        rest: "10 min between sets",
        tip: "Stay at 40-50% effort, never get pumped",
      },
      {
        name: "Easy Bouldering",
        sets: 6,
        reps: "1 problem each",
        rest: "2 min between problems",
        tip: "Focus on perfect technique, not difficulty",
      },
    ],
  },
  {
    day: "Sunday",
    type: "rest",
    name: "Full Rest Day",
    exercises: [
      {
        name: "Light Walking or Cycling",
        sets: 1,
        reps: "30-45 min",
        rest: "N/A",
        tip: "Keep heart rate low, enjoy being outside",
      },
      {
        name: "Full Body Stretch",
        sets: 1,
        reps: "20 min",
        rest: "N/A",
        tip: "Hold each position for 60 seconds",
      },
    ],
  },
];

// Plan 4: Expert focused on Technique
const expertTechniquePlan: WorkoutDay[] = [
  {
    day: "Monday",
    type: "training",
    name: "Movement Mastery",
    exercises: [
      {
        name: "Hover Hands Drill",
        sets: 6,
        reps: "1 limit problem each",
        rest: "4 min between problems",
        tip: "Pause and hover hand over hold before grabbing",
      },
      {
        name: "3 Beta Variations",
        sets: 4,
        reps: "Same problem 3 ways",
        rest: "3 min between attempts",
        tip: "Find three different ways to do each move",
      },
      {
        name: "Footwork Precision",
        sets: 5,
        reps: "1 problem each",
        rest: "3 min between problems",
        tip: "Use only the tip of your shoe on every hold",
      },
    ],
  },
  {
    day: "Tuesday",
    type: "training",
    name: "Finger Maintenance",
    exercises: [
      {
        name: "Max Hangs",
        sets: 5,
        reps: "10s hang",
        rest: "3 min between sets",
        tip: "Use challenging edge, add weight if needed",
      },
      {
        name: "One-Arm Lock-offs",
        sets: 4,
        reps: "5s each arm",
        rest: "3 min between sets",
        tip: "Assisted with pulley or band",
      },
      {
        name: "Finger Rolls",
        sets: 3,
        reps: "10 reps",
        rest: "90s between sets",
        tip: "Controlled eccentric for tendon health",
      },
    ],
  },
  {
    day: "Wednesday",
    type: "rest",
    name: "Active Recovery",
    exercises: [
      {
        name: "Movement Visualization",
        sets: 1,
        reps: "15 min",
        rest: "N/A",
        tip: "Mentally rehearse project sequences",
      },
      {
        name: "Antagonist Circuit",
        sets: 3,
        reps: "12 reps each",
        rest: "60s between exercises",
        tip: "Push-ups, reverse wrist curls, face pulls",
      },
      {
        name: "Hip Mobility",
        sets: 1,
        reps: "15 min",
        rest: "N/A",
        tip: "Focus on turnout and high step positions",
      },
    ],
  },
  {
    day: "Thursday",
    type: "training",
    name: "Precision Practice",
    exercises: [
      {
        name: "Silent Feet on Limit Problems",
        sets: 5,
        reps: "1 problem each",
        rest: "4 min between problems",
        tip: "Apply precision to hard movement",
      },
      {
        name: "Glue Hands Drill",
        sets: 4,
        reps: "1 problem each",
        rest: "3 min between problems",
        tip: "No readjusting once you grab any hold",
      },
      {
        name: "Slow Motion Climbing",
        sets: 3,
        reps: "1 problem each",
        rest: "3 min between problems",
        tip: "Take 3x normal time on each move",
      },
    ],
  },
  {
    day: "Friday",
    type: "rest",
    name: "Mobility Focus",
    exercises: [
      {
        name: "Advanced Hip Opener Sequence",
        sets: 1,
        reps: "20 min",
        rest: "N/A",
        tip: "Work on splits and frog pose progressions",
      },
      {
        name: "Shoulder Stability",
        sets: 3,
        reps: "10 reps each",
        rest: "60s",
        tip: "Turkish get-ups and windmills",
      },
      {
        name: "Breathing Practice",
        sets: 1,
        reps: "10 min",
        rest: "N/A",
        tip: "Box breathing for performance anxiety",
      },
    ],
  },
  {
    day: "Saturday",
    type: "training",
    name: "Project Session",
    exercises: [
      {
        name: "Project Attempts",
        sets: 8,
        reps: "Quality attempts",
        rest: "5 min between attempts",
        tip: "Apply technique drills to your hardest project",
      },
      {
        name: "Video Analysis Climbing",
        sets: 3,
        reps: "1 problem each",
        rest: "5 min (review footage)",
        tip: "Film yourself and analyze movement patterns",
      },
      {
        name: "Core Tension Drills",
        sets: 3,
        reps: "30s hold",
        rest: "90s between sets",
        tip: "Front lever progressions and L-sits",
      },
    ],
  },
  {
    day: "Sunday",
    type: "rest",
    name: "Full Rest Day",
    exercises: [
      {
        name: "Yoga or Meditation",
        sets: 1,
        reps: "30-45 min",
        rest: "N/A",
        tip: "Mental recovery is as important as physical",
      },
      {
        name: "Light Walking",
        sets: 1,
        reps: "30 min",
        rest: "N/A",
        tip: "Get outside, clear your mind",
      },
    ],
  },
];

function selectBestPlan(level: string, goal: string): WorkoutDay[] {
  // Exact matches first
  if (level === "beginner" && goal === "finger-strength") {
    return beginnerFingerStrengthPlan;
  }
  if (level === "intermediate" && goal === "power") {
    return intermediatePowerPlan;
  }
  if (level === "advanced" && goal === "endurance") {
    return advancedEndurancePlan;
  }
  if (level === "expert" && goal === "technique") {
    return expertTechniquePlan;
  }

  // Fallback: select based on level
  switch (level) {
    case "beginner":
      return beginnerFingerStrengthPlan;
    case "intermediate":
      return intermediatePowerPlan;
    case "advanced":
      return advancedEndurancePlan;
    case "expert":
      return expertTechniquePlan;
    default:
      return beginnerFingerStrengthPlan;
  }
}

function adjustPlanForDays(plan: WorkoutDay[], daysPerWeek: number): WorkoutDay[] {
  // Count current training days
  const trainingDays = plan.filter((d) => d.type === "training").length;
  
  if (trainingDays === daysPerWeek) {
    return plan;
  }

  // Create a copy to modify
  const adjustedPlan = plan.map((day) => ({ ...day }));

  if (daysPerWeek < trainingDays) {
    // Need to convert some training days to rest days
    let toConvert = trainingDays - daysPerWeek;
    // Convert from the end of the week first (Saturday, then Friday, etc.)
    for (let i = adjustedPlan.length - 1; i >= 0 && toConvert > 0; i--) {
      if (adjustedPlan[i].type === "training") {
        adjustedPlan[i] = {
          day: adjustedPlan[i].day,
          type: "rest",
          name: "Active Recovery",
          exercises: [
            {
              name: "Light Stretching",
              sets: 1,
              reps: "15 min",
              rest: "N/A",
              tip: "Focus on areas that feel tight",
            },
            {
              name: "Foam Rolling",
              sets: 1,
              reps: "10 min",
              rest: "N/A",
              tip: "Target forearms and upper back",
            },
          ],
        };
        toConvert--;
      }
    }
  } else if (daysPerWeek > trainingDays) {
    // Need to convert some rest days to training days
    let toConvert = daysPerWeek - trainingDays;
    // Convert rest days to light training days
    for (let i = 0; i < adjustedPlan.length && toConvert > 0; i++) {
      if (adjustedPlan[i].type === "rest") {
        adjustedPlan[i] = {
          day: adjustedPlan[i].day,
          type: "training",
          name: "Light Training",
          exercises: [
            {
              name: "Easy Bouldering",
              sets: 6,
              reps: "1 problem each",
              rest: "2 min between problems",
              tip: "Stay 2-3 grades below your max",
            },
            {
              name: "Technique Drills",
              sets: 4,
              reps: "1 problem each",
              rest: "2 min between problems",
              tip: "Focus on precision and control",
            },
            {
              name: "Antagonist Exercises",
              sets: 2,
              reps: "12 reps",
              rest: "60s between sets",
              tip: "Push-ups and reverse wrist curls",
            },
          ],
        };
        toConvert--;
      }
    }
  }

  return adjustedPlan;
}

export async function generateAIWorkoutPlan(formData: FormData): Promise<{
  success: boolean;
  plan?: WorkoutDay[];
  error?: string;
}> {
  try {
    // Select the best matching plan based on level and goal
    const basePlan = selectBestPlan(formData.level, formData.goal);
    
    // Adjust the plan to match the requested days per week
    const adjustedPlan = adjustPlanForDays(basePlan, formData.daysPerWeek);

    // Simulate a small delay for UX
    await new Promise((resolve) => setTimeout(resolve, 500));

    return { success: true, plan: adjustedPlan };
  } catch (error) {
    console.error("Error generating workout plan:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to generate workout plan",
    };
  }
}
