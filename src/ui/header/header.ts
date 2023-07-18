import {LitElement, html, unsafeCSS} from 'lit'
import {customElement} from 'lit/decorators.js'
import styles from './header.scss?inline';
import {MDCTextField} from '@material/textfield';
// import {MDCTextFieldIcon} from '@material/textfield/icon';
// import {MDCIconButtonToggle} from '@material/icon-button';



@customElement('ember-nexus-ui-header')
export class Header extends LitElement {

  static styles = unsafeCSS(styles);

  firstUpdated() {
    new MDCTextField(this.shadowRoot.querySelector('.mdc-text-field'));
    // new MDCTextFieldIcon(this.shadowRoot.querySelector('.mdc-text-field-icon'));
    // new MDCIconButtonToggle(this.shadowRoot.querySelector('.mdc-icon-button'));
  }

  render() {
    return html`
      <header>
        <div class="area-title">
          <span class="mdc-typography--headline5" style="white-space: nowrap;">Ember Nexus</span>
        </div>
        <div class="area-search">
          <label class="mdc-text-field mdc-text-field--outlined mdc-text-field--with-trailing-icon searchbar">
              <span class="mdc-notched-outline">
                <span class="mdc-notched-outline__leading"></span>
                <span class="mdc-notched-outline__notch">
                  <span class="mdc-floating-label" id="my-label-id">Search</span>
                </span>
                <span class="mdc-notched-outline__trailing"></span>
              </span>
            <input type="text" class="mdc-text-field__input" aria-labelledby="my-label-id">
            <i class="mdc-text-field__icon mdc-text-field__icon--trailing" tabindex="0" role="button">
              <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>start search</title>
                <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
              </svg>
            </i>
          </label>
          <button class="mdc-icon-button mdc-icon-button--on background-grey"
                  aria-label="Toggle edit menu"
                  aria-pressed="true">
            <div class="mdc-icon-button__ripple"></div>
            <span class="mdc-icon-button__focus-ring"></span>
            <svg class="mdc-icon-button__icon mdc-icon-button__icon--on" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <title>pencil</title>
              <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
            </svg>
            <svg class="mdc-icon-button__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <title>pencil-off</title>
              <path d="M18.66,2C18.4,2 18.16,2.09 17.97,2.28L16.13,4.13L19.88,7.88L21.72,6.03C22.11,5.64 22.11,5 21.72,4.63L19.38,2.28C19.18,2.09 18.91,2 18.66,2M3.28,4L2,5.28L8.5,11.75L4,16.25V20H7.75L12.25,15.5L18.72,22L20,20.72L13.5,14.25L9.75,10.5L3.28,4M15.06,5.19L11.03,9.22L14.78,12.97L18.81,8.94L15.06,5.19Z" />
            </svg>
          </button>
        </div>
        <div class="area-action">
          <button class="mdc-icon-button">
            <div class="mdc-icon-button__ripple"></div>
            <span class="mdc-icon-button__focus-ring"></span>
            <svg class="mdc-icon-button__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <title>menu</title>
              <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
            </svg>
          </button>
          <button class="mdc-icon-button">
            <div class="mdc-icon-button__ripple"></div>
            <span class="mdc-icon-button__focus-ring"></span>
            <svg class="mdc-icon-button__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <title>account-circle</title>
              <path d="M12,19.2C9.5,19.2 7.29,17.92 6,16C6.03,14 10,12.9 12,12.9C14,12.9 17.97,14 18,16C16.71,17.92 14.5,19.2 12,19.2M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z" />
            </svg>
          </button>
        </div>
      </header>
    `
  }

}

declare global {
  interface HTMLElementTagNameMap {
    'ember-nexus-ui-header': Header
  }
}
