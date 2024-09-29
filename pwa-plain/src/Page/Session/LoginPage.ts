import { LitElement, TemplateResult, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import {pageStyle} from "../../Style/PageStyle";
import {Actor, createActor} from "xstate";
import {loginPageMachine} from "../../Machine";
import {HelpLink} from "../../Type/Enum";
import iconKey from '@mdi/svg/svg/key.svg';
import iconAccount from '@mdi/svg/svg/account.svg';

@customElement('ember-nexus-core-login-page')
class LoginPage extends LitElement {
  static styles = [pageStyle];

  protected _error: string | null;

  protected _state: string | null;
  protected _username: string = '';
  protected _password: string = '';

  protected actor: Actor<typeof loginPageMachine>;

  setupActorSubscription(): void {
    this.actor.subscribe((snapshot) => {
      this._error = snapshot.context.error;
      this._state = snapshot.value;
      this._username = snapshot.context.username;
      this._password = snapshot.context.password;
      this.requestUpdate();
    });
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.actor = createActor(loginPageMachine);
    this.setupActorSubscription();
    this.actor.start();
  }

  disconnectedCallback(): void {
    this.actor.stop();
    super.disconnectedCallback();
  }

  private _onUsernameChange(event: InputEvent) {
    const target = event.target as EventTarget;
    if (!('value' in target)) {
      return;
    }
    this.actor.send({
      type: 'inputChange',
      username: target.value as string,
      password: this._password
    });
  }

  private _onPasswordChange(event: InputEvent) {
    const target = event.target as EventTarget;
    if (!('value' in target)) {
      return;
    }
    this.actor.send({
      type: 'inputChange',
      username: this._username,
      password: target.value as string
    });
  }

  private _handleLogin(event: Event) {
    event.preventDefault();
    this.actor.send({
      type: 'submitLoginData'
    });
  }

  render(): TemplateResult {

    const loginFormEditable = this._state === 'EditingLoginForm';

    let form : TemplateResult | null = null;
    if (this._state == 'EditingLoginForm' || this._state == 'HandlingLoginRequest') {
      form = html`
      <form
        @submit=${this._handleLogin.bind}
      >
        <ember-nexus-core-text-input
          label="Username"
          description="Use your username or email address."
          ?disabled=${!loginFormEditable}
          value="${this._username}"
          @input=${this._onUsernameChange}
        >
          <ember-nexus-core-icon slot="icon-left" src="${iconAccount}"></ember-nexus-core-icon>
        </ember-nexus-core-text-input>
        <ember-nexus-core-text-input
          label="Password"
          description="Use your password."
          ?disabled=${!loginFormEditable}
          value="${this._password}"
          @input=${this._onPasswordChange}
        >
          <ember-nexus-core-icon slot="icon-left" src="${iconKey}"></ember-nexus-core-icon>
        </ember-nexus-core-text-input>
        <input type="submit" @click=${this._handleLogin} value="Login" />
        <a href="/">Cancel</a>
      </form>`;
    }

    let error : TemplateResult | null = null;
    if (this._error) {
      error = html`
        <p>Error: ${this._error}</p>
      `;
    }

    let successInfo : TemplateResult | null = null;
    if (this._state == 'LoginSucceeded') {
      successInfo = html`
        <p>Login succeeded</p>
        <a href="/">Go to index page</a>
      `;
    }

    return html`
      <div class="page">

        <div class="content">

          <div id="blob1"><svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg"><defs><clipPath id="a"><path fill="#FF073A" d="M865 621.5q-76 121.5-190.5 171t-267.5 91q-153 41.5-186-114T119 475q-69-139 52-237t253.5-78.5q132.5 19.5 240 66t192 160.5Q941 500 865 621.5Z"/></clipPath></defs><g clip-path="url(#a)"><path fill="#FF073A" d="M865 621.5q-76 121.5-190.5 171t-267.5 91q-153 41.5-186-114T119 475q-69-139 52-237t253.5-78.5q132.5 19.5 240 66t192 160.5Q941 500 865 621.5Z"/></g></svg></div>

          <div id="blob2"><svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#1A1A1A" d="M39.8,-53.2C52.9,-45.2,65.8,-35.4,70.7,-22.5C75.6,-9.6,72.4,6.5,68.1,22.8C63.7,39.1,58.2,55.8,46.6,68.5C35.1,81.2,17.5,90,0.9,88.7C-15.8,87.5,-31.5,76.3,-42.2,63.4C-52.9,50.4,-58.6,35.6,-65.4,20C-72.2,4.3,-80.2,-12.2,-77.7,-27C-75.3,-41.8,-62.4,-54.9,-47.7,-62.3C-33,-69.7,-16.5,-71.4,-1.6,-69.2C13.3,-67.1,26.7,-61.1,39.8,-53.2Z" transform="translate(100 100)" />
          </svg>
          </div>

          <div id="form">
            <h3>Welcome!</h3>
            <p>Sign in to your account.</p>
            ${form}
            ${error}
            ${successInfo}
          </div>

          <div id="infobox">
            <h4>Related links:</h4>
            <ember-nexus-core-link-with-icon href="/register" text="Sign up"></ember-nexus-core-link-with-icon>
            <ember-nexus-core-link-with-icon href="/" text="Sign in with token"></ember-nexus-core-link-with-icon>
            <ember-nexus-core-link-with-icon href="${HelpLink.ProblemWithLogin}" text="Problem with sign in?"></ember-nexus-core-link-with-icon>
          </div>

        </div>

      </div>
    `;
  }
}

export { LoginPage };
