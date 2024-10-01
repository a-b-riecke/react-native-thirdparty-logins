export type LoginProps = {
  onSuccess: (response: any) => void;
  onError: (response: any) => void;
  theme?: 'light' | 'dark';
  googleEnabled?: boolean;
  facebookEnabled?: boolean;
  iosEnabled?: boolean;
  googleIOSClientId?: string;
  googleAndroidClientId?: string;
};
