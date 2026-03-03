use serde::Serialize;
use std::{thread, time};
use sysinfo::{
    RefreshKind,
    CpuRefreshKind,
    System,
    Components,
};

#[derive(Serialize)]
pub struct CpuInfo{
    threads: u32,
    freq_per_thread: Vec<u64>,
    usage_per_thread: Vec<f32>,
    brand: Option<String>,
    usage: f32,
    temp: Option<f32>,
    freq: u64,
}

#[tauri::command]
pub fn get_cpu_info() -> CpuInfo{
    let mut sys = System::new_with_specifics(RefreshKind::nothing().with_cpu(CpuRefreshKind::everything()));
    std::thread::sleep(sysinfo::MINIMUM_CPU_UPDATE_INTERVAL);
    sys.refresh_cpu_all();
    thread::sleep(time::Duration::from_millis(10));

    let components = Components::new_with_refreshed_list();

    let threads = sys.cpus().len() as u32;
    let brand = sys.cpus()[0].brand().to_string();
    let usage = sys.global_cpu_usage();
    let temp = components
        .iter()
        .find(|c| c.label() == "k10temp Tctl")
        .map(|c| c.temperature())
        .unwrap_or(Some(0.0));
    
    let freq = sys.cpus().iter().map(|c| c.frequency()).sum::<u64>() / sys.cpus().len() as u64;
    let freq_per_thread: Vec<u64> = sys.cpus().iter().map(|c| c.frequency()).collect();
    let usage_per_thread: Vec<f32> = sys.cpus().iter().map(|c| c.cpu_usage()).collect();

    CpuInfo {
        threads,
        freq_per_thread,
        usage_per_thread,
        brand: Some(brand),
        usage,
        temp,
        freq,
    }
}