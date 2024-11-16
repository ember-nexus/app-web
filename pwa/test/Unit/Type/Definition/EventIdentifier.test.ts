import { expect } from 'chai';
import {validateEventIdentifierFromString} from "../../../../src/Type/Definition/EventIdentifier";
import {validatePluginIdFromString} from "../../../../src/Type/Definition/PluginId";


describe('EventIdentifier tests', () => {

  it('should successfully validate valid event identifier', () => {
    const pluginIdentifier = validatePluginIdFromString('plugin');

    expect(validateEventIdentifierFromString('test')).to.equal('test');
    expect(validateEventIdentifierFromString('test-a')).to.equal('test-a');
    expect(validateEventIdentifierFromString('test', pluginIdentifier)).to.equal('plugin.test');
    expect(validateEventIdentifierFromString('test-a', pluginIdentifier)).to.equal('plugin.test-a');
  });

  it('should throw parser errors on invalid event identifier', () => {
    const pluginIdentifier = validatePluginIdFromString('plugin');

    expect(() => validateEventIdentifierFromString('1')).to.throw('Passed variable is not a valid event identifier.');
    expect(() => validateEventIdentifierFromString('test-1')).to.throw('Passed variable is not a valid event identifier.');
    expect(() => validateEventIdentifierFromString('1', pluginIdentifier)).to.throw('Passed variable is not a valid event identifier.');
    expect(() => validateEventIdentifierFromString('test-1', pluginIdentifier)).to.throw('Passed variable is not a valid event identifier.');
  });

});
