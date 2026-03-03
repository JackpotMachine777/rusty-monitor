import { invoke } from "@tauri-apps/api/core";
import { cpuInfo } from "./cpu";

export interface Process{
    pid: number;
    name: string;
    mem: number;
    proc_usage: number;
}

export interface Cpu{
    threads: number;
}

export async function fetchProcesses(): Promise<Process[]>{
  const processes: Process[] = await invoke("get_processes");
  const cpu: Cpu = await cpuInfo();

  processes.sort((a, b) => b.proc_usage - a.proc_usage);

  return processes.map(p => ({
    ...p,
    proc_usage: p.proc_usage / cpu.threads
  }));
}