declare module "process" {
  global {
    namespace NodeJS {
      interface ProcessEnv {
        readonly BOT_API_KEY: string;
        readonly RAPIDAPI_KEY: string;
        readonly RAPIDAPI_GT_BASE_URL: string;
      }
    }
  }
}
