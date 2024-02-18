declare const gtag: Function

// types.d.ts

declare module 'vite:*' {
  const modules: Record<string, { default: any; metadata: any }>;
  export default modules;
}
