import {LitElement, TemplateResult, html, unsafeCSS} from 'lit';
import {customElement} from 'lit/decorators.js';

import {indexStyles} from '../Style/index.js';

@customElement('admin-pwa-page-search-modules')
class SearchModulesPage extends LitElement {
    static styles = [unsafeCSS(indexStyles)];

    render(): TemplateResult {
        return html`
            <admin-pwa-component-layout>
                <p>Search Modules :D</p>
            </admin-pwa-component-layout>
        `;
    }
}

export {SearchModulesPage};
