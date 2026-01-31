"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Flame,
  Coffee,
  Lightbulb,
  TrendingUp,
  Info,
  Calendar,
  Loader2,
} from "lucide-react";
import type { WorkoutDay } from "@/lib/workout-generator";

interface WorkoutPlanProps {
  plan: WorkoutDay[];
  isPlaceholder: boolean;
  isLoading?: boolean;
}

export function WorkoutPlan({ plan, isPlaceholder, isLoading }: WorkoutPlanProps) {
  const trainingDays = plan.filter((d) => d.type === "training").length;
  const restDays = plan.filter((d) => d.type === "rest").length;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/30 py-20">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-lg font-medium text-foreground">Generating Your Plan</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Our AI coach is creating a personalized workout...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          <h3 className="text-xl font-bold text-foreground">
            Your Weekly Plan
          </h3>
          {isPlaceholder && (
            <Badge variant="secondary" className="ml-2">
              Sample Plan
            </Badge>
          )}
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Flame className="h-4 w-4 text-primary" />
            <span>{trainingDays} Training</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Coffee className="h-4 w-4 text-accent" />
            <span>{restDays} Rest</span>
          </div>
        </div>
      </div>

      {isPlaceholder && (
        <div className="flex items-start gap-3 rounded-lg border border-primary/30 bg-primary/5 p-4">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <p className="text-sm text-foreground">
            This is a sample workout plan. Fill out the form and click
            &quot;Generate My Plan&quot; to create a personalized training
            program based on your goals and equipment.
          </p>
        </div>
      )}

      {/* Weekly Calendar Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {plan.map((day) => (
          <DayCard key={day.day} day={day} />
        ))}
      </div>

      {/* Progression Notes */}
      <ProgressionNotes />
    </div>
  );
}

function DayCard({ day }: { day: WorkoutDay }) {
  const isRest = day.type === "rest";

  return (
    <Card
      className={`overflow-hidden transition-all hover:shadow-md ${
        isRest ? "border-accent/50 bg-accent/5" : "border-border"
      }`}
    >
      <CardHeader
        className={`py-3 ${
          isRest ? "bg-accent/10" : "bg-primary/10"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isRest ? (
              <Coffee className="h-4 w-4 text-accent" />
            ) : (
              <Flame className="h-4 w-4 text-primary" />
            )}
            <CardTitle className="text-base font-semibold text-foreground">
              {day.day}
            </CardTitle>
          </div>
          <Badge
            variant={isRest ? "secondary" : "default"}
            className={
              isRest
                ? "bg-accent/20 text-accent-foreground"
                : "bg-primary text-primary-foreground"
            }
          >
            {day.name}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <ul className="space-y-3">
          {day.exercises.map((exercise, idx) => (
            <li
              key={`${day.day}-${idx}`}
              className="rounded-lg border border-border bg-card p-3"
            >
              <div className="mb-2 flex items-start justify-between gap-2">
                <span className="font-medium text-foreground">
                  {exercise.name}
                </span>
                <HoldIcon className="h-4 w-4 shrink-0 text-muted-foreground" />
              </div>
              <div className="mb-2 flex flex-wrap gap-2 text-xs">
                <span className="rounded bg-muted px-2 py-0.5 text-muted-foreground">
                  {exercise.sets} x {exercise.reps}
                </span>
                <span className="rounded bg-muted px-2 py-0.5 text-muted-foreground">
                  Rest: {exercise.rest}
                </span>
              </div>
              <div className="flex items-start gap-1.5 text-xs text-muted-foreground">
                <Lightbulb className="mt-0.5 h-3 w-3 shrink-0 text-primary" />
                <span>{exercise.tip}</span>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function ProgressionNotes() {
  return (
    <Card className="border-2 border-primary/20 bg-primary/5">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg text-foreground">
          <TrendingUp className="h-5 w-5 text-primary" />
          Progression Notes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <ProgressionItem
            title="Hangboard Training"
            description="Once you can complete all reps cleanly, add 2-5 lbs of weight or move to smaller holds"
          />
          <ProgressionItem
            title="Boulder Problems"
            description="When problems feel comfortable at 80%+ success rate, increase the grade by one level"
          />
          <ProgressionItem
            title="Endurance Work"
            description="Progress by adding one more problem to your 4x4s or increasing continuous climbing time by 2-3 minutes"
          />
          <ProgressionItem
            title="Rest & Recovery"
            description="If feeling fatigued or experiencing finger soreness, add an extra rest day rather than pushing through"
          />
        </div>
        <div className="rounded-lg bg-muted p-3">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">General Rule:</strong> Stick
            with the same program for 4-6 weeks before making significant
            changes. Progress should be gradual to prevent injury.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function ProgressionItem({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
      <div>
        <p className="font-medium text-foreground">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

function HoldIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <ellipse cx="12" cy="12" rx="8" ry="5" />
      <circle cx="9" cy="11" r="1" fill="currentColor" />
      <circle cx="15" cy="11" r="1" fill="currentColor" />
    </svg>
  );
}
