export interface RouteData {
  [key: string]: any;
}

export interface RouterState {
  currentPath: string;
  routeData: RouteData;
  navigate: (path: string, data?: RouteData) => void;
  getParams: () => Record<string, string>;
}
