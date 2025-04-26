import * as faceapi from "face-api.js";

export const FACE_API_CONFIG = {
  minFaceSize: 50,
  inputSize: 224,
  scoreThreshold: 0.5,
};

const configureFaceApi = () => {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return;
  }

  try {
    faceapi.env.monkeyPatch({
      Canvas: window.HTMLCanvasElement,
      Image: window.HTMLImageElement,
      ImageData: window.ImageData,
      Video: window.HTMLVideoElement,
      createCanvasElement: () => document.createElement("canvas"),
      createImageElement: () => document.createElement("img"),
    });
  } catch (error) {
    console.error("Error configuring face-api:", error);
  }
};

configureFaceApi();

export const getFaceDetectorOptions = ():
  | faceapi.TinyFaceDetectorOptions
  | undefined => {
  if (
    typeof window !== "undefined" &&
    typeof faceapi.TinyFaceDetectorOptions !== "undefined"
  ) {
    return new faceapi.TinyFaceDetectorOptions(FACE_API_CONFIG);
  }
  return undefined;
};
