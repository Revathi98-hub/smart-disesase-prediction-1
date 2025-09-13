import { useTranslation } from "react-i18next";
import { Brain, Heart, Pill, Activity, Shield, Users } from "lucide-react";

export function FeaturesSection() {
  const { t } = useTranslation();

  const features = [
    {
      icon: Brain,
      title: t("features.symptom.title"),
      description: t("features.symptom.desc"),
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      icon: Activity,
      title: t("features.prediction.title"),
      description: t("features.prediction.desc"),
      color: "text-secondary",
      bgColor: "bg-secondary/10"
    },
    {
      icon: Pill,
      title: t("features.treatment.title"),
      description: t("features.treatment.desc"),
      color: "text-accent",
      bgColor: "bg-accent/10"
    },
    {
      icon: Heart,
      title: "Health Monitoring",
      description: "Continuous tracking and personalized health insights",
      color: "text-warning",
      bgColor: "bg-warning/10"
    },
    {
      icon: Shield,
      title: "Data Security",
      description: "HIPAA-compliant secure data protection and privacy",
      color: "text-success",
      bgColor: "bg-success/10"
    },
    {
      icon: Users,
      title: "Expert Network",
      description: "Connect with certified healthcare professionals",
      color: "text-info",
      bgColor: "bg-info/10"
    }
  ];

  return (
    <section id="features" className="py-24 bg-gradient-trust">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-3xl sm:text-4xl font-bold medical-heading mb-4">
            {t("features.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive AI-powered healthcare solutions designed to provide accurate predictions, 
            personalized treatments, and preventive care strategies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="medical-card group animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start space-x-4">
                <div className={`${feature.bgColor} p-3 rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2 text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="medical-card inline-block p-8 max-w-2xl">
            <h3 className="text-2xl font-bold mb-4 medical-heading">
              Ready to Start Your Health Journey?
            </h3>
            <p className="text-muted-foreground mb-6">
              Join thousands who trust our AI-powered healthcare platform for accurate 
              disease prediction and personalized treatment recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                className="bg-gradient-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:shadow-xl hover:scale-105 transition-all duration-300"
                onClick={() => {
                  const element = document.querySelector('#symptom-checker');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Start Free Analysis
              </button>
              <button 
                className="border border-border px-8 py-3 rounded-lg font-medium hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                onClick={() => {
                  const element = document.querySelector('#features');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}