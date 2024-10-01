import { Container } from 'typedi';
import { assign, fromPromise, setup } from 'xstate';

import {EmberNexus} from "@ember-nexus/web-sdk/Service";
import {createUniqueUserIdentifierFromString, Token} from "@ember-nexus/web-sdk/Type/Definition";

export const loginPageMachine = setup({
  actors: {
    handlingLoginRequest: fromPromise<Token | null, { username: string, password: string }>(async ({ input }) => {
      const token = await Container.get(EmberNexus).postToken(createUniqueUserIdentifierFromString(input.username), input.password);
      console.log(['token', token]);
      return token;
    }),
  },
  types: {
    context: {} as {
      username: string;
      password: string;
      error: null | string;
    },
    events: {} as { type: 'inputChange'; username: string; password: string; } |
      { type: 'submitLoginData'; } |
      { type: 'clearError'; }
  },
}).createMachine({
  id: 'login-page-machine',
  context: () => ({
    username: '',
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
            username: ({ event }) => event.username,
            password: ({ event }) => event.password
          }),
          target: 'EditingLoginForm',
        },
        clearError: {
          actions: assign({
            error: () => null
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
          username: context.username,
          password: context.password,
        }),
        onDone: {
          target: 'LoginSucceeded'
        },
        onError: {
          target: 'EditingLoginForm',
          actions: assign({
            error: ({ event }) => String(event.error),
          }),
        },
      }
    },
    LoginSucceeded: {},
  },
});
