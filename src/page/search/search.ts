import {LitElement, html} from 'lit'
import {customElement} from 'lit/decorators.js'
import {Header} from "../../ui/header/header.ts";
import {EmberNexusNote} from "../../ember-nexus-note.ts";
import {EmberNexusTag} from "../../ember-nexus-tag.ts";



@customElement('ember-nexus-page-search')
export class Search extends LitElement {

  protected firstUpdated() {
    const queryParameters = new URLSearchParams(window.location.search);
    const query = queryParameters.get('query');
    console.log(query);
  }

  render() {
    return html`
      <ember-nexus-ui-header></ember-nexus-ui-header>
      <div style="width: 800px; margin: 0 auto; margin-top: 2rem;">
        <p>Search page :)</p>
      </div>
    `
  }

}

declare global {
  interface HTMLElementTagNameMap {
    'ember-nexus-page-index': Search
  }
}

export {Header, EmberNexusNote, EmberNexusTag}
