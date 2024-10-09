import { assign, fromPromise, setup } from 'xstate';

export const iconLoaderMachine = setup({
  actors: {
    handlingIconRequest: fromPromise<string, { url: string }>(async ({ input }) => {
      if (input.url === '') {
        throw 'empty url';
      }
      return await fetch(input.url)
        .then((res) => {
          if (res.headers.get('content-type') !== 'image/svg+xml') {
            throw 'unsupported content type';
          }
          return res.text();
        })
        .then((text) => text);
    }),
  },
  guards: {
    isUrlValid: ({ context }) => {
      return context.url !== '';
    },
  },
  types: {
    context: {} as {
      url: string;
      icon: string;
      error: null | string;
    },
    events: {} as { type: 'urlChange'; url: string },
  },
}).createMachine({
  id: 'icon-loader-machine',
  context: () => ({
    url: '',
    icon: '',
    error: null,
  }),
  initial: 'Initial',
  states: {
    Initial: {
      always: [
        {
          guard: 'isUrlValid',
          target: 'Loading',
        },
      ],
      on: {
        urlChange: {
          actions: assign({
            url: ({ event }) => event.url,
            icon: () => '',
            error: () => null,
          }),
          target: 'Initial',
        },
      },
    },
    Loading: {
      invoke: {
        src: 'handlingIconRequest',
        input: ({ context }) => ({
          url: context.url,
        }),
        onDone: {
          target: 'Loaded',
          actions: assign({
            icon: ({ event }) => event.output,
          }),
        },
        onError: {
          target: 'Error',
          actions: assign({
            error: ({ event }) => String(event.error),
          }),
        },
      },
    },
    Loaded: {
      on: {
        urlChange: {
          actions: assign({
            url: ({ event }) => event.url,
            icon: () => '',
            error: () => null,
          }),
          target: 'Initial',
        },
      },
    },
    Error: {
      on: {
        urlChange: {
          actions: assign({
            url: ({ event }) => event.url,
            icon: () => '',
            error: () => null,
          }),
          target: 'Initial',
        },
      },
    },
  },
});
