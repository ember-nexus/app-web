import { PluginId } from './PluginId';
import { RouteGuardFunction } from './RouteGuardFunction';
import { RouteId } from './RouteId';
import { RouteToWebComponentFunction } from './RouteToWebComponentFunction';

type RouteConfiguration = {
  pluginId: PluginId;
  routeId: RouteId;
  route: string;
  priority: number;
  webComponent: string | RouteToWebComponentFunction;
  guards: RouteGuardFunction[];
};

export { RouteConfiguration };
