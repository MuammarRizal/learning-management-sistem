import type { SignUpData } from "../pages/auth/sign-up/sign-up.type";
import apiInstance from "../utils/axios";

export const postSignUp = async (data: SignUpData) =>
  apiInstance.post("/sign-up", data).then((res) => res.data);
