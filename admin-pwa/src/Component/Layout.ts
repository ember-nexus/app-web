import {LitElement, TemplateResult, html, unsafeCSS} from 'lit';
import {customElement, queryAssignedNodes, state} from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Hammer, SquareArrowOutUpRight } from 'lucide-static';

import {indexStyles} from '../Style/index.js';

@customElement('admin-pwa-component-layout')
class Layout extends LitElement {
    static styles = [unsafeCSS(indexStyles)];


    @queryAssignedNodes({slot: 'pageActions', flatten: true})
    private pageActionsNodes!: Node[];

    @state()
    private hasPageActions = false;


    firstUpdated() {
        // Detect if slot has content initially
        this.hasPageActions = this.pageActionsNodes?.length > 0;

        // Listen for slot changes
        const slotEl = this.shadowRoot!.querySelector('slot[name="pageActions"]');
        slotEl?.addEventListener('slotchange', () => {
            this.hasPageActions = this.pageActionsNodes?.length > 0;
        });
    }

    render(): TemplateResult {
        return html`
            <div class="bg-base-100 w-full">
                <div class="flex flex-row items-stretch p-4 py-[max(5vh,1rem)] min-h-screen gap-4 mx-auto container max-w-[1200px]">
                    <admin-pwa-component-sidebar></admin-pwa-component-sidebar>
                    <div class="grow flex flex-col gap-4">
                        <div class="w-full flex justify-end p-2 gap-2">
                            <slot name="pageActions"></slot>

                            <!-- CONDITIONAL DIVIDER -->
                            ${this.hasPageActions
                                ? html`<div class="divider divider-horizontal m-0"></div>`
                                : null}
                            <button class="btn btn-sm btn-primary">${unsafeHTML(Hammer)} Build App</button>
                            <a class="btn btn-sm" href="/" target="_blank">
                                ${unsafeHTML(SquareArrowOutUpRight)} Open App
                            </a>
                        </div>
                        <slot></slot>
                    </div>
                </div>
            </div>
        `;
    }
}

export {Layout};
