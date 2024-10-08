import { Service } from 'typedi';

import { RouteManager } from './Service/RouteManager';
import { validatePluginIdFromString } from './Type/Definition/PluginId';
import { validateRouteIdFromString } from './Type/Definition/RouteId';

@Service()
class CorePlugin {
  constructor(private routeManager: RouteManager) {}

  init(): CorePlugin {
    const emberNexusCorePluginId = validatePluginIdFromString('ember-nexus-core');

    this.routeManager.addRouteConfiguration({
      pluginId: emberNexusCorePluginId,
      routeId: validateRouteIdFromString('login'),
      route: '/login',
      priority: 0,
      webComponent: 'ember-nexus-core-login-page',
      guards: [],
    });

    this.routeManager.addRouteConfiguration({
      pluginId: emberNexusCorePluginId,
      routeId: validateRouteIdFromString('logout'),
      route: '/logout',
      priority: 0,
      webComponent: 'ember-nexus-core-logout-page',
      guards: [],
    });

    this.routeManager.addRouteConfiguration({
      pluginId: emberNexusCorePluginId,
      routeId: validateRouteIdFromString('register'),
      route: '/register',
      priority: 0,
      webComponent: 'ember-nexus-core-register-page',
      guards: [],
    });

    this.routeManager.addRouteConfiguration({
      pluginId: emberNexusCorePluginId,
      routeId: validateRouteIdFromString('index'),
      route: '/',
      priority: 0,
      webComponent: 'ember-nexus-core-index-page',
      guards: [],
    });

    this.routeManager.addRouteConfiguration({
      pluginId: emberNexusCorePluginId,
      routeId: validateRouteIdFromString('element'),
      route: '/:elementId',
      priority: 0,
      webComponent: 'ember-nexus-core-element-page',
      guards: [],
    });
    return this;
  }
}

export { CorePlugin };
