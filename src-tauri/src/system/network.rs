use serde::Serialize;
use sysinfo::Networks;

#[derive(Serialize)]
pub struct NetworkInfo {
    name: String,
    received: u64,
    transmitted: u64,
}

#[tauri::command]
pub fn get_network_info() -> NetworkInfo{
    let mut networks = Networks::new_with_refreshed_list();
    networks.refresh(true);

    let mut names: Vec<&String> = networks.keys().collect();
    names.sort();
    let name = names.first().unwrap();

    let (received, transmitted) = networks.get(*name)
    .map(|data| (data.received(), data.transmitted()))
    .unwrap();

    NetworkInfo {
        name: name.to_string(),
        received,
        transmitted,
    }
}