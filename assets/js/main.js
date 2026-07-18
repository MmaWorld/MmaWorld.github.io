/**
 * WORLD MMA — main.js
 * Vanilla JavaScript (ES6+), no external dependencies.
 * Handles: navbar, mobile menu, mega menu, search, toasts,
 * forms, tabs, back-to-top and small UX enhancements.
 */
(() => {
  "use strict";

  /* ------------------------------------------------------------------
   * Utilities
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
   * Dynamic year in the footer
   * ------------------------------------------------------------------ */
  $$("[data-current-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  /* ------------------------------------------------------------------
   * Navbar: shadow on scroll
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
   * Mobile menu
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

    // Submenus (mega menu) open on click in mobile mode
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

    // Closes the mobile menu when resizing to desktop
    window.addEventListener("resize", () => {
      if (window.innerWidth > 960 && navPrimary.classList.contains("is-open")) {
        navPrimary.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }
    });

    // Closes with the Esc key
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
   * Generic modal (search, video)
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
      <button type="button" class="toast-close" aria-label="Close notification">
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
   * Cookie consent
   * A real accept/reject banner, with the choice saved in localStorage.
   * Tracking scripts (GA4, Meta Pixel, Snap Pixel, etc.) should be
   * registered via window.MundoOctogono.onCookieConsentAccepted()
   * instead of running directly in <head> — that way they only fire with consent.
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
      /* localStorage unavailable (e.g. private mode) — consent only applies to the current session */
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
        title: "Preferences saved",
        message: "You've accepted all cookies. You can change this anytime in the footer.",
        type: "success",
      });
    });

    $("[data-cookie-reject]", cookieBanner)?.addEventListener("click", () => {
      setCookieConsent("rejected");
      hideCookieBanner();
      showToast({
        title: "Preferences saved",
        message: "Only essential cookies will be used.",
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
   * Taboola Pixel (advertiser id 2077769) — fires a page_view event on
   * every page load, gated on cookie consent like the other trackers.
   * ------------------------------------------------------------------ */
  window.MundoOctogono.onCookieConsentAccepted(function () {
    window._tfa = window._tfa || [];
    window._tfa.push({ notify: "event", name: "page_view", id: 2077769 });
    (function (t, f, a, x) {
      if (!document.getElementById(x)) {
        t.async = 1;
        t.src = a;
        t.id = x;
        f.parentNode.insertBefore(t, f);
      }
    })(
      document.createElement("script"),
      document.getElementsByTagName("script")[0],
      "//cdn.taboola.com/libtrc/unip/2077769/tfa.js",
      "tb_tfa_script"
    );
  });

  /* ------------------------------------------------------------------
   * Real form submission via FormSubmit (no backend of our own).
   * Uses FormSubmit's AJAX endpoint: it returns JSON instead of redirecting,
   * so the experience (toast) stays the same, but the email actually arrives.
   * ------------------------------------------------------------------ */
  const submitFormReally = async (form) => {
    const action = form.getAttribute("action");
    if (!action) return { ok: false, reason: "no-action" };

    const ajaxUrl = action.replace(
      /^https:\/\/formsubmit\.co\//,
      "https://formsubmit.co/ajax/"
    );

    // FormSubmit's AJAX endpoint expects JSON — sending FormData
    // (multipart) causes a 500 error on their server.
    const payload = {};
    new FormData(form).forEach((value, key) => {
      payload[key] = value;
    });

    try {
      const response = await fetch(ajaxUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) return { ok: false, reason: "http-error" };
      return { ok: true };
    } catch (err) {
      return { ok: false, reason: "network-error" };
    }
  };

  /* ------------------------------------------------------------------
   * Newsletter form
   * ------------------------------------------------------------------ */
  $$("[data-newsletter-form]").forEach((form) => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const emailInput = $('input[type="email"]', form);
      const value = emailInput?.value.trim() || "";
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

      if (!isValid) {
        emailInput?.setAttribute("aria-invalid", "true");
        showToast({
          title: "Invalid email",
          message: "Check the address you entered and try again.",
          type: "info",
        });
        emailInput?.focus();
        return;
      }

      emailInput?.removeAttribute("aria-invalid");
      const submitBtn = $('button[type="submit"]', form);
      submitBtn?.setAttribute("disabled", "true");

      const result = await submitFormReally(form);
      submitBtn?.removeAttribute("disabled");

      if (result.ok) {
        showToast({
          title: "Subscription confirmed",
          message: "You'll receive our latest MMA updates.",
          type: "success",
        });
        form.reset();
      } else {
        showToast({
          title: "Couldn't send right now",
          message: "Please try again shortly or email world.mma001@gmail.com.",
          type: "info",
        });
      }
    });
  });

  /* ------------------------------------------------------------------
   * Contact form — real submission via FormSubmit
   * ------------------------------------------------------------------ */
  const contactForm = $("[data-contact-form]");
  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
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
          title: "Required fields",
          message: "Please fill in all the highlighted fields before submitting.",
          type: "info",
        });
        return;
      }

      const submitBtn = $('button[type="submit"]', contactForm);
      submitBtn?.setAttribute("disabled", "true");

      const result = await submitFormReally(contactForm);
      submitBtn?.removeAttribute("disabled");

      if (!result.ok) {
        showToast({
          title: "Couldn't send right now",
          message: "Please try again shortly or email world.mma001@gmail.com directly.",
          type: "info",
        });
        return;
      }

      showToast({
        title: "Message sent",
        message: "Our team will reply within 2 working days.",
        type: "success",
      });
      contactForm.reset();
    });
  }

  /* ------------------------------------------------------------------
   * Tabs (used in Rankings)
   * ------------------------------------------------------------------ */
  $$("[data-tabs]").forEach((tabGroup) => {
    const tabs = $$(".tab-btn", tabGroup);
    const panelsWrap = document.getElementById(tabGroup.dataset.tabsPanels);
    if (!panelsWrap) return;
    // Only direct child panels: avoids capturing nested tabs (e.g. Rankings, which has
    // weight-category tabs inside the gender panels).
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
   * Category filter (select) — simple client-side navigation
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
      if (counter) counter.textContent = `${visible} stor${visible === 1 ? "y" : "ies"}`;
    });
  });

  /* ------------------------------------------------------------------
   * Simulated skeleton loading (smooth loading perception)
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
})();
