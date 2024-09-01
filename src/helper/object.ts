export function isEmptyObject(obj: any) {
  return !Object.keys(obj).length;
}

export function isNullOrEmpty(obj: any) {
  if (typeof obj === "undefined" || obj === null || obj === "") {
    return true;
  }
  return false;
}

export function deepCopy(object: any) {
  return JSON.parse(JSON.stringify(object));
}
