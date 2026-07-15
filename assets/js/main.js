/**
 * MUNDO DO OCTÓGONO — main.js
 * JavaScript vanilla (ES6+), sem dependências externas.
 * Responsável por: navbar, menu mobile, mega menu, busca, toasts,
 * formulários, tabs, back-to-top e pequenas melhorias de UX.
 */
(() => {
  "use strict";

  /* ------------------------------------------------------------------
   * Utilidades
   * ------------------------------------------------------------------ */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  const trapFocus = (container) => {
    const focusable = $$(
      'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])',
      container
    );
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    container.addEventListener("keydown", (e) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });
  };

  /* ------------------------------------------------------------------
   * Ano dinâmico no rodapé
   * ------------------------------------------------------------------ */
  $$("[data-current-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  /* ------------------------------------------------------------------
   * Navbar: sombra ao rolar
   * ------------------------------------------------------------------ */
  const navbar = $(".navbar");
  if (navbar) {
    const onScroll = () => {
      navbar.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ------------------------------------------------------------------
   * Menu mobile
   * ------------------------------------------------------------------ */
  const navToggle = $(".nav-toggle");
  const navPrimary = $(".nav-primary");

  if (navToggle && navPrimary) {
    navToggle.addEventListener("click", () => {
      const expanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!expanded));
      navPrimary.classList.toggle("is-open", !expanded);
      document.body.style.overflow = !expanded ? "hidden" : "";
    });

    // Submenus (mega menu) em modo mobile abrem por clique
    $$(".nav-item > .nav-link", navPrimary).forEach((link) => {
      const item = link.closest(".nav-item");
      const mega = $(".mega-menu", item);
      if (!mega) return;

      link.addEventListener("click", (e) => {
        if (window.innerWidth > 960) return;
        e.preventDefault();
        const isOpen = item.classList.contains("is-open");
        $$(".nav-item.is-open", navPrimary).forEach((openItem) => {
          if (openItem !== item) openItem.classList.remove("is-open");
        });
        item.classList.toggle("is-open", !isOpen);
        link.setAttribute("aria-expanded", String(!isOpen));
      });
    });

    // Fecha o menu mobile ao redimensionar para desktop
    window.addEventListener("resize", () => {
      if (window.innerWidth > 960 && navPrimary.classList.contains("is-open")) {
        navPrimary.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }
    });

    // Fecha com tecla Esc
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navPrimary.classList.contains("is-open")) {
        navPrimary.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
        navToggle.focus();
      }
    });
  }

  /* ------------------------------------------------------------------
   * Modal genérico (busca, vídeo)
   * ------------------------------------------------------------------ */
  const openModal = (modalEl) => {
    const overlay = $(".overlay");
    if (!modalEl) return;
    overlay?.classList.add("is-active");
    modalEl.classList.add("is-active");
    document.body.style.overflow = "hidden";
    const input = $("input, [autofocus]", modalEl);
    (input || modalEl).focus({ preventScroll: true });
    trapFocus(modalEl);
  };

  const closeModal = (modalEl) => {
    const overlay = $(".overlay");
    if (!modalEl) return;
    overlay?.classList.remove("is-active");
    modalEl.classList.remove("is-active");
    document.body.style.overflow = "";
  };

  $$("[data-open-modal]").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const target = document.getElementById(trigger.dataset.openModal);
      openModal(target);
    });
  });

  $$("[data-close-modal]").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const modalEl = trigger.closest(".modal");
      closeModal(modalEl);
    });
  });

  $(".overlay")?.addEventListener("click", () => {
    $$(".modal.is-active").forEach(closeModal);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      $$(".modal.is-active").forEach(closeModal);
    }
  });

  /* ------------------------------------------------------------------
   * Toasts
   * ------------------------------------------------------------------ */
  const toastRegion = $(".toast-region");

  const showToast = ({ title, message, type = "info", duration = 5000 }) => {
    if (!toastRegion) return;
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");

    const iconSuccess =
      '<svg class="toast-icon success" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>';
    const iconInfo =
      '<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>';

    toast.innerHTML = `
      ${type === "success" ? iconSuccess : iconInfo}
      <div class="toast-text">
        <strong>${title}</strong>
        <p>${message}</p>
      </div>
      <button type="button" class="toast-close" aria-label="Fechar notificação">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
      </button>
    `;

    toastRegion.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add("is-visible"));

    const remove = () => {
      toast.classList.remove("is-visible");
      setTimeout(() => toast.remove(), 250);
    };

    $(".toast-close", toast).addEventListener("click", remove);
    setTimeout(remove, duration);
  };

  window.MundoOctogono = window.MundoOctogono || {};
  window.MundoOctogono.showToast = showToast;

  /* ------------------------------------------------------------------
   * Consentimento de cookies
   * Banner real de aceitar/rejeitar, com escolha salva em localStorage.
   * Scripts de rastreamento (GA4, Meta Pixel, Snap Pixel etc.) devem
   * ser registrados via window.MundoOctogono.onCookieConsentAccepted()
   * em vez de rodar direto no <head> — assim só disparam com consentimento.
   * ------------------------------------------------------------------ */
  const COOKIE_CONSENT_KEY = "mo_cookie_consent";
  const consentAcceptedCallbacks = [];

  const getCookieConsent = () => {
    try {
      return localStorage.getItem(COOKIE_CONSENT_KEY);
    } catch (e) {
      return null;
    }
  };

  const setCookieConsent = (value) => {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, value);
    } catch (e) {
      /* localStorage indisponível (ex.: modo privado) — consentimento vale só para a sessão atual */
    }
    if (value === "accepted") {
      consentAcceptedCallbacks.forEach((cb) => cb());
    }
  };

  const cookieBanner = $(".cookie-banner");

  const showCookieBanner = () => {
    if (!cookieBanner) return;
    cookieBanner.hidden = false;
    requestAnimationFrame(() => cookieBanner.classList.add("is-visible"));
  };

  const hideCookieBanner = () => {
    if (!cookieBanner) return;
    cookieBanner.classList.remove("is-visible");
    setTimeout(() => {
      cookieBanner.hidden = true;
    }, 400);
  };

  if (cookieBanner) {
    if (!getCookieConsent()) {
      showCookieBanner();
    }

    $("[data-cookie-accept]", cookieBanner)?.addEventListener("click", () => {
      setCookieConsent("accepted");
      hideCookieBanner();
      showToast({
        title: "Preferências salvas",
        message: "Você aceitou todos os cookies. Pode alterar isso quando quiser no rodapé.",
        type: "success",
      });
    });

    $("[data-cookie-reject]", cookieBanner)?.addEventListener("click", () => {
      setCookieConsent("rejected");
      hideCookieBanner();
      showToast({
        title: "Preferências salvas",
        message: "Apenas cookies essenciais serão usados.",
        type: "info",
      });
    });
  }

  $$("[data-cookie-manage]").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      showCookieBanner();
    });
  });

  window.MundoOctogono.onCookieConsentAccepted = (callback) => {
    consentAcceptedCallbacks.push(callback);
    if (getCookieConsent() === "accepted") callback();
  };

  /* ------------------------------------------------------------------
   * Formulário de newsletter
   * ------------------------------------------------------------------ */
  $$("[data-newsletter-form]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailInput = $('input[type="email"]', form);
      const value = emailInput?.value.trim() || "";
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

      if (!isValid) {
        emailInput?.setAttribute("aria-invalid", "true");
        showToast({
          title: "E-mail inválido",
          message: "Verifique o endereço informado e tente novamente.",
          type: "info",
        });
        emailInput?.focus();
        return;
      }

      emailInput?.removeAttribute("aria-invalid");
      showToast({
        title: "Inscrição confirmada",
        message: "Você receberá nossas próximas atualizações sobre o MMA.",
        type: "success",
      });
      form.reset();
    });
  });

  /* ------------------------------------------------------------------
   * Formulário de contato (validação client-side, sem envio real)
   * ------------------------------------------------------------------ */
  const contactForm = $("[data-contact-form]");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const requiredFields = $$("[required]", contactForm);
      let valid = true;

      requiredFields.forEach((field) => {
        const filled =
          field.type === "checkbox" || field.type === "radio"
            ? field.checked
            : field.value.trim().length > 0;
        field.setAttribute("aria-invalid", String(!filled));
        if (!filled) valid = false;
      });

      if (!valid) {
        showToast({
          title: "Campos obrigatórios",
          message: "Preencha todos os campos destacados antes de enviar.",
          type: "info",
        });
        return;
      }

      showToast({
        title: "Mensagem enviada",
        message: "Nossa equipe responderá em até 2 dias úteis.",
        type: "success",
      });
      contactForm.reset();
    });
  }

  /* ------------------------------------------------------------------
   * Tabs (usado em Rankings)
   * ------------------------------------------------------------------ */
  $$("[data-tabs]").forEach((tabGroup) => {
    const tabs = $$(".tab-btn", tabGroup);
    const panelsWrap = document.getElementById(tabGroup.dataset.tabsPanels);
    if (!panelsWrap) return;
    // Apenas painéis filhos diretos: evita capturar tabs aninhadas (ex.: Rankings, que tem
    // tabs de categoria de peso dentro dos painéis de gênero).
    const panels = Array.from(panelsWrap.children).filter((el) => el.classList.contains("tab-panel"));

    tabs.forEach((tab, i) => {
      tab.addEventListener("click", () => {
        tabs.forEach((t) => t.setAttribute("aria-selected", "false"));
        panels.forEach((p) => (p.hidden = true));
        tab.setAttribute("aria-selected", "true");
        if (panels[i]) panels[i].hidden = false;
      });

      tab.addEventListener("keydown", (e) => {
        let newIndex = null;
        if (e.key === "ArrowRight") newIndex = (i + 1) % tabs.length;
        if (e.key === "ArrowLeft") newIndex = (i - 1 + tabs.length) % tabs.length;
        if (newIndex !== null) {
          e.preventDefault();
          tabs[newIndex].focus();
          tabs[newIndex].click();
        }
      });
    });
  });

  /* ------------------------------------------------------------------
   * Back to top
   * ------------------------------------------------------------------ */
  const backToTop = $(".back-to-top");
  if (backToTop) {
    window.addEventListener(
      "scroll",
      () => {
        backToTop.classList.toggle("is-visible", window.scrollY > 700);
      },
      { passive: true }
    );

    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ------------------------------------------------------------------
   * Filtro de categoria (select) — navegação client-side simples
   * ------------------------------------------------------------------ */
  $$("[data-filter-select]").forEach((select) => {
    select.addEventListener("change", () => {
      const cards = $$("[data-category]", document);
      const value = select.value;
      let visible = 0;

      cards.forEach((card) => {
        const show = value === "todas" || card.dataset.category === value;
        card.style.display = show ? "" : "none";
        if (show) visible += 1;
      });

      const counter = $("[data-filter-count]");
      if (counter) counter.textContent = `${visible} notícia${visible === 1 ? "" : "s"}`;
    });
  });

  /* ------------------------------------------------------------------
   * Skeleton loading simulado (percepção de carregamento suave)
   * ------------------------------------------------------------------ */
  $$("[data-skeleton-target]").forEach((target) => {
    const skeleton = document.getElementById(target.dataset.skeletonTarget);
    if (!skeleton) return;
    target.hidden = true;
    setTimeout(() => {
      skeleton.style.display = "none";
      target.hidden = false;
    }, 500);
  });

  /* ------------------------------------------------------------------
   * Player de vídeo em modal (placeholder acessível)
   * ------------------------------------------------------------------ */
  $$("[data-video-trigger]").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const modal = document.getElementById("videoModal");
      const titleEl = $("[data-video-title]", modal);
      if (titleEl) titleEl.textContent = trigger.dataset.videoTrigger;
      openModal(modal);
    });
  });
})();
