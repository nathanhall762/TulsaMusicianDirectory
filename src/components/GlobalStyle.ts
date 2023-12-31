import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
:root {
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;

    --color-background-main: hsl(249, 11%, 12%);
    --color-background-main-trans: hsla(249, 11%, 12%, 0.8);
    --color-background-alt: hsl(249, 11%, 15%);

    --mustard: #EBAD21;
    --national-flag-blue: #162B49;
    --bone: #F8F1E0;
    --bright-red: #C6202E;

    --color-primary: var(--mustard);
    --color-secondary: var(--national-flag-blue);
    --color-accent: var(--bright-red);

    --color-text-primary: var(--bone);
    --color-text-secondary: var(--mustard);
    --color-text-inverse: #fff;

    --color-success: #2ea44f;
    --color-danger: #cb2431;
    --color-warning: #fca321;

    --color-shadow: rgba(0, 0, 0, 0.1);
    --color-border: var(--color-background-alt);

    --bandcamp-color: #1da1f2;
    --spotify-color: #1db954;
    --youtube-color: #ff0000;
    --soundcloud-color: #ff5500;
    --facebook-color: #1877f2;
    --tiktok-color: #000000;
    --twitch-color: #9146ff;
    --threads-color: #808080;
    --instagram-color: #d62976;
    --instagram-gradient: linear-gradient(
      45deg,
      #405de6,
      #5851db,
      #833ab4,
      #c13584,
      #e1306c,
      #fd1d1d,
      #f56040
    );
    --github-color: #333;
    --linkedin-color: #0077b5;

    color: var(--color-text-primary);
    background-color: var(--color-background-main);

    --animation-speed-slow: 2s;
    --animation-speed-medium-slow: 1s;
    --animation-speed-medium: 0.5s;
    --animation-speed-fast: 0.1s;

    --breakpoint-mobile: 600px;
    --breakpoint-tablet: 900px;
    

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
  }

a {
font-weight: 500;
color: var(--color-text-secondary);
text-decoration: inherit;
}

a:hover {
color: var(--color-accent);
}

body {
margin: 0;
place-items: center;
min-width: 320px;
min-height: 100vh;
}

p {
margin: 0;
color: var(--color-text-primary);
}

h1, h2, h3, h4, h5, h6 {
  color: var(--color-text-secondary);
}

h1 {
font-size: 3.2em;
line-height: 1.1;
}

h2 {
    margin: 0;
}
iframe {
    border: none;
    opacity: 0.8;
}
`;
