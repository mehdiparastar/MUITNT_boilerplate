export const flipObject = (data: Object) =>
  Object.fromEntries(Object.entries(data).map(([key, value]) => [value, key]));

export enum UserRoles {
  superUser = '1000',
  admin = '2000',

  crudAppAdmin = '3011',
  crudAppUserHL = '3012',
  crudAppUserML = '3013',
  crudAppUserLL = '3014',

  chatAppAdmin = '3021',
  chatAppUserHL = '3022',
  chatAppUserML = '3023',
  chatAppUserLL = '3024',

  rtmpCallAppAdmin = '3031',
  rtmpCallAppUserHL = '3032',
  rtmpCallAppUserML = '3033',
  rtmpCallAppUserLL = '3034',

  voiceCallAppAdmin = '3041',
  voiceCallAppUserHL = '3042',
  voiceCallAppUserML = '3043',
  voiceCallAppUserLL = '3044',

  shareFileAppAdmin = '3051',
  shareFileAppUserHL = '3052',
  shareFileAppUserML = '3053',
  shareFileAppUserLL = '3054',

  movieAppAdmin = '3061',
  movieAppUserHL = '3062',
  movieAppUserML = '3063',
  movieAppUserLL = '3064',

  musicAppAdmin = '3071',
  musicAppUserHL = '3072',
  musicAppUserML = '3073',
  musicAppUserLL = '3074',

  mapsAppAdmin = '3081',
  mapsAppUserHL = '3082',
  mapsAppUserML = '3083',
  mapsAppUserLL = '3084',

  tradeBotAppAdmin = '3091',
  tradeBotAppUserHL = '3092',
  tradeBotAppUserML = '3093',
  tradeBotAppUserLL = '3094',

  onlineShopAppAdmin = '3101',
  onlineShopAppUserHL = '3102',
  onlineShopAppUserML = '3103',
  onlineShopAppUserLL = '3104',

  userManagementAppAdmin = '3111',
  userManagementAppUserHL = '3112',
  userManagementAppUserML = '3113',
  userManagementAppUserLL = '3114',

  bingoAppAdmin = '3121',
  bingoAppUserHL = '3122',
  bingoAppUserML = '3123',
  bingoAppUserLL = '3124',

  webrtcCallAppAdmin = '3131',
  webrtcCallAppUserHL = '3132',
  webrtcCallAppUserML = '3133',
  webrtcCallAppUserLL = '3134',
}

export const UserRolesFliped = flipObject(UserRoles);

export const UserRolesObj = flipObject(UserRolesFliped);

export const splitOnCapitalLetters = (str: string) =>
  str.split(/(?=[A-Z])/).join(' ');

export const allRolesList = Object.values(UserRoles);

export const getRoleName = (role: string) => {
  return splitOnCapitalLetters(
    Object.entries(UserRoles).filter((item) => item.includes(role))[0][0],
  );
};
