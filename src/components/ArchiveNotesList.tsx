import Note from "@/components/Note";
import { NotesContext } from "@/context/NotesContext";
import { useContext, useMemo } from "react";

const AcrhiveNotesList = () => {
  const ctx = useContext(NotesContext);
  const notes = useMemo(
    () => ctx?.notes.filter((note) => note.archived && note.title.toLowerCase().includes(ctx?.searchTerm.toLowerCase())),
    [ctx?.notes, ctx?.searchTerm]
  );

  return (
    <div className="my-10">
      <h4 className="mb-10 text-lg font-semibold">Archive</h4>
      <div className="grid grid-cols-12 gap-4">
        {!notes?.length ? (
          <div className="col-span-12 p-10">
            <h6 className="text-xl text-center text-gray-500">There is no data</h6>
          </div>
        ) : (
          notes.map((note) => <Note key={note.id} {...note} />)
        )}
      </div>
    </div>
  );
};

export default AcrhiveNotesList;
