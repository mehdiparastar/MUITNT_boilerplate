export function updateThemeTopbarFooterDimentions(
  themeConfig: any, // { themeTopbarCompDimentions: { updateThemeTopbarCompDimensions: any; }; themeFooterCompDimentions: { updateThemeFooterCompDimensions: any; }; },
  topBarRef: any, // { current: { clientHeight: any; clientWidth: any; }; },
  topBarContentRef: any, // { current: { clientHeight: any; clientWidth: any; }; },
  footerRef: any, // { current: { clientHeight: any; clientWidth: any; }; },
) {
  const updateThemeTopbarCompDimensions =
    themeConfig.themeTopbarCompDimentions.updateThemeTopbarCompDimensions;
  const updateThemeFooterCompDimensions =
    themeConfig.themeFooterCompDimentions.updateThemeFooterCompDimensions;

  updateThemeTopbarCompDimensions(
    Math.max(
      topBarRef.current?.clientHeight || 0,
      topBarContentRef.current?.clientHeight || 0,
    ),
    Math.max(
      topBarRef.current?.clientWidth || 0,
      topBarContentRef.current?.clientWidth || 0,
    ),
  );

  updateThemeFooterCompDimensions(
    footerRef.current?.clientHeight || 0,
    footerRef.current?.clientWidth || 0,
  );
}
