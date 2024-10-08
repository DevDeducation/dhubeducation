interface ImportMetaEnv {
  readonly FIREBASE_PRIVATE_KEY_ID: string;
  readonly FIREBASE_PRIVATE_KEY: string;
  readonly FIREBASE_PROJECT_ID: string;
  readonly FIREBASE_CLIENT_EMAIL: string;
  readonly FIREBASE_CLIENT_ID: string;
  readonly FIREBASE_AUTH_URI: string;
  readonly FIREBASE_TOKEN_URI: string;
  readonly FIREBASE_AUTH_CERT_URL: string
  readonly FIREBASE_CLIENT_CERT_URL: string;
  readonly OAUTH_GITHUB_CLIENT_ID: string;
  readonly OAUTH_GITHUB_CLIENT_SECRET: string;
  readonly DHUBEDUCATION_PHONE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}