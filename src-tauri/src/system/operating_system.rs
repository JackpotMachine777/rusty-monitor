use sysinfo::{
    System,
};
use serde::Serialize;

#[derive(Serialize)]
pub struct SystemInfo{
    name: Option<String>,
    version: Option<String>,
    arch: Option<String>,
    uptime: u64,
    kernel_version: Option<String>,
    hostname: Option<String>,
}

#[tauri::command]
pub fn get_system_info() -> SystemInfo{
    let name = System::name();
    let version = System::os_version();
    let arch = System::cpu_arch();
    let uptime = System::uptime();
    let kernel_version = System::kernel_version();
    let hostname = System::host_name();

    SystemInfo {
        name,
        version,
        arch: Some(arch),
        uptime,
        kernel_version,
        hostname
    }
}