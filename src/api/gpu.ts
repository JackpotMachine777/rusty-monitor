import { invoke } from "@tauri-apps/api/core";

export interface GPU {
    name: string;
    temp: number;
    usage: number;
    power_draw: number;
    power_limit: number;
    memory_used: number;
    memory_total: number;
    mhz_used: number;
}

export async function gpuInfo(){
    return await invoke<GPU>("get_gpu_info");
}