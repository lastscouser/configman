export function isTestEnv() {
  return process.env.NODE_ENV === "test";
}

export function isProductionEnv() {
  return process.env.NODE_ENV === "production";
}

export function isDevelopmentEnv() {
  return !process.env.NODE_ENV || process.env.NODE_ENV === "development";
}

export function isUatEnv() {
  return !process.env.NODE_ENV || process.env.NODE_ENV === "uat";
}
