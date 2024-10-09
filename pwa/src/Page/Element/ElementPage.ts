import { Element, Uuid, validateUuidFromString } from '@ember-nexus/web-sdk/Type/Definition';
import { LitElement, TemplateResult, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { Actor, createActor } from 'xstate';

import { elementPageMachine } from '../../Machine';
import { collectionPageStyle } from '../../Style/CollectionPageStyle';

@customElement('ember-nexus-core-element-page')
class ElementPage extends LitElement {
  static styles = [collectionPageStyle];

  protected _error: string | null;

  protected _state: string | null;
  protected _element: Element | null;
  protected _elementId: Uuid | null;

  protected actor: Actor<typeof elementPageMachine>;

  setupActorSubscription(): void {
    this.actor.subscribe((snapshot) => {
      this._error = snapshot.context.error;
      this._state = snapshot.value;
      this._element = snapshot.context.element;
      this.requestUpdate();
    });
  }

  connectedCallback(): void {
    super.connectedCallback();
    this._elementId = validateUuidFromString('0940ad38-e030-4d6d-ae77-54b40610d1bd');
    this.actor = createActor(elementPageMachine, {
      input: {
        elementId: this._elementId,
      },
    });
    this.setupActorSubscription();
    this.actor.start();
  }

  disconnectedCallback(): void {
    this.actor.stop();
    super.disconnectedCallback();
  }

  render(): TemplateResult {
    return html`
      <div class="page">
        <div class="content">
          <div class="grid">
            <h1>Element</h1>
            <ember-nexus-default-card element-id="${this._elementId}"></ember-nexus-default-card>
          </div>
        </div>
      </div>
    `;
  }
}

export { ElementPage };
