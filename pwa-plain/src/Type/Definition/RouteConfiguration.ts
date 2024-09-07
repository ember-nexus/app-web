import {PluginId} from "./PluginId";
import {RouteId} from "./RouteId";

type RouteConfiguration = {
  pluginId: PluginId;
  routeId: RouteId;
  route: string;
  priority: number;
  webComponent: string;
};

export { RouteConfiguration };
