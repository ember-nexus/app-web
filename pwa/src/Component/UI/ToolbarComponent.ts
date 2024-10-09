import menuIcon from '@mdi/svg/svg/menu.svg';
import { LitElement, TemplateResult, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';

import { linkStyle } from '../../Style/LinkStyle';

@customElement('ember-nexus-core-toolbar')
class ToolbarComponent extends LitElement {
  static styles = [
    linkStyle,
    css`
      :host {
        display: block;
        position: fixed;
        top: 10px;
        right: 10px;
        --toolbar-size: 48px;
      }

      .toolbar {
        min-width: var(--toolbar-size);
        height: var(--toolbar-size);
        border: 1px solid #000;
        border-radius: 5px;
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        box-shadow:
          0 1px 3px rgba(0, 0, 0, 0.12),
          0 1px 2px rgba(0, 0, 0, 0.24);
      }

      .divider {
        width: 1px;
        height: 100%;
        background-color: #000;
        margin-left: -0.5rem;
        margin-right: -0.5rem;
      }
    `,
  ];

  render(): TemplateResult {
    return html`
      <div class="toolbar">
        <ember-nexus-core-icon src="${menuIcon}"></ember-nexus-core-icon>
        <ember-nexus-core-icon src="${menuIcon}"></ember-nexus-core-icon>
        <ember-nexus-core-icon src="${menuIcon}"></ember-nexus-core-icon>
        <div class="divider"></div>
        <ember-nexus-core-icon src="${menuIcon}"></ember-nexus-core-icon>
      </div>
    `;
  }
}

export { ToolbarComponent };
