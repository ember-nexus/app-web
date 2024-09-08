import { ParamData } from 'path-to-regexp';

type RouteGuardFunction = (route: string, routeParameters: ParamData) => boolean;

export { RouteGuardFunction };
