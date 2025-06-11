import { kIsDebug } from "./k";

export const debugPrint = (
  message?: unknown,
  ...optionalParams: unknown[]
): void => {
  if (kIsDebug) {
    console.log(message, ...optionalParams);
  }
};
