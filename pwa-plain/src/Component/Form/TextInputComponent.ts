import { LitElement, TemplateResult, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import {pageStyle} from "../../Style/PageStyle";
import {inputStyle} from "../../Style/InputStyle";

@customElement('ember-nexus-core-text-input')
class TextInputComponent extends LitElement {
  static styles = [pageStyle, inputStyle];
  render(): TemplateResult {
    return html`<div class="text-input">

      <div class="row label">
        <p class="label">Label</p>
      </div>
      <div class="row input">
        <div class="icon-left">LI</div>
        <input placeholder="placeholder" />
        <div class="icon-right">RI</div>
      </div>
      <div class="row description">
        <p class="description">
          <span class="description-icon">DI</span>
          Description
        </p>
        <p class="character-count">0 / 64</p>
      </div>


      <div style="font-size:0.5rem">
        <p>Label (above input, left aligned, bigger or thicker text)</p>
        <p>Placeholder (in input)</p>
        <p>Description (underneath input, left aligned)</p>
        <p>Description icon, optional, aligned start of description</p>
        <p>character count, if set (underneath right aligned)</p>
        <p>Error state: Red, diagonal stripes, icon</p>
        <p>WIP state: black, icon</p>
        <p>OK state: green, icon</p>
        <p>Disabled state: gray, icon</p>
        <p>Input element itself</p>
        <p>left input icon (inside input)</p>
        <p>right input icon (inside input)</p>
        <p>should placeholder be moved above/underneath input field once text is entered?</p>
      </div>
    </div>`;
  }
}

export { TextInputComponent };
