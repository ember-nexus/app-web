import {LitElement, TemplateResult, html, css} from 'lit';
import { customElement, property } from 'lit/decorators.js';
import {unsafeHTML} from 'lit/directives/unsafe-html.js';
import {Actor, createActor} from "xstate";
import {iconLoaderMachine} from "../../Machine";

@customElement('ember-nexus-core-icon')
class IconComponent extends LitElement {

  static styles = [
    css`
      .icon {
        width: 1.2rem;
        height: 1.2rem;
      }
    `
  ];

  @property()
  src?: string;

  protected _icon: string;

  protected _error: string | null;

  protected _state: string | null;

  protected actor: Actor<typeof iconLoaderMachine>;

  setupActorSubscription(): void {
    this.actor.subscribe((snapshot) => {
      this._icon = snapshot.context.icon;
      this._error = snapshot.context.error;
      this._state = snapshot.value;
      this.requestUpdate();
    });
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.actor = createActor(iconLoaderMachine, {
      input: {
        url: this.src
      },
    });
    this.setupActorSubscription();
    this.actor.start();
  }

  disconnectedCallback(): void {
    this.actor.stop();
    super.disconnectedCallback();
  }

  updated(changedProperties): void {
    if (changedProperties.has('src')) {
      this.actor.send({
        type: 'urlChange',
        url: this.src as string
      });
    }
  }

  render(): TemplateResult {
    let icon = unsafeHTML(this._icon);

    return html`
      <div class="icon">
        ${icon}
      </div>
    `;
  }
}

export { IconComponent };
