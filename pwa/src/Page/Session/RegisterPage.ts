import iconAccount from '@mdi/svg/svg/account.svg';
import iconKey from '@mdi/svg/svg/key.svg';
import { LitElement, TemplateResult, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { Actor, createActor } from 'xstate';

import { registerPageMachine } from '../../Machine';
import { pageStyle } from '../../Style/PageStyle';
import { HelpLink } from '../../Type/Enum';

@customElement('ember-nexus-core-register-page')
class RegisterPage extends LitElement {
  static styles = [pageStyle];

  protected _error: string | null;

  protected _state: string | null;
  protected _uniqueUserIdentifier: string = '';
  protected _password: string = '';

  protected actor: Actor<typeof registerPageMachine>;

  setupActorSubscription(): void {
    this.actor.subscribe((snapshot) => {
      this._error = snapshot.context.error;
      this._state = snapshot.value;
      this._uniqueUserIdentifier = snapshot.context.uniqueUserIdentifier;
      this._password = snapshot.context.password;
      this.requestUpdate();
    });
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.actor = createActor(registerPageMachine);
    this.setupActorSubscription();
    this.actor.start();
  }

  disconnectedCallback(): void {
    this.actor.stop();
    super.disconnectedCallback();
  }

  private _onUsernameChange(event: InputEvent): void {
    const target = event.target as EventTarget;
    if (!('value' in target)) {
      return;
    }
    this.actor.send({
      type: 'inputChange',
      uniqueUserIdentifier: target.value as string,
      password: this._password,
    });
  }

  private _onPasswordChange(event: InputEvent): void {
    const target = event.target as EventTarget;
    if (!('value' in target)) {
      return;
    }
    this.actor.send({
      type: 'inputChange',
      uniqueUserIdentifier: this._uniqueUserIdentifier,
      password: target.value as string,
    });
  }

  private _handleRegister(event: Event): void {
    event.preventDefault();
    this.actor.send({
      type: 'submitRegisterData',
    });
  }

  render(): TemplateResult {
    const registerFormEditable = this._state === 'EditingRegisterForm';

    let form: TemplateResult | null = null;
    if (this._state == 'EditingRegisterForm' || this._state == 'HandlingRegisterRequest') {
      form = html` <form @submit=${this._handleRegister.bind}>
        <ember-nexus-core-text-input
          label="Username"
          description="Use your unique user identifier (usually your email address)."
          ?disabled=${!registerFormEditable}
          value="${this._uniqueUserIdentifier}"
          @input=${this._onUsernameChange}
        >
          <ember-nexus-core-icon slot="icon-left" src="${iconAccount}"></ember-nexus-core-icon>
        </ember-nexus-core-text-input>
        <ember-nexus-core-text-input
          label="Password"
          description="Use your password."
          ?disabled=${!registerFormEditable}
          value="${this._password}"
          @input=${this._onPasswordChange}
        >
          <ember-nexus-core-icon slot="icon-left" src="${iconKey}"></ember-nexus-core-icon>
        </ember-nexus-core-text-input>
        <input type="submit" @click=${this._handleRegister} value="Register" />
        <a href="/">Cancel</a>
      </form>`;
    }

    let error: TemplateResult | null = null;
    if (this._error) {
      error = html` <p>Error: ${this._error}</p> `;
    }

    let successInfo: TemplateResult | null = null;
    if (this._state == 'RegisterSucceeded') {
      successInfo = html`
        <p>Register succeeded</p>
        <a href="/">Go to index page</a>
      `;
    }

    return html`
      <div class="page">
        <div class="content">
          <div id="blob1">
            <svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <clipPath id="a">
                  <path
                    fill="#FF073A"
                    d="M865 621.5q-76 121.5-190.5 171t-267.5 91q-153 41.5-186-114T119 475q-69-139 52-237t253.5-78.5q132.5 19.5 240 66t192 160.5Q941 500 865 621.5Z"
                  />
                </clipPath>
              </defs>
              <g clip-path="url(#a)">
                <path
                  fill="#FF073A"
                  d="M865 621.5q-76 121.5-190.5 171t-267.5 91q-153 41.5-186-114T119 475q-69-139 52-237t253.5-78.5q132.5 19.5 240 66t192 160.5Q941 500 865 621.5Z"
                />
              </g>
            </svg>
          </div>

          <div id="blob2">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="#1A1A1A"
                d="M39.8,-53.2C52.9,-45.2,65.8,-35.4,70.7,-22.5C75.6,-9.6,72.4,6.5,68.1,22.8C63.7,39.1,58.2,55.8,46.6,68.5C35.1,81.2,17.5,90,0.9,88.7C-15.8,87.5,-31.5,76.3,-42.2,63.4C-52.9,50.4,-58.6,35.6,-65.4,20C-72.2,4.3,-80.2,-12.2,-77.7,-27C-75.3,-41.8,-62.4,-54.9,-47.7,-62.3C-33,-69.7,-16.5,-71.4,-1.6,-69.2C13.3,-67.1,26.7,-61.1,39.8,-53.2Z"
                transform="translate(100 100)"
              />
            </svg>
          </div>

          <div id="form">
            <h3>Welcome!</h3>
            <p>Create your own account (register).</p>
            ${form} ${error} ${successInfo}
          </div>

          <div id="infobox">
            <h4>Related links:</h4>
            <ember-nexus-core-link-with-icon href="/login" text="Sign in"></ember-nexus-core-link-with-icon>
            <ember-nexus-core-link-with-icon
              href="${HelpLink.ProblemWithRegistration}"
              text="Problem with registration?"
            ></ember-nexus-core-link-with-icon>
          </div>
        </div>
      </div>
    `;
  }
}

export { RegisterPage };
