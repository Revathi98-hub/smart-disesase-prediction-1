import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Send, AlertCircle, CheckCircle, Info, Heart, Activity, Phone } from "lucide-react";
import { healthPredictionService, type PredictionResult } from "@/services/healthPrediction";

interface EmergencyAlert {
  isEmergency: boolean;
  message?: string;
}

export function SymptomChecker() {
  const { t, i18n } = useTranslation();
  const [symptoms, setSymptoms] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [emergency, setEmergency] = useState<EmergencyAlert>({ isEmergency: false });

  const analyzeSymptoms = async () => {
    if (!symptoms.trim()) return;
    
    setIsLoading(true);
    setResult(null);
    setEmergency({ isEmergency: false });
    
    try {
      // Check for emergency symptoms first
      const isEmergency = healthPredictionService.isEmergencyCase(symptoms);
      
      if (isEmergency) {
        setEmergency({
          isEmergency: true,
          message: "Your symptoms may require immediate medical attention. Please call emergency services or visit the nearest emergency room."
        });
        setIsLoading(false);
        return;
      }

      // Get AI prediction
      const prediction = await healthPredictionService.predictDisease({
        symptoms: symptoms,
        language: i18n.language
      });
      
      setResult(prediction);
    } catch (error) {
      console.error("Analysis failed:", error);
      // Show error message to user
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="symptom-checker" className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-12 animate-slide-up">
          <h2 className="text-3xl sm:text-4xl font-bold medical-heading mb-4">
            AI Symptom Analysis
          </h2>
          <p className="text-lg text-muted-foreground">
            Describe your symptoms and get instant AI-powered health insights with personalized recommendations.
          </p>
        </div>

        {/* Symptom Input */}
        <Card className="medical-card mb-8 animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Heart className="h-5 w-5 text-primary" />
              <span>{t("symptom_checker.title")}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder={t("symptom_checker.placeholder")}
              rows={6}
              className="min-h-[120px] resize-none focus:ring-2 focus:ring-primary/20"
            />
            <Button 
              onClick={analyzeSymptoms}
              disabled={!symptoms.trim() || isLoading}
              variant="medical"
              size="lg"
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t("symptom_checker.loading")}
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  {t("symptom_checker.analyze")}
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Emergency Alert */}
        {emergency.isEmergency && (
          <Alert className="border-destructive bg-destructive/5 animate-slide-up">
            <Phone className="h-4 w-4 text-destructive" />
            <AlertDescription className="text-destructive font-medium">
              <div className="flex items-start justify-between">
                <div>
                  <strong>⚠️ EMERGENCY ALERT</strong>
                  <p className="mt-1">{emergency.message}</p>
                  <p className="mt-2 text-sm">Emergency Services: 911 (US) | 112 (EU) | 999 (UK)</p>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  className="ml-4"
                  onClick={() => window.open('tel:911')}
                >
                  Call 911
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Results */}
        {result && !emergency.isEmergency && (
          <div className="space-y-6 animate-slide-up">
            {/* Main Prediction */}
            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <span>{t("results.disease")}</span>
                  </span>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    {result.confidence}% Confidence
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <h3 className="text-2xl font-bold text-primary mb-3">{result.disease}</h3>
                <p className="text-muted-foreground leading-relaxed">{result.description}</p>
              </CardContent>
            </Card>

            {/* Detailed Information Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Medications */}
              <Card className="medical-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-info">
                    <Info className="h-5 w-5" />
                    <span>{t("results.medications")}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {result.medications.map((med, index) => (
                      <Badge key={index} variant="outline" className="mr-2 mb-2">
                        {med}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Side Effects */}
              <Card className="medical-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-warning">
                    <AlertCircle className="h-5 w-5" />
                    <span>{t("results.side_effects")}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {result.sideEffects.map((effect, index) => (
                      <div key={index} className="text-sm text-muted-foreground">
                        • {effect}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Precautions */}
              <Card className="medical-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-secondary">
                    <CheckCircle className="h-5 w-5" />
                    <span>{t("results.precautions")}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {result.precautions.map((precaution, index) => (
                      <div key={index} className="text-sm text-muted-foreground">
                        • {precaution}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Diet Recommendations */}
              <Card className="medical-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-success">
                    <Heart className="h-5 w-5" />
                    <span>{t("results.diet")}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {result.diet.map((item, index) => (
                      <div key={index} className="text-sm text-muted-foreground">
                        • {item}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Exercise Plan */}
            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-accent">
                  <Activity className="h-5 w-5" />
                  <span>{t("results.exercise")}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {result.exercise.map((exercise, index) => (
                    <div key={index} className="text-sm text-muted-foreground bg-accent/5 p-3 rounded-lg">
                      • {exercise}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Disclaimer */}
            <Card className="border-warning/50 bg-warning/5">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-warning mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-warning mb-2">Medical Disclaimer</h4>
                    <p className="text-sm text-muted-foreground">
                      This AI analysis is for informational purposes only and should not replace professional medical advice. 
                      Please consult with a qualified healthcare provider for proper diagnosis and treatment.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
}