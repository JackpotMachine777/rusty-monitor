import { useState, useEffect } from "react";
import { diskInfo, Disk } from "../api/disks";
import { notify } from "../api/notifications";

export default function Disks(){
    const [disks, setDisks] = useState<Disk[] | null>(null)

    useEffect(() => {
        let isMounted = true;

        const fetchDisks = async () => {
            try{
                const data: Disk[] = await diskInfo();
                if(!isMounted) return;

                const filtered = data.filter(
                    (d: Disk) => d.diskname !== "rusty-monitor.AppImage"
                );
                setDisks(filtered);
            } catch(err){
                notify("Disks", `Error fetching disks: ${err}`, false);
            }
        };

        fetchDisks();
        const interval = setInterval(fetchDisks, 1000);

        return () => {
            isMounted = false;
            clearInterval(interval);
        }
    }, []);

    if(!disks) return (
        <section id="disks">
          <p>Loading disks...</p>
        </section>
    )

    return (
        <>
            {disks && (
                <section id="disks">
                  <h2 id="disk-title">Disks</h2>
                  <div id="disks-wrapper">
                    {disks.map((d) => (
                        <div className="disk" key={d.diskname}>
                            {d.diskname} <br />
                            Total space: {(d.total_space / 1024 / 1024 / 1024).toFixed(0)} GB<br />
                            Available space: {(d.available_space / 1024 / 1024 / 1024).toFixed(0)} GB
                        </div>
                    ))}
                  </div>
                </section>
            )}
        </>
    )
}