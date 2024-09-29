import { css } from 'lit';

const collectionPageStyle = css`
  * {
    box-sizing: border-box;
  }

  :host {
    width: 100%;
    height: 100%;
    display: block;
    container-type: inline-size;
    container-name: host;
  }

  .page {
    display: flex;
    justify-content: center;
    background-color: #FBFBFE;
    min-height: 100vh;
  }

  .content {
    width: 100%;
    display: grid;
    align-content: start;
    grid-template-rows: auto;
    row-gap: 1rem;
  }

  @container host (min-width: calc(40rem + 2rem)) {
    .content {
      grid-template-columns: 1fr 40rem 1fr;
      margin-top: 5rem;
    }
  }

  @container host (max-width: calc(40rem + 2rem)) {
    .content {
      grid-template-columns: 1rem minmax(0, 1fr) 1rem;
      margin-top: 2rem;
    }
  }

  .content > * {
    grid-column: 2 / 3;
  }
`;

export { collectionPageStyle };
