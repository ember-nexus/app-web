import {LitElement, html, unsafeCSS} from 'lit'
import {customElement, property} from 'lit/decorators.js'
import {Header} from "../../ui/header/header.ts";
import {EmberNexusNote} from "../../ember-nexus-note.ts";
import {EmberNexusTag} from "../../ember-nexus-tag.ts";
import {interpret, Interpreter} from "xstate";
import SearchMachine, {DataLoadedEvent, SearchContext} from "../../machine/search-machine.ts";
import {UpdatePayloadEvent} from "../../machine/search-machine.ts";
import Node from "@ember-nexus/web-sdk/src/Type/Node";
import Relation from "@ember-nexus/web-sdk/src/Type/Relation";
import SearchEvent from "@ember-nexus/web-sdk/dist/Event/SearchEvent";
import {BaseRenderer} from "../../component/base-renderer/base-renderer.ts";
import styles from './search.scss?inline';



@customElement('ember-nexus-page-search')
export class Search extends LitElement {

  static styles = unsafeCSS(styles);

  @property()
  uuid: string = ''
  private machine: Interpreter<any>;

  constructor() {
    super();
    // @ts-ignore
    this.machine = interpret(SearchMachine.withConfig({
      actions: {
        startSearch: this.startSearch.bind(this)
      }
    }));
    this.machine.start();
  }

  connectedCallback() {
    super.connectedCallback()

    this.machine.subscribe((state) => {
      console.log('state in component', state.value);
      this.requestUpdate();
    });

    this.machine.send({
      type: 'UPDATE_PAYLOAD',
      payload: this.queryToSearchPayload(this.getCurrentPageQuery())
    } as UpdatePayloadEvent)
  }

  getCurrentPageQuery(): string
  {
    const queryParameters = new URLSearchParams(window.location.search);
    return queryParameters.get('query') ?? '';
  }

  queryToSearchPayload(searchTerm: string): Record<string, unknown>
  {
    return {
      query: {
        multi_match: {
          query: searchTerm,
          fields: ["name^3", "content"]
        }
      }
    };
  }

  startSearch(context: SearchContext) {
    if (context.payload == undefined) {
      return;
    }
    const searchEvent = new SearchEvent(context.payload);
    this.dispatchEvent(searchEvent);
    searchEvent.getElements()
      ?.then(
        (elements: Array<Node | Relation>) => {
          this.machine.send({
            type: 'DATA_LOADED',
            data: elements
          } as DataLoadedEvent);
        }
      )
      .catch((error) => {
        this.machine.send({
          type: 'ERROR',
          error: error.message
        } as ErrorEvent);
      });
    this.machine.send({
      type: 'LOADING_STARTED'
    });
  }

  render() {
    const snapshot = this.machine.getSnapshot();
    const state = snapshot.value;
    const {data} = snapshot.context;
    let results = [];
    if (state == 'loaded') {
      for (const element of data) {
        results.push(html`<!--<ember-nexus-base-renderer uuid="${element.id}"></ember-nexus-base-renderer>-->`)
        results.push(html`<ember-nexus-note uuid="${element.id}"></ember-nexus-note>`)
      }
    }
    return html`
      <ember-nexus-ui-header></ember-nexus-ui-header>
      <div class="content">
        ${results}
      </div>
    `
  }

}

declare global {
  interface HTMLElementTagNameMap {
    'ember-nexus-page-search': Search
  }
}

export {Header, EmberNexusNote, EmberNexusTag, BaseRenderer}
