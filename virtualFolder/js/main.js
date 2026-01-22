// Scroll suave con anclas (Inicio / Unidades)
document.querySelectorAll('[data-scroll]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
  
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
  
  // Contacto (por ahora no hace nada definitivo)
  document.getElementById('btnContacto')?.addEventListener('click', () => {
    alert('Contacto: lo definimos después.');
  });

// ===== Transición entre páginas (fade in / fade out) =====
document.addEventListener("DOMContentLoaded", () => {
  const main = document.querySelector(".page-transition");
  if (!main) return;

  // Entrada suave
  requestAnimationFrame(() => {
    main.classList.add("is-ready");
  });

  // Interceptar clicks a links internos para hacer salida suave
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a) return;

    const href = a.getAttribute("href");
    const target = a.getAttribute("target");

    // Ignorar: externos, anclas (#), mailto/tel, nuevas pestañas, descargas
    if (!href) return;
    if (target === "_blank") return;
    if (href.startsWith("#")) return;
    if (href.startsWith("mailto:") || href.startsWith("tel:")) return;
    if (a.hasAttribute("download")) return;

    // Solo links internos del proyecto (html)
    const isInternalPage = href.endsWith(".html") || href.includes(".html#");
    if (!isInternalPage) return;

    e.preventDefault();

    // Salida suave
    main.classList.add("is-leaving");

    // Esperar a que termine la transición y navegar
    setTimeout(() => {
      window.location.href = href;
    }, 260);
  });
});

const reveals = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
  const windowHeight = window.innerHeight;
  const revealPoint = 120;

  reveals.forEach(el => {
    const revealTop = el.getBoundingClientRect().top;
    if (revealTop < windowHeight - revealPoint) {
      el.classList.add('active');
    }
  });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();