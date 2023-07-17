import {assign, createMachine} from 'xstate';
import Relation from "@ember-nexus/web-sdk/src/Type/Relation";
import Node from "@ember-nexus/web-sdk/src/Type/Node";

export interface ElementContext {
    uuid: string;
    element: undefined | Node | Relation;
    start: undefined | Node;
    end: undefined | Node;
    error: undefined | string;
}

export interface UpdateUuidEvent {
    type: 'UPDATE_UUID',
    uuid: string
}

export interface ElementLoadedEvent {
    type: 'ELEMENT_LOADED',
    element: Node | Relation
}

export interface StartLoadedEvent {
    type: 'START_LOADED',
    element: Node
}

export interface EndLoadedEvent {
    type: 'END_LOADED',
    element: Node
}

// @ts-ignore
// @ts-ignore
export default createMachine({
      id: 'element-machine',
      initial: 'initial',
      predictableActionArguments: true,
      context: {
          uuid: '',
          element: undefined,
          start: undefined,
          end: undefined,
          error: undefined
      } as ElementContext,
      states: {
          initial: {
              always: [
                  {
                      target: 'beforeLoading',
                      actions: assign({
                          error: undefined,
                          element: undefined,
                          start: undefined,
                          end: undefined
                      })
                  }
              ]
          },
          beforeLoading: {
              always: [
                  {
                      target: 'loading',
                      cond: 'isValidUuid'
                  },
                  {
                      target: 'error',
                      actions: assign({
                          error: (context: ElementContext) => `UUID ${context.uuid} is invalid.`
                      })
                  }
              ]
          },
          loading: {
              on: {
                  UPDATE_UUID: {
                      target: 'initial',
                      actions: assign({
                          uuid: (_context: ElementContext, event: UpdateUuidEvent) => event.uuid
                      })
                  },
                  ERROR: {
                      target: 'error',
                      actions: assign({
                          error: (_context: ElementContext, event: ErrorEvent) => event.error
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
              },
              type: "parallel",
              states: {
                  element: {
                      initial: 'initial',
                      states: {
                          initial: {
                              on: {
                                  ELEMENT_LOADING_STARTED: {
                                      target: 'loading'
                                  }
                              },
                              entry: ['startLoadingElement']
                          },
                          loading: {
                              on: {
                                  ELEMENT_LOADED: {
                                      target: 'loaded',
                                      actions: assign({
                                          element: (_context: ElementContext, event: ElementLoadedEvent) => event.element
                                      })
                                  },
                              }
                          },
                          loaded: {
                              entry: ['startLoadingStart', 'startLoadingEnd']
                          }
                      }
                  },
                  start: {
                      initial: 'initial',
                      states: {
                          initial: {
                              on: {
                                  START_LOADING_STARTED: {
                                      target: 'loading'
                                  }
                              }
                          },
                          loading: {
                              on: {
                                  START_LOADED: {
                                      target: 'loaded',
                                      actions: assign({
                                          start: (_context: ElementContext, event: StartLoadedEvent) => event.element
                                      })
                                  },
                              }
                          },
                          loaded: {}
                      }
                  },
                  end: {
                      initial: 'initial',
                      states: {
                          initial: {
                              on: {
                                  END_LOADING_STARTED: {
                                      target: 'loading'
                                  }
                              }
                          },
                          loading: {
                              on: {
                                  END_LOADED: {
                                      target: 'loaded',
                                      actions: assign({
                                          end: (_context: ElementContext, event: EndLoadedEvent) => event.element
                                      })
                                  },
                              }
                          },
                          loaded: {}
                      }
                  },
              },
              always: [
                  {
                      target: 'loaded',
                      cond: 'isEverythingLoaded'
                  }
              ]
          },
          error: {
              on: {
                  UPDATE_UUID: {
                      target: 'initial',
                      actions: assign({
                          uuid: (_context: ElementContext, event: UpdateUuidEvent) => {
                              return event.uuid
                          }
                      })
                  }
              }
          },
          loaded: {
              on: {
                  UPDATE_UUID: {
                      target: 'initial',
                      actions: assign({
                          uuid: (_context: ElementContext, event: UpdateUuidEvent) => event.uuid
                      })
                  }
              }
          }
      }
  },
  {
      guards: {
          // @ts-ignore
          isValidUuid: (context: ElementContext) => {
              if (context.uuid == undefined) {
                  return false;
              }
              return context.uuid.match(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);
          },
          isEverythingLoaded: (context: ElementContext) => {
              let isRelation = false;
              if (context.element != undefined) {
                isRelation = (
                  Object.prototype.hasOwnProperty.call(context.element, 'start') &&
                  Object.prototype.hasOwnProperty.call(context.element, 'end')
                );
              }
              let res = (
                context.element != undefined && (
                  !isRelation ||
                  (
                    context.start != undefined &&
                    context.end != undefined
                  )
                )
              );
              console.log("is everything loaded?", res, structuredClone(context));
              return res;
          }
      }
  });