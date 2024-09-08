import { Match, MatchFunction, ParamData, match } from 'path-to-regexp';
import { Service } from 'typedi';

import { Logger } from './Logger';
import {
  CombinedPluginIdRouteId,
  buildCombinedPluginIdRouteIdFromComponents,
} from '../Type/Definition/CombinedPluginIdRouteId';
import { PluginId } from '../Type/Definition/PluginId';
import { RouteConfiguration } from '../Type/Definition/RouteConfiguration';

type PriorityListEntry = {
  priority: number;
  routes: CombinedPluginIdRouteId[];
};

@Service()
class RouteManager {
  private priorityList: PriorityListEntry[] = [];
  private routeDict: Record<CombinedPluginIdRouteId, RouteConfiguration> = {};
  private matchFunctionList: MatchFunction<ParamData>[] = [];

  constructor(private logger: Logger) {}

  addRouteConfiguration(routeConfiguration: RouteConfiguration): RouteManager {
    const combinedPluginIdRouteId = buildCombinedPluginIdRouteIdFromComponents(
      routeConfiguration.pluginId,
      routeConfiguration.routeId,
    );

    if (combinedPluginIdRouteId in this.routeDict) {
      const message = `Route Manager: Route ${combinedPluginIdRouteId} is already defined.`;
      this.logger.error(message);
      throw message;
    }
    this.routeDict[combinedPluginIdRouteId] = routeConfiguration;
    this.matchFunctionList[combinedPluginIdRouteId] = match(routeConfiguration.route);

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
        routes: [],
      });
      priorityIndex = indexOfHighestPrioritySmallerThanNewPriority;
    }
    this.priorityList[priorityIndex].routes.push(combinedPluginIdRouteId);
    this.logger.debug(`Route Manager: Added route ${combinedPluginIdRouteId}.`);

    return this;
  }

  removeRouteConfiguration(combinedPluginIdRouteId: CombinedPluginIdRouteId): RouteManager {
    if (!(combinedPluginIdRouteId in this.routeDict)) {
      this.logger.debug(
        `Route Manager: Route ${combinedPluginIdRouteId} can not be removed because it can not be found.`,
      );
      return this;
    }

    const priority = this.routeDict[combinedPluginIdRouteId].priority;
    const priorityIndex = this.priorityList.findIndex((entry) => entry.priority === priority);
    if (priorityIndex === -1) {
      const message = 'Route Manager: Unable to find priority list index with priority which should exist.';
      this.logger.error(message);
      throw message;
    }
    if (!this.priorityList[priorityIndex].routes.includes(combinedPluginIdRouteId)) {
      const message = 'Route Manager: Unable to find route id in priority list.';
      this.logger.error(message);
      throw message;
    }
    this.priorityList[priorityIndex].routes.splice(
      this.priorityList[priorityIndex].routes.indexOf(combinedPluginIdRouteId),
      1,
    );
    if (this.priorityList[priorityIndex].routes.length === 0) {
      this.priorityList.splice(priorityIndex, 1);
    }

    delete this.routeDict[combinedPluginIdRouteId];
    delete this.matchFunctionList[combinedPluginIdRouteId];
    this.logger.debug(`Route Manager: Removed route ${combinedPluginIdRouteId}.`);

    return this;
  }

  getAllRouteConfigurations(): RouteConfiguration[] {
    return Object.values(this.routeDict);
  }

  getPluginRouteConfigurations(pluginId: PluginId): RouteConfiguration[] {
    return Object.values(this.routeDict).filter((routeConfiguration) => routeConfiguration.pluginId === pluginId);
  }

  clearAllRouteConfigurations(): RouteManager {
    this.priorityList = [];
    this.routeDict = {};
    this.logger.debug(`Route Manager: Cleared all routes.`);
    return this;
  }

  clearPluginRouteConfigurations(pluginId: PluginId): RouteManager {
    Object.values(this.routeDict)
      .filter((routeConfiguration) => routeConfiguration.pluginId === pluginId)
      .map((entry) => buildCombinedPluginIdRouteIdFromComponents(entry.pluginId, entry.routeId))
      .forEach((combinedPluginIdRouteId) => this.removeRouteConfiguration(combinedPluginIdRouteId));
    this.logger.debug(`Route Manager: Cleared all routes for plugin ${pluginId}.`);
    return this;
  }

  matchRoute(route: string): RouteConfiguration | null {
    this.logger.debug(`Route Manager: Trying to match route ${route}.`);
    for (let i = this.priorityList.length - 1; i >= 0; --i) {
      for (let j = 0; j < this.priorityList[i].routes.length; j++) {
        const combinedPluginIdRouteId = this.priorityList[i].routes[j];
        const routeMatchResult = this.matchFunctionList[combinedPluginIdRouteId](route) as Match<ParamData>;
        if (routeMatchResult !== false) {
          const resultOfGuardFunctions = this.routeDict[combinedPluginIdRouteId].guards.every((guard) =>
            guard(route, routeMatchResult.params),
          );
          if (!resultOfGuardFunctions) {
            continue;
          }
          return this.routeDict[combinedPluginIdRouteId];
        }
      }
    }
    this.logger.debug(`Route Manager: Unable to find route configuration for route ${route}.`);
    return null;
  }
}

export { RouteManager };
