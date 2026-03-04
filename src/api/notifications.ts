import { invoke } from "@tauri-apps/api/core";

export async function notify(title: string, message: string , urgent: boolean = false){
  try{
    await invoke("send_notification", {title, message, urgent});
  } 
  catch(err) { alert(`Error while sending notification: ${err}`); }
}