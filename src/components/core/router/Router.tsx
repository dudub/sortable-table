import React, { useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { RouteData, RouterState } from "./types";
import { RouterContext } from "./context";
import { useRouter } from "./hooks";

interface RouterProps {
  children: ReactNode;
  basePath?: string;
}

export function Router({ children, basePath = "" }: RouterProps) {
  const [currentPath, setCurrentPath] = useState(() => {
    const path = window.location.pathname;
    return basePath ? path.replace(basePath, "") : path;
  });

  const [routeData, setRouteData] = useState<RouteData>({});

  const navigate = (path: string, data?: RouteData) => {
    const fullPath = basePath + path;

    setCurrentPath(path);
    setRouteData(data || {});

    // Update browser history with data
    window.history.pushState(
      { path, data: data ? JSON.stringify(data) : "{}" },
      "",
      fullPath,
    );
  };

  const getParams = (): Record<string, string> => {
    const params = new URLSearchParams(window.location.search);
    const result: Record<string, string> = {};
    params.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  };

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state) {
        const { path, data } = event.state;
        setCurrentPath(path || "/");
        try {
          setRouteData(data ? JSON.parse(data) : {});
        } catch {
          setRouteData({});
        }
      } else {
        // Handle direct URL access or page refresh
        const path = window.location.pathname;
        const cleanPath = basePath ? path.replace(basePath, "") : path;
        setCurrentPath(cleanPath || "/");
        setRouteData({});
      }
    };

    // Set initial state in history if it doesn't exist
    if (!window.history.state) {
      window.history.replaceState(
        { path: currentPath, data: "{}" },
        "",
        window.location.href,
      );
    }

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [basePath, currentPath]);

  const value: RouterState = {
    currentPath,
    routeData,
    navigate,
    getParams,
  };

  return (
    <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
  );
}

interface RouteProps {
  path: string;
  component: React.ComponentType<any>;
  exact?: boolean;
}

export function Route({
  path,
  component: Component,
  exact = false,
}: RouteProps) {
  const { currentPath, routeData } = useRouter();

  const isMatch = exact ? currentPath === path : currentPath.startsWith(path);

  if (!isMatch) return null;

  return <Component routeData={routeData} />;
}

// Link component for navigation
interface LinkProps {
  to: string;
  data?: RouteData;
  children: ReactNode;
  className?: string;
}

export function Link({ to, data, children, className }: LinkProps) {
  const { navigate, currentPath } = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate(to, data);
  };

  const isActive = currentPath === to;

  return (
    <a
      href={to}
      onClick={handleClick}
      className={className}
      data-active={isActive}
    >
      {children}
    </a>
  );
}

interface SwitchProps {
  children: ReactNode;
}

export function Switch({ children }: SwitchProps) {
  const { currentPath } = useRouter();

  // Find the first matching route
  const childrenArray = React.Children.toArray(children);

  for (const child of childrenArray) {
    if (React.isValidElement(child) && child.type === Route) {
      const { path, exact = false } = child.props as {
        path: string;
        exact?: boolean;
      };
      const isMatch = exact
        ? currentPath === path
        : currentPath.startsWith(path);

      if (isMatch) {
        return child;
      }
    }
  }

  return null;
}
