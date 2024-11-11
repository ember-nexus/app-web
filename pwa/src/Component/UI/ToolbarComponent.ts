import menuIcon from '@mdi/svg/svg/menu.svg';
import accountIcon from '@mdi/svg/svg/account.svg';
import loginIcon from '@mdi/svg/svg/login.svg';
import bellIcon from '@mdi/svg/svg/bell.svg';
import logoutIcon from '@mdi/svg/svg/logout.svg';
import alertCircleOutlineIcon from '@mdi/svg/svg/alert-circle-outline.svg';
import circleSmallIcon from '@mdi/svg/svg/circle-small.svg';
// import triangleSmallDownIcon from '@mdi/svg/svg/triangle-small-down.svg';
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
        --toolbar-padding: 12px;
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
        //gap: 1rem;
        //padding-left: 0.5rem;
        //padding-right: 0.5rem;
        box-shadow: var(--shadow-2);
        box-shadow: 0 0 4px 0 rgba(0, 0, 0, 12%), 0 2px 4px 0 rgba(0, 0, 0, 8%), 0 0 1px 0 rgba(0, 0, 0, 40%); /* quant */
        box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
        box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
        box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 4px 0px, rgba(90, 125, 188, 0.05) 0px 4px 16px 0px; /* 52 < */
        //box-shadow: rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px; /* 72 < */
        //box-shadow: 0px 12px 28px 0px rgba(0, 0, 0, 0.2), 0px 2px 4px 0px rgba(0, 0, 0, 0.1), 0px 0px 0px 1px rgba(255, 255, 255, 0.05) inset; /* sleek */
      }

      .divider {
        width: 1px;
        height: 100%;
        height: 1.5rem;
        background-color: #ddd;
        background-color: rgba(93, 117, 152, 24%);
        //margin-left: -0.5rem;
        //margin-right: -0.5rem;
      }

      .menuEntry {
        min-width: var(--toolbar-size);
        height: var(--toolbar-size);
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .menuEntry > ember-nexus-core-icon {
        margin-top: var(--toolbar-padding);
        margin-bottom: var(--toolbar-padding);
      }

      .menuEntry > .subMenuDot {
        position: absolute;
        left: 50%;
        bottom: 0;
        width: 10px;
        height: 10px;
        overflow: hidden;
        pointer-events: none;
        transform: translateX(-50%);
      }

      .menuEntry > .subMenuDot > * {
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    `,
  ];

  render(): TemplateResult {

    const data = [
      {
        type: 'menuEntry',
        id: 'account',
        name: 'Account',
        icon: accountIcon,
        children: [
          {
            type: 'menuEntry',
            id: 'account.login',
            name: 'Login',
            icon: loginIcon,
          },
          {
            type: 'menuEntry',
            id: 'account.logout',
            name: 'Logout',
            icon: logoutIcon,
          }
        ]
      },
      {
        type: 'menuEntry',
        id: 'bell',
        name: 'Notifications',
        icon: bellIcon
      },
      {
        type: 'divider'
      },
      {
        type: 'menuEntry',
        id: 'setting',
        name: 'Settings',
        icon: menuIcon
      }
    ];

    let topLevelMenuEntries: TemplateResult[] = [];

    for (let i in data) {
      let newMenuEntry: TemplateResult;

      switch (data[i].type) {
        case 'menuEntry':
          newMenuEntry = html`<div class="menuEntry">
            <ember-nexus-core-icon src="${data[i].icon}"></ember-nexus-core-icon>
            <div class="subMenuDot">
              <ember-nexus-core-icon src="${circleSmallIcon}"></ember-nexus-core-icon>
            </div>
          </div>`;
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
