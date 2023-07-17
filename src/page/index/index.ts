import {LitElement, html} from 'lit'
import {customElement} from 'lit/decorators.js'
import {Header} from "../../ui/header/header.ts";
import {EmberNexusNote} from "../../ember-nexus-note.ts";
import {EmberNexusTag} from "../../ember-nexus-tag.ts";



@customElement('ember-nexus-page-index')
export class Index extends LitElement {

  render() {
    return html`
      <ember-nexus-ui-header></ember-nexus-ui-header>
      <div style="width: 800px; margin: 0 auto; margin-top: 2rem;">
        <ember-nexus-note uuid="f7644265-be3f-4c54-a4b7-40dfce0ce24c"></ember-nexus-note>
      </div>
    `
  }

}

declare global {
  interface HTMLElementTagNameMap {
    'ember-nexus-page-index': Index
  }
}

export {Header, EmberNexusNote, EmberNexusTag}
