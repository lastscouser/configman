export interface Config {
  port: number;
  logLevel: string;
  jwtPrivateKey: string;
  tokenDurationInMinutes: number;
  telegram: {
    key: string;
    groupId: string;
  };
  firebase: {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
  };
}
