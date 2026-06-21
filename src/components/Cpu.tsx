import { useState, useEffect, useRef } from "react";
import { cpuInfo, CPU } from "../api/cpu.ts";
import { formatClocks } from "../utils/formatClocks.ts";
import { notify } from "../api/notifications.ts";

export default function Cpu(){
  const [cpu, setCpu] = useState<CPU | null>(null);
  const [usageVisible, setUsageVisible] = useState(false);
  const [freqVisible, setFreqVisible] = useState(false);
  const cpuCrit = useRef(false);

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

  if(Number(cpu.temp.toFixed(0)) > 85 && !cpuCrit.current){
    notify("CAUTION!", "CPU Temperature is too high!", true);
    cpuCrit.current = true;
  } else if(Number(cpu.temp.toFixed(0)) < 85) cpuCrit.current = false;

  return (
    <>
      {cpu && (
      <section id="cpu">
        <h2>CPU</h2>
        <div id="cpu-name">Model: {cpu.brand}</div>
        <div id="cpu-threads">Threads: {cpu.threads}</div>
        <div id="cpu-usage" onClick={() => setUsageVisible(v => !v)} style={{ cursor: "pointer" }}>
          Usage: {(cpu.usage).toFixed(0)}%
        </div>
        {usageVisible && (
          <div id="usage-per-thread">
            {cpu.usage_per_thread.map((t, i) => (
              <div key={i} className="thread-usage">Thread {i + 1}: {t.toFixed(1)}%</div>
            ))}
          </div>
        )}

        <div id="cpu-power">Power draw: {cpu.power_draw.toFixed(1)} W</div>

        <div id="cpu-freq" onClick={() => setFreqVisible(v => !v)} style={{ cursor: "pointer" }}>
          Frequency: {formatClocks(cpu.freq, "cpu")}
        </div>
        {freqVisible && (
          <div id="freq-per-thread">
            {cpu.freq_per_thread.map((f, i) => (
              <div key={i} className="thread-freq">Thread {i + 1}: {formatClocks(f, "cpu")}</div>
            ))}
          </div>
        )}

        <div id="cpu-temp">Temperature: {(cpu.temp).toFixed(0)}°C</div>
      </section>
      )}
    </>
  );
}