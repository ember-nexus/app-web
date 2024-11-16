import { expect } from 'chai';
import {EventManager} from "../../../src/EventManager/EventManager";


describe('EvenManager tests', () => {

  it('should be able to create it without problems', () => {
    const eventManager = new EventManager();
    expect(eventManager).to.be.instanceof(EventManager);
    expect(eventManager.getEventHandlers()).to.be.an( "array" ).that.is.empty;
    expect(eventManager.clearEventHandlers()).to.equal(eventManager);
  });

});
