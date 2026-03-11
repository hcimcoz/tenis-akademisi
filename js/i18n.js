const I18n = {
  currentLang: "tr",

  init() {
    const saved = localStorage.getItem("lang");
    this.currentLang = saved || "tr";
    this.apply();
    this.updateToggle();
  },

  toggle() {
    this.currentLang = this.currentLang === "tr" ? "en" : "tr";
    localStorage.setItem("lang", this.currentLang);
    this.apply();
    this.updateToggle();
  },

  apply() {
    const t = translations[this.currentLang];
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (t[key]) {
        if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
          el.placeholder = t[key];
        } else if (el.tagName === "OPTION") {
          el.textContent = t[key];
        } else {
          el.textContent = t[key];
        }
      }
    });
    document.documentElement.lang = this.currentLang;
  },

  updateToggle() {
    const btnTr = document.getElementById("lang-tr");
    const btnEn = document.getElementById("lang-en");
    if (btnTr && btnEn) {
      btnTr.classList.toggle("active", this.currentLang === "tr");
      btnEn.classList.toggle("active", this.currentLang === "en");
    }
  }
};
