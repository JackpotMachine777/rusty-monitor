use serde::Serialize;
use sysinfo::{
    System,
    ProcessesToUpdate,
    ProcessRefreshKind,
};

#[derive(Clone, Serialize)]
pub struct ProcessInfo{
    pid: u32,
    name: String,
    proc_usage: f32,
    mem: u64,
}

#[tauri::command]
pub fn get_processes() -> Vec<ProcessInfo> {
    let mut system = System::new();
    system.refresh_all();
    std::thread::sleep(sysinfo::MINIMUM_CPU_UPDATE_INTERVAL);
    system.refresh_processes_specifics(
        ProcessesToUpdate::All,
        true,
        ProcessRefreshKind::everything(),
    );
    

    let mut processes: Vec<_> = system.processes().values().map(|proc| {
        let pid = proc.pid().as_u32();
        let name = proc.name().to_string_lossy().into_owned();
        let proc_usage = proc.cpu_usage();
        let mem = proc.memory();

        ProcessInfo {
            pid,
            name,
            proc_usage,
            mem
        }
    }).collect();

    processes.sort_by(|a, b| b.proc_usage.partial_cmp(&a.proc_usage).unwrap());

    processes
}