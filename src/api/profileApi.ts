import { isAxiosError } from "axios";
import { updateCurrentUserPasswordForm, UserProfileForm } from "../types";
import api from "@/lib/axios";

export const updateProfile = async (formData: UserProfileForm) => {
  try {
    const { data } = await api.put<string>("/auth/profile", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.error);
    return;
  }
};

export const changePassword = async (
  formData: updateCurrentUserPasswordForm
) => {
  try {
    const { data } = await api.post<string>("/auth/update-password", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.error);
    return;
  }
};
