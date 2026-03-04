import { useState, useEffect, useRef } from "react";
import { gpuInfo, GPU } from "../api/gpu";
import { formatClocks } from "../utils/formatClocks";
import { notify } from "../api/notifications";

export default function Gpu(){
    const [gpu, setGpu] = useState<GPU | null>(null);
    const gpuCrit = useRef(false)

    useEffect(() => {
        let isMounted = true;

        const interval = setInterval(async () => {
            const data = await gpuInfo();
            if(isMounted) setGpu(data);
        }, 1000)

        return () => {
            isMounted = false;
            clearInterval(interval);
        }
    }, [])

    if(!gpu) return (
        <section id="gpu">
            <p>Loading GPU...</p>
        </section>
    )

    if(gpu.temp > 85 && !gpuCrit.current){
        gpuCrit.current = true;
        notify("CAUTION!", "GPU Temperature is too high!", true);
    } else if(gpu.temp < 85) gpuCrit.current = false;

    return (
        <section id="gpu">
            <h2>GPU</h2>
            <div id="gpu-name">Model: {gpu.name}</div>
            <div id="gpu-temp">Temperature: {gpu.temp}°C</div>
            <div id="gpu-usage">Usage: {gpu.usage}%</div>
            <div id="gpu-power">Power draw: {(gpu.power_draw).toFixed(0)} W / {(gpu.power_limit).toFixed(0)} W</div>
            <div id="vram-usage">VRAM Usage: {gpu.memory_used} MB / {gpu.memory_total} MB</div>
            <div id="mhz-used">Frequency: {formatClocks(gpu.mhz_used, "gpu")}</div>
        </section>
    )
}