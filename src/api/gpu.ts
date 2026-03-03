import { invoke } from "@tauri-apps/api/core";

export async function gpuInfo(){
    let gpuData = await invoke("get_gpu_info");

    return gpuData;
}