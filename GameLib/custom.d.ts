declare module "*.png" {
    const content: string;
    export default content;
}

declare module "worker-loader*" {
  class WebpackWorker extends Worker {
      constructor();
  }

  export default WebpackWorker;
}

// declare module '*.worker.ts' {
//   class TestWorker extends Worker {
//     constructor();
//   }

//   export default TestWorker
// }