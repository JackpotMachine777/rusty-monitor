// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod system;

use system::{
    cpu,
    disks,
    gpu,
    network,
    notifications,
    operating_system,
    process_kill,
    processes,
    ram,
};

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_updater::Builder::new().build())
        .invoke_handler(tauri::generate_handler![cpu::get_cpu_info, disks::get_disk_info, gpu::get_gpu_info, network::get_network_info, notifications::send_notification, operating_system::get_system_info, processes::get_processes, process_kill::process_kill, ram::get_ram_info])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}