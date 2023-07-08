import {LitElement, html, unsafeCSS} from 'lit'
import {customElement, property} from 'lit/decorators.js'
import styles from './BaseRenderer.scss?inline';
import {interpret, Interpreter} from "xstate";
import GetElementEvent from "@ember-nexus/web-sdk/dist/Event/GetElementEvent";
import Node from "@ember-nexus/web-sdk/src/Type/Node";
import Relation from "@ember-nexus/web-sdk/src/Type/Relation";
import {
  ElementLoadedEvent,
  EndLoadedEvent,
  ElementContext,
  default as ElementMachine,
  StartLoadedEvent, UpdateUuidEvent
} from "../../Machine/ElementMachine.ts";
import GetRelatedEvent from "@ember-nexus/web-sdk/dist/Event/GetRelatedEvent";



@customElement('ember-nexus-base-renderer')
export class BaseRenderer extends LitElement {

  static styles = unsafeCSS(styles);

  @property()
  uuid: string = ''
  private machine: Interpreter<any>;

  constructor() {
    super();
    // @ts-ignore
    this.machine = interpret(ElementMachine.withConfig({
      actions: {
        startLoadingElement: this.startLoadingElement.bind(this),
        startLoadingStart: this.startLoadingStart.bind(this),
        startLoadingEnd: this.startLoadingEnd.bind(this)
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
      type: 'UPDATE_UUID',
      uuid: this.uuid
    } as UpdateUuidEvent)
  }

  disconnectedCallback(){
    this.machine.stop();
    super.disconnectedCallback()
  }

  startLoadingElement(context: ElementContext) {
    const loadElementEvent = new GetElementEvent(context.uuid);
    this.dispatchEvent(loadElementEvent);
    loadElementEvent.getElement()
      ?.then(
        (element: Node | Relation) => {
          this.machine.send({
            type: 'ELEMENT_LOADED',
            element: element
          } as ElementLoadedEvent);
        }
      )
      .catch((error) => {
        this.machine.send({
          type: 'ERROR',
          error: error.message
        } as ErrorEvent);
      });
    this.machine.send({
      type: 'ELEMENT_LOADING_STARTED'
    });
  }

  startLoadingStart(context: ElementContext) {
    console.log("trying to load start node");
    if (
      !Object.prototype.hasOwnProperty.call(context.element, 'start') ||
      !Object.prototype.hasOwnProperty.call(context.element, 'end')
    ) {
      return;
    }
    const element = context.element as Relation;
    const loadElementEvent = new GetElementEvent(element.start);
    this.dispatchEvent(loadElementEvent);
    loadElementEvent.getElement()
      ?.then(
        (start: Node | Relation) => {
          if (
            Object.prototype.hasOwnProperty.call(start, 'start') &&
            Object.prototype.hasOwnProperty.call(start, 'end')
          ) {
            throw new Error("Start node can not be a relation.");
          }
          this.machine.send({
            type: 'START_LOADED',
            element: start as Node
          } as StartLoadedEvent);
        }
      )
      .catch((error) => {
        this.machine.send({
          type: 'ERROR',
          error: error.message
        } as ErrorEvent);
      });
    this.machine.send({
      type: 'START_LOADING_STARTED'
    });
  }

  startLoadingEnd(context: ElementContext) {
    if (
      !Object.prototype.hasOwnProperty.call(context.element, 'start') ||
      !Object.prototype.hasOwnProperty.call(context.element, 'end')
    ) {
      return;
    }
    const element = context.element as Relation;
    const loadElementEvent = new GetElementEvent(element.end);
    this.dispatchEvent(loadElementEvent);
    loadElementEvent.getElement()
      ?.then(
        (end: Node | Relation) => {
          if (
            Object.prototype.hasOwnProperty.call(end, 'start') &&
            Object.prototype.hasOwnProperty.call(end, 'end')
          ) {
            throw new Error("End node can not be a relation.");
          }
          this.machine.send({
            type: 'END_LOADED',
            element: end as Node
          } as EndLoadedEvent);
        }
      )
      .catch((error) => {
        this.machine.send({
          type: 'ERROR',
          error: error.message
        } as ErrorEvent);
      });
    this.machine.send({
      type: 'END_LOADING_STARTED'
    });
  }

  render() {
    const snapshot = this.machine.getSnapshot();
    const state = snapshot.value;
    const {element, start, end} = snapshot.context as ElementContext;

    let typeRow = undefined;

    console.log("new render", state, snapshot.context);

    if (element != undefined) {
      let loadedElement = element as Node | Relation;
      if (
        Object.prototype.hasOwnProperty.call(element, 'start') &&
        Object.prototype.hasOwnProperty.call(element, 'end')
      ) {
        typeRow = html`
        <div class="row row-type">
          <a class="mdc-button" href="${`/${start?.id}`}">
            <span class="mdc-button__ripple"></span>
            <span class="mdc-button__focus-ring"></span>
            <span class="mdc-button__label type">${start?.type || 'loading'}</span>
          </a>
          <div class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>minus</title><path d="M19,13H5V11H19V13Z" /></svg>
          </div>
          <div class="type type-relation">${loadedElement.type}</div>
          <div class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>arrow-right-thin</title><path d="M14 16.94V12.94H5.08L5.05 10.93H14V6.94L19 11.94Z" /></svg>
          </div>
          <a class="mdc-button" href="${`/${end?.id}`}">
            <span class="mdc-button__ripple"></span>
            <span class="mdc-button__focus-ring"></span>
            <span class="mdc-button__label type">${end?.type || 'loading'}</span>
          </a>
        </div>
      `;
      } else {
        typeRow = html`
        <div class="row row-type">
          <div class="type">${loadedElement.type}</div>
        </div>
      `;
      }
    }

    let descriptionRow = undefined;
    if (element != undefined && Object.prototype.hasOwnProperty.call(element.data, 'description')) {
      descriptionRow = html`
        <div class="row row-description">
          <div class="mdc-typography--body1">${element.data.description}</div>
        </div>
      `;
    }

    return html`
      <div class="mdc-card">
        <header>
          <div class="title">
            <div class="mdc-typography--headline5">${element?.data?.name || element?.id || 'loading'}</div>
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
          ${typeRow}
          ${descriptionRow}
        </div>
      </div>
    `
  }

}

declare global {
  interface HTMLElementTagNameMap {
    'ember-nexus-base-renderer': BaseRenderer
  }
}
