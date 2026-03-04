import { invoke } from "@tauri-apps/api/core";

export interface Os{
    name: string;
    hostname: string;
    version: string;
    arch: string;
    kernel_version: string;
    uptime: number;
}

export async function osInfo(){
    return await invoke<Os>("get_system_info");
}