import { LitElement, TemplateResult, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('test-3')
class Test3 extends LitElement {
  render(): TemplateResult {
    return html`<div>
      <p>Test 3</p>
    </div>`;
  }
}

export { Test3 };
