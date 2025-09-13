import { pipeline } from "@huggingface/transformers";
import { datasetProcessor } from "@/utils/datasetProcessor";

// Medical symptoms and conditions database
const MEDICAL_KNOWLEDGE = {
  symptoms: {
    "headache": {
      conditions: ["tension headache", "migraine", "cluster headache", "sinus infection"],
      severity: "mild to moderate",
      urgency: "low",
      advice: "Rest, hydration, over-the-counter pain relievers. See a doctor if severe or persistent."
    },
    "fever": {
      conditions: ["viral infection", "bacterial infection", "flu", "covid-19"],
      severity: "mild to severe",
      urgency: "moderate",
      advice: "Monitor temperature, stay hydrated, rest. Seek medical care if temperature exceeds 103°F."
    },
    "chest pain": {
      conditions: ["heart attack", "angina", "muscle strain", "anxiety"],
      severity: "mild to severe",
      urgency: "high",
      advice: "⚠️ EMERGENCY: Call 911 immediately for chest pain. Do not wait."
    },
    "difficulty breathing": {
      conditions: ["asthma", "pneumonia", "heart failure", "panic attack"],
      severity: "moderate to severe",
      urgency: "high",
      advice: "⚠️ EMERGENCY: Seek immediate medical attention for breathing difficulties."
    },
    "cough": {
      conditions: ["common cold", "bronchitis", "pneumonia", "allergies"],
      severity: "mild to moderate",
      urgency: "low to moderate",
      advice: "Stay hydrated, use honey for soothing. See doctor if persistent or with fever."
    },
    "nausea": {
      conditions: ["food poisoning", "gastroenteritis", "pregnancy", "motion sickness"],
      severity: "mild to moderate",
      urgency: "low",
      advice: "Rest, clear fluids, avoid solid foods initially. See doctor if severe or persistent."
    },
    "fatigue": {
      conditions: ["viral infection", "anemia", "depression", "thyroid issues"],
      severity: "mild to severe",
      urgency: "low",
      advice: "Ensure adequate sleep, proper nutrition. Consult doctor if persistent fatigue."
    },
    "abdominal pain": {
      conditions: ["gastritis", "appendicitis", "food poisoning", "ulcer"],
      severity: "mild to severe",
      urgency: "moderate to high",
      advice: "Monitor pain location and intensity. Severe abdominal pain requires immediate medical attention."
    }
  },
  emergencyKeywords: [
    "chest pain", "difficulty breathing", "severe bleeding", "unconscious",
    "heart attack", "stroke", "severe burn", "choking", "poisoning",
    "severe allergic reaction", "suicide", "overdose"
  ]
};

class ChatbotAI {
  private classifier: any = null;
  private initialized = false;

  async initialize() {
    try {
      // Initialize a text classification pipeline for medical intent recognition
      this.classifier = await pipeline(
        "text-classification",
        "microsoft/DialoGPT-medium",
        { device: "webgpu" }
      );
      this.initialized = true;
    } catch (error) {
      console.warn("Failed to initialize AI model, falling back to rule-based system:", error);
      this.initialized = false;
    }
  }

  private isEmergency(message: string): boolean {
    const lowerMessage = message.toLowerCase();
    return MEDICAL_KNOWLEDGE.emergencyKeywords.some(keyword => 
      lowerMessage.includes(keyword)
    );
  }

  private findSymptoms(message: string): string[] {
    const lowerMessage = message.toLowerCase();
    const foundSymptoms: string[] = [];
    
    Object.keys(MEDICAL_KNOWLEDGE.symptoms).forEach(symptom => {
      if (lowerMessage.includes(symptom)) {
        foundSymptoms.push(symptom);
      }
    });
    
    return foundSymptoms;
  }

  private generateSymptomResponse(symptoms: string[]): string {
    if (symptoms.length === 0) {
      return "I understand you're concerned about your health. Could you describe your specific symptoms? I can help provide general information and guide you to appropriate care.";
    }

    const responses: string[] = [];
    let hasEmergency = false;

    symptoms.forEach(symptom => {
      const info = MEDICAL_KNOWLEDGE.symptoms[symptom];
      if (info) {
        if (info.urgency === "high") {
          hasEmergency = true;
          responses.push(`🚨 ${info.advice}`);
        } else {
          responses.push(
            `For ${symptom}: This could indicate ${info.conditions.slice(0, 2).join(" or ")}. ${info.advice}`
          );
        }
      }
    });

    if (hasEmergency) {
      return responses.join("\n\n");
    }

    return responses.join("\n\n") + "\n\n💡 For a more detailed analysis, try our Symptom Checker below for personalized health insights.";
  }

  private generateGeneralResponse(message: string): string {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
      return "Hello! I'm your AI health assistant powered by comprehensive medical datasets. I can provide symptom analysis, precautions, workout recommendations, dietary advice, and complete health solutions. What health concerns can I help you with today?";
    }

    if (lowerMessage.includes("how") && (lowerMessage.includes("work") || lowerMessage.includes("predict"))) {
      return "Our AI analyzes your symptoms using advanced machine learning trained on medical data. It considers symptom patterns, severity, medical knowledge, precautions, workouts, and dietary recommendations to provide comprehensive health solutions. Use our Symptom Checker for personalized predictions!";
    }

    if (lowerMessage.includes("thank")) {
      return "You're welcome! Remember, I provide evidence-based health information including precautions, exercises, and dietary advice for educational purposes. For medical diagnosis and treatment, always consult qualified healthcare professionals. How else can I assist you?";
    }

    if (lowerMessage.includes("doctor") || lowerMessage.includes("medical")) {
      return "While I can provide comprehensive health information including symptoms analysis, precautions, workouts, and diet recommendations, it's important to consult with healthcare professionals for medical concerns. I can help you understand symptoms and provide evidence-based guidance. What would you like to know?";
    }

    if (lowerMessage.includes("medication") || lowerMessage.includes("treatment")) {
      return "I can provide general information about treatments, precautions, supportive exercises, and dietary approaches, but specific medication recommendations must come from licensed healthcare providers. Our system can suggest comprehensive care approaches. What symptoms are you experiencing?";
    }

    if (lowerMessage.includes("workout") || lowerMessage.includes("exercise")) {
      return "I can recommend specific exercises and workout routines based on your health condition or symptoms. These are evidence-based recommendations that can support your health journey. What condition or health goal would you like exercise guidance for?";
    }

    if (lowerMessage.includes("diet") || lowerMessage.includes("nutrition")) {
      return "I can provide dietary recommendations and nutritional guidance based on your health condition or symptoms. This includes foods to eat, foods to avoid, and specific dietary instructions. What health condition would you like dietary advice for?";
    }

    return "I'm here to provide comprehensive health solutions including symptom analysis, precautions, exercise recommendations, and dietary guidance. I can help solve your health problems with evidence-based information. What specific health concern can I help you with today?";
  }

  async generateResponse(message: string): Promise<string> {
    try {
      // First check for emergency situations
      if (this.isEmergency(message)) {
        return "🚨 MEDICAL EMERGENCY DETECTED 🚨\n\nIf this is a life-threatening emergency, call 911 (US) or your local emergency number immediately. Do not wait for online advice.\n\nFor severe symptoms like chest pain, difficulty breathing, or loss of consciousness, seek immediate medical attention.";
      }

      // Try to get comprehensive response from enhanced dataset first
      const datasetResponse = datasetProcessor.generateDatasetResponse(message);
      if (datasetResponse) {
        return datasetResponse;
      }

      // Try to get a complete health solution
      const healthSolution = datasetProcessor.generateHealthSolution(message);
      if (healthSolution) {
        let response = `## 🩺 Health Analysis\n${healthSolution.analysis}\n\n`;
        
        if (healthSolution.precautions.length > 0) {
          response += `## ⚠️ Precautions\n${healthSolution.precautions.map(p => `- ${p}`).join('\n')}\n\n`;
        }
        
        if (healthSolution.workouts.length > 0) {
          response += `## 💪 Recommended Exercises\n${healthSolution.workouts.map(w => `- ${w}`).join('\n')}\n\n`;
        }
        
        if (healthSolution.diets.length > 0) {
          response += `## 🥗 Dietary Recommendations\n${healthSolution.diets.map(d => `- ${d}`).join('\n')}\n\n`;
        }

        if (healthSolution.urgency === "high") {
          response = "🚨 " + response;
        } else if (healthSolution.urgency === "moderate") {
          response = "⚠️ " + response;
        }

        response += "\n💡 Use our Symptom Checker for more detailed analysis.";
        return response;
      }

      // Find symptoms in the message using built-in knowledge
      const symptoms = this.findSymptoms(message);

      // Generate response based on symptoms found
      if (symptoms.length > 0) {
        return this.generateSymptomResponse(symptoms);
      }

      // Fall back to general responses with health solution guidance
      return this.generateGeneralResponse(message);

    } catch (error) {
      console.error("Error generating AI response:", error);
      return "I apologize, but I'm having trouble processing your request right now. For immediate health concerns, please consult a healthcare professional. You can also try our Symptom Checker below for health predictions.";
    }
  }

  async processSymptomsList(symptoms: string[]): Promise<{
    analysis: string;
    urgency: "low" | "moderate" | "high";
    recommendations: string[];
  }> {
    const urgencyLevels = symptoms.map(symptom => {
      const info = MEDICAL_KNOWLEDGE.symptoms[symptom.toLowerCase()];
      return info?.urgency || "low";
    });

    const highestUrgency = urgencyLevels.includes("high") ? "high" : 
                          urgencyLevels.includes("moderate") ? "moderate" : "low";

    const analysis = symptoms.length > 1 
      ? `Based on the combination of symptoms (${symptoms.join(", ")}), this could indicate several conditions that require medical evaluation.`
      : `The symptom "${symptoms[0]}" can have various causes and should be properly evaluated.`;

    const recommendations = [
      "Monitor your symptoms closely",
      "Keep a symptom diary with dates and severity",
      "Stay hydrated and get adequate rest",
      highestUrgency === "high" ? "Seek immediate medical attention" : "Consider consulting a healthcare provider"
    ];

    return {
      analysis,
      urgency: highestUrgency,
      recommendations
    };
  }
}

export const chatbotAI = new ChatbotAI();

// Initialize the AI service
chatbotAI.initialize().catch(console.error);