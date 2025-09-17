import React from "react";
import { Calendar, TrendingUp, Target, Award } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  const recentScans = [
    {
      id: 1,
      food: "Jollof Rice with Chicken",
      date: "2 hours ago",
      score: 75,
      calories: 420
    },
    {
      id: 2, 
      food: "Plantain & Bean Porridge",
      date: "Yesterday",
      score: 88,
      calories: 350
    },
    {
      id: 3,
      food: "Grilled Fish & Yam",
      date: "2 days ago", 
      score: 92,
      calories: 380
    }
  ];

  const weeklyStats = {
    avgScore: 85,
    scansCount: 12,
    goodChoices: 8,
    improvements: 3
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "nutrition-good";
    if (score >= 60) return "nutrition-warning";
    return "nutrition-danger";
  };

  const getScoreBadgeVariant = (score: number): "default" | "secondary" | "destructive" => {
    if (score >= 80) return "default";
    if (score >= 60) return "secondary";
    return "destructive";
  };

  return (
    <section className="py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-foreground">Your Nutrition Dashboard</h2>
          <p className="text-muted-foreground">Track your progress and make healthier choices</p>
        </div>

        {/* Weekly Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4 text-center space-y-2">
            <TrendingUp className="h-8 w-8 text-primary mx-auto" />
            <div className="text-2xl font-bold text-foreground">{weeklyStats.avgScore}</div>
            <div className="text-sm text-muted-foreground">Avg Health Score</div>
          </Card>

          <Card className="p-4 text-center space-y-2">
            <Calendar className="h-8 w-8 text-secondary mx-auto" />
            <div className="text-2xl font-bold text-foreground">{weeklyStats.scansCount}</div>
            <div className="text-sm text-muted-foreground">Meals Scanned</div>
          </Card>

          <Card className="p-4 text-center space-y-2">
            <Award className="h-8 w-8 text-accent mx-auto" />
            <div className="text-2xl font-bold text-foreground">{weeklyStats.goodChoices}</div>
            <div className="text-sm text-muted-foreground">Good Choices</div>
          </Card>

          <Card className="p-4 text-center space-y-2">
            <Target className="h-8 w-8 text-nutrition-warning mx-auto" />
            <div className="text-2xl font-bold text-foreground">{weeklyStats.improvements}</div>
            <div className="text-sm text-muted-foreground">Areas to Improve</div>
          </Card>
        </div>

        {/* Recent Scans */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold text-foreground mb-4">Recent Food Scans</h3>
          <div className="space-y-4">
            {recentScans.map((scan) => (
              <div
                key={scan.id}
                className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors duration-200"
              >
                <div className="flex-1 space-y-1">
                  <div className="font-medium text-foreground">{scan.food}</div>
                  <div className="text-sm text-muted-foreground flex items-center space-x-4">
                    <span>{scan.date}</span>
                    <span>•</span>
                    <span>{scan.calories} calories</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge 
                    variant={getScoreBadgeVariant(scan.score)}
                    className="font-semibold"
                  >
                    {scan.score}/100
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Health Tips */}
        <Card className="p-6 bg-gradient-to-r from-primary/5 to-accent/5">
          <h3 className="text-xl font-semibold text-foreground mb-4">Today's Health Tip</h3>
          <div className="space-y-3">
            <p className="text-foreground font-medium">
              🌿 Include more local vegetables like ugu, waterleaf, and bitter leaf in your meals
            </p>
            <p className="text-muted-foreground text-sm">
              These nutrient-rich African greens are packed with vitamins A, C, and iron. 
              They help reduce inflammation and support heart health. Try adding them to soups, stews, or smoothies.
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Dashboard;