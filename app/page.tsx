"use client";

import { useState, useTransition } from "react";
import { WorkoutForm } from "@/components/workout-form";
import { WorkoutPlan } from "@/components/workout-plan";
import { type WorkoutDay } from "@/lib/workout-generator";
import { generateAIWorkoutPlan } from "@/app/actions"; // Corrected import
import { MountainIcon, Grip } from "lucide-react";
import { toast } from "sonner";

export interface FormData {
  level: string;
  goal: string;
  daysPerWeek: number;
  equipment: string[];
}

const placeholderPlan: WorkoutDay[] = [
  {
    day: "Monday",
    type: "training",
    name: "Finger Strength Focus",
    exercises: [
      {
        name: "Hangboard Repeaters",
        sets: 6,
        reps: "7s hang / 3s rest",
        rest: "3 min between sets",
        tip: "Focus on open-hand grip to build tendon strength",
      },
      {
        name: "Max Hangs",
        sets: 3,
        reps: "10s hang",
        rest: "3 min between sets",
        tip: "Add weight progressively once comfortable",
      },
      {
        name: "Boulder Problems",
        sets: 8,
        reps: "1-2 attempts each",
        rest: "2-3 min between problems",
        tip: "Choose problems 1-2 grades below your max",
      },
    ],
  },
  {
    day: "Tuesday",
    type: "rest",
    name: "Active Recovery",
    exercises: [
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
    ],
  },
  {
    day: "Wednesday",
    type: "training",
    name: "Power Training",
    exercises: [
      {
        name: "Campus Board Ladders",
        sets: 5,
        reps: "1-3-5 pattern",
        rest: "3 min between sets",
        tip: "Start with feet on until comfortable",
      },
      {
        name: "Explosive Pull-ups",
        sets: 4,
        reps: "5 reps",
        rest: "2 min between sets",
        tip: "Focus on speed of movement",
      },
      {
        name: "Limit Bouldering",
        sets: 6,
        reps: "3-5 moves each",
        rest: "4-5 min between attempts",
        tip: "Work at or above your limit grade",
      },
    ],
  },
  {
    day: "Thursday",
    type: "rest",
    name: "Full Rest Day",
    exercises: [
      {
        name: "Light Walking",
        sets: 1,
        reps: "20-30 min",
        rest: "N/A",
        tip: "Keep it easy, just move your body",
      },
      {
        name: "Gentle Stretching",
        sets: 1,
        reps: "15 min",
        rest: "N/A",
        tip: "Focus on tight areas from climbing",
      },
    ],
  },
  {
    day: "Friday",
    type: "training",
    name: "Endurance Session",
    exercises: [
      {
        name: "4x4s",
        sets: 4,
        reps: "4 problems back-to-back",
        rest: "4 min between sets",
        tip: "Choose problems 3-4 grades below max",
      },
      {
        name: "Traversing",
        sets: 3,
        reps: "5 min continuous",
        rest: "3 min between sets",
        tip: "Maintain steady breathing throughout",
      },
      {
        name: "Easy Volume Climbing",
        sets: 1,
        reps: "30 min total",
        rest: "As needed",
        tip: "Focus on movement efficiency",
      },
    ],
  },
  {
    day: "Saturday",
    type: "training",
    name: "Technique Practice",
    exercises: [
      {
        name: "Silent Feet Drill",
        sets: 5,
        reps: "1 problem each",
        rest: "2 min between problems",
        tip: "Place feet precisely without sound",
      },
      {
        name: "Hover Drills",
        sets: 4,
        reps: "1 problem each",
        rest: "2 min between problems",
        tip: "Hover hand over hold before grabbing",
      },
      {
        name: "Project Work",
        sets: 1,
        reps: "45 min",
        rest: "As needed",
        tip: "Apply techniques to a challenging project",
      },
    ],
  },
  {
    day: "Sunday",
    type: "rest",
    name: "Recovery & Mobility",
    exercises: [
      {
        name: "Yoga Flow",
        sets: 1,
        reps: "30 min",
        rest: "N/A",
        tip: "Focus on hip openers and shoulder stretches",
      },
      {
        name: "Wrist Circles & Stretches",
        sets: 2,
        reps: "20 each direction",
        rest: "30s",
        tip: "Critical for injury prevention",
      },
    ],
  },
];

export default function Home() {
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutDay[]>(placeholderPlan);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleGenerate = (formData: FormData) => {
    startTransition(async () => {
      const result = await generateAIWorkoutPlan(formData);
      
      if (result.success && result.plan) {
        setWorkoutPlan(result.plan);
        setHasGenerated(true);
        toast.success("Workout plan generated successfully!");
      } else {
        toast.error(result.error || "Failed to generate workout plan. Please try again.");
      }
    });
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <MountainIcon className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">ClimbFit</h1>
              <p className="text-sm text-muted-foreground">
                Workout Plan Generator
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-8 text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <Grip className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Personalized Training
            </span>
            <Grip className="h-5 w-5 text-primary" />
          </div>
          <h2 className="mb-2 text-balance text-3xl font-bold text-foreground md:text-4xl">
            Build Your Custom Climbing Program
          </h2>
          <p className="mx-auto max-w-2xl text-pretty text-muted-foreground">
            Tell us about your climbing level, goals, and available equipment.
            We&apos;ll generate a personalized weekly training plan to help you
            send harder.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[400px_1fr]">
          {/* Form Section */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <WorkoutForm onGenerate={handleGenerate} isLoading={isPending} />
          </div>

          {/* Results Section */}
          <div>
            <WorkoutPlan
              plan={workoutPlan}
              isPlaceholder={!hasGenerated}
              isLoading={isPending}
            />
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 rounded-lg border border-border bg-muted/50 p-4 text-center">
          <p className="text-sm text-muted-foreground">
            <strong>Disclaimer:</strong> Consult a professional before starting
            any workout program. Listen to your body and modify exercises as
            needed to prevent injury.
          </p>
        </div>
      </div>
    </main>
  );
}
