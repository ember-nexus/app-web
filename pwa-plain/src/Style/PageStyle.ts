import { css } from 'lit';

const pageStyle = css`
  * {
    box-sizing: border-box;
  }

  :host {
    width: 100%;
    height: 100%;
  }

  .page {
    display: flex;
    justify-content: center;
  }

  .content {
    width: 800px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  .tall-element {
    width: 100%;
    height: 200px;
    padding: 10px;
  }
`;

export { pageStyle };
