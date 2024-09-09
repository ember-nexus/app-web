import { LitElement, TemplateResult, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('test-1')
class Test1 extends LitElement {
  render(): TemplateResult {
    return html`<div>
      <p>Test 1</p>
    </div>`;
  }
}

export { Test1 };
