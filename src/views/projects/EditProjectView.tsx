import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProjectById } from "@/api/projectAPI";
import EditFormProject from "@/components/EditFormProject";

const EditProjectView = () => {
  const params = useParams();
  const projectId = params.projectId!;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["editProject", projectId],
    queryFn: () => getProjectById(projectId),
    retry: false,
  });

  if (isLoading) return "Cargando....";
  if (isError) return <Navigate to={"/404 /"} />;

  if (data)
    return (
      <EditFormProject
        data={data}
        projectId={projectId}
      />
    );
};

export default EditProjectView;