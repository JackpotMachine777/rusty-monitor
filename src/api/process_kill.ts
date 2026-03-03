import { invoke } from "@tauri-apps/api/core";
import { notify } from "./notifications";

export async function killProcess(pid: number){
  try{
    await invoke("process_kill", { pid });
    notify("Process kill", `Process ${pid} killed`, false);
  } 
  catch(err) { notify("Cannot kill process", `Error: ${err}`, false); }
}