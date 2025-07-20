export type SignInType = {
  email: string;
  password: string;
};

export type FormSignUpProps = {
  getDataForm: (data: SignUpData) => void;
  setMode: (mode: "AUTH" | "PRICING") => void;
};

export type FormSignInProps = {
  getDataForm: (data: SignInType) => void;
};

export type SignUpData = {
  name: string;
  email: string;
  password: string;
};
