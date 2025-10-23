/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_APM_SERVER_URL: string
  readonly VITE_APM_SERVICE_NAME: string
  readonly VITE_APM_ENVIRONMENT: string
  readonly VITE_APM_ACTIVE: string
  readonly VITE_APM_DISTRIBUTED_TRACING_ORIGINS: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// Support runtime env
interface Window {
  _env_?: {
    VITE_API_URL: string
    VITE_APM_SERVER_URL: string
    VITE_APM_SERVICE_NAME: string
    VITE_APM_ENVIRONMENT: string
    VITE_APM_ACTIVE: string
    VITE_APM_DISTRIBUTED_TRACING_ORIGINS: string
  }
}