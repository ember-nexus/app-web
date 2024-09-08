import { expect } from 'chai';

import { RouteManager } from '../../../src/Service/RouteManager';
import {validatePluginIdFromString} from "../../../src/Type/Definition/PluginId";
import { SinonSandbox, SinonStubbedInstance, createSandbox } from 'sinon';
import { Container } from 'typedi';
import {Logger} from '../../../src/Service/Logger';
import {validateRouteIdFromString} from "../../../src/Type/Definition/RouteId";

describe('RouteManager tests', () => {
  let sandbox: SinonSandbox;
  let mockedLogger: SinonStubbedInstance<Logger>;

  beforeEach(() => {
    sandbox = createSandbox();

    mockedLogger = sandbox.createStubInstance(Logger);
    Container.set(Logger, mockedLogger);
  });

  afterEach(() => {
    sandbox.restore();
    Container.reset();
  });

  it('should return empty routes after creation', async () => {
    const routeManager = Container.get(RouteManager);

    const somePluginId = validatePluginIdFromString('plugin');

    expect(routeManager.getAllRouteConfigurations()).to.be.empty;
    expect(routeManager.getPluginRouteConfigurations(somePluginId)).to.be.empty;
  });

  it('should match null for routes which are not defined', async () => {
    const routeManager = Container.get(RouteManager);
    expect(routeManager.getAllRouteConfigurations()).to.be.empty;

    const nullResult = routeManager.matchRoute('/i-do-not-exist');
    expect(nullResult).to.be.null;
  });

  it('should match a single defined route', async () => {
    const routeManager = Container.get(RouteManager);

    const somePluginId = validatePluginIdFromString('plugin');
    routeManager.addRouteConfiguration({
      pluginId: somePluginId,
      routeId: validateRouteIdFromString('route'),
      route: '/test',
      priority: 0,
      webComponent: 'some-web-component',
      guards: []
    });

    expect(routeManager.getAllRouteConfigurations()).to.have.length(1);
    expect(routeManager.getPluginRouteConfigurations(somePluginId)).to.have.length(1);

    const matchedResult = routeManager.matchRoute('/test');
    if (matchedResult === null) {
      throw "matchedResult should not be null";
    }
    expect(matchedResult).to.not.be.null;
    expect(matchedResult.route).to.equal('/test')

    const nullResult = routeManager.matchRoute('/i-do-not-exist');
    expect(nullResult).to.be.null;
  });

});
