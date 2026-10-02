export const colors = {
  accent: '#5B67CA',
  accentSoft: '#CED0F8',

  background: '#F4F5F8',
  surface: '#FFFFFF',
  surfaceMuted: '#F3F4F6',
  surfaceSunken: '#FAFAFA',
  surfaceDanger: '#FBE6E6',

  textPrimary: '#1A1A1A',
  textBody: '#333333',
  textStrong: '#171A1F',
  textSecondary: '#666666',
  textMuted: '#767676',
  textOnAccent: '#FFFFFF',
  textDanger: '#8C1D18',

  border: '#DCDFE6',
  borderSubtle: '#EEEEEE',
  borderStrong: '#71748A',
  divider: '#EAEAEA',
} as const;

export type ColorToken = keyof typeof colors;
