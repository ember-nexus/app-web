import {LitElement, TemplateResult, html, unsafeCSS} from 'lit';
import {customElement} from 'lit/decorators.js';

import {indexStyles} from '../Style/index.js';

@customElement('admin-pwa-page-settings')
class SettingsPage extends LitElement {
    static styles = [unsafeCSS(indexStyles)];

    render(): TemplateResult {
        return html`
            <admin-pwa-component-layout>
                <p>Settings :D</p>
            </admin-pwa-component-layout>
        `;
    }
}

export {SettingsPage};
