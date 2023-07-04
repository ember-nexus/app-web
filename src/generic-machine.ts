import {assign, createMachine} from 'xstate';

export interface GenericContext {
    uuid: string;
    data: undefined | object;
    error: undefined | string;
}

interface UpdateUuidEvent {
    type: 'UPDATE_UUID',
    uuid: string
}

interface DataLoadedEvent {
    type: 'DATA_LOADED',
    data: object
}

export default createMachine({
    id: 'generic-machine',
    initial: 'initial',
    predictableActionArguments: true,
    context: {
        uuid: '',
        data: undefined,
        error: undefined
    } as GenericContext,
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
                DATA_LOADED: {
                    target: 'loaded',
                    actions: assign({
                        data: (_context: GenericContext, event: DataLoadedEvent) => event.data
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
            }
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
        }
    }
});