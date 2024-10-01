import { css } from 'lit';

const collectionPageStyle = css`
  * {
    box-sizing: border-box;
  }

  :host {
    width: 100%;
    height: 100%;
    display: block;
  }

  .page {
    display: flex;
    justify-content: center;
    background-color: var(--background-color);
    min-height: 100dvh;
    padding: var(--page-content-offset-top, 0px) var(--page-content-offset-right, 0px) var(--page-content-offset-bottom, 0px) var(--page-content-offset-left, 0px);
  }

  .content {
    width: 100%;
    container-type: inline-size;
    container-name: content;
  }

  .grid {
    display: grid;
    align-content: start;
    grid-template-rows: auto;
    row-gap: 1rem;
    margin-bottom: 1rem;
  }

  @container content (min-width: calc(40rem + 2rem)) {
    .grid {
      grid-template-columns: 1fr 40rem 1fr;
    }
  }

  @container content (max-width: calc(40rem + 2rem)) {
    .grid {
      grid-template-columns: 1rem minmax(0, 1fr) 1rem;
    }
  }

  .grid > * {
    grid-column: 2 / 3;
  }
`;

export { collectionPageStyle };
