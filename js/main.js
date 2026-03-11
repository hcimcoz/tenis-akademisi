document.addEventListener("DOMContentLoaded", () => {
  // --- Init i18n ---
  I18n.init();

  // --- Language toggle ---
  document.getElementById("lang-tr").addEventListener("click", () => {
    if (I18n.currentLang !== "tr") I18n.toggle();
  });
  document.getElementById("lang-en").addEventListener("click", () => {
    if (I18n.currentLang !== "en") I18n.toggle();
  });

  // --- Sticky nav background ---
  const header = document.getElementById("header");
  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 50);
  });

  // --- Hamburger menu ---
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    navLinks.classList.toggle("open");
  });

  // Close menu on link click
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("open");
      navLinks.classList.remove("open");
    });
  });

  // --- Smooth scroll ---
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        const headerH = header.offsetHeight;
        const top = target.getBoundingClientRect().top + window.scrollY - headerH;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  });

  // --- Active nav link on scroll ---
  const sections = document.querySelectorAll("section[id]");
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY + header.offsetHeight + 10;
    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");
      const link = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (link) {
        link.classList.toggle("active", scrollY >= top && scrollY < top + height);
      }
    });
  });

  // --- Scroll-triggered fade-in ---
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));

  // --- Video gallery filter ---
  const filterBtns = document.querySelectorAll(".filter-btn");
  const videoCards = document.querySelectorAll(".video-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;
      videoCards.forEach((card) => {
        if (filter === "all" || card.dataset.category === filter) {
          card.style.display = "";
          setTimeout(() => card.classList.add("visible"), 10);
        } else {
          card.classList.remove("visible");
          card.style.display = "none";
        }
      });
    });
  });

  // --- Video modal ---
  const modal = document.getElementById("video-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalClose = document.getElementById("modal-close");

  document.querySelectorAll(".video-play-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const title = btn.closest(".video-card").querySelector("[data-i18n]").textContent;
      modalTitle.textContent = title;
      modal.classList.add("open");
      document.body.style.overflow = "hidden";
    });
  });

  modalClose.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  function closeModal() {
    modal.classList.remove("open");
    document.body.style.overflow = "";
  }

  // --- Contact form ---
  const form = document.getElementById("contact-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    clearErrors();

    const name = form.querySelector("#form-name");
    const email = form.querySelector("#form-email");
    const phone = form.querySelector("#form-phone");
    const t = translations[I18n.currentLang];
    let valid = true;

    if (!name.value.trim()) {
      showError(name, t["contact.form.error.name"]);
      valid = false;
    }
    if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      showError(email, t["contact.form.error.email"]);
      valid = false;
    }
    if (!phone.value.trim()) {
      showError(phone, t["contact.form.error.phone"]);
      valid = false;
    }

    if (valid) {
      alert(t["contact.form.success"]);
      form.reset();
    }
  });

  function showError(input, message) {
    const err = document.createElement("span");
    err.className = "form-error";
    err.textContent = message;
    input.parentElement.appendChild(err);
    input.classList.add("input-error");
  }

  function clearErrors() {
    form.querySelectorAll(".form-error").forEach((e) => e.remove());
    form.querySelectorAll(".input-error").forEach((e) => e.classList.remove("input-error"));
  }
});
