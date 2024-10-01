import { Container } from 'typedi';
import { assign, fromPromise, setup } from 'xstate';

import { RouteManager } from '../Service/RouteManager';
import { RouteConfiguration } from '../Type/Definition/RouteConfiguration';

export const routerMachine = setup({
  actors: {
    matchRoute: fromPromise<RouteConfiguration | null, { route: string }>(async ({ input }) => {
      return Container.get(RouteManager).matchRoute(input.route);
    }),
  },
  types: {
    context: {} as {
      route: string;
      routeConfiguration: null | RouteConfiguration;
      error: null | string;
    },
    events: {} as { type: 'routeChange'; route: string },
  },
}).createMachine({
  id: 'router-machine',
  context: () => ({
    route: window.location.pathname,
    routeConfiguration: null,
    error: null,
  }),
  initial: 'Initial',
  states: {
    Initial: {
      always: [
        {
          target: 'MatchingRoute',
        },
      ],
    },
    MatchingRoute: {
      invoke: {
        src: 'matchRoute',
        input: ({ context }) => ({
          route: context.route,
        }),
        onDone: {
          target: 'RouteMatched',
          actions: assign({
            routeConfiguration: ({ event }) => event.output,
          }),
        },
        onError: {
          target: 'Error',
          actions: assign({
            error: ({ event }) => String(event.error),
          }),
        },
      },
      entry: assign({
        error: () => null,
      }),
    },
    RouteMatched: {
      on: {
        routeChange: {
          actions: assign({
            route: ({ event }) => event.route,
            routeConfiguration: null,
          }),
          target: 'MatchingRoute',
        },
      },
    },
    Error: {
      on: {
        routeChange: {
          actions: assign({
            route: ({ event }) => event.route,
            routeConfiguration: null,
          }),
          target: 'MatchingRoute',
        },
      },
    },
  },
});
