import { LitElement, css, html, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import styles from './ember-nexus-tag.scss?inline';
import {interpret, Interpreter} from "xstate"
import { MDCCircularProgress } from '@material/circular-progress';

import machine from './generic-machine'
import {GenericContext} from './generic-machine'
import GetElementEvent from "@ember-nexus/web-sdk/dist/Event/GetElementEvent";
import Node from "@ember-nexus/web-sdk/src/Type/Node";
import Relation from "@ember-nexus/web-sdk/src/Type/Relation";
import getColorWithHighestContrast from "./color-contrast-helper.ts";



@customElement('ember-nexus-tag')
export class EmberNexusTag extends LitElement {

  static styles = unsafeCSS(styles);

  @property()
  uuid: string = 'hello'
  private machine: Interpreter<any>;

  constructor() {
    super();
    this.machine = interpret(machine);
    this.machine.start();
  }

  connectedCallback() {
    super.connectedCallback()

    this.machine.subscribe((state) => {
      if (state.value == 'loading') {
        let event = new GetElementEvent(state.context.uuid);
        this.dispatchEvent(event);
        event.getElement()
          ?.then(
            (element: Node | Relation) => {
              this.machine.send({
                type: 'DATA_LOADED',
                data: element
              });
            }
          )
          .catch((error) => {
            this.machine.send({
              type: 'ERROR',
              error: error.message
            });
          })
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
    const elements = this.renderRoot.querySelector('.mdc-circular-progress');
    new MDCCircularProgress(elements);
  }

  render() {
    let label = '';
    let progress = '';
    const snapshot = this.machine.getSnapshot();
    const state = snapshot.value;
    const {error, data} = snapshot.context;
    if (state == 'loading') {
      label = 'Loading...';
      progress = html`
        <span class="mdc-evolution-chip__graphic">
          <div class="mdc-circular-progress mdc-circular-progress--indeterminate" style="width:20px;height:20px;" role="progressbar" aria-label="Example Progress Bar" aria-valuemin="0" aria-valuemax="1">
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
        </span>
      `;
    }
    if (state == 'error') {
      label = error ?? 'Experienced error.';
    }
    if (state == 'loaded') {
      label = data.data.name ?? 'no name found';
      const color = data.data.color ?? null;
      if (color) {
        this.style.setProperty('--ember-nexus-tag-color', data.data.color);
        this.style.setProperty('--ember-nexus-tag-text-color',
            getColorWithHighestContrast(
                data.data.color,
                [
                    '#000',
                    '#fff'
                ]
            )
        );
      } else {
        this.style.removeProperty('--ember-nexus-tag-color');
        this.style.removeProperty('--ember-nexus-tag-text-color');
      }
    }

    return html`
      <span class="mdc-evolution-chip" role="row">
        <span class="mdc-evolution-chip__cell mdc-evolution-chip__cell--primary" role="gridcell">
          <button class="mdc-evolution-chip__action mdc-evolution-chip__action--primary" type="button" tabindex="0">
            <span class="mdc-evolution-chip__ripple mdc-evolution-chip__ripple--primary"></span>
            ${progress}
            <span class="mdc-evolution-chip__text-label">${label}</span>
          </button>
        </span>
      </span>
    `
  }

}

declare global {
  interface HTMLElementTagNameMap {
    'ember-nexus-tag': EmberNexusTag
  }
}
