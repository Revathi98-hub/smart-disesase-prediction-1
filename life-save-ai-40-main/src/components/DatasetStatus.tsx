import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Database, CheckCircle, AlertCircle } from "lucide-react";
import { datasetLoader } from "@/services/datasetLoader";

export const DatasetStatus = () => {
  const [stats, setStats] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const checkDatasetStatus = async () => {
      if (datasetLoader.isLoaded()) {
        setIsLoaded(true);
        setStats(datasetLoader.getStats());
      } else {
        // Wait a moment and check again
        setTimeout(() => {
          if (datasetLoader.isLoaded()) {
            setIsLoaded(true);
            setStats(datasetLoader.getStats());
          }
        }, 2000);
      }
    };

    checkDatasetStatus();
  }, []);

  if (!isLoaded || !stats) {
    return (
      <Card className="p-4 bg-muted/50 border border-muted-foreground/20">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Loading health dataset...</span>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4 bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20">
      <div className="flex items-center gap-2 mb-3">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <span className="text-sm font-medium text-foreground">AI Health Dataset Active</span>
        <Database className="h-4 w-4 text-primary" />
      </div>
      <div className="flex flex-wrap gap-2">
        <Badge variant="secondary" className="text-xs">
          {stats.totalSymptoms} Symptoms
        </Badge>
        <Badge variant="secondary" className="text-xs">
          {stats.totalDiseases} Diseases
        </Badge>
        <Badge variant="secondary" className="text-xs">
          {stats.totalPrecautions} Precautions
        </Badge>
        <Badge variant="secondary" className="text-xs">
          {stats.totalWorkouts} Workouts
        </Badge>
        <Badge variant="secondary" className="text-xs">
          {stats.totalDiets} Diets
        </Badge>
        {stats.emergencySymptoms > 0 && (
          <Badge variant="destructive" className="text-xs">
            {stats.emergencySymptoms} Emergency
          </Badge>
        )}
      </div>
    </Card>
  );
};