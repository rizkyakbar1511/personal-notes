import { NoteType } from "@/types";
import { getInitialData } from "@/utils";
import { createContext, useState, Dispatch, SetStateAction } from "react";

interface NotesContextType {
  searchTerm: string;
  notes: NoteType[]; // Change this type to match your array type
  setNotes: Dispatch<SetStateAction<NoteType[]>>;
  setSearchTerm: Dispatch<SetStateAction<string>>;
}

export const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const NotesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notes, setNotes] = useState<NoteType[]>(getInitialData);
  const [searchTerm, setSearchTerm] = useState("");

  return <NotesContext.Provider value={{ notes, setNotes, searchTerm, setSearchTerm }}>{children}</NotesContext.Provider>;
};
