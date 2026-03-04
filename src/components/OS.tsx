import { useState, useEffect } from "react";
import { osInfo, Os } from "../api/operating_system";
import { formatTime } from "../utils/formatTime";

export default function OS(){
    const [os, setOs] = useState<Os | null>(null);

      useEffect(() => {
       let isMounted = true;
       const interval = setInterval(async () => {
        const data = await osInfo();
        if(isMounted) setOs(data);
       }, 1000)
    
       return () => {
        isMounted = false;
        clearInterval(interval);
       }
      }, []);

      const getOsLogo = (name: string | undefined) => {
        if (!name) return "../assets/default.png";
        if (name.includes("Arch")) return "arch.png";
        if (name.includes("Debian")) return "debian.png";
        if (name.includes("Mint")) return "mint.png";
        if (name.includes("Ubuntu")) return "ubuntu.png";
        if (name.includes("Windows")) return "windows.png";
        if (name.includes("Fedora")) return "fedora.png";
        return "default.png";
      }
    
      if (!os) return(
        <section id="OS">
           <p>Loading OS data...</p>
        </section>
      )
    
      return (
        <>
          {os && (
            <section id="OS">
              <img src={getOsLogo(os.name)} alt={os.name} id="system-logo" />
              <div id="system-text">
                <h2>System</h2>
                <div id="hostname">User: {os.hostname}</div>
                <div id="os-name">Operating System: {os.name}</div>
                <div id="os-version">OS Version: {os.version}</div>
                <div id="os-arch">OS Architecture: {os.arch}</div>
                <div id="kernel-version">Kernel: {os.kernel_version}</div>
                <div id="uptime">Uptime: {formatTime(os.uptime)}</div>
              </div>
            </section>
          )}
        </>
      );
}