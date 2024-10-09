import { LitElement, TemplateResult, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Actor, createActor } from 'xstate';

import { iconLoaderMachine } from '../../Machine';

@customElement('ember-nexus-core-icon')
class IconComponent extends LitElement {
  static styles = [
    css`
      .icon {
        width: 1.2rem;
        height: 1.2rem;
      }
      .icon svg {
        fill: currentColor;
      }
    `,
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
        url: this.src,
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
        url: this.src as string,
      });
    }
  }

  render(): TemplateResult {
    let icon = unsafeHTML(this._icon);
    if (this._state === 'Error') {
      icon = html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <title>icon could not be loaded</title>
        <path
          d="M22 20.7L3.3 2L2 3.3L3 4.3V19C3 20.1 3.9 21 5 21H19.7L20.7 22L22 20.7M5 19V6.3L12.6 13.9L11.1 15.8L9 13.1L6 17H15.7L17.7 19H5M8.8 5L6.8 3H19C20.1 3 21 3.9 21 5V17.2L19 15.2V5H8.8"
        />
      </svg>`;
    }
    return html` <div class="icon">${icon}</div> `;
  }
}

export { IconComponent };
