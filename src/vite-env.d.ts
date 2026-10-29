/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Base URL of the HOKOKI AI service; when missing, the app runs in demo mode */
  readonly VITE_AI_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
