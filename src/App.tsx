import Navbar from "@/components/Navbar";
import NotesForm from "@/components/NotesForm";
import ActiveNotesList from "@/components/ActiveNotesList";
import { NotesProvider } from "@/context/NotesContext";
import AcrhiveNotesList from "./components/ArchiveNotesList";

function App() {
  return (
    <NotesProvider>
      <Navbar />
      <div className="container p-8">
        <NotesForm />
        <ActiveNotesList />
        <AcrhiveNotesList />
      </div>
    </NotesProvider>
  );
}

export default App;
