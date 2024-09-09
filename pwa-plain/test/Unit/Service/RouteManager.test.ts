import { expect } from 'chai';

import { RouteManager } from '../../../src/Service/RouteManager';
import {validatePluginIdFromString} from "../../../src/Type/Definition/PluginId";
import { SinonSandbox, SinonStubbedInstance, createSandbox } from 'sinon';
import { Container } from 'typedi';
import {Logger} from '../../../src/Service/Logger';
import {validateRouteIdFromString} from "../../../src/Type/Definition/RouteId";
import {buildCombinedPluginIdRouteIdFromComponents} from "../../../src/Type/Definition/CombinedPluginIdRouteId";

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
    expect(matchedResult.route).to.equal('/test');

    const nullResult = routeManager.matchRoute('/i-do-not-exist');
    expect(nullResult).to.be.null;
  });

  it('should throw an error if two routes with the same id are registered', async () => {
    const routeManager = Container.get(RouteManager);

    const routeConfiguration = {
      pluginId: validatePluginIdFromString('plugin'),
      routeId: validateRouteIdFromString('route'),
      route: '/test',
      priority: 0,
      webComponent: 'some-web-component',
      guards: []
    };

    routeManager.addRouteConfiguration(routeConfiguration);

    expect(() => routeManager.addRouteConfiguration(routeConfiguration)).to.throw("Route Manager: Route plugin.route is already defined.");
  });

  it('should match one of many routes', async () => {
    const routeManager = Container.get(RouteManager);

    const somePluginId = validatePluginIdFromString('plugin');
    routeManager.addRouteConfiguration({
      pluginId: somePluginId,
      routeId: validateRouteIdFromString('test-1'),
      route: '/test-1',
      priority: 0,
      webComponent: 'some-web-component',
      guards: []
    });
    routeManager.addRouteConfiguration({
      pluginId: somePluginId,
      routeId: validateRouteIdFromString('test-2'),
      route: '/test-2',
      priority: 100,
      webComponent: 'some-web-component',
      guards: []
    });
    routeManager.addRouteConfiguration({
      pluginId: somePluginId,
      routeId: validateRouteIdFromString('test-3'),
      route: '/test-3',
      priority: 200,
      webComponent: 'some-web-component',
      guards: []
    });

    expect(routeManager.getAllRouteConfigurations()).to.have.length(3);
    expect(routeManager.getPluginRouteConfigurations(somePluginId)).to.have.length(3);

    let matchedResult = routeManager.matchRoute('/test-1');
    if (matchedResult === null) {
      throw "matchedResult should not be null";
    }
    expect(matchedResult).to.not.be.null;
    expect(matchedResult.route).to.equal('/test-1');

    matchedResult = routeManager.matchRoute('/test-2');
    if (matchedResult === null) {
      throw "matchedResult should not be null";
    }
    expect(matchedResult).to.not.be.null;
    expect(matchedResult.route).to.equal('/test-2');

    matchedResult = routeManager.matchRoute('/test-3');
    if (matchedResult === null) {
      throw "matchedResult should not be null";
    }
    expect(matchedResult).to.not.be.null;
    expect(matchedResult.route).to.equal('/test-3');
  });

  it('should match one of many routes (reverse priority)', async () => {
    const routeManager = Container.get(RouteManager);

    const somePluginId = validatePluginIdFromString('plugin');
    routeManager.addRouteConfiguration({
      pluginId: somePluginId,
      routeId: validateRouteIdFromString('test-1'),
      route: '/test-1',
      priority: 200,
      webComponent: 'some-web-component',
      guards: []
    });
    routeManager.addRouteConfiguration({
      pluginId: somePluginId,
      routeId: validateRouteIdFromString('test-2'),
      route: '/test-2',
      priority: 100,
      webComponent: 'some-web-component',
      guards: []
    });
    routeManager.addRouteConfiguration({
      pluginId: somePluginId,
      routeId: validateRouteIdFromString('test-3'),
      route: '/test-3',
      priority: 0,
      webComponent: 'some-web-component',
      guards: []
    });

    expect(routeManager.getAllRouteConfigurations()).to.have.length(3);
    expect(routeManager.getPluginRouteConfigurations(somePluginId)).to.have.length(3);

    let matchedResult = routeManager.matchRoute('/test-1');
    if (matchedResult === null) {
      throw "matchedResult should not be null";
    }
    expect(matchedResult).to.not.be.null;
    expect(matchedResult.route).to.equal('/test-1');

    matchedResult = routeManager.matchRoute('/test-2');
    if (matchedResult === null) {
      throw "matchedResult should not be null";
    }
    expect(matchedResult).to.not.be.null;
    expect(matchedResult.route).to.equal('/test-2');

    matchedResult = routeManager.matchRoute('/test-3');
    if (matchedResult === null) {
      throw "matchedResult should not be null";
    }
    expect(matchedResult).to.not.be.null;
    expect(matchedResult.route).to.equal('/test-3');
  });

  it('should remove one of the defined routes cleanly', async () => {
    const routeManager = Container.get(RouteManager);

    const somePluginId = validatePluginIdFromString('plugin');
    routeManager.addRouteConfiguration({
      pluginId: somePluginId,
      routeId: validateRouteIdFromString('test-1'),
      route: '/test-1',
      priority: 0,
      webComponent: 'some-web-component',
      guards: []
    });
    routeManager.addRouteConfiguration({
      pluginId: somePluginId,
      routeId: validateRouteIdFromString('test-2'),
      route: '/test-2',
      priority: 100,
      webComponent: 'some-web-component',
      guards: []
    });
    routeManager.addRouteConfiguration({
      pluginId: somePluginId,
      routeId: validateRouteIdFromString('test-3'),
      route: '/test-3',
      priority: 100,
      webComponent: 'some-web-component',
      guards: []
    });

    expect(routeManager.getAllRouteConfigurations()).to.have.length(3);
    expect(routeManager.getPluginRouteConfigurations(somePluginId)).to.have.length(3);

    let matchedResult = routeManager.matchRoute('/test-1');
    if (matchedResult === null) {
      throw "matchedResult should not be null";
    }
    expect(matchedResult).to.not.be.null;
    expect(matchedResult.route).to.equal('/test-1');

    matchedResult = routeManager.matchRoute('/test-2');
    if (matchedResult === null) {
      throw "matchedResult should not be null";
    }
    expect(matchedResult).to.not.be.null;
    expect(matchedResult.route).to.equal('/test-2');

    matchedResult = routeManager.matchRoute('/test-3');
    if (matchedResult === null) {
      throw "matchedResult should not be null";
    }
    expect(matchedResult).to.not.be.null;
    expect(matchedResult.route).to.equal('/test-3');

    routeManager.removeRouteConfiguration(buildCombinedPluginIdRouteIdFromComponents(somePluginId, validateRouteIdFromString('test-2')));

    expect(routeManager.getAllRouteConfigurations()).to.have.length(2);
    expect(routeManager.getPluginRouteConfigurations(somePluginId)).to.have.length(2);

    matchedResult = routeManager.matchRoute('/test-1');
    if (matchedResult === null) {
      throw "matchedResult should not be null";
    }
    expect(matchedResult).to.not.be.null;
    expect(matchedResult.route).to.equal('/test-1');

    matchedResult = routeManager.matchRoute('/test-2');
    if (matchedResult !== null) {
      throw "matchedResult should be null";
    }
    expect(matchedResult).to.be.null;

    matchedResult = routeManager.matchRoute('/test-3');
    if (matchedResult === null) {
      throw "matchedResult should not be null";
    }
    expect(matchedResult).to.not.be.null;
    expect(matchedResult.route).to.equal('/test-3');
  });

  it('should not throw an error when removing route configurations which are already missing', async () => {
    const routeManager = Container.get(RouteManager);

    expect(routeManager.getAllRouteConfigurations()).to.have.length(0);

    routeManager.removeRouteConfiguration(buildCombinedPluginIdRouteIdFromComponents(validatePluginIdFromString('plugin'), validateRouteIdFromString('test-2')));

    expect(routeManager.getAllRouteConfigurations()).to.have.length(0);
  });

  it('should throw an error during logical problems with priority list', async () => {
    const routeManager = Container.get(RouteManager);

    const pluginId = validatePluginIdFromString('plugin');
    const routeId = validateRouteIdFromString('route');

    const routeConfiguration = {
      pluginId: pluginId,
      routeId: routeId,
      route: '/test',
      priority: 0,
      webComponent: 'some-web-component',
      guards: []
    };

    routeManager.addRouteConfiguration(routeConfiguration);

    expect(routeManager.getAllRouteConfigurations()).to.have.length(1);

    routeManager['priorityList'] = [];

    expect(() => routeManager.removeRouteConfiguration(buildCombinedPluginIdRouteIdFromComponents(pluginId, routeId))).to.throw("Route Manager: Unable to find priority list index with priority which should exist.");

    expect(routeManager.getAllRouteConfigurations()).to.have.length(1);
  });

  it('should throw an error during logical problems with priority list 2', async () => {
    const routeManager = Container.get(RouteManager);

    const pluginId = validatePluginIdFromString('plugin');
    const routeId = validateRouteIdFromString('route');

    const routeConfiguration = {
      pluginId: pluginId,
      routeId: routeId,
      route: '/test',
      priority: 0,
      webComponent: 'some-web-component',
      guards: []
    };

    routeManager.addRouteConfiguration(routeConfiguration);

    expect(routeManager.getAllRouteConfigurations()).to.have.length(1);

    routeManager['priorityList'][0] = {
      priority: 0,
      routes: []
    };

    expect(() => routeManager.removeRouteConfiguration(buildCombinedPluginIdRouteIdFromComponents(pluginId, routeId))).to.throw("Route Manager: Unable to find route id in priority list.");

    expect(routeManager.getAllRouteConfigurations()).to.have.length(1);
  });

  it('should remove internal priority list entry if all route configurations with same priority are removed', async () => {
    const routeManager = Container.get(RouteManager);

    const pluginId = validatePluginIdFromString('plugin');
    const routeId = validateRouteIdFromString('route');

    const routeConfiguration = {
      pluginId: pluginId,
      routeId: routeId,
      route: '/test',
      priority: 0,
      webComponent: 'some-web-component',
      guards: []
    };

    routeManager.addRouteConfiguration(routeConfiguration);

    expect(routeManager.getAllRouteConfigurations()).to.have.length(1);
    expect(routeManager['priorityList']).to.have.length(1);

    routeManager.removeRouteConfiguration(buildCombinedPluginIdRouteIdFromComponents(pluginId, routeId));

    expect(routeManager.getAllRouteConfigurations()).to.have.length(0);
    expect(routeManager['priorityList']).to.have.length(0);
  });

  it('should clear all routes', async () => {
    const routeManager = Container.get(RouteManager);

    routeManager.addRouteConfiguration({
      pluginId: validatePluginIdFromString('plugin'),
      routeId: validateRouteIdFromString('route'),
      route: '/test',
      priority: 0,
      webComponent: 'some-web-component',
      guards: []
    });

    expect(routeManager.getAllRouteConfigurations()).to.have.length(1);

    routeManager.clearAllRouteConfigurations();

    expect(routeManager.getAllRouteConfigurations()).to.have.length(0);
  });

  it('should clear routes from a specific plugin', async () => {
    const routeManager = Container.get(RouteManager);

    routeManager.addRouteConfiguration({
      pluginId: validatePluginIdFromString('plugin1'),
      routeId: validateRouteIdFromString('route'),
      route: '/test-1',
      priority: 0,
      webComponent: 'some-web-component',
      guards: []
    });

    routeManager.addRouteConfiguration({
      pluginId: validatePluginIdFromString('plugin2'),
      routeId: validateRouteIdFromString('route'),
      route: '/test-2',
      priority: 0,
      webComponent: 'some-web-component',
      guards: []
    });

    expect(routeManager.getAllRouteConfigurations()).to.have.length(2);

    routeManager.clearPluginRouteConfigurations(validatePluginIdFromString('plugin1'));

    expect(routeManager.getAllRouteConfigurations()).to.have.length(1);
  });

  it('should match static route directly', async () => {
    const routeManager = Container.get(RouteManager);

    routeManager.addRouteConfiguration({
      pluginId: validatePluginIdFromString('plugin'),
      routeId: validateRouteIdFromString('route'),
      route: '/test',
      priority: 0,
      webComponent: 'some-web-component',
      guards: []
    });

    expect(routeManager.getAllRouteConfigurations()).to.have.length(1);
    const result = routeManager.matchRoute('/test');
    expect(result).to.not.be.null;
    expect(result?.route).to.equal('/test');
    expect(result?.pluginId).to.equal('plugin');
    expect(result?.routeId).to.equal('route');
  });

  it('should match static route with higher priority first', async () => {
    const routeManager = Container.get(RouteManager);

    routeManager.addRouteConfiguration({
      pluginId: validatePluginIdFromString('plugin'),
      routeId: validateRouteIdFromString('route-1'),
      route: '/test',
      priority: 100,
      webComponent: 'some-web-component',
      guards: []
    });

    routeManager.addRouteConfiguration({
      pluginId: validatePluginIdFromString('plugin'),
      routeId: validateRouteIdFromString('route-2'),
      route: '/test',
      priority: 0,
      webComponent: 'some-web-component',
      guards: []
    });

    expect(routeManager.getAllRouteConfigurations()).to.have.length(2);
    const result = routeManager.matchRoute('/test');
    expect(result).to.not.be.null;
    expect(result?.route).to.equal('/test');
    expect(result?.pluginId).to.equal('plugin');
    expect(result?.routeId).to.equal('route-1');
  });

  it('should match static route with higher priority first (reverse priority)', async () => {
    const routeManager = Container.get(RouteManager);

    routeManager.addRouteConfiguration({
      pluginId: validatePluginIdFromString('plugin'),
      routeId: validateRouteIdFromString('route-1'),
      route: '/test',
      priority: 0,
      webComponent: 'some-web-component',
      guards: []
    });

    routeManager.addRouteConfiguration({
      pluginId: validatePluginIdFromString('plugin'),
      routeId: validateRouteIdFromString('route-2'),
      route: '/test',
      priority: 100,
      webComponent: 'some-web-component',
      guards: []
    });

    expect(routeManager.getAllRouteConfigurations()).to.have.length(2);
    const result = routeManager.matchRoute('/test');
    expect(result).to.not.be.null;
    expect(result?.route).to.equal('/test');
    expect(result?.pluginId).to.equal('plugin');
    expect(result?.routeId).to.equal('route-2');
  });

  it('should match route with valid guard functions', async () => {
    const routeManager = Container.get(RouteManager);

    routeManager.addRouteConfiguration({
      pluginId: validatePluginIdFromString('plugin'),
      routeId: validateRouteIdFromString('route-1'),
      route: '/test',
      priority: 0,
      webComponent: 'some-web-component',
      guards: [
        () => false
      ]
    });

    routeManager.addRouteConfiguration({
      pluginId: validatePluginIdFromString('plugin'),
      routeId: validateRouteIdFromString('route-2'),
      route: '/test',
      priority: 0,
      webComponent: 'some-web-component',
      guards: [
        () => true
      ]
    });

    expect(routeManager.getAllRouteConfigurations()).to.have.length(2);
    const result = routeManager.matchRoute('/test');
    expect(result).to.not.be.null;
    expect(result?.route).to.equal('/test');
    expect(result?.pluginId).to.equal('plugin');
    expect(result?.routeId).to.equal('route-2');
  });

});
