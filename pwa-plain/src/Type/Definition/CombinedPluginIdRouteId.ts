import {Branded} from "./Branded";
import {RouteId} from "./RouteId";
import {PluginId} from "./PluginId";

type CombinedPluginIdRouteId = Branded<string, 'combinedPluginIdRouteId'>;


function buildCombinedPluginIdRouteIdFromComponents(pluginId: PluginId, routeId: RouteId): CombinedPluginIdRouteId {
  return `${pluginId}.${routeId}` as CombinedPluginIdRouteId;
}

export { CombinedPluginIdRouteId, buildCombinedPluginIdRouteIdFromComponents };
