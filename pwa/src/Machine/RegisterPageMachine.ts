import { EmberNexus } from '@ember-nexus/web-sdk/Service';
import { Uuid, createUniqueUserIdentifierFromString } from '@ember-nexus/web-sdk/Type/Definition';
import { Container } from 'typedi';
import { assign, fromPromise, setup } from 'xstate';

export const registerPageMachine = setup({
  actors: {
    handlingRegisterRequest: fromPromise<Uuid, { uniqueUserIdentifier: string; password: string }>(
      async ({ input }) => {
        const uuid = await Container.get(EmberNexus).postRegister(
          createUniqueUserIdentifierFromString(input.uniqueUserIdentifier),
          input.password,
        );
        console.log(['uuid', uuid]);
        return uuid;
      },
    ),
  },
  types: {
    context: {} as {
      uniqueUserIdentifier: string;
      password: string;
      error: null | string;
    },
    events: {} as
      | { type: 'inputChange'; uniqueUserIdentifier: string; password: string }
      | { type: 'submitRegisterData' }
      | { type: 'clearError' },
  },
}).createMachine({
  id: 'register-page-machine',
  context: () => ({
    uniqueUserIdentifier: '',
    password: '',
    error: null,
  }),
  initial: 'Initial',
  states: {
    Initial: {
      always: [
        {
          target: 'EditingRegisterForm',
        },
      ],
    },
    EditingRegisterForm: {
      on: {
        inputChange: {
          actions: assign({
            uniqueUserIdentifier: ({ event }) => event.uniqueUserIdentifier,
            password: ({ event }) => event.password,
          }),
          target: 'EditingRegisterForm',
        },
        clearError: {
          actions: assign({
            error: () => null,
          }),
          target: 'EditingRegisterForm',
        },
        submitRegisterData: {
          target: 'HandlingRegisterRequest',
        },
      },
    },
    HandlingRegisterRequest: {
      invoke: {
        src: 'handlingRegisterRequest',
        input: ({ context }) => ({
          uniqueUserIdentifier: context.uniqueUserIdentifier,
          password: context.password,
        }),
        onDone: {
          target: 'RegisterSucceeded',
        },
        onError: {
          target: 'EditingRegisterForm',
          actions: assign({
            error: ({ event }) => String(event.error),
          }),
        },
      },
    },
    RegisterSucceeded: {},
  },
});
