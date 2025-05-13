declare module '*?worker' {
  const WorkerConstructor: {
    new (): Worker;
    prototype: Worker;
  };
  export default WorkerConstructor;
}
