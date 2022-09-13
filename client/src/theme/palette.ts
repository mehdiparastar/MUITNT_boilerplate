import { light as lightGreen, dark as darkGreen } from './palette--green';
import { light as lightBlue, dark as darkBlue } from './palette--blue';
import { light as lightIndigo, dark as darkIndigo } from './palette--indigo';
import { light as lightPink, dark as darkPink } from './palette--pink';
import { light as lightOrange, dark as darkOrange } from './palette--orange';

const palette = (
  themeMode: themeMode = 'light',
  paletteType: themePaletteType = 'green',
) => {
  if (paletteType === 'blue') {
    return themeMode === 'dark' ? darkBlue : lightBlue;
  } else if (paletteType === 'indigo') {
    return themeMode === 'dark' ? darkIndigo : lightIndigo;
  } else if (paletteType === 'pink') {
    return themeMode === 'dark' ? darkPink : lightPink;
  } else if (paletteType === 'orange') {
    return themeMode === 'dark' ? darkOrange : lightOrange;
  }

  return themeMode === 'dark' ? darkGreen : lightGreen;
};

export default palette;
