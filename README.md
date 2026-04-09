# AE-Utility-Scripts
A growing collection of single‑purpose After Effects scripts I created to speed up everyday work.

Each script focuses on solving one simple, repeatable task: no UI panels, no icons — just quick actions.


## Usage

- Each script is standalone and solves one focused task.
- You can:
    - run scripts directly from **`File → Scripts`**, or
    - map them to buttons/shortcuts in a launcher for one‑click access.
- Read the **Scripts** section below for script‑specific behavior and details.


## Installation

### Direct Installation

1. Download the scripts you want to use from this repository.
2. Copy the `.jsx` / `.jsxbin` files into your After Effects Scripts folder, for example:
    - **Windows**`C:\Program Files\Adobe\Adobe After Effects [version]\Support Files\Scripts\`
    - **macOS**`Applications/Adobe After Effects <version>/Scripts/`
3. Restart After Effects.
4. Access scripts via **File → Scripts** or add them to your script launcher (KBar, etc.).


### Adding to KBar

1. Download the scripts you want to use from this repository.
2. Open **KBar Settings** in After Effects.
3. Add a new button to one of your toolbars.
4. Choose **`Run JSX/JSXBIN File`** and select the script file.
5. Add a label/description and click **OK**.


## Before running

- Enable script file access: **`Edit → Preferences → Scripting & Expressions`** and check *Allow Scripts to Write Files and Access Network*.
- Create or open a composition and select the layer(s) you want to work with.
- Save your project before running any script.


## Notes

- These tools are built around real motion design / UI animation workflows.
- There is no shared UI — just small utilities that are safe to drop into existing projects.
- Scripts are independent: you can use only the ones that fit your process.


## Scripts

### [Add Parent Controller](https://github.com/VictoriaShelest/AE-Utility-Scripts/blob/main/AddParentController.jsx)

Creates one null controller per selected layer and parents the layer to it.
