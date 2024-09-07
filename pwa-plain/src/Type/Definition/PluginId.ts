import {Branded} from "./Branded";
import {ParseError} from "../../Error/ParseError";

type PluginId = Branded<string, 'pluginId'>;

const pluginIdRegex = /^([a-z]+)(-*[a-z0-9]+)*$/;

function validatePluginIdFromString(pluginId: string): PluginId {
  if (!pluginIdRegex.test(pluginId)) {
    throw new ParseError('Passed variable is not a valid plugin id.');
  }
  return pluginId as PluginId;
}

export { PluginId, pluginIdRegex, validatePluginIdFromString };
