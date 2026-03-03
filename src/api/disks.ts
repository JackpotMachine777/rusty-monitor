import { invoke } from "@tauri-apps/api/core";

export async function diskInfo(){
    const data: any = await invoke("get_disk_info"); 

    return data;
}