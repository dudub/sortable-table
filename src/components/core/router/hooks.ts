import { useContext } from "react";
import type { RouterState } from "./types";
import { RouterContext } from "./context";

export function useRouter(): RouterState {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error("useRouter must be used within a Router component");
  }
  return context;
}

// Helper function to match path patterns with parameters
export function matchPath(
  pattern: string,
  path: string,
): { match: boolean; params: Record<string, string> } {
  const patternParts = pattern.split("/");
  const pathParts = path.split("/");

  if (patternParts.length !== pathParts.length) {
    return { match: false, params: {} };
  }

  const params: Record<string, string> = {};

  for (let i = 0; i < patternParts.length; i++) {
    const patternPart = patternParts[i];
    const pathPart = pathParts[i];

    if (patternPart.startsWith(":")) {
      // This is a parameter
      const paramName = patternPart.slice(1);
      params[paramName] = pathPart;
    } else if (patternPart !== pathPart) {
      // Static part doesn't match
      return { match: false, params: {} };
    }
  }

  return { match: true, params };
}
