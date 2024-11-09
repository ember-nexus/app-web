import 'reflect-metadata';
import { BrowserEventHandler } from '@ember-nexus/web-sdk/BrowserEvent';
import { WebSdkConfiguration } from '@ember-nexus/web-sdk/Service';
import { Container } from 'typedi';

import { CorePlugin } from './CorePlugin';

export * as EmberNexusWebSDK from '@ember-nexus/web-sdk';

export * as Error from './Error';
export * as Page from './Page';
export * as Component from './Component';
export * as Machine from './Machine';
export * as Service from './Service';
export * as Type from './Type';
export * as Style from './Style';
export * as ThirdPartyCode from './ThirdPartyCode';
export { Container };

import '@ember-nexus/uix/Style/index.css';
import './Style/BodyStyle.css';

const webSdkConfiguration = Container.get(WebSdkConfiguration);
webSdkConfiguration.setApiHost('https://reference-dataset.ember-nexus.dev');
Container.get(BrowserEventHandler).addBrowserEventListeners(document.getElementById('app') as HTMLElement);

Container.get(CorePlugin).init();
