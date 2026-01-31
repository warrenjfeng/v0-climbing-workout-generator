"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dumbbell, Zap, Clock, Target, Sparkles } from "lucide-react";
import type { FormData } from "@/app/page";
import { Loader2 } from "lucide-react";

interface WorkoutFormProps {
  onGenerate: (data: FormData) => void;
  isLoading?: boolean;
}

const climbingLevels = [
  { value: "beginner", label: "Beginner (V0-V2)" },
  { value: "intermediate", label: "Intermediate (V3-V5)" },
  { value: "advanced", label: "Advanced (V6-V8)" },
  { value: "expert", label: "Expert (V9+)" },
];

const goals = [
  { value: "finger-strength", label: "Finger Strength", icon: Dumbbell },
  { value: "power", label: "Power/Explosiveness", icon: Zap },
  { value: "endurance", label: "Endurance", icon: Clock },
  { value: "technique", label: "Technique", icon: Target },
];

const equipmentOptions = [
  { value: "hangboard", label: "Hangboard" },
  { value: "weights", label: "Weights/Dumbbells" },
  { value: "campus-board", label: "Campus Board" },
  { value: "resistance-bands", label: "Resistance Bands" },
  { value: "gym-access", label: "Gym Access" },
];

export function WorkoutForm({ onGenerate, isLoading }: WorkoutFormProps) {
  const [level, setLevel] = useState("intermediate");
  const [goal, setGoal] = useState("finger-strength");
  const [daysPerWeek, setDaysPerWeek] = useState([4]);
  const [equipment, setEquipment] = useState<string[]>(["hangboard", "gym-access"]);

  const handleEquipmentChange = (value: string, checked: boolean) => {
    if (checked) {
      setEquipment([...equipment, value]);
    } else {
      setEquipment(equipment.filter((item) => item !== value));
    }
  };

  const handleSubmit = () => {
    onGenerate({
      level,
      goal,
      daysPerWeek: daysPerWeek[0],
      equipment,
    });
  };

  return (
    <Card className="border-2 border-border shadow-lg">
      <CardHeader className="border-b border-border bg-muted/30">
        <CardTitle className="flex items-center gap-2 text-lg">
          <CarabinerIcon className="h-5 w-5 text-primary" />
          Configure Your Plan
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        {/* Climbing Level */}
        <div className="space-y-2">
          <Label htmlFor="level" className="text-sm font-medium">
            Climbing Level
          </Label>
          <Select value={level} onValueChange={setLevel}>
            <SelectTrigger id="level" className="w-full">
              <SelectValue placeholder="Select your level" />
            </SelectTrigger>
            <SelectContent>
              {climbingLevels.map((lvl) => (
                <SelectItem key={lvl.value} value={lvl.value}>
                  {lvl.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Primary Goal */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Primary Goal</Label>
          <div className="grid grid-cols-2 gap-2">
            {goals.map((g) => {
              const Icon = g.icon;
              return (
                <button
                  key={g.value}
                  type="button"
                  onClick={() => setGoal(g.value)}
                  className={`flex items-center gap-2 rounded-lg border-2 p-3 text-left text-sm font-medium transition-all ${
                    goal === g.value
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-card text-foreground hover:border-primary/50 hover:bg-muted"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{g.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Days per Week */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Days per Week</Label>
            <span className="rounded-md bg-primary px-2 py-0.5 text-sm font-bold text-primary-foreground">
              {daysPerWeek[0]} days
            </span>
          </div>
          <Slider
            value={daysPerWeek}
            onValueChange={setDaysPerWeek}
            min={2}
            max={6}
            step={1}
            className="py-2"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>2 days</span>
            <span>6 days</span>
          </div>
        </div>

        {/* Equipment */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Available Equipment</Label>
          <div className="space-y-2">
            {equipmentOptions.map((equip) => (
              <label
                key={equip.value}
                className="flex cursor-pointer items-center gap-3 rounded-lg border border-border bg-card p-3 transition-colors hover:bg-muted"
              >
                <Checkbox
                  checked={equipment.includes(equip.value)}
                  onCheckedChange={(checked) =>
                    handleEquipmentChange(equip.value, checked as boolean)
                  }
                  className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <span className="text-sm text-foreground">{equip.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <Button
          onClick={handleSubmit}
          size="lg"
          disabled={isLoading}
          className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Generating Plan...
            </>
          ) : (
            <>
              <Sparkles className="h-5 w-5" />
              Generate My Plan
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}

function CarabinerIcon({ className }: { className?: string }) {
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
      <path d="M6 6a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V6z" />
      <path d="M18 8v8" />
      <path d="M6 10h12" />
    </svg>
  );
}
