import { ProjectFormData } from "@/types/index";
import api from "@/lib/axios";

export const createProject = async (dataForm: ProjectFormData) => {
  try {
    const { data } = await api.post("/projects", dataForm);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
