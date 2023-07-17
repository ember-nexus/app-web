import {LitElement, html} from 'lit'
import {customElement} from 'lit/decorators.js'
import {Header} from "../../ui/header/header.ts";



@customElement('ember-nexus-page-index')
export class Index extends LitElement {

  render() {
    return html`
      <ember-nexus-ui-header></ember-nexus-ui-header>
    `
  }

}

declare global {
  interface HTMLElementTagNameMap {
    'ember-nexus-page-index': Index
  }
}

export {Header}
