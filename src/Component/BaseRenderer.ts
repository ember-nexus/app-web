import {LitElement, html, unsafeCSS} from 'lit'
import {customElement, property} from 'lit/decorators.js'
import styles from './BaseRenderer.scss?inline';


@customElement('ember-nexus-base-renderer')
export class BaseRenderer extends LitElement {

  static styles = unsafeCSS(styles);

  @property()
  uuid: string = ''

  constructor() {
    super();
  }

  render() {
    return html`
      <div class="mdc-card">
        <header>
          <div class="title">
            <div class="mdc-typography--headline5">Username</div>
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
          <div class="row row-type">
            <a class="mdc-button" href="/">
              <span class="mdc-button__ripple"></span>
              <span class="mdc-button__focus-ring"></span>
              <span class="mdc-button__label type">User</span>
            </a>
            <div class="icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>minus</title><path d="M19,13H5V11H19V13Z" /></svg>
            </div>
            <div class="type type-relation">HAS_READ_ACCESS</div>
            <div class="icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>arrow-right-thin</title><path d="M14 16.94V12.94H5.08L5.05 10.93H14V6.94L19 11.94Z" /></svg>
            </div>
            <a class="mdc-button" href="/">
              <span class="mdc-button__ripple"></span>
              <span class="mdc-button__focus-ring"></span>
              <span class="mdc-button__label type">Sphere</span>
            </a>
          </div>
          <div class="row row-type">
            <div class="type">User</div>
          </div>
          <div class="row row-description">
            <div class="mdc-typography--body1">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</div>
          </div>
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
