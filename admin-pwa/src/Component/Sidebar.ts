import {LitElement, html, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {unsafeHTML} from 'lit/directives/unsafe-html.js';
import {House, Package, Settings} from 'lucide-static';
import {indexStyles} from "../Style";

@customElement('admin-pwa-component-sidebar')
export class Sidebar extends LitElement {
    @property({type: Boolean}) open = true;

    static styles = [unsafeCSS(indexStyles)];

    render() {
        return html`
            <aside
                class="flex flex-col gap-2 justify-between bg-base-100 w-64 h-full"
            >
                <div class="flex flex-col gap-2">
                    <a class="btn btn-neutral justify-start" href="/admin/">
                        ${unsafeHTML(House)}
                        Overview
                    </a>
                    <a class="btn btn-ghost justify-start" href="/admin/search-modules">
                        ${unsafeHTML(Package)}
                        Search Modules
                    </a>
                </div>

                <div class="flex flex-col gap-2">
                    <a class="btn btn-ghost justify-start" href="/admin/settings">
                        ${unsafeHTML(Settings)}
                        Settings
                    </a>
                </div>
            </aside>
        `;
    }
}
