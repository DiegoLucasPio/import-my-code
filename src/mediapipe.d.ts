declare module '@mediapipe/tasks-vision' {
  export class FilesetResolver {
    static forVisionTasks(wasmPath: string): Promise<any>;
  }
  export class FaceLandmarker {
    static createFromOptions(fileset: any, options: any): Promise<FaceLandmarker>;
    detectForVideo(video: HTMLVideoElement, timestamp: number): any;
    close(): void;
  }
}
