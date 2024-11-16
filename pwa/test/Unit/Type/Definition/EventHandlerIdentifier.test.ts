import { expect } from 'chai';
import {validateEventHandlerIdentifierFromString} from "../../../../src/Type/Definition/EventHandlerIdentifier";
import {validatePluginIdFromString} from "../../../../src/Type/Definition/PluginId";


describe('EventHandlerIdentifier tests', () => {

  it('should successfully validate valid event handler identifier', () => {
    const pluginIdentifier = validatePluginIdFromString('plugin');

    expect(validateEventHandlerIdentifierFromString(pluginIdentifier, 'test')).to.equal('plugin.test');
    expect(validateEventHandlerIdentifierFromString(pluginIdentifier, 'test-a')).to.equal('plugin.test-a');
  });

  it('should throw parser errors on invalid event handler identifier', () => {
    const pluginIdentifier = validatePluginIdFromString('plugin');

    expect(() => validateEventHandlerIdentifierFromString(pluginIdentifier, '1')).to.throw('Passed variable is not a valid event handler identifier.');
    expect(() => validateEventHandlerIdentifierFromString(pluginIdentifier, 'test-1')).to.throw('Passed variable is not a valid event handler identifier.');
  });

});
