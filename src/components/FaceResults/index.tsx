import React from "react";
import { useAppSelector } from "../../redux/hooks";
import { FaceDetection } from "../../redux/faceSlice";
import { Progress } from "@/components/ui/progress";
import {
  UserCircle2,
  Brain,
  AlertCircle,
  ChevronRight,
  Frown,
  Laugh,
  Angry,
  Meh,
  Activity,
  User,
} from "lucide-react";

const FaceResults: React.FC = () => {
  const { detectedFaces } = useAppSelector((state) => state.face);

  type EmotionType =
    | "neutral"
    | "happy"
    | "sad"
    | "angry"
    | "fearful"
    | "disgusted"
    | "surprised";

  const getMainEmotion = (face: FaceDetection): EmotionType | "Unknown" => {
    if (!face.expressions) return "Unknown";

    const expressions = Object.entries(face.expressions) as [
      EmotionType,
      number
    ][];
    expressions.sort((a, b) => b[1] - a[1]);

    return expressions[0][0];
  };

  const getEmotionIcon = (emotion: string) => {
    switch (emotion.toLowerCase()) {
      case "happy":
        return <Laugh className="h-3.5 w-3.5" />;
      case "sad":
        return <Frown className="h-3.5 w-3.5" />;
      case "angry":
        return <Angry className="h-3.5 w-3.5" />;
      case "fearful":
        return <Meh className="h-3.5 w-3.5 rotate-180" />;
      case "surprised":
        return <AlertCircle className="h-3.5 w-3.5" />;
      case "neutral":
      default:
        return <Meh className="h-3.5 w-3.5" />;
    }
  };

  const getEmotionColor = (emotion: string, value: number) => {
    if (value < 0.4) return "bg-muted/20 text-muted-foreground";

    switch (emotion.toLowerCase()) {
      case "happy":
        return "bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-500";
      case "sad":
        return "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-500";
      case "angry":
        return "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-500";
      case "fearful":
        return "bg-purple-50 text-purple-700 dark:bg-purple-500/10 dark:text-purple-500";
      case "disgusted":
        return "bg-yellow-50 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-500";
      case "surprised":
        return "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-500";
      case "neutral":
      default:
        return "bg-gray-50 text-gray-700 dark:bg-gray-500/10 dark:text-gray-400";
    }
  };

  if (detectedFaces.length === 0) {
    return (
      <div className="rounded-lg bg-muted/5 flex flex-col items-center justify-center h-full min-h-[180px] border border-dashed border-muted">
        <UserCircle2 className="h-10 w-10 text-muted mb-2" strokeWidth={1.5} />
        <p className="text-sm text-muted-foreground font-medium">
          No faces detected
        </p>
        <p className="text-xs mt-1 text-muted-foreground/70 max-w-[200px] text-center">
          When faces are detected, they will appear here with analysis
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {detectedFaces.map((face) => {
        const mainEmotion = getMainEmotion(face);

        const topEmotions = face.expressions
          ? Object.entries(face.expressions)
              .sort((a, b) => b[1] - a[1])
              .slice(0, 3)
          : [];

        return (
          <div
            key={face.id}
            className="rounded-lg border bg-card shadow-sm overflow-hidden transition-all"
          >
            <div className="flex items-center justify-between p-2 border-b bg-card/50">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-3.5 w-3.5 text-primary" />
                </div>
                <div>
                  <div className="font-medium text-xs">
                    {face.gender === "male" ? "Male" : "Female"}, {face.age} yrs
                  </div>
                  <div className="text-[10px] text-muted-foreground">
                    {face.id}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <div
                  className={`${getEmotionColor(
                    mainEmotion,
                    1
                  )} rounded-full px-2 py-0.5 text-[10px] font-medium flex items-center gap-1`}
                >
                  {getEmotionIcon(mainEmotion)}
                  {mainEmotion}
                </div>
              </div>
            </div>

            {face.expressions && (
              <div className="p-2 bg-card/90 border-b">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1">
                    <Brain className="h-3 w-3 text-primary" />
                    <h4 className="font-medium text-[10px] uppercase tracking-wide text-muted-foreground">
                      Emotional Score
                    </h4>
                  </div>
                  <div className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <Activity className="h-3 w-3" />
                    Face angle:{" "}
                    <span className="font-medium">
                      {face.angle ? `${face.angle}°` : "N/A"}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mt-1">
                  {topEmotions.map(([expression, value]) => (
                    <div
                      key={expression}
                      className={`flex flex-col items-center p-1 rounded ${getEmotionColor(
                        expression,
                        value
                      )}`}
                    >
                      <div className="text-[10px] mb-0.5 font-medium capitalize flex items-center gap-1">
                        {getEmotionIcon(expression)}
                        {expression}
                      </div>
                      <Progress
                        value={Math.round(value * 100)}
                        className="h-1 w-full"
                        style={
                          {
                            "--progress-background": "rgba(0,0,0,0.06)",
                          } as React.CSSProperties
                        }
                      />
                      <div className="text-[9px] mt-1 font-semibold">
                        {Math.round(value * 100)}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between p-2 bg-muted/5 text-[10px]">
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mr-1"></div>
                  <span className="text-muted-foreground">Confidence:</span>
                  <span className="font-medium ml-1">High</span>
                </div>

                <div className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></div>
                  <span className="text-muted-foreground">Detection:</span>
                  <span className="font-medium ml-1">Real-time</span>
                </div>
              </div>

              <button className="flex items-center text-primary hover:underline">
                <span>Details</span>
                <ChevronRight className="h-3 w-3 ml-0.5" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FaceResults;
