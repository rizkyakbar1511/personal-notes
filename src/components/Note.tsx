import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";
import { NoteType } from "@/types";
import { useContext } from "react";
import { NotesContext } from "@/context/NotesContext";

const Note: React.FC<NoteType> = ({ id, title, body, createdAt, archived }) => {
  const ctx = useContext(NotesContext);

  function removeNote() {
    ctx?.setNotes(ctx.notes.filter((note) => note.id !== id));
  }

  function archiveNote() {
    ctx?.setNotes(
      ctx.notes.map((note) => {
        if (note.id === id) {
          return { ...note, archived: !note.archived };
        }
        return note;
      })
    );
  }

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle className="truncate">{title}</CardTitle>
        <CardDescription>{createdAt}</CardDescription>
      </CardHeader>
      <CardContent className="h-56 overflow-y-auto">
        <p>{body}</p>
      </CardContent>
      <CardFooter className="flex items-center gap-2">
        <Button onClick={removeNote} className="flex-1" variant="destructive">
          Delete
        </Button>
        <Button onClick={archiveNote} className="flex-1" variant="outline">
          {archived ? "Move" : "Archive"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Note;
