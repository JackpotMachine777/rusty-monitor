import { invoke } from "@tauri-apps/api/core";

export async function cpuInfo(){
    const cpuData: any = await invoke("get_cpu_info");
    
    return cpuData;
}