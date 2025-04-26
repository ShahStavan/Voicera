"use client";

import React, { useRef, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setDetectedFaces, setProcessing } from "../../redux/faceSlice";
import * as faceapi from "face-api.js";
import {
  WithFaceDetection,
  WithFaceExpressions,
  WithFaceLandmarks,
} from "face-api.js";
import { Point } from "face-api.js";
import { Video, Camera, Crosshair, AlertTriangle } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import initFaceApiBrowser from "@/config/face-api-browser";
import WebcamJS from "webcamjs";

// Initialize face-api.js for browser
if (typeof window !== "undefined") {
  initFaceApiBrowser();
}

const WebcamCapture: React.FC = () => {
  const webcamRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [hasWebcamError, setHasWebcamError] = useState(false);
  const dispatch = useAppDispatch();
  const { isWebcamOn, isProcessing, uploadedImage, isUploadMode } =
    useAppSelector((state) => state.face);

  const initializeWebcam = () => {
    if (webcamRef.current) {
      WebcamJS.set({
        width: 1280,
        height: 720,
        image_format: "jpeg",
        jpeg_quality: 90,
        flip_horiz: true,
      });

      try {
        WebcamJS.attach(webcamRef.current);
        setIsVideoReady(true);
        setHasWebcamError(false);
      } catch (error) {
        console.error("Webcam error:", error);
        setHasWebcamError(true);
        setIsVideoReady(false);
      }
    }
  };

  const stopWebcam = () => {
    try {
      if (webcamRef.current) {
        WebcamJS.reset();
      }
    } catch (error) {
      console.error("Error stopping webcam:", error);
    }
    setIsVideoReady(false);
  };

  const captureFrame = (): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      WebcamJS.snap((data_uri: string) => {
        const img = new Image();
        img.src = data_uri;
        img.onload = () => resolve(img);
        img.onerror = reject;
      });
    });
  };

  // Existing face detection functions
  const drawFaceDetections = (
    detections: WithFaceExpressions<
      WithFaceLandmarks<
        WithFaceDetection<{ detection: faceapi.FaceDetection }> & {
          age: number;
          gender: string;
        }
      >
    >[]
  ) => {
    if (canvasRef.current && webcamRef.current) {
      const displaySize = {
        width: 1280,
        height: 720,
      };

      // Set canvas size to match video
      canvasRef.current.width = displaySize.width;
      canvasRef.current.height = displaySize.height;

      faceapi.matchDimensions(canvasRef.current, displaySize);
      const resizedDetections = faceapi.resizeResults(detections, displaySize);

      // Clear previous drawings
      const ctx = canvasRef.current.getContext("2d");
      if (!ctx) return;

      ctx.clearRect(0, 0, displaySize.width, displaySize.height);

      // Custom drawing styles
      resizedDetections.forEach((detection) => {
        const box = detection.detection.box;
        ctx.strokeStyle = "rgba(62, 116, 255, 0.8)";
        ctx.lineWidth = 2;
        ctx.beginPath();

        // Draw corners only
        const cornerLength = 20;
        const radius = 5;

        // Top left corner
        ctx.moveTo(box.x + cornerLength, box.y);
        ctx.lineTo(box.x + radius, box.y);
        ctx.quadraticCurveTo(box.x, box.y, box.x, box.y + radius);
        ctx.lineTo(box.x, box.y + cornerLength);

        // Top right corner
        ctx.moveTo(box.right - cornerLength, box.y);
        ctx.lineTo(box.right - radius, box.y);
        ctx.quadraticCurveTo(box.right, box.y, box.right, box.y + radius);
        ctx.lineTo(box.right, box.y + cornerLength);

        // Bottom right corner
        ctx.moveTo(box.right, box.bottom - cornerLength);
        ctx.lineTo(box.right, box.bottom - radius);
        ctx.quadraticCurveTo(
          box.right,
          box.bottom,
          box.right - radius,
          box.bottom
        );
        ctx.lineTo(box.right - cornerLength, box.bottom);

        // Bottom left corner
        ctx.moveTo(box.x, box.bottom - cornerLength);
        ctx.lineTo(box.x, box.bottom - radius);
        ctx.quadraticCurveTo(box.x, box.bottom, box.x + radius, box.bottom);
        ctx.lineTo(box.x + cornerLength, box.bottom);

        ctx.stroke();

        // Draw landmarks
        ctx.fillStyle = "rgba(62, 116, 255, 0.6)";
        detection.landmarks.positions.forEach((point: Point) => {
          ctx.beginPath();
          ctx.arc(point.x, point.y, 2, 0, 2 * Math.PI);
          ctx.fill();
        });

        // Add face info text
        ctx.font = "16px Inter";
        ctx.fillStyle = "white";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 3;
        const text = `Age: ${Math.round(detection.age)} | ${detection.gender}`;
        const textX = box.x;
        const textY = box.y - 10;

        // Draw text stroke for better visibility
        ctx.strokeText(text, textX, textY);
        ctx.fillText(text, textX, textY);

        // Draw expression indicator
        const mainExpression = Object.entries(detection.expressions).reduce<
          [string, number]
        >(
          (a, b) => (a[1] > b[1] ? a : b),
          ["neutral", 0] // Initial value
        )[0];
        const expressionText = `${
          mainExpression.charAt(0).toUpperCase() + mainExpression.slice(1)
        }`;
        ctx.strokeText(expressionText, textX, textY - 25);
        ctx.fillText(expressionText, textX, textY - 25);
      });
    }
  };

  const detectFaces = async (input: HTMLImageElement) => {
    if (!canvasRef.current) return;

    try {
      dispatch(setProcessing(true));
      const detections = await faceapi
        .detectAllFaces(input, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions()
        .withAgeAndGender();

      const faces = detections.map((detection) => {
        // Ensure all required expression properties are present with proper types
        const expressions = {
          neutral: Number(detection.expressions.neutral.toFixed(3)),
          happy: Number(detection.expressions.happy.toFixed(3)),
          sad: Number(detection.expressions.sad.toFixed(3)),
          angry: Number(detection.expressions.angry.toFixed(3)),
          fearful: Number(detection.expressions.fearful.toFixed(3)),
          disgusted: Number(detection.expressions.disgusted.toFixed(3)),
          surprised: Number(detection.expressions.surprised.toFixed(3)),
        };

        return {
          id: uuidv4(),
          age: Math.round(detection.age),
          gender: detection.gender,
          expressions,
          boundingBox: {
            x: detection.detection.box.x,
            y: detection.detection.box.y,
            width: detection.detection.box.width,
            height: detection.detection.box.height,
          },
          angle: Math.round(
            Math.atan2(
              detection.landmarks.positions[45].y -
                detection.landmarks.positions[36].y,
              detection.landmarks.positions[45].x -
                detection.landmarks.positions[36].x
            ) *
              (180 / Math.PI)
          ),
        };
      });

      dispatch(setDetectedFaces(faces));

      // Draw detections on canvas
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, input.width, input.height);
        ctx.drawImage(input, 0, 0, input.width, input.height);
        drawFaceDetections(detections);
      }
    } catch (error) {
      console.error("Error in face detection:", error);
    } finally {
      dispatch(setProcessing(false));
    }
  };

  const processWebcam = async () => {
    if (isWebcamOn && isVideoReady) {
      try {
        const frame = await captureFrame();
        await detectFaces(frame);
      } catch (error) {
        console.error("Error processing webcam frame:", error);
      }
    }
  };

  const processUploadedImage = async () => {
    if (imageRef.current && uploadedImage) {
      imageRef.current.src = uploadedImage;
      imageRef.current.onload = () => detectFaces(imageRef.current!);
    }
  };

  useEffect(() => {
    if (isWebcamOn) {
      initializeWebcam();
    } else {
      stopWebcam();
    }
    return () => {
      stopWebcam();
    };
  }, [isWebcamOn]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isWebcamOn && isVideoReady) {
      interval = setInterval(processWebcam, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isWebcamOn, isVideoReady]);

  useEffect(() => {
    if (isUploadMode && uploadedImage) {
      processUploadedImage();
    }
  }, [isUploadMode, uploadedImage]);

  return (
    <div className="relative w-full h-full flex-1 bg-card/5 transition-all duration-300">
      {isWebcamOn ? (
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px] z-0" />
          <div ref={webcamRef} className="w-full h-full object-cover z-10" />
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full z-20"
          />

          {/* UI Overlay */}
          <div className="absolute bottom-5 left-5 z-30 text-white bg-black/40 backdrop-blur-md text-xs px-3 py-2 rounded-md border border-white/10 flex items-center gap-2">
            <Camera className="h-3.5 w-3.5" />
            <span className="font-medium">Live Feed</span>
          </div>

          <div className="absolute top-4 right-4 z-30 flex flex-col gap-2">
            <div className="text-white bg-primary/80 backdrop-blur-md text-xs px-3 py-2 rounded-md border border-white/10 flex items-center gap-2 shadow-lg">
              <Crosshair className="h-3.5 w-3.5" />
              <span className="font-medium">Face Detection Active</span>
            </div>
          </div>

          {hasWebcamError && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-40">
              <div className="bg-card p-6 rounded-lg shadow-lg max-w-md">
                <div className="flex items-center gap-3 text-destructive mb-4">
                  <AlertTriangle className="h-6 w-6" />
                  <h3 className="text-lg font-medium">Webcam Error</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  There was a problem accessing your camera. Please make sure
                  you have granted camera permissions to this application and
                  that no other application is currently using your camera.
                </p>
              </div>
            </div>
          )}
        </div>
      ) : isUploadMode && uploadedImage ? (
        <div className="absolute inset-0 w-full h-full">
          <img
            ref={imageRef}
            src={uploadedImage}
            alt="Uploaded"
            className="w-full h-full object-cover z-10"
            style={{ display: "none" }}
          />
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full z-20"
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full w-full bg-muted/5 text-muted-foreground border-0">
          <div className="bg-card/40 backdrop-blur-sm p-6 rounded-lg border shadow-sm flex flex-col items-center">
            <Video className="h-16 w-16 text-muted mb-4" strokeWidth={1.5} />
            <p className="text-muted-foreground font-medium">
              Camera is currently disabled
            </p>
            <p className="text-xs mt-2 text-muted-foreground max-w-md text-center">
              Turn on the webcam using the control panel to begin face detection
            </p>
          </div>
        </div>
      )}
      {isProcessing && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary" />
        </div>
      )}
    </div>
  );
};

export default WebcamCapture;
