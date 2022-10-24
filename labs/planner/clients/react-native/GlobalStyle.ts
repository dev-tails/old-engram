import React from 'react';
import { Platform } from 'react-native';

export interface GlobalStyleProps {
  css: string;
}

const GlobalStyle: React.FC<GlobalStyleProps> = ({ css }) => {
  React.useEffect(() => {
    if (Platform.OS === 'web') {
      const style = document.createElement('style');
      style.textContent = css;
      document.head.append(style);
      return () => style.remove();
    }
  }, [css]);
  return null;
};

export default React.memo(GlobalStyle);