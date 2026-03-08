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
    tray,
};

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_updater::Builder::new().build())
        .setup(|app| {
            tray::create_tray(app.handle())?;
            Ok(())
        })
        .on_window_event(|window, event| {
            if let tauri::WindowEvent::CloseRequested {api, ..} = event {
                window.hide().unwrap();
                api.prevent_close();

                let _ = notifications::send_notification("Tray", "Rusty Monitor is still running in the system tray.", false);
            }
        })
        .invoke_handler(tauri::generate_handler![cpu::get_cpu_info, disks::get_disk_info, gpu::get_gpu_info, network::get_network_info, notifications::send_notification, operating_system::get_system_info, processes::get_processes, process_kill::process_kill, ram::get_ram_info])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}