import {assign, createMachine} from 'xstate';
import Relation from "@ember-nexus/web-sdk/src/Type/Relation";
import Node from "@ember-nexus/web-sdk/src/Type/Node";

export interface GenericContext {
    uuid: string;
    element: undefined | Node | Relation;
    related: undefined | Array<Node | Relation>;
    error: undefined | string;
}

interface UpdateUuidEvent {
    type: 'UPDATE_UUID',
    uuid: string
}

interface ElementLoadedEvent {
    type: 'ELEMENT_LOADED',
    element: Node | Relation
}

interface RelatedLoadedEvent {
    type: 'RELATED_LOADED',
    related: Array<Node | Relation>
}

export default createMachine({
    id: 'generic-related-machine',
    initial: 'initial',
    predictableActionArguments: true,
    context: {
        uuid: '',
        element: undefined,
        related: undefined,
        error: undefined
    } as GenericContext,
    states: {
        initial: {
            always: [
                {
                    target: 'beforeLoading',
                    actions: assign({
                        error: undefined,
                        element: undefined,
                        related: undefined
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
                        error: (context: GenericContext) => `UUID ${context.uuid} is invalid.`
                    })
                }
            ]
        },
        loading: {
            on: {
                UPDATE_UUID: {
                    target: 'initial',
                    actions: assign({
                        uuid: (_context: GenericContext, event: UpdateUuidEvent) => event.uuid
                    })
                },
                ERROR: {
                    target: 'error',
                    actions: assign({
                        error: (_context: GenericContext, event: ErrorEvent) => event.error
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
                            }
                        },
                        loading: {
                            on: {
                                ELEMENT_LOADED: {
                                    target: 'loaded',
                                    actions: assign({
                                        element: (_context: GenericContext, event: ElementLoadedEvent) => event.element
                                    })
                                },
                            }
                        },
                        loaded: {}
                    }
                },
                related: {
                    initial: 'initial',
                    states: {
                        initial: {
                            on: {
                                RELATED_LOADING_STARTED: {
                                    target: 'loading'
                                }
                            }
                        },
                        loading: {
                            on: {
                                RELATED_LOADED: {
                                    target: 'loaded',
                                    actions: assign({
                                        related: (_context: GenericContext, event: RelatedLoadedEvent) => event.related
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
                    cond: 'isBothNestedStatesLoaded'
                }
            ]
        },
        error: {
            on: {
                UPDATE_UUID: {
                    target: 'initial',
                    actions: assign({
                        uuid: (_context: GenericContext, event: UpdateUuidEvent) => {
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
                        uuid: (_context: GenericContext, event: UpdateUuidEvent) => event.uuid
                    })
                }
            }
        }
    }
},
{
    guards: {
        isValidUuid: (context: GenericContext) => {
            if (context.uuid == undefined) {
                return false;
            }
            return context.uuid.match(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);
        },
        isBothNestedStatesLoaded: (context: GenericContext) => {
            return (
                context.element != undefined &&
                context.related != undefined
            );
        }
    }
});