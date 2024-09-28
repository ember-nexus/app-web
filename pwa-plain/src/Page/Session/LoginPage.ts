import { LitElement, TemplateResult, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import {pageStyle} from "../../Style/PageStyle";
import {Actor, createActor} from "xstate";
import {loginPageMachine} from "../../Machine/LoginPageMachine";
import {HelpLink} from "../../Type/Enum";

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
    console.log("Updated stuff :D");
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
      console.log('target has no value');
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
      console.log('target has no value');
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
          <div slot="icon-left" style="width: 24px; height: 24px;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>account</title><path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" /></svg>
          </div>
        </ember-nexus-core-text-input>
        <ember-nexus-core-text-input
          label="Password"
          description="Use a secure password."
          ?disabled=${!loginFormEditable}
          value="${this._password}"
          @input=${this._onPasswordChange}
        >
          <div slot="icon-left" style="width: 24px; height: 24px;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>lock</title><path d="M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z" /></svg>
          </div>
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
    `;
  }
}

export { LoginPage };
