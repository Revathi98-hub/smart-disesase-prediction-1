import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Stethoscope, Brain, Shield } from "lucide-react";
import { DetailedReport } from "./DetailedReport";
import heroImage from "@/assets/healthcare-hero.jpg";

export function HeroSection() {
  const { t } = useTranslation();
  const [showDetailedReport, setShowDetailedReport] = useState(false);

  const scrollToSymptomChecker = () => {
    const element = document.querySelector('#symptom-checker');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToFeatures = () => {
    const element = document.querySelector('#features');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center bg-gradient-trust overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Healthcare Technology" 
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/70" />
      </div>

      {/* Floating Medical Icons */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 animate-pulse-soft">
          <Stethoscope className="h-8 w-8 text-primary/30" />
        </div>
        <div className="absolute top-32 right-16 animate-pulse-soft delay-300">
          <Brain className="h-10 w-10 text-secondary/30" />
        </div>
        <div className="absolute bottom-32 left-20 animate-pulse-soft delay-700">
          <Shield className="h-12 w-12 text-accent/30" />
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="animate-slide-up">
            <div className="flex items-center space-x-2 mb-6">
              <div className="h-2 w-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                AI-Powered Healthcare
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              <span className="medical-heading">
                {t("hero.title")}
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl">
              {t("hero.subtitle")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button 
                variant="medical" 
                size="xl" 
                className="group"
                onClick={scrollToSymptomChecker}
              >
                {t("hero.cta")}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              
              <Button 
                variant="outline" 
                size="xl" 
                className="group"
                onClick={scrollToFeatures}
              >
                <Play className="mr-2 h-5 w-5" />
                {t("hero.learn_more")}
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border/50">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">98%</div>
                <div className="text-sm text-muted-foreground">Accuracy Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">500+</div>
                <div className="text-sm text-muted-foreground">Diseases Covered</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">24/7</div>
                <div className="text-sm text-muted-foreground">AI Support</div>
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative lg:mt-0 mt-8 animate-fade-in">
            <div className="relative">
              {/* Main Card */}
              <div className="medical-card p-8 max-w-md mx-auto lg:mx-0 lg:ml-auto">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="h-12 w-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                    <Brain className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Smart Analysis</h3>
                    <p className="text-sm text-muted-foreground">AI-Powered Diagnosis</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Symptom Analysis</span>
                    <span className="text-sm font-medium text-success">Complete</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-gradient-primary h-2 rounded-full w-full transition-all duration-1000"></div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm">Confidence Level</span>
                    <span className="text-sm font-medium text-primary">95%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-gradient-healing h-2 rounded-full w-4/5 transition-all duration-1000"></div>
                  </div>
                </div>

                <Button 
                  variant="success" 
                  size="sm" 
                  className="w-full mt-6"
                  onClick={() => setShowDetailedReport(true)}
                >
                  View Detailed Report
                </Button>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-primary/20 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-healing/20 rounded-full blur-xl animate-pulse delay-500"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Report Modal */}
      <DetailedReport 
        isOpen={showDetailedReport}
        onClose={() => setShowDetailedReport(false)}
        patientData={{
          name: "Demo User",
          age: 28,
          condition: "Optimal Health Status",
          confidence: 95
        }}
      />
    </section>
  );
}