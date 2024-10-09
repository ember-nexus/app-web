import { EmberNexus } from '@ember-nexus/web-sdk/Service';
import { Element, Uuid } from '@ember-nexus/web-sdk/Type/Definition';
import { Container } from 'typedi';
import { assign, fromPromise, setup } from 'xstate';

export const elementPageMachine = setup({
  actors: {
    handlingRequest: fromPromise<Element, { elementId: Uuid }>(async ({ input }) => {
      const element = await Container.get(EmberNexus).getElement(input.elementId);
      console.log(['element', element]);
      return element;
    }),
  },
  guards: {
    isElementIdNotNull: ({ context }) => {
      return context.elementId !== null;
    },
  },
  types: {
    context: {} as {
      elementId: Uuid | null;
      element: Element | null;
      error: null | string;
    },
    events: {} as { type: 'elementIdChange'; elementId: Uuid },
  },
}).createMachine({
  id: 'element-page-machine',
  context: () => ({
    elementId: null,
    element: null,
    error: null,
  }),
  initial: 'Initial',
  states: {
    Initial: {
      always: [
        {
          target: 'Loading',
          guard: 'isElementIdNotNull',
        },
      ],
    },
    Loading: {
      invoke: {
        src: 'handlingRequest',
        input: ({ context }) => ({
          elementId: context.elementId as Uuid,
        }),
        onDone: {
          target: 'Loaded',
          actions: assign({
            element: ({ event }) => event.output,
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
        elementIdChange: {
          actions: assign({
            elementId: ({ event }) => event.elementId,
          }),
          target: 'Loading',
        },
      },
    },
    Error: {
      on: {
        elementIdChange: {
          actions: assign({
            elementId: ({ event }) => event.elementId,
          }),
          target: 'Loading',
        },
      },
    },
  },
});
