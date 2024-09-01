import { NextFunction } from "express";
import { getNamespace } from "continuation-local-storage";
import { Context } from "../domain/context";

export function setSessionKey(next: NextFunction, key: string, value: any) {
  var namespace = getNamespace("appRequestSession");
  if (namespace) {
    namespace.run(function () {
      namespace!.set(key, value);
      next();
    });
  }
}

export function getSessionKey<T>(key: string, defaultValue: any): T {
  return getNamespace
    ? getNamespace("appRequestSession")?.get<T>(key)
    : defaultValue;
}

export function getContext(): Context | undefined {
  return getNamespace
    ? getNamespace("appRequestSession")?.get<Context>("context")
    : undefined;
}
