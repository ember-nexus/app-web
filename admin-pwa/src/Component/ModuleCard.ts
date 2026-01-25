import {LitElement, html, unsafeCSS, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import {Module} from "../Type";
import { Package, Tag, SquareArrowOutUpRight, Ghost, Scale } from 'lucide-static';
import {indexStyles} from "../Style";

@customElement('admin-pwa-component-module-card')
export class ModuleCard extends LitElement {
    static styles = [unsafeCSS(indexStyles)];

    @property({type: Object})
    module!: Module;

    render() {
        if (!this.module) {
            return html`<div class="card bg-base-100 shadow-sm">Loading...</div>`;
        }

        let details: Array<TemplateResult> = [];

        if (this.module.source === 'NPM') {
            details.push(html`
                <a
                    href="https://www.npmjs.com/package/${this.module.name}"
                    target="_blank"
                    class="badge badge-sm badge-npm select-none shadow-xs"
                    title="module sourced from NPM"
                >
                    <svg class="h-[1em] fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.323l13.837.019-.009 13.836h-3.464l.01-10.382h-3.456L12.04 19.17H5.113z"/></svg>
                    ${this.module.source}
                </a>
            `);
        } else {
            details.push(html`
                <span
                    class="badge badge-sm badge-pack select-none shadow-xs"
                    title="module is manually provided as package"
                >
                    ${unsafeHTML(Package.replace('class="lucide lucide-package"', 'class="h-[1em] w-auto"'))}
                    ${this.module.source}
                </span>
            `);
        }

        details.push(html`
                <span
                    class="badge badge-sm badge-outline badge-neutral select-none shadow-xs"
                    title="version of module"
                >
                    ${unsafeHTML(Tag.replace('class="lucide lucide-tag"', 'class="h-[1em] w-auto"'))}
                    ${this.module.version}
                </span>
            `);

        details.push(html`
                <span
                    class="badge badge-sm badge-outline badge-neutral select-none shadow-xs"
                    title="license of module"
                >
                    ${unsafeHTML(Scale.replace('class="lucide lucide-scale"', 'class="h-[1em] w-auto"'))}
                    ${this.module.license}
                </span>
            `);

        if (this.module.homepage !== null) {
            details.push(html`
                <a
                    href="${this.module.homepage}"
                    target="_blank"
                    class="badge badge-sm badge-outline badge-neutral select-none shadow-xs"
                    title="website of module"
                >
                    ${unsafeHTML(SquareArrowOutUpRight.replace('class="lucide lucide-square-arrow-out-up-right"', 'class="h-[1em] w-auto"'))}
                    Homepage
                </a>
            `);
        }
        if (this.module.transitive) {
            details.push(html`
                <span
                    class="badge badge-sm badge-outline badge-neutral select-none shadow-xs"
                    title="module is an indirect dependency of another module"
                >
                    ${unsafeHTML(Ghost.replace('class="lucide lucide-ghost"', 'class="h-[1em] w-auto"'))}
                    transitive
                </span>
            `);
        }

        return html`
            <div class="card bg-base-100 shadow-sm">
                <div class="card-body p-4">
                    <h2 class="card-title">${this.module.name}</h2>
                    <div class="text-sm flex gap-1">
                        ${details}
                    </div>
                    <p>${this.module.description}</p>
                </div>
            </div>
        `;
    }
}
