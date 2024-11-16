import { Event } from './Event';
import { EventHandlerIdentifier } from './EventHandlerIdentifier';
import { EventIdentifier } from './EventIdentifier';

interface EventHandler {
  getEventHandlerIdentifier(): EventHandlerIdentifier;
  handleEvent(event: Event): void;
  getHandleableEvents(): EventIdentifier[];
}

export { EventHandler };
