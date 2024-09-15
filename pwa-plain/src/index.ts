import 'reflect-metadata';
import { Container } from 'typedi';
import { RouteManager } from './Service/RouteManager';
import { validatePluginIdFromString } from './Type/Definition/PluginId';
import { validateRouteIdFromString } from './Type/Definition/RouteId';

export * as Error from './Error';
export * as Page from './Page';
export * as Component from './Component';
export * as Machine from './Machine';
export * as Service from './Service';
export * as Type from './Type';
export * as Style from './Style';
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
  guards: [
    async (_route, _params) => {
      return Promise.resolve(true);
    },
  ],
});

routeManager.addRouteConfiguration({
  pluginId: pluginId,
  routeId: validateRouteIdFromString('very-tall'),
  route: '/very-tall',
  priority: 0,
  webComponent: 'very-tall',
  guards: [],
});

routeManager.addRouteConfiguration({
  pluginId: pluginId,
  routeId: validateRouteIdFromString('very-tall-own-scroll'),
  route: '/very-tall-own-scroll',
  priority: 0,
  webComponent: 'very-tall-own-scroll',
  guards: [],
});

console.log(window.location.pathname);
// const matchedRoute = await routeManager.matchRoute(window.location.pathname);
// if (matchedRoute === null) {
//   console.log("No route found.");
// } else {
//   const routeElement = typeof matchedRoute.webComponent === 'string' ? matchedRoute.webComponent : 'unsupported-dynamic-route-component';
//   console.log(routeElement);
// }

// const actor = createActor(routerMachine);
// actor.subscribe((snapshot) => {
//   console.log(`new router machine snapshot:`);
//   console.log(snapshot);
// });
// actor.start();
//
// (<any>window).actor = actor;

// actor.send({
//   type: 'routeChange', route: '/test-2'
// });

