import { Event } from '../Type/Definition/Event';
import { EventHandler } from '../Type/Definition/EventHandler';
import { EventHandlerIdentifier } from '../Type/Definition/EventHandlerIdentifier';
import { EventIdentifier } from '../Type/Definition/EventIdentifier';

class EventManager {
  private eventHandlers: Record<EventHandlerIdentifier, EventHandler> = {};

  private eventHandlerIdentifiersPerEventIdentifier: Record<EventIdentifier, Array<EventHandlerIdentifier>> = {};

  constructor() {}

  registerEventHandler(eventHandler: EventHandler): EventManager {
    this.eventHandlers[eventHandler.getEventHandlerIdentifier()] = eventHandler;

    const handleableEvents = eventHandler.getHandleableEvents();
    for (const key in handleableEvents) {
      const eventIdentifier = handleableEvents[key];
      if (!(eventIdentifier in this.eventHandlerIdentifiersPerEventIdentifier)) {
        this.eventHandlerIdentifiersPerEventIdentifier[eventIdentifier] = [];
      }
      this.eventHandlerIdentifiersPerEventIdentifier[eventIdentifier].push(eventHandler.getEventHandlerIdentifier());
    }

    return this;
  }

  isEventHandlerRegistered(eventHandlerIdentifier: EventHandlerIdentifier): boolean {
    return eventHandlerIdentifier in this.eventHandlers;
  }

  getEventHandler(eventHandlerIdentifier: EventHandlerIdentifier): null | EventHandler {
    if (!(eventHandlerIdentifier in this.eventHandlers)) {
      return null;
    }
    return this.eventHandlers[eventHandlerIdentifier];
  }

  getEventHandlers(): Array<EventHandler> {
    return Object.values(this.eventHandlers);
  }

  removeEventHandler(eventHandlerIdentifier: EventHandlerIdentifier): EventManager {
    if (!(eventHandlerIdentifier in this.eventHandlers)) {
      return this;
    }

    const eventIdentifiers = this.eventHandlers[eventHandlerIdentifier].getHandleableEvents();

    for (const key in eventIdentifiers) {
      const eventIdentifier = eventIdentifiers[key];
      if (!(eventIdentifier in this.eventHandlerIdentifiersPerEventIdentifier)) {
        continue;
      }
      this.eventHandlerIdentifiersPerEventIdentifier[eventIdentifier] = this.eventHandlerIdentifiersPerEventIdentifier[
        eventIdentifier
      ].filter((v) => v !== eventHandlerIdentifier);
    }

    delete this.eventHandlers[eventHandlerIdentifier];

    return this;
  }

  clearEventHandlers(): EventManager {
    this.eventHandlerIdentifiersPerEventIdentifier = {};
    this.eventHandlers = {};

    return this;
  }

  getEventHandlersForEvent(eventIdentifier: EventIdentifier): Array<EventHandler> {
    if (!(eventIdentifier in this.eventHandlerIdentifiersPerEventIdentifier)) {
      return [];
    }

    const eventHandlerIdentifiers = this.eventHandlerIdentifiersPerEventIdentifier[eventIdentifier];

    const eventHandlers: EventHandler[] = [];

    for (const key in eventHandlerIdentifiers) {
      const eventHandlerIdentifier = eventHandlerIdentifiers[key];
      if (!(eventHandlerIdentifier in this.eventHandlers)) {
        console.log(
          `Unable to find event handler with identifier ${eventHandlerIdentifier} in list of event handlers - was it partially removed?`,
        );
        continue;
      }
      eventHandlers.push(this.eventHandlers[eventHandlerIdentifier]);
    }

    return eventHandlers;
  }

  handleEvent(event: Event): EventManager {
    const eventHandlers = this.getEventHandlersForEvent(event.getEventIdentifier());

    for (const key in eventHandlers) {
      try {
        eventHandlers[key].handleEvent(event);
      } catch (e) {
        console.log(e);
      }
    }

    return this;
  }
}

export { EventManager };
