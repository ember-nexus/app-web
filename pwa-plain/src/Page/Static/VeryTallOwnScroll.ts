import {LitElement, TemplateResult, html, css, unsafeCSS} from 'lit';
import { customElement } from 'lit/decorators.js';
// import * as overlayscrollbars from 'overlayscrollbars/styles/overlayscrollbars.css';
// import * as overlayscrollbars from 'overlayscrollbars/overlayscrollbars.css';

import overlayscrollbars from 'overlayscrollbars/overlayscrollbars.css';

import {
  OverlayScrollbars
} from 'overlayscrollbars';

import {pageStyle} from "../../Style/PageStyle";

@customElement('very-tall-own-scroll')
class VeryTallOwnScroll extends LitElement {
  static styles = [overlayscrollbars, pageStyle];

  firstUpdated(){
    console.log("first update");

    console.log(overlayscrollbars);
    console.log(css`${unsafeCSS(overlayscrollbars)}`.toString());

    const pageElement = this.renderRoot.querySelector('#page');

    console.log(pageElement);

    if (pageElement === null) {
      console.log("Unable to find page element");
      return;
    }
    if (!(pageElement instanceof HTMLElement)) {
      console.log("Page element is not instance of HTMLElement");
      return;
    }

    const osInstance = OverlayScrollbars(pageElement, {});
    console.log(osInstance);
  }

  render(): TemplateResult {
    return html`<div class="page" id="page" style="height: 400px;">
      <div style="width: 100%; flex-shrink: 0;">
        <p>very tall with own scroll mechanism</p>
        <div class="tall-element">
          <p>Element 1</p>
        </div>
        <div class="tall-element">
          <p>Element 2</p>
        </div>
        <div class="tall-element">
          <p>Element 3</p>
        </div>
        <div class="tall-element">
          <p>Element 4</p>
        </div>
        <div class="tall-element">
          <p>Element 5</p>
        </div>
        <div class="tall-element">
          <p>Element 6</p>
        </div>
        <div class="tall-element">
          <p>Element 7</p>
        </div>
        <div class="tall-element">
          <p>Element 8</p>
        </div>
        <div class="tall-element">
          <p>Element 9</p>
        </div>
      </div>
    </div>`;
  }
}

export { VeryTallOwnScroll };
