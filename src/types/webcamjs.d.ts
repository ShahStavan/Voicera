declare module "webcamjs" {
  type WebcamEventMap = {
    load: () => void;
    live: () => void;
    error: (error: Error) => void;
    uploadComplete: (response: string) => void;
    uploadProgress: (progress: number) => void;
  };

  interface WebcamOptions {
    width?: number;
    height?: number;
    dest_width?: number;
    dest_height?: number;
    image_format?: "jpeg" | "png";
    jpeg_quality?: number;
    force_flash?: boolean;
    flip_horiz?: boolean;
    fps?: number;
    upload_name?: string;
    constraints?: MediaStreamConstraints;
    swfURL?: string;
    flashNotDetectedText?: string;
    unfreeze_snap?: boolean;
    iosPlaceholderText?: string;
    androidPlaceholderText?: string;
    user_callback?: (data_uri: string) => void;
    user_canvas?: HTMLCanvasElement;
  }

  interface Webcam {
    set(options: WebcamOptions): void;
    attach(target: string | HTMLElement): void;
    on<K extends keyof WebcamEventMap>(
      event: K,
      callback: WebcamEventMap[K]
    ): void;
    off<K extends keyof WebcamEventMap>(
      event: K,
      callback: WebcamEventMap[K]
    ): void;
    snap(callback?: (data_uri: string) => void): void;
    freeze(): void;
    unfreeze(): void;
    reset(): void;
    store_file(file: File): void;
  }

  const Webcam: Webcam;
  export default Webcam;
}
