use serde::Serialize;
use sysinfo::{
    System,
    RefreshKind,
    CpuRefreshKind,
};
use std::{thread, time};

#[derive(Serialize)]
pub struct RamInfo{
    total_memory: u64,
    used_memory: u64,
    total_swap: u64,
    used_swap: u64,
}

#[tauri::command]
pub fn get_ram_info() -> RamInfo{
    let mut sys = System::new_with_specifics(RefreshKind::nothing().with_cpu(CpuRefreshKind::everything()));
    std::thread::sleep(sysinfo::MINIMUM_CPU_UPDATE_INTERVAL);
    sys.refresh_memory();
    thread::sleep(time::Duration::from_millis(10));

    let total_memory = sys.total_memory();
    let used_memory = sys.used_memory();
    let total_swap = sys.total_swap();
    let used_swap = sys.used_swap(); 

    RamInfo{
        total_memory,
        used_memory,
        total_swap,
        used_swap,
    }
}