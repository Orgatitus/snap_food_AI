import React from "react";
import { AlertTriangle, CheckCircle, Clock, Info } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface NutritionData {
  food: string;
  confidence: number;
  nutrients: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    sodium: number;
    sugar: number;
  };
  healthFlags: {
    calories: "good" | "warning" | "danger";
    protein: "good" | "warning" | "danger";
    carbs: "good" | "warning" | "danger";
    fat: "good" | "warning" | "danger";
    sodium: "good" | "warning" | "danger";
    sugar: "good" | "warning" | "danger";
  };
}

interface NutritionAnalysisProps {
  data: NutritionData;
}

const getStatusColor = (status: "good" | "warning" | "danger") => {
  switch (status) {
    case "good": return "nutrition-good";
    case "warning": return "nutrition-warning";
    case "danger": return "nutrition-danger";
    default: return "muted";
  }
};

const getStatusIcon = (status: "good" | "warning" | "danger") => {
  switch (status) {
    case "good": return <CheckCircle className="h-4 w-4" />;
    case "warning": return <Clock className="h-4 w-4" />;
    case "danger": return <AlertTriangle className="h-4 w-4" />;
    default: return <Info className="h-4 w-4" />;
  }
};

const getHealthAdvice = (nutrient: string, status: "good" | "warning" | "danger") => {
  const advice = {
    sodium: {
      danger: "Very high sodium! Limit for heart health.",
      warning: "Moderate sodium - watch your intake.",
      good: "Good sodium level for your health."
    },
    sugar: {
      danger: "High sugar content - limit portion size.",
      warning: "Moderate sugar - enjoy in moderation.",
      good: "Low sugar content - great choice!"
    },
    calories: {
      danger: "High calorie density - smaller portion recommended.",
      warning: "Moderate calories - good for active lifestyle.",
      good: "Well-balanced calorie content."
    },
    protein: {
      danger: "Very high protein - ensure adequate hydration.",
      warning: "Good protein content for muscle health.",
      good: "Excellent protein source!"
    },
    carbs: {
      danger: "High carbs - pair with protein or fiber.",
      warning: "Moderate carbs - good energy source.",
      good: "Well-balanced carbohydrate content."
    },
    fat: {
      danger: "High fat content - enjoy smaller portions.",
      warning: "Moderate healthy fats included.",
      good: "Good balance of healthy fats."
    }
  };
  
  return advice[nutrient as keyof typeof advice]?.[status] || "Monitor intake based on your health goals.";
};

const NutritionAnalysis: React.FC<NutritionAnalysisProps> = ({ data }) => {
  const nutrients = [
    { name: "Calories", value: data.nutrients.calories, unit: "kcal", status: data.healthFlags.calories },
    { name: "Protein", value: data.nutrients.protein, unit: "g", status: data.healthFlags.protein },
    { name: "Carbs", value: data.nutrients.carbs, unit: "g", status: data.healthFlags.carbs },
    { name: "Fat", value: data.nutrients.fat, unit: "g", status: data.healthFlags.fat },
    { name: "Sodium", value: data.nutrients.sodium, unit: "mg", status: data.healthFlags.sodium },
    { name: "Sugar", value: data.nutrients.sugar, unit: "g", status: data.healthFlags.sugar },
  ];

  return (
    <Card className="p-6 space-y-6">
      {/* Food Identification */}
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold text-foreground">{data.food}</h3>
        <Badge variant="secondary" className="text-xs">
          {Math.round(data.confidence * 100)}% confidence
        </Badge>
      </div>

      {/* Traffic Light Overview */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-foreground">Nutrition Traffic Lights</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {nutrients.map((nutrient) => (
            <div
              key={nutrient.name}
              className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                nutrient.status === "good" 
                  ? "border-nutrition-good bg-nutrition-good/10" 
                  : nutrient.status === "warning"
                  ? "border-nutrition-warning bg-nutrition-warning/10"
                  : "border-nutrition-danger bg-nutrition-danger/10"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{nutrient.name}</span>
                <span className={`text-${getStatusColor(nutrient.status)}`}>
                  {getStatusIcon(nutrient.status)}
                </span>
              </div>
              <div className="text-lg font-bold">
                {nutrient.value}{nutrient.unit}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Health Recommendations */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-foreground">Health Recommendations</h4>
        <div className="space-y-3">
          {nutrients
            .filter(n => n.status !== "good")
            .slice(0, 3)
            .map((nutrient) => (
              <div
                key={nutrient.name}
                className={`p-4 rounded-lg border-l-4 ${
                  nutrient.status === "warning"
                    ? "border-nutrition-warning bg-nutrition-warning/5"
                    : "border-nutrition-danger bg-nutrition-danger/5"
                }`}
              >
                <div className="flex items-start space-x-3">
                  <span className={`text-${getStatusColor(nutrient.status)} mt-0.5`}>
                    {getStatusIcon(nutrient.status)}
                  </span>
                  <div className="flex-1">
                    <p className="font-medium text-sm text-foreground">
                      {nutrient.name}: {nutrient.value}{nutrient.unit}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {getHealthAdvice(nutrient.name.toLowerCase(), nutrient.status)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Quick Health Score */}
      <div className="space-y-3">
        <h4 className="text-lg font-semibold text-foreground">Overall Health Score</h4>
        <div className="space-y-2">
          {(() => {
            const goodCount = nutrients.filter(n => n.status === "good").length;
            const warningCount = nutrients.filter(n => n.status === "warning").length;
            const dangerCount = nutrients.filter(n => n.status === "danger").length;
            const score = ((goodCount * 100 + warningCount * 60) / (nutrients.length * 100)) * 100;
            
            return (
              <>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Health Rating</span>
                  <span className="text-sm font-bold">{Math.round(score)}/100</span>
                </div>
                <Progress 
                  value={score} 
                  className={`h-2 ${
                    score >= 80 ? "bg-nutrition-good/20" 
                    : score >= 60 ? "bg-nutrition-warning/20" 
                    : "bg-nutrition-danger/20"
                  }`}
                />
                <div className="text-xs text-muted-foreground">
                  {goodCount} good • {warningCount} moderate • {dangerCount} high concern
                </div>
              </>
            );
          })()}
        </div>
      </div>
    </Card>
  );
};

export default NutritionAnalysis;