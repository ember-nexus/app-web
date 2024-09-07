import {Branded} from "./Branded";
import {ParseError} from "../../Error/ParseError";

type RouteId = Branded<string, 'routeId'>;

const routeIdRegex = /^([a-z]+)(-*[a-z0-9]+)*$/;

function validateRouteIdFromString(routeId: string): RouteId {
  if (!routeIdRegex.test(routeId)) {
    throw new ParseError('Passed variable is not a valid route id.');
  }
  return routeId as RouteId;
}

export { RouteId, routeIdRegex, validateRouteIdFromString };
