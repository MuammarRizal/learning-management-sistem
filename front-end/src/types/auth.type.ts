export interface SignInType {
  email: string;
  password: string;
}

export type FormSignUpProps = {
  getDataForm: (data: SignUpData) => void;
  setMode: (mode: "AUTH" | "PRICING") => void;
};

export type FormSignInProps = {
  getDataForm: (data: SignInType) => void;
};

export interface SignUpData extends SignInType {
  name: string;
}

export interface DataSession {
  email: string;
  name: string;
  role: string;
  token: string;
}
