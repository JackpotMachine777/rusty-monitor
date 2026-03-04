import { invoke } from "@tauri-apps/api/core";

export interface CPU {
    brand: string;
    threads: number;
    usage: number;
    freq: number;
    temp: number
}

export async function cpuInfo(){
    return await invoke<CPU>("get_cpu_info");
}