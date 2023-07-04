import {LitElement, css, html, unsafeCSS} from 'lit'
import { customElement, property } from 'lit/decorators.js'
import {interpret, Interpreter} from "xstate"
import styles from './ember-nexus-note.scss?inline';

// import machine from './generic-machine'
import machine from './generic-related-machine';
import GetElementEvent from "@ember-nexus/web-sdk/dist/Event/GetElementEvent";
import Node from "@ember-nexus/web-sdk/src/Type/Node";
import Relation from "@ember-nexus/web-sdk/src/Type/Relation";
import GetRelatedEvent from "@ember-nexus/web-sdk/dist/Event/GetRelatedEvent";




@customElement('ember-nexus-note')
export class EmberNexusNote extends LitElement {

  static styles = unsafeCSS(styles);

  @property()
  uuid: string = ''
  private machine: Interpreter<any>;

  constructor() {
    super();
    this.machine = interpret(machine);
    this.machine.start();
  }

  connectedCallback() {
    super.connectedCallback()

    this.machine.subscribe((state) => {
      console.log('state in component', state.value);
      let isLoading = false;
      if (typeof state.value === 'object') {
        if (Object.prototype.hasOwnProperty.call(state.value, 'loading')) {
          isLoading = true;
        }
      }
      console.log('is loading', isLoading);
      if (isLoading) {
        if (state.value.loading.element == 'initial') {
          let loadElementEvent = new GetElementEvent(state.context.uuid);
          this.dispatchEvent(loadElementEvent);
          loadElementEvent.getElement()
              ?.then(
                  (element: Node | Relation) => {
                    console.log('element', element);
                    this.machine.send({
                      type: 'ELEMENT_LOADED',
                      element: element
                    });
                  }
              )
              .catch((error) => {
                this.machine.send({
                  type: 'ERROR',
                  error: error.message
                });
              });
          this.machine.send({
            type: 'ELEMENT_LOADING_STARTED'
          });
        }
        if (state.value.loading.related == 'initial') {
          let loadRelatedEvent = new GetRelatedEvent(state.context.uuid);
          this.dispatchEvent(loadRelatedEvent);
          loadRelatedEvent.getElements()
              ?.then(
                  (elements: Array<Node | Relation>) => {
                    console.log("related elements", elements);
                    this.machine.send({
                      type: 'RELATED_LOADED',
                      related: elements
                    });
                  }
              )
              .catch((error) => {
                console.log("error while loading related elements", error);
                this.machine.send({
                  type: 'ERROR',
                  error: error.message
                });
              });
          this.machine.send({
            type: 'RELATED_LOADING_STARTED'
          });
        }
      }
      this.requestUpdate();
    });

    this.machine.send({
      type: 'UPDATE_UUID',
      uuid: this.uuid
    })
  }

  disconnectedCallback(){
    this.machine.stop();
    super.disconnectedCallback()
  }

  firstUpdated() {
  }

  render() {
    let name = '';
    let content = '';
    let tags = [];
    let progress = '';
    const snapshot = this.machine.getSnapshot();
    const state = snapshot.value;
    const {error, element, related} = snapshot.context;
    if (state == 'loading') {
      name = 'Loading...';
      progress = html`
        <div class="mdc-circular-progress mdc-circular-progress--indeterminate" style="width:24px;height:24px;" role="progressbar" aria-label="Example Progress Bar" aria-valuemin="0" aria-valuemax="1">
          <div class="mdc-circular-progress__determinate-container">
            <svg class="mdc-circular-progress__determinate-circle-graphic" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <circle class="mdc-circular-progress__determinate-track" cx="12" cy="12" r="8.75" stroke-width="2.5"/>
              <circle class="mdc-circular-progress__determinate-circle" cx="12" cy="12" r="8.75" stroke-dasharray="54.978" stroke-dashoffset="54.978" stroke-width="2.5"/>
            </svg>
          </div>
          <div class="mdc-circular-progress__indeterminate-container">
            <div class="mdc-circular-progress__spinner-layer">
              <div class="mdc-circular-progress__circle-clipper mdc-circular-progress__circle-left">
                <svg class="mdc-circular-progress__indeterminate-circle-graphic" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="8.75" stroke-dasharray="54.978" stroke-dashoffset="27.489" stroke-width="2.5"/>
                </svg>
              </div>
              <div class="mdc-circular-progress__gap-patch">
                <svg class="mdc-circular-progress__indeterminate-circle-graphic" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="8.75" stroke-dasharray="54.978" stroke-dashoffset="27.489" stroke-width="2"/>
                </svg>
              </div>
              <div class="mdc-circular-progress__circle-clipper mdc-circular-progress__circle-right">
                <svg class="mdc-circular-progress__indeterminate-circle-graphic" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="8.75" stroke-dasharray="54.978" stroke-dashoffset="27.489" stroke-width="2.5"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    if (state == 'error') {
      name = error.message ?? 'Error experienced.';
    }
    if (state == 'loaded') {
      name = element.data.name ?? 'No name found.';
      content = element.data.content ?? 'No content found.';
      for (const element of related) {
        if (element.type == 'HAS_TAG') {
          if (Object.prototype.hasOwnProperty.call(element, 'end')) {
            tags.push(html`<ember-nexus-tag uuid="${element.end}"></ember-nexus-tag>`)
          }
        }
      }
    }

    return html`
      <div class="mdc-card">
        <header>
          <div class="title">
            ${progress}
            <div class="icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>Note</title>
                <path d="M21,6V8H3V6H21M3,18H12V16H3V18M3,13H21V11H3V13Z" />
              </svg>
            </div>
            <div class="mdc-typography--headline5">${name}</div>
          </div>
          <div class="actions">
            <button class="mdc-icon-button">
              <div class="mdc-icon-button__ripple"></div>
              <span class="mdc-icon-button__focus-ring"></span>
              <svg class="mdc-icon-button__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>details</title>
                <path d="M6.38,6H17.63L12,16L6.38,6M3,4L12,20L21,4H3Z" />
              </svg>
            </button>
          </div>
        </header>
        <div class="content">
          <div class="mdc-typography--body1">${content}</div>
          <div class="row">
            ${tags}
          </div>
        </div>
      </div>
    `
  }

}

declare global {
  interface HTMLElementTagNameMap {
    'ember-nexus-note': EmberNexusNote
  }
}
