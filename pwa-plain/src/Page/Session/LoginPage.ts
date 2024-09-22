import { LitElement, TemplateResult, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import {pageStyle} from "../../Style/PageStyle";
import {Actor, createActor} from "xstate";
import {loginPageMachine} from "../../Machine/LoginPageMachine";

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

  render(): TemplateResult {
    return html`<div class="page">
      <p>Login page :D</p>
      <p>Username field (dynamic name from API)</p>
      <p>Password field</p>
      <p>Login button</p>
      <p>Error message, if any</p>
      <p>Link to help page, if any</p>
      <p>Link to register page, if enabled</p>
      <p>Link to special token login page?</p>
      <hr/>
      <p>Username: ${this._username}, password: ${this._password}</p>
      <hr/>
      <div style="width: 300px;">
        <ember-nexus-core-text-input
          label="Username"
          description="Use your username or email address."
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
          value="${this._password}"
          @input=${this._onPasswordChange}
        >
          <div slot="icon-left" style="width: 24px; height: 24px;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>lock</title><path d="M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z" /></svg>
          </div>
        </ember-nexus-core-text-input>
      </div>
    </div>`;
  }
}

export { LoginPage };
