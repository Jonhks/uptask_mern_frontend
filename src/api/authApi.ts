import api from "@/lib/axios";
import { isAxiosError } from "axios";
import {
  checkPasswordForm,
  ConfirmToken,
  ForgotPasswordForm,
  NewPasswordForm,
  RequestConfirmationCodeForm,
  // User,
  UserLoginForm,
  UserRegisterForm,
  userSchema,
} from "../types";

export const createAccount = async (formData: UserRegisterForm) => {
  try {
    const url = "/auth/create-account";
    const { data } = await api.post<string>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.error);
    return;
  }
};

export const confirmAccount = async (formData: ConfirmToken) => {
  try {
    const url = "/auth/confirm-account";
    const { data } = await api.post<string>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.error);
    return;
  }
};

export const requestConfirmationCode = async (
  formData: RequestConfirmationCodeForm
) => {
  try {
    const url = "/auth/new-code";
    const { data } = await api.post<string>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.error);
    return;
  }
};

export const autenticateUser = async (formData: UserLoginForm) => {
  try {
    const url = "/auth/login";
    const { data } = await api.post<string>(url, formData);
    localStorage.setItem("AuthTokenUpTask", data);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.error);
    return;
  }
};

export const forgotPassword = async (formData: ForgotPasswordForm) => {
  try {
    const url = "/auth/forgot-password";
    const { data } = await api.post<string>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.error);
    return;
  }
};

export const validateToken = async (formData: ConfirmToken) => {
  try {
    const url = "/auth/validate-token";
    const { data } = await api.post<string>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.error);
    return;
  }
};

export const updatePassWithToken = async ({
  formData,
  token,
}: {
  formData: NewPasswordForm;
  token: ConfirmToken["token"];
}) => {
  try {
    const url = `/auth/update-password/${token}`;
    const { data } = await api.post<string>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.error);
    return;
  }
};

export const getUser = async () => {
  try {
    const url = `/auth/user`;
    const { data } = await api.get(url);
    // const { data } = await api.get<User>(url);
    const response = userSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.error);
    return;
  }
};

export const checkPassword = async (formData: checkPasswordForm) => {
  try {
    const url = `/auth/check-password`;
    const { data } = await api.post(url, formData);
    return data;
    // const response = userSchema.safeParse(data);
    // if (response.success) {
    //   return response.data;
    // }
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.error);
    return;
  }
};
