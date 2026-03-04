import { invoke } from "@tauri-apps/api/core";

export interface Disk {
    diskname: string;
    total_space: number;
    available_space: number;
}

export async function diskInfo(){
    return await invoke<Disk[]>("get_disk_info"); 
}