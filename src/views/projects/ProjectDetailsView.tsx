import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProjectFullById } from "@/api/projectAPI";
import AddTaskModal from "@/components/Tasks/AddTaskModal";
import TaskList from "@/components/Tasks/TaskList";
import EditTaskData from "@/components/Tasks/EditTaskData";
import TaskModalDetails from "@/components/Tasks/TaskModalDetail";
import { useAuth } from "@/hooks/UseAuth";
import { isManager } from "@/utils/policies";
import { useMemo } from "react";

const EditProjectView = () => {
  const navigate = useNavigate();
  const params = useParams();
  const projectId = params.projectId!;

  const { data: user, isLoading: authLoading } = useAuth();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getProjectFullById(projectId),
    retry: false,
  });

  const canEdit = useMemo(() => data?.manager === user?._id, [data, user]);

  if (isLoading && authLoading) return "Cargando....";
  if (isError) return <Navigate to={"/404 /"} />;

  if (data && user)
    return (
      <>
        <h1 className=" text-5xl font-black">{data.projectName}</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          {data.description}
        </p>
        {isManager(data.manager, user._id) && (
          <nav className=" my-5 flex gap-3">
            <button
              className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
              onClick={() => navigate(location.pathname + "?newTask=true")}
            >
              Agregar tarea
            </button>
            <Link
              to={"team"}
              className="bg-fuchsia-600 hover:bg-fuchsia-700 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
            >
              Colaboradores
            </Link>
          </nav>
        )}
        <TaskList
          tasks={data.tasks}
          canEdit={canEdit}
        />
        <AddTaskModal />
        <EditTaskData />
        <TaskModalDetails />
      </>
    );
};

export default EditProjectView;
