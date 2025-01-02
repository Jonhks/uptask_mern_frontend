import { addUserToProject } from "@/api/teamApi";
import { TeamMember } from "@/types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

type searchResultProps = {
  user: TeamMember;
  resetData: () => void;
};

const SearchResult = ({ user, resetData }: searchResultProps) => {
  const params = useParams();
  const projectId = params.projectId!;
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: addUserToProject,
    onSuccess: (resp) => {
      toast.success(resp);
      resetData();
      queryClient.invalidateQueries({
        queryKey: ["projectTeam", projectId],
      });
    },
    onError: (error) => {
      toast.error(error.toString());
    },
  });

  const handleAddUserToProject = () => {
    const data = {
      projectId,
      id: user._id,
    };
    mutate(data);
  };

  return (
    <>
      <p className=" mt-10 text-center font-bold">Resultado: </p>
      <div className="flex justify-between items-center">
        <p> {user.name}</p>
        <button
          className=" text-purple-600 hover:bg-purple-100 px-10 py-3 font-bold cursor-pointer"
          onClick={handleAddUserToProject}
        >
          Agregar al proyecto
        </button>
      </div>
    </>
  );
};

export default SearchResult;
