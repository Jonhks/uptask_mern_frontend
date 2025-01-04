import { deleteNote } from "@/api/noteApi";
import { useAuth } from "@/hooks/UseAuth";
import { Note } from "@/types/index";
import { formatDate } from "@/utils/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";

type NoteDetailProps = {
  note: Note;
};

const NoteDetail = ({ note }: NoteDetailProps) => {
  const { data, isLoading } = useAuth();
  const params = useParams();
  const projectId = params.projectId!;
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get("viewTask")!;
  const queryClient = useQueryClient();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const canDelete = useMemo(() => data?._id === note.createBy._id, [data]);

  const { mutate } = useMutation({
    mutationFn: deleteNote,
    onSuccess: (res) => {
      toast.success(res);
      queryClient.invalidateQueries({ queryKey: ["task", taskId] });
    },
    onError: (error) => toast.error(error.message),
  });

  if (isLoading) return <p>Cargando...</p>;

  if (data)
    return (
      <div className="flex p-3 justify-between items-center">
        <div>
          <p>
            {note.content} -{" "}
            <span className="font-bold">{note.createBy.name}</span>
          </p>
          <p className=" text-xs text-slate-500">
            {formatDate(note.createdAt)}
          </p>
        </div>
        {canDelete && (
          <button
            className=" bg-red-400 hover:bg-red-500 text-white p-2 rounded-md text-xs font-bold cursor-pointer transition-colors"
            type="button"
            onClick={() => mutate({ projectId, taskId, noteId: note._id })}
          >
            Eliminar
          </button>
        )}
      </div>
    );
};

export default NoteDetail;
