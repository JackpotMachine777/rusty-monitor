import { useState, useEffect } from "react";
import { fetchProcesses, Process } from "../api/processes";
import { formatBytes } from "../utils/formatBytes";
import { killProcess } from "../api/process_kill";
import { useProcessSearch } from "../utils/useProcessSearch";

export default function Processes() {
    const [processes, setProcesses] = useState<Process[]>([]);
    const [killPid, setKillPid] = useState<number | null>(null);
    const { searchTerm, setSearchTerm, filteredProcesses } = useProcessSearch(processes);

    useEffect(() => {
        let isMounted = true;

        const interval = setInterval(async () => {
            const data = await fetchProcesses();
            if(isMounted) setProcesses(data);
        }, 5000)

        return () => {
            isMounted = false;
            clearInterval(interval);
        }
    }, []);

    const handleKill = async (pid: number) => {
        setKillPid(pid);
        try{
            await killProcess(pid);
            setProcesses(prev => prev.filter(p => p.pid !== pid));
        } finally{
            setKillPid(null)
        }
    };

    if (!processes) return(
        <section id="processes">
           <p>Loading processes...</p>
        </section>
    )

    return (
        <section id="processes">
            <h2>Processes</h2>

            <input 
                type="text" 
                placeholder="Find process..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{
                    marginBottom: "10px",
                    padding: "5px 10px",
                    width: "100%",
                    boxSizing: "border-box",
                    borderRadius: "6px",
                    border: "1px solid #555",
                    backgroundColor: "#2a2a2a",
                    color: "#e0e0e0",
                }}
            />
            <table id="process-table">
                <thead>
                    <tr>
                        <th>PID</th>
                        <th>Name</th>
                        <th>Memory</th>
                        <th>CPU Usage</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProcesses.map(p => (
                        <tr key={p.pid}>
                            <td style={{textAlign: "center"}}>{p.pid}</td>
                            <td style={{textAlign: "center"}}>{p.name}</td>
                            <td style={{textAlign: "center"}}>{formatBytes(p.mem)}</td>
                            <td style={{textAlign: "center"}}>{p.proc_usage.toFixed(1)}</td>
                            <td>
                                <button 
                                className="kill-btn"
                                onClick={() => handleKill(p.pid)}
                                disabled={killPid === p.pid}
                                >
                                    {killPid === p.pid ? "Killing..." : "Kill"}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    )
}