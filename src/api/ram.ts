import { invoke } from "@tauri-apps/api/core";

export interface RAM {
  total_memory: number;
  used_memory: number;
  total_swap: number;
  used_swap: number;
}

export async function ramInfo(){
    const ramData = await invoke<RAM>("get_ram_info");

    return ramData;
}