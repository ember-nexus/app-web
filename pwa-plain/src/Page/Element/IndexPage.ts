import { LitElement, TemplateResult, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import {Actor, createActor} from "xstate";
import {indexPageMachine} from "../../Machine";
import {Collection} from "@ember-nexus/web-sdk/Type/Definition";
import {collectionPageStyle} from "../../Style/CollectionPageStyle";

@customElement('ember-nexus-core-index-page')
class LoginPage extends LitElement {
  static styles = [collectionPageStyle];

  protected _error: string | null;

  protected _state: string | null;
  protected _page: number;
  protected _pageSize: number;
  protected _collection: Collection | null;

  protected actor: Actor<typeof indexPageMachine>;

  setupActorSubscription(): void {
    this.actor.subscribe((snapshot) => {
      this._error = snapshot.context.error;
      this._state = snapshot.value;
      this._page = snapshot.context.page;
      this._pageSize = snapshot.context.pageSize;
      this._collection = snapshot.context.collection;
      this.requestUpdate();
    });
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.actor = createActor(indexPageMachine, {
      input: {
        page: 1,
        pageSize: 25
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
    let collection : TemplateResult[] = [];
    if (this._collection !== null) {
      for (let i = 0; i < this._collection.nodes.length; i++) {
        collection.push(html`<ember-nexus-default-card element-id="${this._collection.nodes[i].id}"></ember-nexus-default-card>`)
      }
    }
    return html`
      <div class="page">
        <div class="content">
          <h1>Index</h1>
          ${collection}
        </div>
      </div>
    `;
  }
}

export { LoginPage };
