use serde::Serialize;
use std::{thread, time, sync::Mutex, fs};
use tauri::State;
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
    power_draw: f32,
}

#[derive(Default)]
pub struct PowerState {
    prev: Option<(u64, time::Instant)>,
    max_range: Option<u64>,
}

fn read_rapl_energy() -> Option<u64> {
    fs::read_to_string("/sys/class/powercap/intel-rapl:0/energy_uj")
        .ok()?
        .trim()
        .parse()
        .ok()
}

fn read_rapl_max_range() -> Option<u64> {
    fs::read_to_string("/sys/class/powercap/intel-rapl:0/max_energy_range_uj")
        .ok()?
        .trim()
        .parse()
        .ok()
}

fn get_power_draw(state: &Mutex<PowerState>) -> f32 {
    let energy_now = match read_rapl_energy() {
        Some(e) => e,
        None => return -1.0,
    };
    let now = time::Instant::now();

    let mut st = state.lock().unwrap();
    if st.max_range.is_none() {
        st.max_range = read_rapl_max_range();
    }
    let max_range = st.max_range.unwrap_or(u64::MAX);

    let watts = match st.prev {
        Some((e_prev, t_prev)) => {
            let de = if energy_now >= e_prev {
                energy_now - e_prev
            } else {
                (max_range - e_prev) + energy_now
            };

            let dt = now.duration_since(t_prev).as_secs_f32();
            if dt > 0.0 { de as f32 / 1_000_000.0 / dt } else { 0.0 }
        }
        None => 0.0,
    };
    st.prev = Some((energy_now, now));

    watts
}

#[tauri::command]
pub fn get_cpu_info(power_state: State<'_, Mutex<PowerState>>) -> CpuInfo{
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
    let power_draw = get_power_draw(&power_state);

    CpuInfo {
        threads,
        freq_per_thread,
        usage_per_thread,
        brand: Some(brand),
        usage,
        temp,
        freq,
        power_draw,
    }
}