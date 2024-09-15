import { LitElement, TemplateResult, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import {pageStyle} from "../../Style/PageStyle";

@customElement('very-tall')
class VeryTall extends LitElement {
  static styles = [pageStyle];
  render(): TemplateResult {
    return html`<div class="page">
      <p>very tall :D</p>
      <div class="tall-element">
        <p>Element 1</p>
      </div>
      <div class="tall-element">
        <p>Element 2</p>
      </div>
      <div class="tall-element">
        <p>Element 3</p>
      </div>
      <div class="tall-element">
        <p>Element 4</p>
      </div>
      <div class="tall-element">
        <p>Element 5</p>
      </div>
      <div class="tall-element">
        <p>Element 6</p>
      </div>
      <div class="tall-element">
        <p>Element 7</p>
      </div>
      <div class="tall-element">
        <p>Element 8</p>
      </div>
      <div class="tall-element">
        <p>Element 9</p>
      </div>
    </div>`;
  }
}

export { VeryTall };
