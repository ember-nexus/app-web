import { css } from 'lit';

const linkStyle = css`
  a {
    transition: color 0.2s;
  }

  a,
  a:link,
  a:visited {
    text-decoration: none;
    color: #1a1a1a;
  }

  a:hover,
  a:focus,
  a:active {
    text-decoration: none;
    color: #ff073a;
  }
`;

export { linkStyle };
