"use server";

import Anthropic from "@anthropic-ai/sdk";
import type { WorkoutDay } from "@/lib/workout-generator";

interface FormData {
  level: string;
  goal: string;
  daysPerWeek: number;
  equipment: string[];
}

const levelDescriptions: Record<string, string> = {
  beginner: "Beginner (V0-V2) - new to climbing, still developing basic techniques",
  intermediate: "Intermediate (V3-V5) - can climb consistently at this level, ready for structured training",
  advanced: "Advanced (V6-V8) - strong climber looking to push into harder grades",
  expert: "Expert (V9+) - elite climber focused on peak performance",
};

const goalDescriptions: Record<string, string> = {
  "finger-strength": "Finger Strength - developing stronger grip and finger tendons for smaller holds",
  power: "Power/Explosiveness - improving dynamic movement and explosive pulling strength",
  endurance: "Endurance - building stamina for longer routes and sustained climbing",
  technique: "Technique - refining movement efficiency, footwork, and body positioning",
};

const equipmentDescriptions: Record<string, string> = {
  hangboard: "Hangboard (fingerboard for grip training)",
  weights: "Weights/Dumbbells",
  "campus-board": "Campus Board (for explosive training)",
  "resistance-bands": "Resistance Bands",
  "gym-access": "Climbing Gym Access (bouldering/lead walls)",
};

export async function generateAIWorkoutPlan(formData: FormData): Promise<{
  success: boolean;
  plan?: WorkoutDay[];
  error?: string;
}> {
  try {
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const equipmentList = formData.equipment
      .map((e) => equipmentDescriptions[e] || e)
      .join(", ");

    const prompt = `You are an expert climbing coach creating a personalized weekly workout plan. Generate a detailed 7-day training plan based on these inputs:

CLIMBER PROFILE:
- Level: ${levelDescriptions[formData.level] || formData.level}
- Primary Goal: ${goalDescriptions[formData.goal] || formData.goal}
- Training Days Per Week: ${formData.daysPerWeek}
- Available Equipment: ${equipmentList || "No specific equipment"}

REQUIREMENTS:
1. Create exactly 7 days (Monday through Sunday)
2. Include exactly ${formData.daysPerWeek} training days and ${7 - formData.daysPerWeek} rest/recovery days
3. Distribute training and rest days appropriately (avoid consecutive hard days)
4. Each training day should have 3-4 exercises
5. Each rest day should have 2-3 mobility/recovery activities
6. Only use exercises that match the available equipment
7. Scale intensity appropriately for the climber's level
8. Focus exercises on the stated primary goal

For each exercise, provide:
- name: Exercise name (be specific)
- sets: Number of sets (integer)
- reps: Rep scheme as a string (e.g., "10 reps", "7s hang / 3s rest", "20 min continuous")
- rest: Rest period as a string (e.g., "3 min between sets", "90s", "As needed")
- tip: One practical coaching tip (max 15 words)

Respond ONLY with a valid JSON array. No markdown, no explanation, just the JSON array.

Example format:
[
  {
    "day": "Monday",
    "type": "training",
    "name": "Finger Strength Focus",
    "exercises": [
      {
        "name": "Hangboard Repeaters",
        "sets": 6,
        "reps": "7s hang / 3s rest",
        "rest": "3 min between sets",
        "tip": "Focus on open-hand grip to build tendon strength"
      }
    ]
  },
  {
    "day": "Tuesday",
    "type": "rest",
    "name": "Active Recovery",
    "exercises": [
      {
        "name": "Hip Flexor Stretches",
        "sets": 2,
        "reps": "45s each side",
        "rest": "15s between sides",
        "tip": "Keep core engaged throughout"
      }
    ]
  }
]`;

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4096,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    // Extract the text content from the response
    const textBlock = message.content.find((block) => block.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      throw new Error("No text content in response");
    }

    // Parse the JSON response
    const responseText = textBlock.text.trim();
    
    // Try to extract JSON if it's wrapped in markdown code blocks
    let jsonString = responseText;
    const jsonMatch = responseText.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) {
      jsonString = jsonMatch[1].trim();
    }

    const plan: WorkoutDay[] = JSON.parse(jsonString);

    // Validate the response structure
    if (!Array.isArray(plan) || plan.length !== 7) {
      throw new Error("Invalid plan structure: expected 7 days");
    }

    for (const day of plan) {
      if (!day.day || !day.type || !day.name || !Array.isArray(day.exercises)) {
        throw new Error("Invalid day structure in plan");
      }
    }

    return { success: true, plan };
  } catch (error) {
    console.error("Error generating workout plan:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to generate workout plan",
    };
  }
}
