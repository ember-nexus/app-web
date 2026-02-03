import { LitElement, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { html, unsafeStatic } from 'lit/static-html.js';
import type {RouteConfiguration} from "@ember-nexus/app-core/Type/Definition";
import {RouteResolver} from "@ember-nexus/app-core/Service";
import {GetServiceResolverEvent} from "@ember-nexus/app-core/BrowserEvent";


@customElement('ember-nexus-app-core-router-debug')
class Router extends LitElement {
  protected _routeConfiguration: RouteConfiguration | null = null;

  protected _routeResolver: RouteResolver | null = null;

  handleNewRoute(route: string): void {
    // eslint-disable-next-line no-console
    console.log(`router: handle new route: ${route}`);
    this._routeResolver
      ?.findRouteConfiguration(route)
      .then((routeConfiguration) => {
        if (routeConfiguration === null) {
          // eslint-disable-next-line no-console
          console.log(`router: unable to resolve route: ${route}`);
          return;
        }
        this._routeConfiguration = routeConfiguration;
        this.requestUpdate();
        return;
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.log('router: error during resolving route');
        // eslint-disable-next-line no-console
        console.log(e);
      });
  }

  handlePopStateEvent(): void {
    // eslint-disable-next-line no-console
    console.log('(popstate) Location changed to: ', window.location.pathname);
    this.handleNewRoute(window.location.pathname);
  }

  handleLinkClickEvent(event: PointerEvent): void {
    const target = event.target;
    if (target === null) {
      return;
    }
    if (!(target instanceof HTMLElement)) {
      return;
    }

    const newRawUrl = target.attributes.getNamedItem('href')?.value;
    if (newRawUrl === null || newRawUrl === undefined) {
      return;
    }

    const currentUrl = window.location.origin;

    // Create a new URL object to resolve the relative path to an absolute URL
    const newAbsoluteUrl = new URL(newRawUrl as string, currentUrl);

    if (newAbsoluteUrl.host !== window.location.host) {
      // clicked link to different domain, ignoring it
      return;
    }

    // eslint-disable-next-line no-console
    console.log(`new absolute url: ${newAbsoluteUrl}`);
    history.pushState({}, '', newAbsoluteUrl);
    event.preventDefault();

    this.handleNewRoute(newAbsoluteUrl.pathname);
  }

  connectedCallback(): void {
    super.connectedCallback();
    // eslint-disable-next-line no-console
    console.log('router: connected callback');
    window.addEventListener('popstate', this.handlePopStateEvent.bind(this));
    document.addEventListener('click', this.handleLinkClickEvent.bind(this));

    const getServiceResolverEvent = new GetServiceResolverEvent();
    this.dispatchEvent(getServiceResolverEvent);
    const serviceResolver = getServiceResolverEvent.getServiceResolver();
    if (serviceResolver === null) {
      // eslint-disable-next-line no-console
      console.log('router: unable to get service resolver');
      return;
    }
    const routeResolver = serviceResolver.getService<RouteResolver>(RouteResolver.identifier);
    if (routeResolver === null) {
      // eslint-disable-next-line no-console
      console.log('router: unable to get route resolver');
      return;
    }

    // eslint-disable-next-line no-console
    console.log('router: init complete');
    this._routeResolver = routeResolver;

    const firstRoute = window.location.pathname;
    // eslint-disable-next-line no-console
    console.log(`router: handle first route, ${firstRoute}`);
    this.handleNewRoute(firstRoute);
  }

  disconnectedCallback(): void {
    window.removeEventListener('popstate', this.handlePopStateEvent);
    document.removeEventListener('click', this.handleLinkClickEvent);
    super.disconnectedCallback();
  }

  protected getRouteWebComponentTag(): string | null {
    if (this._routeConfiguration === null) {
      console.log('router: unable to read _routeConfiguration');
      return null;
    }
    console.log('router: debug route configuration');
    console.log(this._routeConfiguration);
    if ((typeof this._routeConfiguration.webComponent) === 'string') {
      return this._routeConfiguration.webComponent;
    } else {
      console.log('router: _routeConfiguration.webComponent is not of type string');
    }
    console.log('router: fallback, null');
    // todo: support function based routes
    return null;
  }

  render(): TemplateResult {
    console.log('router: render()');
    const routeWebComponentTag = this.getRouteWebComponentTag() ?? 'ember-nexus-app-core-page-error-404';
    console.log(`router: rendering tag ${routeWebComponentTag}`);
    const routeWebComponent = unsafeStatic(routeWebComponentTag);
    return html`<div>
        <${routeWebComponent}></${routeWebComponent}>
        <button class="btn btn-warning">PWA button test</button>
    </div>`;
  }
}

export { Router };
