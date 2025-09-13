import { useTranslation } from "react-i18next";
import { Activity, Mail, Phone, MapPin, Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer id="contact" className="bg-card border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
                <Activity className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-foreground">HealthAI</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Advanced AI-powered healthcare solutions for accurate disease prediction, 
              personalized treatment, and preventive care.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">How It Works</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Symptom Analysis</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Disease Prediction</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Treatment Plans</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Health Monitoring</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Expert Consultation</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">support@healthai.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-primary mt-0.5" />
                <span className="text-muted-foreground">
                  123 Healthcare Avenue<br />
                  Medical District, CA 90210
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              © 2024 HealthAI. All rights reserved. HIPAA Compliant Healthcare Platform.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Medical Disclaimer
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Cookie Policy
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}