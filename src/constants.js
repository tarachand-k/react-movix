export const BREAKPOINTS = {
  mobile: 640,
  tablet: 768,
  laptop: 1024,
  desktop: 1280,
  largeDesktop: 1536,
};

export const QUERIES = {
  mobileAndLarge: `only screen and (min-width: ${BREAKPOINTS.mobile / 16}rem)`,
  tabletAndLarge: `only screen and (min-width: ${BREAKPOINTS.tablet / 16}rem)`,
  laptopAndLarge: `only screen and (min-width: ${BREAKPOINTS.laptop / 16}rem)`,
  desktopAndLarge: `only screen and (min-width: ${
    BREAKPOINTS.desktop / 16
  }rem)`,
  largeDesktopAndLarge: `only screen and (min-width: ${
    BREAKPOINTS.largeDesktop / 16
  }rem)`,
};

export const ellipsis = (line = 2) => {
  `
    display: -webkit-box;
    -webkit-line-clamp: ${line};
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
`;
};
