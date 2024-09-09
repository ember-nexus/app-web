import { LitElement, TemplateResult, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('test-2')
class Test2 extends LitElement {
  render(): TemplateResult {
    return html`<div>
      <p>Test 2</p>
    </div>`;
  }
}

export { Test2 };
