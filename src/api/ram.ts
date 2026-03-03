import { invoke } from "@tauri-apps/api/core";

export async function ramInfo(){
    const ramData = await invoke("get_ram_info");

    return ramData;
}