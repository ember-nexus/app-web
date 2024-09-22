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
    padding: 0;
    margin-bottom: 1rem;
  }

  .text-input > * {
    padding: 0;
    margin: 0;
  }

  .row.label .label {
    margin: 0;
    padding: 0;
    font-weight: bold;
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
    padding: 0;
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
  }

  .row.description .description .description-icon {
    display: inline-block;
    margin: 0;
    padding: 0;
  }

  .row.description .character-count {
    flex-grow: 0;
    flex-shrink: 0;
    margin: 0;
    padding: 0;
  }


  ::slotted( [slot="icon-left"] ),
  ::slotted( [slot="icon-right"] ) {
    padding: 0;
    margin: 0;
    flex-shrink: 0;
    flex-grow: 0;
  }


`;

export { inputStyle };
