import { NoteFormData } from "@/types/index";
import { useForm } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/api/noteApi";
import { toast } from "react-toastify";
import { useLocation, useParams } from "react-router-dom";

const AddNotesForm = () => {
  const params = useParams();
  const projectId = params.projectId!;
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get("viewTask")!;
  const queryClient = useQueryClient();

  const initialValues: NoteFormData = {
    content: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: createNote,
    onSuccess: (res) => {
      toast.success(res);
      reset();
      queryClient.invalidateQueries({ queryKey: ["task", taskId] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleAddNote = (formData: NoteFormData) => {
    const data = {
      projectId,
      taskId,
      formData,
    };
    mutate(data);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(handleAddNote)}
        className=" space-y-3"
        noValidate
      >
        <div className=" flex flex-col gap-2">
          <label
            htmlFor="content"
            className=" font-bold"
          >
            Crear Nota
          </label>
          <input
            type="text"
            id="content"
            placeholder="Contenido de la nota"
            className=" w-full p-3 border border-gray-300"
            {...register("content", {
              required: '"El contenido de la nota es obligatorio',
            })}
          />
          {errors.content && (
            <ErrorMessage>{errors.content?.message}</ErrorMessage>
          )}
        </div>
        <input
          type="submit"
          value={"Crear nota"}
          className=" bg-fuchsia-600 hover:bg-fuchsia-700  w-full p-2 text-white font-black cursor-pointer"
        />
      </form>
    </>
  );
};

export default AddNotesForm;
