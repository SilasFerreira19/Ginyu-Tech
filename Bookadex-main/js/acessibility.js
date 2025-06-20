// darkwhitemode.js

// Referências aos <link> das folhas de estilo (se existirem na página)
const configLink = document.getElementById("configStylesheet");
const perfilLink = document.getElementById("perfilStylesheet");
const dropdownLink = document.getElementById("dropdownStylesheet");

// Caminhos dos arquivos CSS para os dois modos
const cssPaths = {
  dark: {
    config: "css/config.css",
    perfil: "css/meuperfil.css",
    dropdown: "css/dropdown.css"
  },
  light: {
    config: "css/modoescuro/configwm.css",
    perfil: "css/modoescuro/meuperfilwm.css",
    dropdown: "css/modoescuro/dropdownwm.css"
  }
};

// Função para aplicar os caminhos corretos
function applyTheme(mode) {
  if (configLink) configLink.href = cssPaths[mode].config;
  if (perfilLink) perfilLink.href = cssPaths[mode].perfil;
  if (dropdownLink) dropdownLink.href = cssPaths[mode].dropdown;
}

// Lê o tema salvo ou assume 'dark' como padrão
const savedMode = localStorage.getItem("themeMode") || "dark";

// Aplica o tema ao carregar a página
applyTheme(savedMode);

// Sincroniza o estado do checkbox (se existir)
const toggleCheckbox = document.getElementById("darkModeToggleConfig");
if (toggleCheckbox) {
  toggleCheckbox.checked = savedMode === "dark";

  toggleCheckbox.addEventListener("change", () => {
    const newMode = toggleCheckbox.checked ? "dark" : "light";
    localStorage.setItem("themeMode", newMode);
    applyTheme(newMode);
  });
}

// Lógica para o Modo Daltônico
const daltonicoToggle = document.getElementById("daltonicoToggle");

// Caminhos para o modo daltônico
const daltonicoPaths = {
  on: {
    config: "css/daltonico/configmd.css",
    perfil: "css/daltonico/meuperfilmd.css",
    dropdown: "css/daltonico/dropdownmd.css"
  },
  off: {
    config: cssPaths[savedMode].config,
    perfil: cssPaths[savedMode].perfil,
    dropdown: cssPaths[savedMode].dropdown
  }
};

// Função para aplicar ou remover o modo daltônico
function applyDaltonicoMode(state) {
  if (configLink) configLink.href = daltonicoPaths[state].config;
  if (perfilLink) perfilLink.href = daltonicoPaths[state].perfil;
  if (dropdownLink) dropdownLink.href = daltonicoPaths[state].dropdown;
}

// Lê o estado salvo e aplica
const savedDaltonico = localStorage.getItem("daltonicoMode") || "off";
applyDaltonicoMode(savedDaltonico);

// Atualiza o estado do checkbox
if (daltonicoToggle) {
  daltonicoToggle.checked = savedDaltonico === "on";

  daltonicoToggle.addEventListener("change", () => {
    const newState = daltonicoToggle.checked ? "on" : "off";
    localStorage.setItem("daltonicoMode", newState);
    applyDaltonicoMode(newState);
  });
}
