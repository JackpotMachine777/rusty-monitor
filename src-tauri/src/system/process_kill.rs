use sysinfo::{
    System,
    ProcessesToUpdate,
    Pid,
    Signal,
};

#[tauri::command]
pub fn process_kill(pid: u32) -> Result<(), String> {
    let mut sys = System::new_all();
    sys.refresh_processes(ProcessesToUpdate::All, true);

    if let Some(process) = sys.process(Pid::from_u32(pid)){
        match process.kill_with(Signal::Kill){
            Some(true) => Ok(()),
            Some(false) => Err("Proces nie został ubity".into()),
            None => Err("Nie udało się wysłać sygnału".into()),
        }
    } else {
        Err(format!("Process {pid} not found"))
    }
}