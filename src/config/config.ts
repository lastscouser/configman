import devConfig from "./dev";
import uatConfig from "./uat";

const config =
  process.env.NODE_ENV && process.env.NODE_ENV === "production"
    ? uatConfig
    : process.env.NODE_ENV && process.env.NODE_ENV === "uat"
    ? uatConfig
    : devConfig;

export default config;
