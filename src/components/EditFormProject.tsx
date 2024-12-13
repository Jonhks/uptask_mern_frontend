import { Link } from "react-router-dom";
import ProjectForm from "./projects/ProjectForm";
import { useForm } from "react-hook-form";
import { ProjectFormData } from "../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProject } from "@/api/projectAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type EditFormProjectProps = {
  data: ProjectFormData;
  projectId: string;
};

const EditFormProject = ({ data, projectId }: EditFormProjectProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const initialValues: ProjectFormData = {
    projectName: data.projectName,
    clientName: data.clientName,
    description: data.description,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: updateProject,
    onSuccess: (resp) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["editProject", projectId] });
      toast.success(resp);
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.toString());
    },
  });

  const handleForm = (formData: ProjectFormData) => {
    const data = {
      projectId,
      formData,
    };
    mutate(data);
  };

  return (
    <>
      <div className=" max-w-3xl mx-auto">
        <h1 className="text-5xl font-black ">Editar proyecto</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          Llena el formulario para editar el proyecto
        </p>
        <nav className=" my-5">
          <Link
            className=" bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
            to="/"
          >
            Volver a proyectos
          </Link>
        </nav>
        <form
          className="mt-10 bg-white shadow-lg p-10 rounded-lg"
          onSubmit={handleSubmit(handleForm)}
          noValidate
        >
          <ProjectForm
            register={register}
            errors={errors}
          />
          <input
            type="submit"
            value={"Guardar cambios"}
            className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
          />
        </form>
      </div>
    </>
  );
};

export default EditFormProject;
