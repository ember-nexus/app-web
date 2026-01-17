import {LitElement, TemplateResult, html, unsafeCSS} from 'lit';
import {customElement} from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { PackagePlus } from 'lucide-static';

import {indexStyles} from '../Style/index.js';

@customElement('admin-pwa-page-overview')
class OverviewPage extends LitElement {
    static styles = [unsafeCSS(indexStyles)];

    render(): TemplateResult {
        return html`
            <admin-pwa-component-layout>
                <div slot="pageActions">
                    <button class="btn btn-sm">${unsafeHTML(PackagePlus)} Add Package</button>
                </div>
                <p>Hello world :D</p>
            </admin-pwa-component-layout>
        `;
    }
}

export {OverviewPage};
