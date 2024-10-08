export interface UserObject {
  token: string | null;
  email: string | null;
  name: string | null;
  provider: 'google' | 'facebook' | 'apple';
}

export interface LoginProps {
  onSuccess: (userObject: UserObject) => void;
  onError: (error: boolean) => void;
  theme?: 'dark' | 'light';
  googleEnabled?: boolean;
  iosEnabled?: boolean;
  facebookEnabled?: boolean | null;
  googleIOSClientId: string | null;
  googleAndroidClientId: string | null;
  iconOnly?: boolean;
  borderRadius?: number;
  borderColor?: string;
  borderEnabled?: boolean;
}
