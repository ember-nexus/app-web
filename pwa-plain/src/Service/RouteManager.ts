import {
  buildCombinedPluginIdRouteIdFromComponents,
  CombinedPluginIdRouteId
} from "../Type/Definition/CombinedPluginIdRouteId";
import {RouteConfiguration} from "../Type/Definition/RouteConfiguration";
import {PluginId} from "../Type/Definition/PluginId";




type PriorityListEntry = {
  priority: number;
  routes: CombinedPluginIdRouteId[]
};



class RouteManager {

  private priorityList: PriorityListEntry[] = [];
  private routeDict: Record<CombinedPluginIdRouteId, RouteConfiguration> = {};


  constructor() {
  }

  addRouteConfiguration(routeConfiguration: RouteConfiguration): RouteManager
  {
    const combinedPluginIdRouteId = buildCombinedPluginIdRouteIdFromComponents(routeConfiguration.pluginId, routeConfiguration.routeId);

    if (combinedPluginIdRouteId in this.routeDict) {
      throw "Route is already defined.";
    }
    this.routeDict[combinedPluginIdRouteId] = routeConfiguration;

    let priorityIndex = this.priorityList.findIndex((entry) => entry.priority === routeConfiguration.priority);
    if (priorityIndex === -1) {
      let indexOfHighestPrioritySmallerThanNewPriority = 0;
      for (let i = 0; i < this.priorityList.length; ++i) {
        if (this.priorityList[i].priority >= routeConfiguration.priority) {
          break;
        }
        indexOfHighestPrioritySmallerThanNewPriority = i + 1;
      }
      this.priorityList.splice(indexOfHighestPrioritySmallerThanNewPriority, 0, {
        priority: routeConfiguration.priority,
        routes: []
      });
      priorityIndex = indexOfHighestPrioritySmallerThanNewPriority;
    }
    this.priorityList[priorityIndex].routes.push(combinedPluginIdRouteId);

    return this;
  }

  removeRouteConfiguration(combinedPluginIdRouteId: CombinedPluginIdRouteId): RouteManager
  {
    if (!(combinedPluginIdRouteId in this.routeDict)) {
      return this;
    }

    const priority = this.routeDict[combinedPluginIdRouteId].priority;
    const priorityIndex = this.priorityList.findIndex((entry) => entry.priority === priority);
    if (priorityIndex === -1) {
      throw "logic error: unable to find priority list index with priority which should exist";
    }
    if (!this.priorityList[priorityIndex].routes.includes(combinedPluginIdRouteId)) {
      throw "logic error: unable to find route id in priority list";
    }
    this.priorityList[priorityIndex].routes.splice(this.priorityList[priorityIndex].routes.indexOf(combinedPluginIdRouteId), 1);
    if (this.priorityList[priorityIndex].routes.length === 0) {
      this.priorityList.splice(priorityIndex, 1);
    }

    delete this.routeDict[combinedPluginIdRouteId];

    return this;
  }

  getAllRouteConfigurations(): RouteConfiguration[] {
    return Object.values(this.routeDict);
  }

  getPluginRouteConfigurations(pluginId: PluginId): RouteConfiguration[] {
    return Object.values(this.routeDict).filter((routeConfiguration) => routeConfiguration.pluginId === pluginId);
  }

  clearAllRouteConfigurations(): RouteManager
  {
    this.priorityList = [];
    this.routeDict = {};
    return this;
  }

  clearPluginRouteConfigurations(pluginId: PluginId): RouteManager
  {
    Object
      .values(this.routeDict)
      .filter((routeConfiguration) => routeConfiguration.pluginId === pluginId)
      .map((entry) => buildCombinedPluginIdRouteIdFromComponents(entry.pluginId, entry.routeId))
      .forEach((combinedPluginIdRouteId) => this.removeRouteConfiguration(combinedPluginIdRouteId));
    return this;
  }

  matchRoute(route: string): RouteConfiguration|null
  {
    for (let i = this.priorityList.length - 1; i >= 0; --i) {
      for (let j = 0; j < this.priorityList[i].routes.length; j++) {
        const combinedPluginIdRouteId = this.priorityList[i].routes[j];
        if (this.routeDict[combinedPluginIdRouteId].route === route) {
          return this.routeDict[combinedPluginIdRouteId];
        }
      }
    }
    return null;
  }






  debugRoutes(): void
  {
    console.log({
      priorityList: this.priorityList,
      routes: this.routeDict
    });
  }

}

export { RouteManager };
