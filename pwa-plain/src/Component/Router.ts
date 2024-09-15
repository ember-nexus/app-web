import { LitElement, TemplateResult } from 'lit';
import {html, unsafeStatic} from 'lit/static-html.js';
import { customElement } from 'lit/decorators.js';
import {routerMachine} from "../Machine";
import {Actor, createActor} from "xstate";
import {RouteConfiguration} from "../Type/Definition/RouteConfiguration";

@customElement('ember-nexus-router')
class Router extends LitElement {

  protected _routeConfiguration: RouteConfiguration | null;

  protected _error: string | null;

  protected _state: string | null;

  protected actor: Actor<typeof routerMachine>;

  setupActorSubscription(): void {
    this.actor.subscribe((snapshot) => {
      this._routeConfiguration = snapshot.context.routeConfiguration;
      this._error = snapshot.context.error;
      this._state = snapshot.value;
      this.requestUpdate();
    });
    console.log("Updated stuff :D");
  }

  handlePopStateEvent(): void{
    console.log('(popstate) Location changed to: ', window.location.pathname);
    this.actor.send({
      type: 'routeChange',
      route: window.location.pathname,
    });
  }

  handleLinkClickEvent(event: PointerEvent): void{
    const target = event.target;
    if (target === null) {
      return;
    }
    if (!(target instanceof HTMLElement)) {
      return;
    }

    const newRawUrl = target.attributes.getNamedItem('href')?.value;
    if (newRawUrl == null) {
      return;
    }

    const currentUrl = window.location.origin;
    console.log(`current url: ${currentUrl}`);

    // Create a new URL object to resolve the relative path to an absolute URL
    const newAbsoluteUrl = new URL(newRawUrl, currentUrl);

    if (newAbsoluteUrl.host !== window.location.host) {
      console.log('Clicked link to different domain, ignoring it');
      return;
    }

    console.log(`new absolute url: ${newAbsoluteUrl}`);
    history.pushState({}, '', newAbsoluteUrl);
    event.preventDefault();

    this.actor.send({
      type: 'routeChange',
      route: newAbsoluteUrl.pathname,
    });
  }


  connectedCallback(): void {
    super.connectedCallback();
    this.actor = createActor(routerMachine);
    this.setupActorSubscription();
    this.actor.start();
    window.addEventListener('popstate', this.handlePopStateEvent.bind(this));
    document.addEventListener('click', this.handleLinkClickEvent.bind(this));
  }

  disconnectedCallback(): void {
    window.removeEventListener('popstate', this.handlePopStateEvent);
    document.removeEventListener('click', this.handleLinkClickEvent);
    this.actor.stop();
    super.disconnectedCallback();
  }

  render(): TemplateResult {
    let routeWebComponent : any = null;
    if (this._routeConfiguration) {
      routeWebComponent = this._routeConfiguration.webComponent as string;
    } else {
      routeWebComponent = 'ember-nexus-error-page-not-found';
    }
    routeWebComponent = unsafeStatic(routeWebComponent);
    return html`<div style="border: 5px solid lightgray; padding: 20px;">
      <${routeWebComponent}></${routeWebComponent}>
    </div>`;
  }

}

export { Router };
