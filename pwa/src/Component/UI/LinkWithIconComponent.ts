import iconArrowRight from '@mdi/svg/svg/arrow-right.svg';
import iconArrowTopRight from '@mdi/svg/svg/arrow-top-right.svg';
import { LitElement, TemplateResult, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { linkStyle } from '../../Style/LinkStyle';

@customElement('ember-nexus-core-link-with-icon')
class LinkWithIconComponent extends LitElement {
  static styles = [
    linkStyle,
    css`
      :host {
        display: block;
        width: 100%;
      }
      ember-nexus-core-icon {
        display: inline-block;
      }
    `,
  ];

  @property()
  href?: string;

  @property()
  text?: string;

  render(): TemplateResult {
    let icon = iconArrowRight;
    if (false) {
      icon = iconArrowTopRight;
    }
    return html`
      <a href="${this.href}">
        <ember-nexus-core-icon src="${icon}"></ember-nexus-core-icon>
        ${this.text}
      </a>
    `;
  }
}

export { LinkWithIconComponent };
