import { Navigate, useLocation, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getTaskById } from "@/api/taskAPI";
import EditTaskModal from "./EdittaskModal";

const EditTaskData = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get("editTaskId")!;
  const params = useParams();
  const projectId = params.projectId!;

  const { data, isError } = useQuery({
    queryKey: ["task", taskId],
    queryFn: () => getTaskById({ projectId, taskId }),
    enabled: !!taskId,
  });

  if (isError) return <Navigate to={"/404"} />;

  if (data)
    return (
      <EditTaskModal
        data={data}
        taskId={taskId}
      />
    );
};

export default EditTaskData;
