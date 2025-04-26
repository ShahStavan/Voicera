import React, { useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  toggleWebcam,
  clearDetectedFaces,
  setUploadedImage,
} from "../../redux/faceSlice";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Activity,
  Trash2,
  Video,
  VideoOff,
  Shield,
  Camera,
  Settings,
  MoreHorizontal,
  Info,
  UploadCloud,
} from "lucide-react";

const ControlPanel: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isWebcamOn, isProcessing, detectedFaces, isUploadMode } =
    useAppSelector((state) => state.face);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleToggleWebcam = () => {
    dispatch(toggleWebcam());
  };

  const handleClearResults = () => {
    dispatch(clearDetectedFaces());
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        dispatch(setUploadedImage(result));
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="border shadow-sm bg-card/95 backdrop-blur-sm overflow-hidden">
      <CardHeader className="p-3 pb-3 border-b flex-row items-center justify-between space-y-0">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <Shield className="h-4 w-4 text-primary" />
          </div>
          <div>
            <CardTitle className="text-sm font-medium flex items-center gap-1">
              Facial Recognition System
              {isWebcamOn && (
                <span className="relative flex h-2 w-2 ml-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
              )}
            </CardTitle>
            <CardDescription className="text-xs mt-0.5">
              {isWebcamOn
                ? `Active • ${detectedFaces.length} ${
                    detectedFaces.length === 1 ? "face" : "faces"
                  } detected`
                : "Camera inactive • Click Start to begin"}
            </CardDescription>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={handleToggleWebcam}
            variant={isWebcamOn ? "destructive" : "default"}
            size="sm"
            disabled={isProcessing || isUploadMode}
            className="transition-all duration-200 shadow-sm h-8 gap-1.5"
          >
            {isWebcamOn ? (
              <>
                <VideoOff className="h-3.5 w-3.5" />
                <span>Stop</span>
              </>
            ) : (
              <>
                <Video className="h-3.5 w-3.5" />
                <span>Start</span>
              </>
            )}
          </Button>

          <Button
            onClick={triggerFileUpload}
            variant="outline"
            size="sm"
            disabled={isProcessing || isWebcamOn}
            className="transition-all duration-200 shadow-sm h-8 gap-1.5"
          >
            <UploadCloud className="h-3.5 w-3.5" />
            <span>Upload</span>
          </Button>

          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileUpload}
          />

          {(detectedFaces.length > 0 || isUploadMode) && (
            <Button
              onClick={handleClearResults}
              variant="outline"
              size="sm"
              disabled={
                isProcessing || (detectedFaces.length === 0 && !isUploadMode)
              }
              className="transition-all duration-200 h-8"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          )}

          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-3 pt-3 bg-muted/5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="flex flex-col gap-1 p-2 bg-card rounded-md border shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
                Status
              </span>
              <div
                className={`flex items-center justify-center h-5 w-5 rounded-full ${
                  isWebcamOn
                    ? "bg-green-50 dark:bg-green-500/10"
                    : "bg-slate-50 dark:bg-slate-500/10"
                }`}
              >
                <div
                  className={`h-1.5 w-1.5 rounded-full ${
                    isWebcamOn ? "bg-green-500" : "bg-slate-400"
                  }`}
                ></div>
              </div>
            </div>
            <div className="font-medium text-sm">
              {isWebcamOn ? "Active" : "Inactive"}
            </div>
          </div>

          <div className="flex flex-col gap-1 p-2 bg-card rounded-md border shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
                Faces
              </span>
              <div className="flex items-center justify-center h-5 w-5 rounded-full bg-blue-50 dark:bg-blue-500/10">
                <Camera className="h-2.5 w-2.5 text-blue-500" />
              </div>
            </div>
            <div className="font-medium text-sm">{detectedFaces.length}</div>
          </div>

          <div className="flex flex-col gap-1 p-2 bg-card rounded-md border shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
                State
              </span>
              <div className="flex items-center justify-center h-5 w-5 rounded-full bg-amber-50 dark:bg-amber-500/10">
                <Activity className="h-2.5 w-2.5 text-amber-500" />
              </div>
            </div>
            <div className="font-medium text-sm">
              {isProcessing ? "Processing" : "Ready"}
            </div>
          </div>

          <div className="flex flex-col gap-1 p-2 bg-card rounded-md border shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
                Mode
              </span>
              <div className="flex items-center justify-center h-5 w-5 rounded-full bg-purple-50 dark:bg-purple-500/10">
                <Settings className="h-2.5 w-2.5 text-purple-500" />
              </div>
            </div>
            <div className="font-medium text-sm">Real-time</div>
          </div>
        </div>

        {/* Help Text - Only show when camera is off */}
        {!isWebcamOn && (
          <div className="mt-3 flex items-start p-2 rounded-md bg-muted/30 text-xs text-muted-foreground border">
            <Info className="h-3 w-3 mt-0.5 mr-2 flex-shrink-0" />
            <p>
              Click the Start button to enable facial recognition. The system
              will detect faces, analyze expressions, and estimate age and
              gender in real-time.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ControlPanel;
