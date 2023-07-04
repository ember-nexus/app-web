import {LitElement, html, unsafeCSS} from 'lit'
import { customElement, property } from 'lit/decorators.js'
import styles from './ember-nexus-general-editor.scss?inline';
import {EditorView, basicSetup} from "codemirror"
import {json} from "@codemirror/lang-json"





@customElement('ember-nexus-general-editor')
export class EmberNexusGeneralEditor extends LitElement {

  static styles = unsafeCSS(styles);

  @property()
  uuid: string = ''

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('keydown', this.handleKeyDown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown(event) {
    event.stopPropagation();
  }

  firstUpdated() {
    let editorDiv = this.shadowRoot.getElementById('editor');
    console.log("editor div", editorDiv);

    let updateListenerExtension = EditorView.updateListener.of((update) => {
      if (update.docChanged) {
        console.log(update.state.doc.toString());
      }
    });

    let editor = new EditorView({
      extensions: [basicSetup, json(), updateListenerExtension],
      parent: editorDiv,

    });
    console.log(editor);
  }

  render() {
    return html`
      <div class="mdc-card">
        <header>
          <div class="title">
            <div class="icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>JSON</title>
                <path d="M5,3H7V5H5V10A2,2 0 0,1 3,12A2,2 0 0,1 5,14V19H7V21H5C3.93,20.73 3,20.1 3,19V15A2,2 0 0,0 1,13H0V11H1A2,2 0 0,0 3,9V5A2,2 0 0,1 5,3M19,3A2,2 0 0,1 21,5V9A2,2 0 0,0 23,11H24V13H23A2,2 0 0,0 21,15V19A2,2 0 0,1 19,21H17V19H19V14A2,2 0 0,1 21,12A2,2 0 0,1 19,10V5H17V3H19M12,15A1,1 0 0,1 13,16A1,1 0 0,1 12,17A1,1 0 0,1 11,16A1,1 0 0,1 12,15M8,15A1,1 0 0,1 9,16A1,1 0 0,1 8,17A1,1 0 0,1 7,16A1,1 0 0,1 8,15M16,15A1,1 0 0,1 17,16A1,1 0 0,1 16,17A1,1 0 0,1 15,16A1,1 0 0,1 16,15Z" />
              </svg>
            </div>
            <div class="mdc-typography--headline5">JSON Editor</div>
          </div>
          <div class="actions">
            <button class="mdc-icon-button">
              <div class="mdc-icon-button__ripple"></div>
              <span class="mdc-icon-button__focus-ring"></span>
              <svg class="mdc-icon-button__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>close</title>
                <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
              </svg>
            </button>
          </div>
        </header>
        <div id="editor"></div>
        <div class="content">
          <p>save</p>
        </div>
      </div>
    `
  }

}

declare global {
  interface HTMLElementTagNameMap {
    'ember-nexus-general-editor': EmberNexusGeneralEditor
  }
}
