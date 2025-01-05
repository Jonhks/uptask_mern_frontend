import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProjectById } from "@/api/projectAPI";
import EditFormProject from "@/components/EditFormProject";
import Loader from "@/components/loader/Loader";

const EditProjectView = () => {
  const params = useParams();
  const projectId = params.projectId!;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["editProject", projectId],
    queryFn: () => getProjectById(projectId),
    retry: false,
  });

  if (isLoading) return <Loader />;
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
