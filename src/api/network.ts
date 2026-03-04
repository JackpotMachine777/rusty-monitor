import { invoke } from "@tauri-apps/api/core";

export interface Net{
    name: string;
    transmitted: number;
    received: number;
}

export async function networkInfo(){
    return await invoke<Net>("get_network_info");
}