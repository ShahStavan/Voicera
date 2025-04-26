import * as faceapi from "face-api.js";
import { FACE_API_CONFIG } from "./face-api.config";

const initFaceApiBrowser = async () => {
  // Only run on client side
  if (typeof window === "undefined") return;

  try {
    // Configure environment
    faceapi.env.monkeyPatch({
      Canvas: HTMLCanvasElement,
      Image: HTMLImageElement,
      ImageData: ImageData,
      Video: HTMLVideoElement,
      createCanvasElement: () => document.createElement("canvas"),
      createImageElement: () => document.createElement("img"),
    });

    // Load models
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      faceapi.nets.faceExpressionNet.loadFromUri("/models"),
      faceapi.nets.ageGenderNet.loadFromUri("/models"),
    ]);
  } catch (error) {
    console.error("Error initializing face-api:", error);
  }
};

export const getFaceDetectorOptions = () => {
  if (typeof window === "undefined") return;
  return new faceapi.TinyFaceDetectorOptions(FACE_API_CONFIG);
};

export default initFaceApiBrowser;
