import { Branded } from './Branded';
import { PluginId } from './PluginId';
import { ParseError } from '../../Error/ParseError';

type EventIdentifier = Branded<string, 'eventIdentifier'>;

const eventIdentifierRegex = /^([a-z][a-z0-9]*)(-[a-z][a-z0-9]*)*$/;

function validateEventIdentifierFromString(
  eventIdentifier: string,
  pluginIdentifier: null | PluginId = null,
): EventIdentifier {
  if (!eventIdentifierRegex.test(eventIdentifier)) {
    throw new ParseError('Passed variable is not a valid event identifier.');
  }
  if (pluginIdentifier !== null) {
    return `${pluginIdentifier}.${eventIdentifier}` as EventIdentifier;
  }
  return eventIdentifier as EventIdentifier;
}

export { EventIdentifier, eventIdentifierRegex, validateEventIdentifierFromString };
