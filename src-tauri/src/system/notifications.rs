use notify_rust::{Notification, Urgency};

#[tauri::command]
pub fn send_notification(title: &str, message: &str, urgent: bool) -> Result<(), String> {
    let urgency = if urgent { Urgency::Critical } else { Urgency::Normal };
    
    #[cfg(target_os = "windows")]
    Notification::new()
        .summary(title)
        .body(message)
        .show()
        .map_err(|e| format!("An error occured while sending notification: {}", e))?;

    #[cfg(not(target_os = "windows"))]
    Notification::new()
        .summary(title)
        .body(message)
        .urgency(urgency)
        .show()
        .map_err(|e| format!("An error occured while sending notification: {}", e))?;

    Ok(())
}