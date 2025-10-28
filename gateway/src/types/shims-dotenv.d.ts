declare module 'dotenv' {
  export function config(options?: any): { parsed?: { [key: string]: string } };
  const _default: { config: typeof config };
  export default _default;
}
