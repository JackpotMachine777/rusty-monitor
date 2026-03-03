import { useState, useEffect } from "react";
import { ramInfo } from "../api/ram";
import { formatBytes } from "../utils/formatBytes";

export default function Ram(){
    const [ram, setRam] = useState<any>();

    useEffect(() => {
        let isMounted = true;

        const interval = setInterval(async () => {
            const data = await ramInfo();
            if(isMounted) setRam(data);
        }, 1000);

        return () => {
            isMounted = false;
            clearInterval(interval);
        }
    }, []);

    if(!ram) return (
        <section id="ram">
            <p>Loading RAM...</p>
        </section>
    )

    return (
        <section id="ram">
            <h2>RAM</h2>
            <div id="used-ram">Usage: {formatBytes(ram.used_memory)} / {formatBytes(ram.total_memory)}</div>
            <div id="used-swap">Swap: {formatBytes(ram.used_swap)} / {formatBytes(ram.total_swap)}</div>
        </section>
    )
}