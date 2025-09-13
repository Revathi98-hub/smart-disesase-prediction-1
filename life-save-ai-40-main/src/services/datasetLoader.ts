import { datasetProcessor } from "@/utils/datasetProcessor";

export class DatasetLoader {
  private static instance: DatasetLoader;
  private loaded = false;

  private constructor() {}

  static getInstance(): DatasetLoader {
    if (!DatasetLoader.instance) {
      DatasetLoader.instance = new DatasetLoader();
    }
    return DatasetLoader.instance;
  }

  async loadSampleDataset(): Promise<void> {
    if (this.loaded) {
      console.log("Dataset already loaded");
      return;
    }

    try {
      console.log("Loading comprehensive health dataset...");
      
      // Load the comprehensive dataset
      const response = await fetch('/comprehensive-health-dataset.json');
      const data = await response.json();

      // Load all dataset types
      await datasetProcessor.loadSymptomsDataset(data.symptoms);
      await datasetProcessor.loadDiseasesDataset(data.diseases);
      await datasetProcessor.loadPrecautionsDataset(data.precautions);
      await datasetProcessor.loadWorkoutsDataset(data.workouts);
      await datasetProcessor.loadDietsDataset(data.diets);

      this.loaded = true;
      
      const stats = datasetProcessor.getStatistics();
      console.log("Dataset loaded successfully:", stats);
      
    } catch (error) {
      console.error("Failed to load dataset:", error);
      console.log("Chatbot will use built-in knowledge base");
    }
  }

  async loadCustomDataset(datasetUrl: string): Promise<void> {
    try {
      console.log(`Loading custom dataset from: ${datasetUrl}`);
      
      const response = await fetch(datasetUrl);
      const data = await response.json();

      // Load all available dataset types
      if (data.symptoms) {
        await datasetProcessor.loadSymptomsDataset(data.symptoms);
      }
      
      if (data.diseases) {
        await datasetProcessor.loadDiseasesDataset(data.diseases);
      }
      
      if (data.precautions) {
        await datasetProcessor.loadPrecautionsDataset(data.precautions);
      }
      
      if (data.workouts) {
        await datasetProcessor.loadWorkoutsDataset(data.workouts);
      }
      
      if (data.diets) {
        await datasetProcessor.loadDietsDataset(data.diets);
      }

      this.loaded = true;
      
      const stats = datasetProcessor.getStatistics();
      console.log("Custom dataset loaded successfully:", stats);
      
    } catch (error) {
      console.error("Failed to load custom dataset:", error);
      throw error;
    }
  }

  isLoaded(): boolean {
    return this.loaded;
  }

  getStats() {
    return datasetProcessor.getStatistics();
  }
}

export const datasetLoader = DatasetLoader.getInstance();