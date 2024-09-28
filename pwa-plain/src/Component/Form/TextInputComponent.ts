import { LitElement, TemplateResult, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import {pageStyle} from "../../Style/PageStyle";
import {inputStyle} from "../../Style/InputStyle";
import {redispatchEvent} from "../../ThirdPartyCode";

@customElement('ember-nexus-core-text-input')
class TextInputComponent extends LitElement {
  static styles = [pageStyle, inputStyle];

  @property()
  label?: string;

  @property()
  value?: string;

  @property()
  description?: string;

  @property({ attribute: 'character-count', type: Number })
  characterCount?: number;

  @property({type: Boolean, reflect: true})
  disabled: boolean = false;

  updateValue(event: InputEvent) {
    const eventTarget = event.target as HTMLInputElement;
    this.value = eventTarget.value;
    redispatchEvent(this, event);
  }

  render(): TemplateResult {
    let characterCounter : TemplateResult | null = null;
    if (this.characterCount && this.characterCount > 0) {
      characterCounter = html`<p class="character-count">${this.value?.length ?? 0} / ${this.characterCount}</p>`;
    }

    return html`<div class="text-input">

      <div class="row label">
        <p class="label">${this.label}</p>
      </div>
      <div class="row input">
        <slot name="icon-left"></slot>
        <input
          ?disabled=${this.disabled}
          @input=${this.updateValue}
        />
        <slot name="icon-right"></slot>
      </div>
      <div class="row description">
        <p class="description">
          <slot name="icon-description"></slot>
          ${this.description}
        </p>
        ${characterCounter}
      </div>

<!--
      <div style="font-size:0.5rem">
        <p>Error state: Red, diagonal stripes, icon</p>
        <p>WIP state: black, icon</p>
        <p>OK state: green, icon</p>
        <p>Disabled state: gray, icon</p>
        <p>should placeholder be moved above/underneath input field once text is entered?</p>
      </div>
    </div>-->`;
  }
}

export { TextInputComponent };
