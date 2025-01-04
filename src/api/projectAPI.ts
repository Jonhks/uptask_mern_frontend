import {
  dasboardProjectSchema,
  editProjectShcema,
  Project,
  ProjectFormData,
  projectSchema,
} from "@/types/index";
import api from "@/lib/axios";
import { isAxiosError } from "axios";

export const createProject = async (dataForm: ProjectFormData) => {
  try {
    const { data } = await api.post("/projects", dataForm);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
      return;
    }
  }
};

export const getAllProjects = async () => {
  try {
    const { data } = await api("/projects");
    const response = dasboardProjectSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

export const getProjectById = async (id: Project["_id"]) => {
  try {
    const { data } = await api(`/projects/${id}`);
    const response = editProjectShcema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

export const getProjectFullById = async (id: Project["_id"]) => {
  try {
    const { data } = await api(`/projects/${id}`);
    const response = projectSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

type ProjectAPIType = {
  formData: ProjectFormData;
  projectId: Project["_id"];
};

export const updateProject = async ({
  formData,
  projectId,
}: ProjectAPIType) => {
  try {
    const { data } = await api.put<string>(`/projects/${projectId}`, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

export const deleteProject = async (id: Project["_id"]) => {
  try {
    const { data } = await api.delete<string>(`/projects/${id}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};
