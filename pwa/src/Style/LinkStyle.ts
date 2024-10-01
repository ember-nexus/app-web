import { css } from 'lit';

const linkStyle = css`
  a {
    transition: color 0.2s;
  }

  a,
  a:link,
  a:visited {
    text-decoration: none;
    color: #1A1A1A;
  }

  a:hover,
  a:focus,
  a:active {
    text-decoration: none;
    color: #FF073A;
  }
`;

export { linkStyle };
