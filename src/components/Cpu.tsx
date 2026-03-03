import { useState, useEffect } from "react";
import { cpuInfo } from "../api/cpu.ts";
import { formatClocks } from "../utils/formatClocks.ts";
import { notify } from "../api/notifications.ts";

let cpuCrit: boolean = false;

export default function Cpu(){
  const [cpu, setCpu] = useState<any>(null)
  useEffect(() => {
   let isMounted = true;
   
   const interval = setInterval(async () => {
    const data = await cpuInfo();
    if(isMounted)  setCpu(data)
   }, 1000)

   return () => {
    isMounted = false;
    clearInterval(interval);
   }
  }, []);

  if (!cpu) return(
    <section id="cpu">
       <p>Loading CPU data...</p>
    </section>
  )

  if(cpu.temp.toFixed(0) > 85 && !cpuCrit){
    notify("CAUTION!", "CPU Temperature is too high!", true);
    cpuCrit = true;
  } else if(cpu.temp.toFixed(0) < 85) cpuCrit = false;

  return (
    <>
      {cpu && (
      <section id="cpu">
        <h2>CPU</h2>
        <div id="cpu-name">Model: {cpu.brand}</div>
        <div id="cpu-threads">Threads: {cpu.threads}</div>
        <div id="cpu-usage">Usage: {(cpu.usage).toFixed(0)}%</div>
        <div id="cpu-freq">Frequency: {formatClocks(cpu.freq, "cpu")}</div>
        <div id="cpu-temp">Temperature: {(cpu.temp).toFixed(0)}°C</div>
      </section>
      )}
    </>
  );
}