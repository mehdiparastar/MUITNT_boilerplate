export {};

declare global {
  type themeMode = 'light' | 'dark';
  type themePaletteType = 'green' | 'blue' | 'indigo' | 'pink' | 'orange';
  type Props = {
    children?: React.ReactNode;
  };
  type layoutProps = Props & {
    title?: string;
  };
  type HideOnScrollProps = {
    children: React.ReactElement;
  };
}
