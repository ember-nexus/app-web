import 'reflect-metadata';
import { Container } from 'typedi';

import { RouteManager } from './Service/RouteManager';
import { validatePluginIdFromString } from './Type/Definition/PluginId';
import { validateRouteIdFromString } from './Type/Definition/RouteId';

export * as Error from './Error';
export * as Page from './Page';
export * as Layout from './Layout';
export * as Service from './Service';
export * as Type from './Type';
export { Container };

const routeManager = Container.get(RouteManager);

const pluginId = validatePluginIdFromString('ember-nexus');

routeManager.addRouteConfiguration({
  pluginId: pluginId,
  routeId: validateRouteIdFromString('test-1'),
  route: '/test-1',
  priority: 0,
  webComponent: 'test-1',
  guards: [],
});

routeManager.addRouteConfiguration({
  pluginId: pluginId,
  routeId: validateRouteIdFromString('test-2'),
  route: '/test-2',
  priority: 0,
  webComponent: 'test-2',
  guards: [],
});

routeManager.addRouteConfiguration({
  pluginId: pluginId,
  routeId: validateRouteIdFromString('test-3'),
  route: '/test-3',
  priority: 0,
  webComponent: 'test-3',
  guards: [],
});
