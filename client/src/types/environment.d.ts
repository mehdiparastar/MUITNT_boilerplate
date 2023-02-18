declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'test' | 'production';
      PORT: number;
      DB_NAME: string;
      REACT_APP_API_GOOGLE_OAUTH2: string;
      REACT_APP_API_SERVER_URL:string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
