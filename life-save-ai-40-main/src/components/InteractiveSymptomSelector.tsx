import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Minus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Symptom {
  name: string;
  severity: string;
  duration: string;
  selected: boolean;
}

interface InteractiveSymptomSelectorProps {
  initialSymptoms: Symptom[];
  onSymptomsChange?: (symptoms: Symptom[]) => void;
}

export function InteractiveSymptomSelector({ 
  initialSymptoms, 
  onSymptomsChange 
}: InteractiveSymptomSelectorProps) {
  const [symptoms, setSymptoms] = useState<Symptom[]>(
    initialSymptoms.map(s => ({ ...s, selected: true }))
  );
  const [searchTerm, setSearchTerm] = useState("");

  const availableSymptoms = [
    "Fever", "Cough", "Headache", "Nausea", "Dizziness", "Chest pain",
    "Shortness of breath", "Muscle aches", "Joint pain", "Rash",
    "Abdominal pain", "Vomiting", "Diarrhea", "Loss of appetite",
    "Insomnia", "Anxiety", "Depression", "Back pain"
  ];

  const toggleSymptom = (symptomName: string) => {
    const updatedSymptoms = symptoms.map(symptom => 
      symptom.name === symptomName 
        ? { ...symptom, selected: !symptom.selected }
        : symptom
    );
    setSymptoms(updatedSymptoms);
    onSymptomsChange?.(updatedSymptoms);
  };

  const addSymptom = (symptomName: string) => {
    const newSymptom: Symptom = {
      name: symptomName,
      severity: "Mild",
      duration: "1 day",
      selected: true
    };
    const updatedSymptoms = [...symptoms, newSymptom];
    setSymptoms(updatedSymptoms);
    onSymptomsChange?.(updatedSymptoms);
  };

  const removeSymptom = (symptomName: string) => {
    const updatedSymptoms = symptoms.filter(s => s.name !== symptomName);
    setSymptoms(updatedSymptoms);
    onSymptomsChange?.(updatedSymptoms);
  };

  const updateSeverity = (symptomName: string, severity: string) => {
    const updatedSymptoms = symptoms.map(symptom =>
      symptom.name === symptomName
        ? { ...symptom, severity }
        : symptom
    );
    setSymptoms(updatedSymptoms);
    onSymptomsChange?.(updatedSymptoms);
  };

  const filteredAvailableSymptoms = availableSymptoms.filter(
    symptom => 
      !symptoms.some(s => s.name === symptom) &&
      symptom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedSymptoms = symptoms.filter(s => s.selected);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Interactive Symptom Selector</span>
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            {selectedSymptoms.length} selected
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Symptoms */}
        <div className="space-y-2">
          <h4 className="font-medium">Current Symptoms</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {symptoms.map((symptom, index) => (
              <div 
                key={index} 
                className={`p-3 rounded-lg border transition-all ${
                  symptom.selected 
                    ? 'bg-primary/5 border-primary/20' 
                    : 'bg-muted/30 border-muted opacity-60'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Button
                        size="sm"
                        variant={symptom.selected ? "default" : "outline"}
                        onClick={() => toggleSymptom(symptom.name)}
                        className="h-6 px-2 text-xs"
                      >
                        {symptom.selected ? "Selected" : "Select"}
                      </Button>
                      <span className="font-medium text-sm">{symptom.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <select
                        value={symptom.severity}
                        onChange={(e) => updateSeverity(symptom.name, e.target.value)}
                        className="text-xs border rounded px-2 py-1 bg-background"
                      >
                        <option value="Mild">Mild</option>
                        <option value="Moderate">Moderate</option>
                        <option value="Severe">Severe</option>
                      </select>
                      <span className="text-xs text-muted-foreground">{symptom.duration}</span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeSymptom(symptom.name)}
                    className="h-6 w-6 p-0 text-destructive hover:bg-destructive/10"
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add New Symptoms */}
        <div className="space-y-2">
          <h4 className="font-medium">Add Symptoms</h4>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search symptoms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
            {filteredAvailableSymptoms.map((symptom) => (
              <Button
                key={symptom}
                size="sm"
                variant="outline"
                onClick={() => addSymptom(symptom)}
                className="h-7 px-3 text-xs hover:bg-primary/10"
              >
                <Plus className="h-3 w-3 mr-1" />
                {symptom}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}