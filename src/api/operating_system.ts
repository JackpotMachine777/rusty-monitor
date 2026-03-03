import { invoke } from "@tauri-apps/api/core";

export async function osInfo(){
    const osData = await invoke("get_system_info");

    return osData;
}