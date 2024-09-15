import { css } from 'lit';

const pageStyle = css`
  * {
    box-sizing: border-box;
  }

  :host {
    width: 100%;
    height: 100%;
    --os-size: 10;
    --os-track-bg: orange;
  }

  .page {
    border: 5px solid deepskyblue;
  }

  .tall-element {
    width: 100%;
    height: 200px;
    border: 5px solid mediumseagreen;
    padding: 10px;
  }
`;

export { pageStyle };
