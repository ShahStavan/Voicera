import React, { useEffect, useState } from "react";
import * as faceapi from "face-api.js";
import { Progress } from "@/components/ui/progress";
import { Command, Loader2 } from "lucide-react";

interface ModelLoaderProps {
  children: React.ReactNode;
}

const ModelLoader: React.FC<ModelLoaderProps> = ({ children }) => {
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentModel, setCurrentModel] = useState("");

  useEffect(() => {
    async function loadModels() {
      try {
        const models = [
          {
            name: "Tiny Face Detector",
            load: () => faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
          },
          {
            name: "Face Landmark Model",
            load: () => faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
          },
          {
            name: "Face Recognition Model",
            load: () => faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
          },
          {
            name: "Face Expression Model",
            load: () => faceapi.nets.faceExpressionNet.loadFromUri("/models"),
          },
          {
            name: "Age & Gender Model",
            load: () => faceapi.nets.ageGenderNet.loadFromUri("/models"),
          },
        ];

        for (let i = 0; i < models.length; i++) {
          setCurrentModel(models[i].name);
          await models[i].load();
          setProgress(((i + 1) / models.length) * 100);
        }

        setModelsLoaded(true);
      } catch (error) {
        console.error("Error loading models:", error);
      }
    }

    if (typeof window !== "undefined") {
      loadModels();
    }
  }, []);

  if (!modelsLoaded) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <div className="w-full max-w-md mx-auto p-8 rounded-xl bg-card shadow-lg border">
          <div className="flex items-center justify-center mb-6">
            <Command className="h-12 w-12 text-primary" strokeWidth={1.5} />
          </div>

          <h1 className="text-2xl font-bold font-outfit text-center mb-1">
            <span className="text-primary">Voicera</span> is loading
          </h1>
          <p className="text-center text-muted-foreground mb-6">
            Initializing facial recognition models
          </p>

          <div className="space-y-5">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium flex items-center gap-2">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  {currentModel}
                </span>
                <span className="text-sm text-muted-foreground">
                  {Math.round(progress)}%
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <div className="text-xs text-muted-foreground bg-muted/20 p-3 rounded border">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse"></div>
                <span className="font-medium">
                  Loading neural network models
                </span>
              </div>
              <p>
                This may take a moment depending on your connection speed. The
                models are loaded locally for privacy and performance.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ModelLoader;
