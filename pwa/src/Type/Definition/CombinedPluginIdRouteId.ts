import { Branded } from './Branded';
import { PluginId } from './PluginId';
import { RouteId } from './RouteId';

type CombinedPluginIdRouteId = Branded<string, 'combinedPluginIdRouteId'>;

function buildCombinedPluginIdRouteIdFromComponents(pluginId: PluginId, routeId: RouteId): CombinedPluginIdRouteId {
  return `${pluginId}.${routeId}` as CombinedPluginIdRouteId;
}

export { CombinedPluginIdRouteId, buildCombinedPluginIdRouteIdFromComponents };
