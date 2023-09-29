import { useContext, useEffect, useState } from "react";
import { Input } from "./ui/input";
import { ScrollText } from "lucide-react";
import { useDebounce } from "@uidotdev/usehooks";
import { NotesContext } from "@/context/NotesContext";

const Navbar = () => {
  const [searcValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(searcValue, 500);

  const ctx = useContext(NotesContext);

  useEffect(() => ctx?.setSearchTerm(debouncedSearchValue), [debouncedSearchValue, ctx]);

  return (
    <div className="flex items-center justify-between p-4 shadow-md">
      <div className="flex items-center gap-2">
        <ScrollText />
        <h3 className="text-2xl font-bold">Notes</h3>
      </div>
      <Input onChange={(e) => setSearchValue(e.target.value)} className="max-w-sm" placeholder="Search..." />
    </div>
  );
};

export default Navbar;
