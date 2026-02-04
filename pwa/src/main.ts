import {init as coreInit, optimizeDynamicConfigurations as coreOptimizeDynamicConfigurations, initEventListeners} from "@ember-nexus/app-core";
import {ApiConfiguration, ServiceResolver} from "@ember-nexus/app-core/Service";
import {init as templateInit, optimizeDynamicConfigurations as templateOptimizeDynamicConfigurations} from "@ember-nexus/app-plugin-template";

export * from "./Router.js";

//import './index.css';

declare global {
    interface Window {
        sr?: ServiceResolver;
    }
}

async function init(){
    const appNode = document.getElementById('app');
    if (appNode === null) {
        throw new Error("Unable to find div with id 'app'.");
    }
    const serviceResolver = new ServiceResolver();
    window.sr = serviceResolver;

    console.log('plugin init...');

    await coreInit(serviceResolver);
    await templateInit(serviceResolver);

    console.log('special core init');

    initEventListeners(appNode, serviceResolver);
    serviceResolver.getServiceOrFail<ApiConfiguration>(ApiConfiguration.identifier)
        .setApiHost('https://reference-dataset.ember-nexus.dev');

    console.log('plugin optimize dynamic configurations...');

    await coreOptimizeDynamicConfigurations(serviceResolver);
    await templateOptimizeDynamicConfigurations(serviceResolver);

    console.log("add routing component");

    // appNode.innerHTML = "<ember-nexus-app-core-router></ember-nexus-app-core-router>";
    appNode.innerHTML = "<ember-nexus-app-core-router-debug></ember-nexus-app-core-router-debug>";
}

init();
