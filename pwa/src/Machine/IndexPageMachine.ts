import { EmberNexus } from '@ember-nexus/web-sdk/Service';
import { Collection } from '@ember-nexus/web-sdk/Type/Definition';
import { Container } from 'typedi';
import { assign, fromPromise, setup } from 'xstate';

export const indexPageMachine = setup({
  actors: {
    handlingRequest: fromPromise<Collection, { page: number; pageSize: number }>(async ({ input }) => {
      const collection = await Container.get(EmberNexus).getIndex(input.page, input.pageSize);
      console.log(['collection', collection]);
      return collection;
    }),
  },
  types: {
    context: {} as {
      page: number;
      pageSize: number;
      collection: Collection | null;
      error: null | string;
    },
    events: {} as { type: 'pageChange'; page: number } | { type: 'pageSizeChange'; pageSize: number },
  },
}).createMachine({
  id: 'index-page-machine',
  context: () => ({
    page: 1,
    pageSize: 25,
    collection: null,
    error: null,
  }),
  initial: 'Initial',
  states: {
    Initial: {
      always: [
        {
          target: 'Loading',
        },
      ],
    },
    Loading: {
      invoke: {
        src: 'handlingRequest',
        input: ({ context }) => ({
          page: context.page,
          pageSize: context.pageSize,
        }),
        onDone: {
          target: 'Loaded',
          actions: assign({
            collection: ({ event }) => event.output,
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
        pageChange: {
          actions: assign({
            page: ({ event }) => event.page,
          }),
          target: 'Loading',
        },
        pageSizeChange: {
          actions: assign({
            pageSize: ({ event }) => event.pageSize,
          }),
          target: 'Loading',
        },
      },
    },
    Error: {
      on: {
        pageChange: {
          actions: assign({
            page: ({ event }) => event.page,
          }),
          target: 'Loading',
        },
        pageSizeChange: {
          actions: assign({
            pageSize: ({ event }) => event.pageSize,
          }),
          target: 'Loading',
        },
      },
    },
  },
});
