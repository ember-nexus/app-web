import { expect } from 'chai';
import {EventManager} from "../../../src/EventManager/EventManager";
import {Event} from "../../../src/Type/Definition/Event";
import {EventIdentifier} from "../../../src/Type/Definition/EventIdentifier";
import {validateEventIdentifierFromString} from "../../../src/Type/Definition/EventIdentifier";
import {EventHandler} from "../../../src/Type/Definition/EventHandler";
import {
  EventHandlerIdentifier,
  validateEventHandlerIdentifierFromString
} from "../../../src/Type/Definition/EventHandlerIdentifier";
import {EventIdentifier} from "@ember-nexus/web-sdk/Type/Enum";
import {validatePluginIdFromString} from "../../../src/Type/Definition/PluginId";


class TestEventA implements Event {
  getEventIdentifier(): EventIdentifier {
    return validateEventIdentifierFromString('test-event-a');
  }
}

class TestEventB implements Event {
  getEventIdentifier(): EventIdentifier {
    return validateEventIdentifierFromString('test-event-b');
  }
}

class TestEventHandler1 implements EventHandler {
  getEventHandlerIdentifier(): EventHandlerIdentifier {
    return validateEventHandlerIdentifierFromString(validatePluginIdFromString('test-plugin'), 'handler-1');
  }

  getHandleableEvents(): EventIdentifier[] {
    return [
      validateEventIdentifierFromString('test-event-a')
    ];
  }

  handleEvent(_event: Event): void {
  }

}

class TestEventHandler2 implements EventHandler {
  getEventHandlerIdentifier(): EventHandlerIdentifier {
    return validateEventHandlerIdentifierFromString(validatePluginIdFromString('test-plugin'), 'handler-2');
  }

  getHandleableEvents(): EventIdentifier[] {
    return [
      validateEventIdentifierFromString('test-event-a'),
      validateEventIdentifierFromString('test-event-b'),
    ];
  }

  handleEvent(_event: Event): void {
  }

}

describe('EvenManager tests', () => {

  it('should be able to create it without problems', () => {
    const eventManager = new EventManager();
    expect(eventManager).to.be.instanceof(EventManager);
    expect(eventManager.getEventHandlers()).to.be.an( "array" ).that.is.empty;
    expect(eventManager.clearEventHandlers()).to.equal(eventManager);
  });

  it('should be able to use it without problems', () => {
    const eventManager = new EventManager();

    const eventHandler1 = new TestEventHandler1();
    eventManager.registerEventHandler(eventHandler1);
    const eventHandler2 = new TestEventHandler2();
    eventManager.registerEventHandler(eventHandler2);

    

  });


});
