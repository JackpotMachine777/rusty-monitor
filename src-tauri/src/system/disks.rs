use serde::Serialize;
use sysinfo::{ 
    Disks,
};

#[derive(Serialize)]
pub struct DiskInfo {
    diskname: String,
    total_space: u64,
    available_space: u64,
}

#[tauri::command]
pub fn get_disk_info() -> Vec<DiskInfo>{
    let sys_disks = Disks::new_with_refreshed_list();
    let mut disks_vec: Vec<DiskInfo> = Vec::new();

    for disk in sys_disks.list() {
        let diskname = disk.name().to_string_lossy().into_owned();
        let total_space = disk.total_space();
        let available_space = disk.available_space();

        disks_vec.push(DiskInfo {
            diskname,
            total_space,
            available_space,
        });
    }

    disks_vec
}