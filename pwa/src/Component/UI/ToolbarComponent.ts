import menuIcon from '@mdi/svg/svg/menu.svg';
import accountIcon from '@mdi/svg/svg/account.svg';
import loginIcon from '@mdi/svg/svg/login.svg';
import logoutIcon from '@mdi/svg/svg/logout.svg';
import alertCircleOutlineIcon from '@mdi/svg/svg/alert-circle-outline.svg';
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
        //border: 1px solid #000;
        border-radius: 5px;
        border-radius: var(--border-radius);
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        box-shadow: var(--shadow-2);
      }

      .divider {
        width: 1px;
        height: 100%;
        background-color: #ddd;
        margin-left: -0.5rem;
        margin-right: -0.5rem;
      }
    `,
  ];

  render(): TemplateResult {

    const data = [
      {
        type: 'menuEntry',
        name: 'Account',
        icon: accountIcon,
        children: [
          {
            name: 'Login',
            icon: loginIcon,
          },
          {
            name: 'Logout',
            icon: logoutIcon,
          }
        ]
      },
      {
        type: 'divider'
      },
      {
        type: 'menuEntry',
        name: 'Settings',
        icon: menuIcon
      }
    ];

    let topLevelMenuEntries: TemplateResult[] = [];

    for (let i in data) {
      let newMenuEntry: TemplateResult;

      switch (data[i].type) {
        case 'menuEntry':
          newMenuEntry = html`<ember-nexus-core-icon src="${data[i].icon}"></ember-nexus-core-icon>`;
          break;
        case 'divider':
          newMenuEntry = html`<div class="divider"></div>`;
          break;
        default:
          newMenuEntry = html`<ember-nexus-core-icon src="${alertCircleOutlineIcon}"></ember-nexus-core-icon>`;
      }

      topLevelMenuEntries.push(newMenuEntry)
    }


    return html`
      <div class="toolbar">
        ${topLevelMenuEntries}
      </div>
    `;
  }
}

export { ToolbarComponent };
