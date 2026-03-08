# Rusty Monitor 🦀🖥️

**Rusty Monitor** is a desktop system monitoring application built with **Rust, Tauri, and React (Vite)**.

This project is a **rewrite and cleaned-up version** of the original **tauri-system-monitor**, with a strong focus on:
- better project structure
- clearer separation between backend (Rust) and frontend (React)
- improved readability and maintainability
- easier future development

---

## ✨ Features

- 🧠 **CPU**
  - usage (total & per thread)
  - frequency
  - thread count

- 🎮 **GPU**
  - usage
  - VRAM usage
  - temperature (if available)

- 🧮 **Memory**
  - RAM usage
  - swap usage

- 🌐 **Network**
  - sent / received data

- 💾 **Disks**
  - total space
  - available space
  - multiple disks support

- 🖥️ **Operating System**
  - OS name & version
  - kernel version
  - architecture
  - hostname
  - uptime
  - OS logo detection

- 📋 **Processes**
  - process list
  - ability to kill processes

---

## 🏗️ Tech Stack

- **Backend:** Rust + `sysinfo`
- **Frontend:** React + TypeScript + Vite
- **Desktop:** Tauri
- **Styling:** CSS (custom layout, no UI framework)

---

## 🚀 Development

### Install dependencies
```bash
npm install

## Run in development mode
npm run tauri dev

## Build
npm run tauri build
```

## 🔄 Rewrite Notes

Compared to tauri-system-monitor, this version:
- 🧩 Splits logic into smaller, focused modules
- 🔄 Avoids DOM manipulation in favor of React state
- ♻️ Uses clean, reusable components
- ⚡ Improves refresh handling and performance
- ✨ Easier to extend with new system modules

### 🖥️ Platform support

This project is developed and tested primarily on Linux (Arch Linux).

Windows and macOS support are not officially maintained.
Pull requests adding or maintaining support for other platforms are welcome, but they must be maintained by contributors.
