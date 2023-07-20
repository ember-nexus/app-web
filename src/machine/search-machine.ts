import {assign, createMachine} from 'xstate';
import Node from "@ember-nexus/web-sdk/src/Type/Node";
import Relation from "@ember-nexus/web-sdk/src/Type/Relation";

export interface SearchContext {
  payload: undefined | Record<string, unknown>;
  data: undefined | Array<Node | Relation>;
  error: undefined | string;
}

export interface UpdatePayloadEvent {
  type: 'UPDATE_PAYLOAD',
  payload: Record<string, unknown>
}

export interface DataLoadedEvent {
  type: 'DATA_LOADED',
  data: Array<Node | Relation>
}

export default createMachine({
    id: 'search-machine',
    initial: 'initial',
    predictableActionArguments: true,
    context: {
      payload: undefined,
      data: undefined,
      error: undefined
    } as SearchContext,
    states: {
      initial: {
        always: [
          {
            target: 'beforeLoading',
            actions: assign({
              error: undefined,
              data: undefined
            })
          }
        ]
      },
      beforeLoading: {
        entry: ['startSearch'],
        on: {
          UPDATE_PAYLOAD: {
            target: 'initial',
            actions: assign({
              payload: (_context: SearchContext, event: UpdatePayloadEvent) => event.payload
            })
          },
          LOADING_STARTED: {
            target: 'loading'
          },
          ERROR: {
            target: 'error',
            actions: assign({
              error: (_context: SearchContext, event: ErrorEvent) => event.error
            })
          }
        },
      },
      loading: {
        on: {
          UPDATE_PAYLOAD: {
            target: 'initial',
            actions: assign({
              payload: (_context: SearchContext, event: UpdatePayloadEvent) => event.payload
            })
          },
          DATA_LOADED: {
            target: 'loaded',
            actions: assign({
              data: (_context: SearchContext, event: DataLoadedEvent) => event.data
            })
          },
          ERROR: {
            target: 'error',
            actions: assign({
              error: (_context: SearchContext, event: ErrorEvent) => event.error
            })
          }
        },
        after: {
          // 30 seconds
          30000: {
            target: 'error',
            actions: assign({
              error: 'Experienced timeout while loading data.'
            })
          }
        }
      },
      error: {
        on: {
          UPDATE_PAYLOAD: {
            target: 'initial',
            actions: assign({
              payload: (_context: SearchContext, event: UpdatePayloadEvent) => {
                return event.payload
              }
            })
          }
        }
      },
      loaded: {
        on: {
          UPDATE_PAYLOAD: {
            target: 'initial',
            actions: assign({
              payload: (_context: SearchContext, event: UpdatePayloadEvent) => event.payload
            })
          }
        }
      }
    }
  },
  {
    guards: {
      payloadIsNotUndefined: (context: SearchContext) => {
        return context.payload !== undefined;
      }
    }
  });