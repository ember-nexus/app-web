import { css } from 'lit';

const pageStyle = css`
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
    background-color: #FBFBFE;
    min-height: 100vh;
  }

  .content {
    width: 100%;
    display: grid;
    grid-template-columns: 2fr 1fr 2fr 1fr;
    grid-template-rows: auto auto 1fr;
    grid-gap: 2rem;
    margin-top: 5rem;
  }

  #blob1 {
    grid-column: 3 / 4;
    grid-row: 1 / 3;
    position: relative;
  }

  #blob1 svg {
    position: absolute;
    width: 300px;
    height: 300px;
    left:0;
    top:0;
    transform: translate(-70%, -30%) rotate(-45deg);
  }

  #blob2 {
    grid-column: 3 / 4;
    grid-row: 1 / 3;
    position: relative;
  }

  #blob2 svg {
    position: absolute;
    width: 300px;
    height: 300px;
    right:0;
    bottom:0;
    transform: translate(40%, 30%) rotate(90deg);
  }

  #form {
    grid-column: 3 / 4;
    grid-row: 1 / 3;
    border-radius: 0.5rem;
    padding: 1rem;
    background-color: #fff;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    position: relative;
  }

  #infobox {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
    border-radius: 0.5rem;
    padding: 1rem;
    background-color: #fff;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    position: relative;
  }



`;

export { pageStyle };
