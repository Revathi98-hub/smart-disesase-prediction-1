// Mock ML Service for Disease Prediction
// In production, this would connect to your actual ML backend

export interface SymptomData {
  symptoms: string;
  language: string;
}

export interface PredictionResult {
  disease: string;
  confidence: number;
  description: string;
  medications: string[];
  sideEffects: string[];
  precautions: string[];
  diet: string[];
  exercise: string[];
}

class HealthPredictionService {
  private diseaseDatabase: Record<string, PredictionResult> = {
    "common_cold": {
      disease: "Common Cold",
      confidence: 85,
      description: "A viral infection of the upper respiratory tract that commonly affects the nose and throat. Typically caused by rhinoviruses and is highly contagious.",
      medications: ["Acetaminophen (Tylenol)", "Ibuprofen (Advil)", "Decongestants", "Cough suppressants", "Throat lozenges"],
      sideEffects: ["Drowsiness", "Dry mouth", "Stomach upset", "Dizziness", "Headache"],
      precautions: ["Get plenty of rest (8-10 hours)", "Stay hydrated with warm fluids", "Avoid close contact with others", "Wash hands frequently", "Use tissues when sneezing"],
      diet: ["Warm fluids (tea, broth)", "Vitamin C rich foods (citrus, berries)", "Honey and ginger tea", "Avoid dairy temporarily", "Chicken soup"],
      exercise: ["Light walking only", "Avoid strenuous activities", "Rest until fever subsides", "Gentle breathing exercises", "Avoid gym/public spaces"]
    },
    "seasonal_allergies": {
      disease: "Seasonal Allergies (Allergic Rhinitis)",
      confidence: 78,
      description: "An immune system response to airborne allergens such as pollen, dust mites, or pet dander. Symptoms typically worsen during specific seasons.",
      medications: ["Antihistamines (Claritin, Zyrtec)", "Nasal corticosteroids", "Decongestants", "Eye drops", "Allergy shots (immunotherapy)"],
      sideEffects: ["Drowsiness", "Dry mouth", "Blurred vision", "Headache", "Nosebleeds (nasal sprays)"],
      precautions: ["Avoid known allergens", "Keep windows closed during high pollen", "Use air purifiers", "Monitor pollen counts", "Shower after outdoor activities"],
      diet: ["Anti-inflammatory foods", "Local honey", "Quercetin-rich foods (onions, apples)", "Avoid trigger foods", "Reduce dairy during flare-ups"],
      exercise: ["Indoor exercises during high pollen", "Swimming in chlorinated pools", "Yoga and stretching", "Avoid outdoor morning runs", "Exercise after rain"]
    },
    "tension_headache": {
      disease: "Tension Headache",
      confidence: 72,
      description: "The most common type of headache, often caused by stress, poor posture, eye strain, or muscle tension in the head and neck area.",
      medications: ["Acetaminophen", "Ibuprofen", "Aspirin", "Topical pain relievers", "Muscle relaxants (if prescribed)"],
      sideEffects: ["Stomach irritation", "Drowsiness", "Rebound headaches", "Allergic reactions", "Liver damage (with overuse)"],
      precautions: ["Manage stress levels", "Maintain regular sleep schedule", "Stay hydrated", "Take breaks from screens", "Correct posture"],
      diet: ["Regular balanced meals", "Limit caffeine intake", "Stay well-hydrated", "Avoid alcohol", "Limit processed foods"],
      exercise: ["Neck and shoulder stretches", "Gentle yoga", "Regular walking", "Posture exercises", "Relaxation techniques"]
    },
    "migraine": {
      disease: "Migraine Headache",
      confidence: 82,
      description: "A neurological condition characterized by intense, throbbing headaches often accompanied by nausea, sensitivity to light and sound.",
      medications: ["Triptans (Sumatriptan)", "NSAIDs", "Anti-nausea medication", "Preventive medications", "Ergotamines"],
      sideEffects: ["Nausea", "Dizziness", "Drowsiness", "Muscle weakness", "Chest tightness"],
      precautions: ["Identify and avoid triggers", "Maintain regular sleep", "Manage stress", "Stay hydrated", "Keep a headache diary"],
      diet: ["Avoid trigger foods (chocolate, aged cheese)", "Regular meal times", "Limit caffeine", "Stay hydrated", "Consider magnesium supplements"],
      exercise: ["Gentle aerobic exercise", "Yoga and meditation", "Avoid intense exercise during attacks", "Regular walking", "Relaxation techniques"]
    },
    "gastroenteritis": {
      disease: "Gastroenteritis (Stomach Flu)",
      confidence: 80,
      description: "Inflammation of the stomach and intestines, usually caused by viral or bacterial infection, resulting in nausea, vomiting, and diarrhea.",
      medications: ["Oral rehydration solutions", "Anti-diarrheal medication", "Probiotics", "Electrolyte supplements", "Antiemetics (for nausea)"],
      sideEffects: ["Constipation (anti-diarrheals)", "Drowsiness", "Dry mouth", "Bloating", "Abdominal cramping"],
      precautions: ["Stay hydrated", "Rest and avoid solid foods initially", "Practice good hygiene", "Isolate to prevent spread", "Monitor for dehydration"],
      diet: ["Clear fluids initially", "BRAT diet (bananas, rice, applesauce, toast)", "Probiotics", "Avoid dairy temporarily", "Gradual return to normal diet"],
      exercise: ["Complete rest initially", "Light walking when feeling better", "Avoid strenuous activity", "Stay near bathroom facilities", "Resume gradually"]
    },
    "anxiety": {
      disease: "Anxiety Disorder",
      confidence: 75,
      description: "A mental health condition characterized by excessive worry, fear, or nervousness that interferes with daily activities and quality of life.",
      medications: ["SSRIs (Sertraline, Escitalopram)", "Benzodiazepines (short-term)", "Beta-blockers", "Buspirone", "Therapy (CBT)"],
      sideEffects: ["Drowsiness", "Weight changes", "Sexual dysfunction", "Nausea", "Dependency risk (benzodiazepines)"],
      precautions: ["Avoid caffeine and alcohol", "Maintain regular sleep", "Practice stress management", "Stay connected with support system", "Monitor mood changes"],
      diet: ["Limit caffeine and sugar", "Omega-3 fatty acids", "Complex carbohydrates", "Magnesium-rich foods", "Avoid excessive alcohol"],
      exercise: ["Regular aerobic exercise", "Yoga and meditation", "Deep breathing exercises", "Walking in nature", "Progressive muscle relaxation"]
    }
  };

  private keywordPatterns = {
    "common_cold": ["cold", "runny nose", "congestion", "sore throat", "cough", "sneezing", "fever", "body aches"],
    "seasonal_allergies": ["allergies", "sneezing", "itchy eyes", "watery eyes", "runny nose", "seasonal", "pollen", "hay fever"],
    "tension_headache": ["headache", "head pain", "tension", "stress", "tight", "pressure", "band around head"],
    "migraine": ["migraine", "severe headache", "throbbing", "pulsing", "nausea", "light sensitivity", "sound sensitivity", "aura"],
    "gastroenteritis": ["stomach flu", "nausea", "vomiting", "diarrhea", "stomach pain", "abdominal pain", "food poisoning"],
    "anxiety": ["anxiety", "worried", "nervous", "panic", "racing heart", "sweating", "restless", "fear", "anxious"]
  };

  async predictDisease(symptomData: SymptomData): Promise<PredictionResult> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));

    const symptoms = symptomData.symptoms.toLowerCase();
    
    // Score each condition based on keyword matching
    const scores: Record<string, number> = {};
    
    for (const [condition, keywords] of Object.entries(this.keywordPatterns)) {
      let score = 0;
      for (const keyword of keywords) {
        if (symptoms.includes(keyword)) {
          score += 1;
        }
      }
      scores[condition] = score;
    }

    // Find the condition with the highest score
    const bestMatch = Object.entries(scores).reduce((a, b) => 
      scores[a[0]] > scores[b[0]] ? a : b
    );

    const [conditionKey, matchScore] = bestMatch;
    
    // If no good match found, default to common cold
    if (matchScore === 0) {
      return this.diseaseDatabase["common_cold"];
    }

    // Adjust confidence based on match quality
    const baseResult = this.diseaseDatabase[conditionKey];
    const adjustedConfidence = Math.min(95, Math.max(60, baseResult.confidence + (matchScore * 5)));

    return {
      ...baseResult,
      confidence: adjustedConfidence
    };
  }

  // Mock function to get health recommendations based on patient profile
  async getPersonalizedRecommendations(patientProfile: any): Promise<any> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      lifestyle: [
        "Maintain regular sleep schedule (7-9 hours)",
        "Stay hydrated (8 glasses of water daily)",
        "Exercise regularly (30 minutes, 5 days/week)",
        "Practice stress management techniques"
      ],
      nutrition: [
        "Eat a balanced diet rich in fruits and vegetables",
        "Limit processed foods and added sugars",
        "Include omega-3 fatty acids in your diet",
        "Consider vitamin D supplementation"
      ],
      preventive: [
        "Schedule regular check-ups with your healthcare provider",
        "Stay up to date with vaccinations",
        "Monitor blood pressure and cholesterol",
        "Practice good hygiene habits"
      ]
    };
  }

  // Mock function for emergency assessment
  isEmergencyCase(symptoms: string): boolean {
    const emergencyKeywords = [
      "chest pain", "difficulty breathing", "severe headache", "high fever",
      "blood", "unconscious", "stroke", "heart attack", "severe abdominal pain"
    ];
    
    const lowerSymptoms = symptoms.toLowerCase();
    return emergencyKeywords.some(keyword => lowerSymptoms.includes(keyword));
  }
}

export const healthPredictionService = new HealthPredictionService();