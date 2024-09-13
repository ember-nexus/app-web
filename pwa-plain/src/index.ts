import 'reflect-metadata';
import { Container } from 'typedi';
import { createActor } from 'xstate';

import { routerMachine } from './Machine';
import { RouteManager } from './Service/RouteManager';
import { validatePluginIdFromString } from './Type/Definition/PluginId';
import { validateRouteIdFromString } from './Type/Definition/RouteId';

export * as Error from './Error';
export * as Page from './Page';
export * as Component from './Component';
export * as Machine from './Machine';
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
  guards: [
    async (_route, _params) => {
      return Promise.resolve(true);
    },
  ],
});

console.log(window.location.pathname);
// const matchedRoute = await routeManager.matchRoute(window.location.pathname);
// if (matchedRoute === null) {
//   console.log("No route found.");
// } else {
//   const routeElement = typeof matchedRoute.webComponent === 'string' ? matchedRoute.webComponent : 'unsupported-dynamic-route-component';
//   console.log(routeElement);
// }

const actor = createActor(routerMachine);
actor.subscribe((snapshot) => {
  console.log(`new router machine snapshot:`);
  console.log(snapshot);
});
actor.start();

(<any>window).actor = actor;

// actor.send({
//   type: 'routeChange', route: '/test-2'
// });

window.addEventListener('popstate', (_event) => {
  console.log('(popstate) Location changed to: ', window.location.pathname);
  actor.send({
    type: 'routeChange',
    route: window.location.pathname,
  });
});

document.addEventListener('click', (event) => {
  const target = event.target;
  if (target === null) {
    return;
  }
  if (!(target instanceof HTMLElement)) {
    return;
  }

  const newRawUrl = target.attributes.getNamedItem('href')?.value;
  if (newRawUrl == null) {
    return;
  }

  const currentUrl = window.location.origin;
  console.log(`current url: ${currentUrl}`);

  // Create a new URL object to resolve the relative path to an absolute URL
  const newAbsoluteUrl = new URL(newRawUrl, currentUrl);

  if (newAbsoluteUrl.host !== window.location.host) {
    console.log('Clicked link to different domain, ignoring it');
    return;
  }

  console.log(`new absolute url: ${newAbsoluteUrl}`);
  history.pushState({}, '', newAbsoluteUrl);
  event.preventDefault();
  // console.log(event);

  actor.send({
    type: 'routeChange',
    route: newAbsoluteUrl.pathname,
  });
});
