export {};

declare global {
  interface Window {
    renderTsi: any;
    tsiData: any;
  }
}

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}