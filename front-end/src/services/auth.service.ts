import type { SignInType, SignUpData } from "../types/auth.type";
import apiInstance from "../utils/axios";

export const postSignUp = async (data: SignUpData) => apiInstance.post("/sign-up", data).then((res) => res.data);

export const postSignIn = async (data: SignInType) => apiInstance.post("/sign-in", data).then((res) => res.data);
