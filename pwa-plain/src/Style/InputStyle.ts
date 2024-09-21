import { css } from 'lit';

const inputStyle = css`
  * {
    box-sizing: border-box;
  }

  :host {
    width: 100%;
    height: 100%;
  }

  .text-input {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    border: 1px solid orange;
    padding: 5px;
  }

  .text-input > * {
    border: 1px solid orange;
    padding: 0;
    margin: 0;
  }

  .row.label .label {
    margin: 0;
    padding: 0;
  }

  .row.input {
    display: flex;
    align-items: center;
    justify-items: stretch;
  }

  .row.input > * {
    flex-grow: 1;
  }

  .row.input .icon-left,
  .row.input .icon-right {
    flex-grow: 0;
    border: 1px solid orange;
    padding: 5px;
    margin: 0;
  }


  .row.description {
    display: flex;
    align-items: stretch;
  }

  .row.description > * {
    flex-grow: 1;
  }

  .row.description .description {
    margin: 0;
    padding: 0;
    border: 1px solid orange;
  }

  .row.description .description .description-icon {
    display: inline-block;
    margin: 0;
    padding: 5px;
    border: 1px solid orange;
  }

  .row.description .character-count {
    flex-grow: 0;
    margin: 0;
    padding: 0;
    border: 1px solid orange;
  }




`;

export { inputStyle };
