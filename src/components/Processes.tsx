import { useState, useEffect } from "react";
import { fetchProcesses, Process } from "../api/processes";
import { formatBytes } from "../utils/formatBytes";

export default function Processes() {
    const [processes, setProcesses] = useState<Process[]>([]);

    useEffect(() => {
        let isMounted = true;

        const interval = setInterval(async () => {
            const data = await fetchProcesses();
            if(isMounted) setProcesses(data);
        }, 1000)

        return () => {
            isMounted = false;
            clearInterval(interval);
        }
    }, []);

    if (!processes) return(
        <section id="processes">
           <p>Loading processes...</p>
        </section>
    )

    return (
        <section id="processes">
            <h2>Processes</h2>
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
                    {processes.map(p => (
                        <tr key={p.pid}>
                            <td style={{textAlign: "center"}}>{p.pid}</td>
                            <td style={{textAlign: "center"}}>{p.name}</td>
                            <td style={{textAlign: "center"}}>{formatBytes(p.mem)}</td>
                            <td style={{textAlign: "center"}}>{p.proc_usage.toFixed(1)}</td>
                            <td><button className="kill-btn" data-pid={p.pid}>Kill</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    )
}