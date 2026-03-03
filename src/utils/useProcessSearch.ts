import { useState, useMemo } from "react";
import { Process } from "../api/processes";

export const useProcessSearch = (processes: Process[]) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProcesses = useMemo(() => {
    if (!searchTerm.trim()) return processes;

    const term = searchTerm.toLowerCase();
    return processes.filter(p =>
      p.name.toLowerCase().includes(term) || p.pid.toString().includes(term)
    );
  }, [processes, searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    filteredProcesses,
    hasResults: filteredProcesses.length > 0,
    isSearching: searchTerm.trim().length > 0,
  };
};