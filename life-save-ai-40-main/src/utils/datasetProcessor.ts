// Utility for processing symptoms datasets and training data

export interface SymptomData {
  symptom: string;
  description: string;
  severity: "mild" | "moderate" | "severe";
  urgency: "low" | "moderate" | "high";
  conditions: string[];
  recommendations: string[];
  emergencyIndicators?: string[];
  precautions?: string[];
  workouts?: string[];
  diets?: string[];
}

export interface DiseaseData {
  name: string;
  symptoms: string[];
  commonCauses: string[];
  treatments: string[];
  prevention: string[];
  urgencyLevel: "low" | "moderate" | "high";
  precautions: string[];
  recommendedWorkouts: string[];
  dietaryRecommendations: string[];
  description: string;
}

export interface PrecautionData {
  condition: string;
  precautions: string[];
  severity: "low" | "moderate" | "high";
  category: "general" | "emergency" | "lifestyle";
}

export interface WorkoutData {
  condition: string;
  exercises: string[];
  duration: string;
  frequency: string;
  intensity: "low" | "moderate" | "high";
  category: "cardio" | "strength" | "flexibility" | "recovery";
}

export interface DietData {
  condition: string;
  foods: string[];
  avoidFoods: string[];
  category: "nutrition" | "therapeutic" | "preventive";
  instructions: string[];
}

export class DatasetProcessor {
  private symptomsData: SymptomData[] = [];
  private diseasesData: DiseaseData[] = [];
  private precautionsData: PrecautionData[] = [];
  private workoutsData: WorkoutData[] = [];
  private dietsData: DietData[] = [];

  /**
   * Process CSV or JSON dataset of symptoms
   */
  async loadSymptomsDataset(data: any[]): Promise<void> {
    try {
      this.symptomsData = data.map(item => ({
        symptom: item.symptom || item.Symptom || "",
        description: item.description || item.Description || "",
        severity: this.normalizeSeverity(item.severity || item.Severity),
        urgency: this.normalizeUrgency(item.urgency || item.Urgency),
        conditions: this.parseArray(item.conditions || item.Conditions || ""),
        recommendations: this.parseArray(item.recommendations || item.Recommendations || ""),
        emergencyIndicators: this.parseArray(item.emergency_indicators || item.EmergencyIndicators || ""),
        precautions: this.parseArray(item.precautions || item.Precautions || ""),
        workouts: this.parseArray(item.workouts || item.Workouts || ""),
        diets: this.parseArray(item.diets || item.Diets || "")
      }));
      
      console.log(`Loaded ${this.symptomsData.length} symptoms from dataset`);
    } catch (error) {
      console.error("Error loading symptoms dataset:", error);
    }
  }

  /**
   * Process disease/condition dataset
   */
  async loadDiseasesDataset(data: any[]): Promise<void> {
    try {
      this.diseasesData = data.map(item => ({
        name: item.disease || item.Disease || item.name || "",
        symptoms: this.parseArray(item.symptoms || item.Symptoms || ""),
        commonCauses: this.parseArray(item.causes || item.Causes || ""),
        treatments: this.parseArray(item.treatments || item.Treatments || ""),
        prevention: this.parseArray(item.prevention || item.Prevention || ""),
        urgencyLevel: this.normalizeUrgency(item.urgency || item.Urgency || "low"),
        precautions: this.parseArray(item.precautions || item.Precautions || ""),
        recommendedWorkouts: this.parseArray(item.workouts || item.Workouts || item.recommended_workouts || ""),
        dietaryRecommendations: this.parseArray(item.diets || item.Diets || item.dietary_recommendations || ""),
        description: item.description || item.Description || ""
      }));
      
      console.log(`Loaded ${this.diseasesData.length} diseases from dataset`);
    } catch (error) {
      console.error("Error loading diseases dataset:", error);
    }
  }

  /**
   * Load precautions dataset
   */
  async loadPrecautionsDataset(data: any[]): Promise<void> {
    try {
      this.precautionsData = data.map(item => ({
        condition: item.condition || item.Condition || "",
        precautions: this.parseArray(item.precautions || item.Precautions || ""),
        severity: this.normalizePrecautionSeverity(item.severity || item.Severity || "low"),
        category: this.normalizeCategory(item.category || item.Category || "general")
      }));
      
      console.log(`Loaded ${this.precautionsData.length} precautions from dataset`);
    } catch (error) {
      console.error("Error loading precautions dataset:", error);
    }
  }

  /**
   * Load workouts dataset
   */
  async loadWorkoutsDataset(data: any[]): Promise<void> {
    try {
      this.workoutsData = data.map(item => ({
        condition: item.condition || item.Condition || "",
        exercises: this.parseArray(item.exercises || item.Exercises || ""),
        duration: item.duration || item.Duration || "30 minutes",
        frequency: item.frequency || item.Frequency || "3 times per week",
        intensity: this.normalizeIntensity(item.intensity || item.Intensity || "moderate"),
        category: this.normalizeWorkoutCategory(item.category || item.Category || "cardio")
      }));
      
      console.log(`Loaded ${this.workoutsData.length} workout routines from dataset`);
    } catch (error) {
      console.error("Error loading workouts dataset:", error);
    }
  }

  /**
   * Load diets dataset
   */
  async loadDietsDataset(data: any[]): Promise<void> {
    try {
      this.dietsData = data.map(item => ({
        condition: item.condition || item.Condition || "",
        foods: this.parseArray(item.foods || item.Foods || item.recommended_foods || ""),
        avoidFoods: this.parseArray(item.avoid_foods || item.AvoidFoods || item.foods_to_avoid || ""),
        category: this.normalizeDietCategory(item.category || item.Category || "nutrition"),
        instructions: this.parseArray(item.instructions || item.Instructions || "")
      }));
      
      console.log(`Loaded ${this.dietsData.length} dietary recommendations from dataset`);
    } catch (error) {
      console.error("Error loading diets dataset:", error);
    }
  }

  /**
   * Find symptoms matching user input
   */
  findMatchingSymptoms(userInput: string): SymptomData[] {
    const lowerInput = userInput.toLowerCase();
    return this.symptomsData.filter(symptom => 
      lowerInput.includes(symptom.symptom.toLowerCase()) ||
      symptom.description.toLowerCase().includes(lowerInput) ||
      symptom.conditions.some(condition => 
        lowerInput.includes(condition.toLowerCase())
      )
    );
  }

  /**
   * Find precautions matching user input or condition
   */
  findMatchingPrecautions(userInput: string): PrecautionData[] {
    const lowerInput = userInput.toLowerCase();
    return this.precautionsData.filter(precaution => 
      lowerInput.includes(precaution.condition.toLowerCase()) ||
      precaution.precautions.some(p => 
        lowerInput.includes(p.toLowerCase())
      )
    );
  }

  /**
   * Find workouts matching user input or condition
   */
  findMatchingWorkouts(userInput: string): WorkoutData[] {
    const lowerInput = userInput.toLowerCase();
    return this.workoutsData.filter(workout => 
      lowerInput.includes(workout.condition.toLowerCase()) ||
      workout.exercises.some(exercise => 
        lowerInput.includes(exercise.toLowerCase())
      )
    );
  }

  /**
   * Find diets matching user input or condition
   */
  findMatchingDiets(userInput: string): DietData[] {
    const lowerInput = userInput.toLowerCase();
    return this.dietsData.filter(diet => 
      lowerInput.includes(diet.condition.toLowerCase()) ||
      diet.foods.some(food => 
        lowerInput.includes(food.toLowerCase())
      )
    );
  }

  /**
   * Find diseases matching symptoms
   */
  findMatchingDiseases(symptoms: string[]): DiseaseData[] {
    const lowerSymptoms = symptoms.map(s => s.toLowerCase());
    return this.diseasesData.filter(disease => 
      disease.symptoms.some(symptom => 
        lowerSymptoms.some(userSymptom => 
          symptom.toLowerCase().includes(userSymptom) ||
          userSymptom.includes(symptom.toLowerCase())
        )
      )
    );
  }

  /**
   * Generate comprehensive AI response based on dataset with solutions
   */
  generateDatasetResponse(userInput: string): string | null {
    const matchingSymptoms = this.findMatchingSymptoms(userInput);
    const matchingDiseases = this.findMatchingDiseases([userInput]);
    const matchingPrecautions = this.findMatchingPrecautions(userInput);
    const matchingWorkouts = this.findMatchingWorkouts(userInput);
    const matchingDiets = this.findMatchingDiets(userInput);
    
    if (matchingSymptoms.length === 0 && matchingDiseases.length === 0 && 
        matchingPrecautions.length === 0 && matchingWorkouts.length === 0 && 
        matchingDiets.length === 0) {
      return null; // No dataset match, use AI fallback
    }

    let response = "";

    // Handle emergency symptoms first
    const highUrgencySymptoms = matchingSymptoms.filter(s => s.urgency === "high");
    if (highUrgencySymptoms.length > 0) {
      const emergencySymptom = highUrgencySymptoms[0];
      return `🚨 URGENT: The symptom "${emergencySymptom.symptom}" may indicate serious conditions including ${emergencySymptom.conditions.slice(0, 2).join(" or ")}. ${emergencySymptom.recommendations[0] || "Seek immediate medical attention."}`;
    }

    // Generate comprehensive response with symptoms analysis
    if (matchingSymptoms.length > 0) {
      response += "## 🩺 Symptom Analysis\n";
      matchingSymptoms.slice(0, 2).forEach(symptom => {
        const conditionsText = symptom.conditions.length > 0 
          ? `This could indicate: ${symptom.conditions.slice(0, 3).join(", ")}.`
          : "";
        
        const recommendationsText = symptom.recommendations.length > 0
          ? `Recommendations: ${symptom.recommendations[0]}`
          : "";

        response += `**${symptom.symptom.charAt(0).toUpperCase() + symptom.symptom.slice(1)}**: ${symptom.description} ${conditionsText} ${recommendationsText}\n\n`;
      });
    }

    // Add disease information
    if (matchingDiseases.length > 0) {
      response += "## 🏥 Related Conditions\n";
      matchingDiseases.slice(0, 2).forEach(disease => {
        response += `**${disease.name}**: ${disease.description}\n`;
        if (disease.symptoms.length > 0) {
          response += `- Symptoms: ${disease.symptoms.slice(0, 3).join(", ")}\n`;
        }
        if (disease.treatments.length > 0) {
          response += `- Treatments: ${disease.treatments.slice(0, 2).join(", ")}\n`;
        }
        response += "\n";
      });
    }

    // Add precautions
    if (matchingPrecautions.length > 0) {
      response += "## ⚠️ Precautions\n";
      matchingPrecautions.slice(0, 2).forEach(precaution => {
        response += `**For ${precaution.condition}**:\n`;
        precaution.precautions.slice(0, 3).forEach(p => {
          response += `- ${p}\n`;
        });
        response += "\n";
      });
    }

    // Add workout recommendations
    if (matchingWorkouts.length > 0) {
      response += "## 💪 Recommended Exercises\n";
      matchingWorkouts.slice(0, 2).forEach(workout => {
        response += `**For ${workout.condition}** (${workout.intensity} intensity):\n`;
        workout.exercises.slice(0, 3).forEach(exercise => {
          response += `- ${exercise}\n`;
        });
        response += `Duration: ${workout.duration} | Frequency: ${workout.frequency}\n\n`;
      });
    }

    // Add dietary recommendations
    if (matchingDiets.length > 0) {
      response += "## 🥗 Dietary Recommendations\n";
      matchingDiets.slice(0, 2).forEach(diet => {
        response += `**For ${diet.condition}**:\n`;
        if (diet.foods.length > 0) {
          response += `- Recommended: ${diet.foods.slice(0, 4).join(", ")}\n`;
        }
        if (diet.avoidFoods.length > 0) {
          response += `- Avoid: ${diet.avoidFoods.slice(0, 3).join(", ")}\n`;
        }
        if (diet.instructions.length > 0) {
          response += `- Instructions: ${diet.instructions[0]}\n`;
        }
        response += "\n";
      });
    }

    response += "\n💡 Use our Symptom Checker for more detailed analysis and personalized recommendations.";
    
    return response.trim();
  }

  /**
   * Generate a complete health solution for the user's problem
   */
  generateHealthSolution(userInput: string): {
    analysis: string;
    precautions: string[];
    workouts: string[];
    diets: string[];
    urgency: "low" | "moderate" | "high";
  } | null {
    const matchingSymptoms = this.findMatchingSymptoms(userInput);
    const matchingDiseases = this.findMatchingDiseases([userInput]);
    const matchingPrecautions = this.findMatchingPrecautions(userInput);
    const matchingWorkouts = this.findMatchingWorkouts(userInput);
    const matchingDiets = this.findMatchingDiets(userInput);

    if (matchingSymptoms.length === 0 && matchingDiseases.length === 0) {
      return null;
    }

    const urgency = matchingSymptoms.some(s => s.urgency === "high") ? "high" :
                   matchingSymptoms.some(s => s.urgency === "moderate") ? "moderate" : "low";

    const analysis = matchingSymptoms.length > 0 
      ? `Based on your symptoms, this could be related to: ${matchingSymptoms[0].conditions.slice(0, 2).join(" or ")}`
      : `Based on the information provided, this appears to be related to ${matchingDiseases[0]?.name}`;

    const precautions = [...new Set([
      ...matchingSymptoms.flatMap(s => s.precautions || []),
      ...matchingPrecautions.flatMap(p => p.precautions),
      ...matchingDiseases.flatMap(d => d.precautions)
    ])].slice(0, 5);

    const workouts = [...new Set([
      ...matchingSymptoms.flatMap(s => s.workouts || []),
      ...matchingWorkouts.flatMap(w => w.exercises),
      ...matchingDiseases.flatMap(d => d.recommendedWorkouts)
    ])].slice(0, 5);

    const diets = [...new Set([
      ...matchingSymptoms.flatMap(s => s.diets || []),
      ...matchingDiets.flatMap(d => d.foods),
      ...matchingDiseases.flatMap(d => d.dietaryRecommendations)
    ])].slice(0, 5);

    return {
      analysis,
      precautions,
      workouts,
      diets,
      urgency
    };
  }

  /**
   * Get dataset statistics
   */
  getStatistics() {
    return {
      totalSymptoms: this.symptomsData.length,
      totalDiseases: this.diseasesData.length,
      totalPrecautions: this.precautionsData.length,
      totalWorkouts: this.workoutsData.length,
      totalDiets: this.dietsData.length,
      highUrgencySymptoms: this.symptomsData.filter(s => s.urgency === "high").length,
      emergencySymptoms: this.symptomsData.filter(s => s.emergencyIndicators && s.emergencyIndicators.length > 0).length
    };
  }

  private normalizeSeverity(severity: string): "mild" | "moderate" | "severe" {
    const lower = severity?.toLowerCase() || "";
    if (lower.includes("severe") || lower.includes("high")) return "severe";
    if (lower.includes("moderate") || lower.includes("medium")) return "moderate";
    return "mild";
  }

  private normalizePrecautionSeverity(severity: string): "low" | "moderate" | "high" {
    const lower = severity?.toLowerCase() || "";
    if (lower.includes("severe") || lower.includes("high")) return "high";
    if (lower.includes("moderate") || lower.includes("medium")) return "moderate";
    return "low";
  }

  private normalizeUrgency(urgency: string): "low" | "moderate" | "high" {
    const lower = urgency?.toLowerCase() || "";
    if (lower.includes("high") || lower.includes("urgent") || lower.includes("emergency")) return "high";
    if (lower.includes("moderate") || lower.includes("medium")) return "moderate";
    return "low";
  }

  private normalizeCategory(category: string): "general" | "emergency" | "lifestyle" {
    const lower = category?.toLowerCase() || "";
    if (lower.includes("emergency") || lower.includes("urgent")) return "emergency";
    if (lower.includes("lifestyle") || lower.includes("daily")) return "lifestyle";
    return "general";
  }

  private normalizeIntensity(intensity: string): "low" | "moderate" | "high" {
    const lower = intensity?.toLowerCase() || "";
    if (lower.includes("high") || lower.includes("intense") || lower.includes("vigorous")) return "high";
    if (lower.includes("moderate") || lower.includes("medium")) return "moderate";
    return "low";
  }

  private normalizeWorkoutCategory(category: string): "cardio" | "strength" | "flexibility" | "recovery" {
    const lower = category?.toLowerCase() || "";
    if (lower.includes("strength") || lower.includes("weight") || lower.includes("resistance")) return "strength";
    if (lower.includes("flexibility") || lower.includes("stretch") || lower.includes("yoga")) return "flexibility";
    if (lower.includes("recovery") || lower.includes("rest") || lower.includes("rehabilitation")) return "recovery";
    return "cardio";
  }

  private normalizeDietCategory(category: string): "nutrition" | "therapeutic" | "preventive" {
    const lower = category?.toLowerCase() || "";
    if (lower.includes("therapeutic") || lower.includes("treatment") || lower.includes("medical")) return "therapeutic";
    if (lower.includes("preventive") || lower.includes("prevention") || lower.includes("wellness")) return "preventive";
    return "nutrition";
  }

  private parseArray(input: string | string[]): string[] {
    if (Array.isArray(input)) return input;
    if (typeof input !== "string") return [];
    
    // Handle various separators (comma, semicolon, pipe)
    return input.split(/[,;|]/).map(item => item.trim()).filter(item => item.length > 0);
  }
}

// Export singleton instance
export const datasetProcessor = new DatasetProcessor();

// Example usage for loading datasets:
/*
// Load from CSV data
fetch('/api/symptoms-dataset.csv')
  .then(response => response.text())
  .then(csvText => {
    // Parse CSV and convert to JSON
    const data = parseCSV(csvText);
    datasetProcessor.loadSymptomsDataset(data);
  });

// Load from JSON
fetch('/api/diseases-dataset.json')
  .then(response => response.json())
  .then(data => datasetProcessor.loadDiseasesDataset(data));
*/