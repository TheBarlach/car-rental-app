import { Pressable, Text } from 'react-native';

import { styles, variantStyles } from './Button.styles';

export type ButtonVariant = 'primary' | 'secondary' | 'danger';
export type ButtonWidth = 'full' | 'half';

export interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  width?: ButtonWidth;
}

export function Button({
  label,
  onPress,
  variant = 'primary',
  width = 'full',
}: ButtonProps) {
  const variantStyle = variantStyles[variant];

  return (
    <Pressable
      accessibilityLabel={label}
      accessibilityRole="button"
      onPress={onPress}
      style={[styles.container, styles[width], variantStyle.container]}
    >
      <Text style={[styles.label, variantStyle.label]}>{label}</Text>
    </Pressable>
  );
}
