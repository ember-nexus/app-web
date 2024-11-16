import { EventIdentifier } from './EventIdentifier';

interface Event {
  getEventIdentifier(): EventIdentifier;
}

export { Event };
