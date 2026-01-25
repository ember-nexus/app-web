import {init} from "@ember-nexus/app-core";
import {ApiConfiguration, ServiceResolver} from "@ember-nexus/app-core/Service";
import {init as init2} from "@ember-nexus/app-plugin-template";

declare global {
    interface Window {
        sr?: ServiceResolver;
    }
}


console.log('pre-init');

const appNode = document.getElementById('app');
if (appNode === null) {
    throw new Error("Unable to find div with id 'app'.");
}
const serviceResolver = init(appNode);
window.sr = serviceResolver;
const config = serviceResolver.getServiceOrFail<ApiConfiguration>(ApiConfiguration.identifier);
config.setApiHost('https://reference-dataset.ember-nexus.dev');

console.log("init app-plugin-template:");

init2(serviceResolver);

console.log('post-init');
