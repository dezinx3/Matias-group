/* MATIAS GROUP — interações e movimento */

(() => {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const header = $(".site-header");
  const menuButton = $(".menu-toggle");
  const nav = $(".main-nav");
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Ano do rodapé
  const year = $("#current-year");
  if (year) year.textContent = new Date().getFullYear();

  // Header ganha contraste após o primeiro deslocamento (1 atualização por frame, só quando muda)
  let scrolled = null;
  let ticking = false;
  const updateHeader = () => {
    ticking = false;
    const now = window.scrollY > 18;
    if (now !== scrolled) {
      scrolled = now;
      header?.classList.toggle("is-scrolled", now);
    }
  };
  updateHeader();
  window.addEventListener("scroll", () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(updateHeader);
    }
  }, { passive: true });

  // Menu mobile: fecha ao navegar, com Escape ou ao ir para o layout desktop
  const closeMenu = () => {
    menuButton?.setAttribute("aria-expanded", "false");
    menuButton?.setAttribute("aria-label", "Abrir menu");
    nav?.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  };

  menuButton?.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Abrir menu" : "Fechar menu");
    nav?.classList.toggle("is-open", !isOpen);
    document.body.classList.toggle("menu-open", !isOpen);
  });

  $$("a", nav || document).forEach(link => link.addEventListener("click", closeMenu));

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 900) closeMenu();
  }, { passive: true });

  // Animações de entrada das seções
  const revealItems = $$(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });

    revealItems.forEach((item, index) => {
      item.style.transitionDelay = `${Math.min(index % 4, 3) * 75}ms`;
      observer.observe(item);
    });
  } else {
    revealItems.forEach(item => item.classList.add("is-visible"));
  }

  // Pausa as animações contínuas das seções que estão fora da tela
  // (órbitas, cards flutuantes, onda, pulsos): mesmo visual, bem menos CPU/GPU/bateria
  if ("IntersectionObserver" in window) {
    const pauser = new IntersectionObserver(entries => {
      entries.forEach(e => e.target.classList.toggle("is-paused", !e.isIntersecting));
    }, { rootMargin: "120px 0px" });
    $$(".hero, .manifesto, .contact").forEach(el => pauser.observe(el));
  }

  // Partículas decorativas (criadas de uma vez; menos delas em telas pequenas)
  const sparkField = $(".spark-field");
  if (sparkField && !prefersReduced) {
    const total = window.matchMedia("(max-width: 700px)").matches ? 14 : 24;
    const frag = document.createDocumentFragment();
    for (let i = 0; i < total; i++) {
      const spark = document.createElement("i");
      spark.className = "spark";
      spark.style.left = `${Math.random() * 100}%`;
      spark.style.top = `${55 + Math.random() * 50}%`;
      spark.style.setProperty("--dur", `${7 + Math.random() * 10}s`);
      spark.style.setProperty("--delay", `${-Math.random() * 15}s`);
      spark.style.setProperty("--drift", `${Math.round(Math.random() * 90 - 45)}px`);
      frag.appendChild(spark);
    }
    sparkField.appendChild(frag);
  }

  // Placeholder enquanto a foto carrega (ou se o arquivo não existir)
  const bindFallback = img => {
    const fb = img.closest(".image-frame")?.querySelector(".image-fallback");
    if (!fb) return;
    const hide = () => { fb.style.display = "none"; };
    const show = () => { fb.style.display = "flex"; };
    img.addEventListener("load", hide);
    img.addEventListener("error", show);
    (img.complete && img.naturalWidth > 0) ? hide() : show();
  };
  $$(".image-frame img").forEach(bindFallback);

  // ===== Modais dos serviços =====
  const WA = "https://wa.me/5588992656779";
  const wa = msg => `${WA}?text=${encodeURIComponent(msg)}`;
  const NOTE = "As condições, taxas, prazos e a aprovação dependem da análise e das regras da instituição financeira responsável. Esta página é informativa e não representa simulação, oferta ou garantia de aprovação.";

  const SERVICES = {
    inss: {
      tag: "01 / INSS", title: "Crédito consignado INSS", img: "assets/servico-inss.webp", label: "INSS",
      intro: "Modalidade exclusiva para aposentados e pensionistas do INSS. As parcelas são descontadas diretamente do benefício, o que traz mais previsibilidade para organizar o orçamento, sem boletos para lembrar de pagar.",
      who: ["Aposentados do INSS", "Pensionistas do INSS", "Beneficiários com margem consignável disponível"],
      points: ["Desconto automático das parcelas no benefício", "Contratação limitada à margem consignável prevista em lei", "Possibilidade de escolher valor e prazo dentro das condições oferecidas", "Costuma ter taxas menores que modalidades sem desconto em folha"],
      steps: ["Você nos chama no WhatsApp e informa seu interesse", "Conferimos as possibilidades para o seu perfil e benefício", "Você recebe as condições da instituição e decide com calma"],
      msg: "Olá! Quero saber mais sobre o crédito consignado INSS."
    },
    servidor: {
      tag: "02 / SERVIDOR", title: "Consignado para servidor público", img: "assets/servico-servidor.webp", label: "SERVIDOR",
      intro: "Crédito para servidores públicos municipais, estaduais e federais, com parcelas descontadas direto na folha de pagamento. A disponibilidade depende do convênio do seu órgão com a instituição financeira.",
      who: ["Servidores ativos, aposentados e pensionistas", "Órgãos municipais, estaduais e federais", "Quem possui margem consignável disponível"],
      points: ["Parcelas descontadas em folha, sem boleto", "Condições variam conforme convênio, órgão e margem", "Atendimento orientado para entender o melhor momento de contratar", "Opções de portabilidade e refinanciamento, quando já existe contrato"],
      steps: ["Você informa seu órgão e vínculo", "Verificamos convênios e margem disponíveis", "Você compara as condições e escolhe com segurança"],
      msg: "Olá! Quero saber mais sobre o consignado para servidor público."
    },
    trabalhador: {
      tag: "03 / TRABALHADOR", title: "Crédito do Trabalhador", img: "assets/servico-trabalhador.webp", label: "CLT",
      intro: "Crédito consignado voltado a trabalhadores com carteira assinada (CLT), com parcelas descontadas direto na folha de pagamento, conforme as regras do programa federal e do seu empregador.",
      who: ["Trabalhadores com carteira assinada", "Empregados de empresas que aderiram às regras do programa", "Quem tem margem disponível na folha"],
      points: ["Desconto das parcelas na folha, de forma automática", "Condições dependem do vínculo, tempo de empresa e margem", "Contratação com acompanhamento do início ao fim", "Alternativa a modalidades sem desconto em folha"],
      steps: ["Você conta sobre seu emprego e o que precisa", "Analisamos as possibilidades disponíveis para o seu caso", "Você revisa as condições antes de decidir"],
      msg: "Olá! Quero saber mais sobre o Crédito do Trabalhador."
    }
  };

  const OTHERS = [
    { ico: "⇄", t: "Portabilidade de crédito", d: "Transfira um contrato de consignado que você já tem para outra instituição que ofereça condições melhores, como taxa menor, sem precisar começar do zero.", m: "Olá! Quero saber sobre portabilidade de crédito." },
    { ico: "↻", t: "Refinanciamento de crédito", d: "Renegocie um contrato em andamento para ajustar prazo e parcela ou, conforme as regras, liberar um novo valor.", m: "Olá! Quero saber sobre refinanciamento de crédito." },
    { ico: "⚡", t: "Crédito com débito na conta de luz", d: "Modalidade em que a parcela é cobrada na fatura de energia elétrica. Disponível conforme distribuidora e análise.", m: "Olá! Quero saber sobre crédito com débito na conta de luz." },
    { ico: "▤", t: "CLT", d: "Opções de crédito para quem tem carteira assinada, avaliadas conforme empregador, tempo de vínculo e margem disponível.", m: "Olá! Quero saber sobre crédito para CLT." },
    { ico: "◔", t: "FGTS", d: "Antecipação de parte do saque-aniversário do FGTS para quem aderiu a essa modalidade, sujeita às regras vigentes e à análise.", m: "Olá! Quero saber sobre crédito com FGTS." }
  ];

  const modal = document.getElementById("modal");
  const modalBody = document.getElementById("modal-body");
  const panel = modal?.querySelector(".modal-panel");
  let lastFocus = null;

  const li = arr => arr.map(x => `<li>${x}</li>`).join("");
  const media = (img, label) => `<div class="modal-media image-frame"><img src="${img}" alt="Imagem ilustrativa: ${label}"><div class="image-fallback"><span>${label}</span><small>${img}</small></div></div>`;

  const renderService = key => {
    if (key === "outras") {
      return `${media("assets/servico-outras.webp", "+")}
      <div class="modal-content"><span class="modal-tag">04 / OUTRAS OPÇÕES</span>
        <h3 id="modal-title">Outras soluções de crédito</h3>
        <p class="modal-intro">Além das modalidades principais, trabalhamos com alternativas para diferentes momentos. Escolha a que mais combina com o seu caso e fale com a gente.</p>
        <div class="others-list">${OTHERS.map(o => `<div class="other-item"><span class="other-ico" aria-hidden="true">${o.ico}</span><div><h4>${o.t}</h4><p>${o.d}</p><a href="${wa(o.m)}" target="_blank" rel="noopener noreferrer">Quero saber mais ↗</a></div></div>`).join("")}</div>
        <p class="modal-note">${NOTE}</p></div>`;
    }
    const s = SERVICES[key];
    return `${media(s.img, s.label)}
    <div class="modal-content"><span class="modal-tag">${s.tag}</span>
      <h3 id="modal-title">${s.title}</h3>
      <p class="modal-intro">${s.intro}</p>
      <h4>Para quem é</h4><ul>${li(s.who)}</ul>
      <h4>Principais características</h4><ul>${li(s.points)}</ul>
      <h4>Como funciona o atendimento</h4><ul>${li(s.steps)}</ul>
      <div class="modal-actions"><a class="button button--primary" href="${wa(s.msg)}" target="_blank" rel="noopener noreferrer">Falar com um especialista <span>↗</span></a></div>
      <p class="modal-note">${NOTE}</p></div>`;
  };

  const openModal = key => {
    if (!modal || !panel) return;
    lastFocus = document.activeElement;
    modalBody.innerHTML = renderService(key);
    $$("img", modalBody).forEach(bindFallback);
    modal.hidden = false;
    document.body.classList.add("modal-open");
    panel.scrollTop = 0;
    panel.focus();
  };

  const closeModal = () => {
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    document.body.classList.remove("modal-open");
    lastFocus?.focus?.();
  };

  $$("[data-service]").forEach(btn =>
    btn.addEventListener("click", () => openModal(btn.dataset.service)));
  $$("[data-close]", modal || document).forEach(el => el.addEventListener("click", closeModal));

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      closeMenu();
      closeModal();
    }
  });
})();
