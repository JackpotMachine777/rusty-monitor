import { invoke } from "@tauri-apps/api/core";

export async function networkInfo(){
    let networkData = await invoke("get_network_info");

    return networkData;
}