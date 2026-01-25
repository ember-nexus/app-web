import {LitElement, TemplateResult, html, unsafeCSS} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { PackagePlus } from 'lucide-static';
import {Module, parseModulesResponse} from "../Type";

import {indexStyles} from '../Style/index.js';

@customElement('admin-pwa-page-overview')
class OverviewPage extends LitElement {
    static styles = [unsafeCSS(indexStyles)];

    @state()
    private loading: boolean = true;

    @state()
    private modules: Module[] = [];

    async loadModules(): Promise<void>
    {
        const res = await fetch("/api/modules");
        const content = await res.text();
        const parsedContent = parseModulesResponse(content);
        this.modules = parsedContent.modules;
        this.loading = false;
    }

    connectedCallback(): void {
        super.connectedCallback();
        this.loadModules();
    }

    render(): TemplateResult {
        return html`
            <admin-pwa-component-layout>
                <div slot="pageActions">
                    <button class="btn btn-sm">${unsafeHTML(PackagePlus)} Add Package</button>
                </div>

                <h3>Installed modules:</h3>

                ${this.loading
                    ? html`<p>Loading modules...</p>`
                    : html`
                        <div class="flex flex-col gap-2">
                            ${this.modules.map(module => html`<admin-pwa-component-module-card .module="${module}"></admin-pwa-component-module-card>`)}
                        </div>
                    `
                }
            </admin-pwa-component-layout>
        `;
    }
}

export {OverviewPage};
