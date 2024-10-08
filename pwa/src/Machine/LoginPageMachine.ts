import { EmberNexus } from '@ember-nexus/web-sdk/Service';
import { Token, createUniqueUserIdentifierFromString } from '@ember-nexus/web-sdk/Type/Definition';
import { Container } from 'typedi';
import { assign, fromPromise, setup } from 'xstate';

export const loginPageMachine = setup({
  actors: {
    handlingLoginRequest: fromPromise<Token | null, { uniqueUserIdentifier: string; password: string }>(
      async ({ input }) => {
        const token = await Container.get(EmberNexus).postToken(
          createUniqueUserIdentifierFromString(input.uniqueUserIdentifier),
          input.password,
        );
        console.log(['token', token]);
        return token;
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
      | { type: 'submitLoginData' }
      | { type: 'clearError' },
  },
}).createMachine({
  id: 'login-page-machine',
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
          target: 'EditingLoginForm',
        },
      ],
    },
    EditingLoginForm: {
      on: {
        inputChange: {
          actions: assign({
            uniqueUserIdentifier: ({ event }) => event.uniqueUserIdentifier,
            password: ({ event }) => event.password,
          }),
          target: 'EditingLoginForm',
        },
        clearError: {
          actions: assign({
            error: () => null,
          }),
          target: 'EditingLoginForm',
        },
        submitLoginData: {
          target: 'HandlingLoginRequest',
        },
      },
    },
    HandlingLoginRequest: {
      invoke: {
        src: 'handlingLoginRequest',
        input: ({ context }) => ({
          uniqueUserIdentifier: context.uniqueUserIdentifier,
          password: context.password,
        }),
        onDone: {
          target: 'LoginSucceeded',
        },
        onError: {
          target: 'EditingLoginForm',
          actions: assign({
            error: ({ event }) => String(event.error),
          }),
        },
      },
    },
    LoginSucceeded: {},
  },
});
