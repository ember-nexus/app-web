import { Branded } from './Branded';
import { PluginId } from './PluginId';
import { ParseError } from '../../Error/ParseError';

type EventHandlerIdentifier = Branded<string, 'eventHandlerIdentifier'>;

const eventHandlerIdentifierRegex = /^([a-z][a-z0-9]*)(-[a-z][a-z0-9]*)*$/;

function validateEventHandlerIdentifierFromString(
  pluginIdentifier: PluginId,
  eventHandlerIdentifier: string,
): EventHandlerIdentifier {
  if (!eventHandlerIdentifierRegex.test(eventHandlerIdentifier)) {
    throw new ParseError('Passed variable is not a valid event handler identifier.');
  }
  return `${pluginIdentifier}.${eventHandlerIdentifier}` as EventHandlerIdentifier;
}

export { EventHandlerIdentifier, eventHandlerIdentifierRegex, validateEventHandlerIdentifierFromString };
