import { LitElement, TemplateResult, css, html } from 'lit';
import {customElement, property} from 'lit/decorators.js';

import { linkStyle } from '../../../Style/LinkStyle';

@customElement('ember-nexus-core-toolbar-action-element')
class ToolbarActionElementComponent extends LitElement {

  @property()
  name?: string;

  @property()
  orientation?: string;

  static styles = [
    linkStyle,
    css`
      :host {
      }
      .container {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .icon {
        width: 24px;
        height: 24px;
      }
    `,
  ];

  render(): TemplateResult {
    return html`
      <div class="container">
        <div class="icon">
          <slot name="icon"></slot>
        </div>
        <p class="name">Name</p>
      </div>
    `;
  }
}

export { ToolbarActionElementComponent };
