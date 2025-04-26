import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FaceDetection {
  id: string;
  age?: number;
  gender?: string;
  expressions?: {
    neutral: number;
    happy: number;
    sad: number;
    angry: number;
    fearful: number;
    disgusted: number;
    surprised: number;
  };
  angle?: number;
  boundingBox: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  name?: string;
}

interface FaceState {
  isWebcamOn: boolean;
  detectedFaces: FaceDetection[];
  isProcessing: boolean;
  selectedImage: string | null;
  uploadedImage: string | null;
  isUploadMode: boolean;
}

const initialState: FaceState = {
  isWebcamOn: false,
  detectedFaces: [],
  isProcessing: false,
  selectedImage: null,
  uploadedImage: null,
  isUploadMode: false,
};

const faceSlice = createSlice({
  name: "face",
  initialState,
  reducers: {
    toggleWebcam: (state) => {
      state.isWebcamOn = !state.isWebcamOn;
      if (!state.isWebcamOn) {
        state.detectedFaces = [];
      }
    },
    setProcessing: (state, action: PayloadAction<boolean>) => {
      state.isProcessing = action.payload;
    },
    setDetectedFaces: (state, action: PayloadAction<FaceDetection[]>) => {
      state.detectedFaces = action.payload;
    },
    setSelectedImage: (state, action: PayloadAction<string | null>) => {
      state.selectedImage = action.payload;
    },
    clearDetectedFaces: (state) => {
      state.detectedFaces = [];
    },
    setUploadedImage: (state, action: PayloadAction<string | null>) => {
      state.uploadedImage = action.payload;
      state.isWebcamOn = false;
      state.isUploadMode = true;
    },
    setUploadMode: (state, action: PayloadAction<boolean>) => {
      state.isUploadMode = action.payload;
      if (!action.payload) {
        state.uploadedImage = null;
      }
    },
  },
});

export const {
  toggleWebcam,
  setProcessing,
  setDetectedFaces,
  setSelectedImage,
  clearDetectedFaces,
  setUploadedImage,
  setUploadMode,
} = faceSlice.actions;

export default faceSlice.reducer;
