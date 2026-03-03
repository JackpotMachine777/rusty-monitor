use serde::Serialize;
use std::process::Command;

#[derive(Serialize)]
pub struct GpuInfo {
    name: String,
    temp: u32,
    usage: u32,
    memory_used: u32,
    memory_total: u32,
    power_draw: f32,
    power_limit: f32,
    mhz_used: u32,
    mhz_total: u32,
}

#[tauri::command]
pub fn get_gpu_info() -> Option<GpuInfo> {
    // NVIDIA //
    if let Ok(output) = Command::new("nvidia-smi")
        .args([
            "--query-gpu=name,temperature.gpu,utilization.gpu,memory.used,memory.total,power.draw,power.limit,clocks.current.graphics,clocks.max.graphics",
            "--format=csv,noheader,nounits",
        ])
        .output()
    {
        let stdout = String::from_utf8_lossy(&output.stdout);
        let line = stdout.lines().next()?;
        let parts: Vec<&str> = line.trim().split(',').map(|s| s.trim()).collect();

        return Some(GpuInfo {
            name: parts.get(0)?.to_string(),
            temp: parts.get(1)?.parse().ok()?,
            usage: parts.get(2)?.parse().ok()?,
            memory_used: parts.get(3)?.parse().ok()?,
            memory_total: parts.get(4)?.parse().ok()?,
            power_draw: parts.get(5)?.parse().ok()?,
            power_limit: parts.get(6)?.parse().ok()?,
            mhz_used: parts.get(7)?.parse().ok()?,
            mhz_total: parts.get(8)?.parse().ok()?,
        })
    }

    None
}