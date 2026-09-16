"use client";

import Image from "next/image";
import { useEffect, useState, type FormEvent } from "react";

const stages = [
  { number: "01", name: "IDEIA", eyebrow: "Leitura do desafio", title: "A pergunta certa antes de qualquer resposta.", text: "Entendemos o contexto do negócio, a operação, as restrições e a oportunidade que precisa ganhar forma." },
  { number: "02", name: "DESENVOLVIMENTO", eyebrow: "Construção técnica", title: "Hipóteses testadas com método e viabilidade.", text: "Apoiamos pesquisa, testes, padronização e melhoria de produtos para reduzir incertezas e acelerar decisões." },
  { number: "03", name: "QUALIDADE", eyebrow: "Controle consistente", title: "Processos claros para resultados confiáveis.", text: "Estruturamos padrões, rotinas e controles de qualidade e segurança dos alimentos alinhados à realidade da operação." },
  { number: "04", name: "CONFORMIDADE", eyebrow: "Precisão documental", title: "Informação correta para avançar com segurança.", text: "Organizamos rotulagem, especificações e documentação técnica para tornar requisitos claros e aplicáveis." },
  { number: "05", name: "IMPACTO", eyebrow: "Aplicação real", title: "Um produto mais sólido. Uma empresa mais preparada.", text: "Conectamos desenvolvimento, qualidade e conformidade em entregas que funcionam fora do papel." },
];

const services = [
  { number: "01", title: "Qualidade & Segurança dos Alimentos", text: "Estruturação e melhoria de processos, padrões, controles e boas práticas para operações mais seguras e consistentes." },
  { number: "02", title: "Pesquisa & Desenvolvimento", text: "Apoio técnico à criação, melhoria, teste e viabilização de produtos para a indústria de alimentos." },
  { number: "03", title: "Rotulagem & Documentação Técnica", text: "Revisão e organização de rótulos, fichas, especificações e documentos com precisão e clareza." },
  { number: "04", title: "Consultoria Técnica", text: "Especialistas sob demanda para projetos, diagnósticos e desafios pontuais, sem ampliar a estrutura interna." },
];

const questions = ["Desenvolver ou melhorar um produto", "Estruturar processos de qualidade", "Revisar rotulagem e documentação", "Somar conhecimento técnico à equipe"];
const brands = ["Nestlé", "Garoto", "Sadia", "Perdigão", "Qualy", "La Guapa", "ArcelorMittal"];
const workProcess = ["Entendimento", "Diagnóstico", "Desenvolvimento", "Implementação"];

export function ItamiExperience() {
  const [activeStage, setActiveStage] = useState(0);
  const [headerCompact, setHeaderCompact] = useState(false);
  const [sent, setSent] = useState(false);
  const whatsappUrl = process.env.NEXT_PUBLIC_WHATSAPP_URL;

  useEffect(() => {
    let frame = 0;
    const updateScroll = () => {
      frame = 0;
      const max = Math.max(document.body.scrollHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max(window.scrollY / max, 0), 1);
      document.documentElement.style.setProperty("--page-progress", progress.toFixed(4));
      setHeaderCompact(window.scrollY > 40);
    };
    const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(updateScroll); };
    updateScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveStage(Number((visible.target as HTMLElement).dataset.stage));
      },
      { rootMargin: "-30% 0px -42%", threshold: [0.15, 0.35, 0.6] },
    );
    document.querySelectorAll<HTMLElement>("[data-stage]").forEach((item) => observer.observe(item));

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Contato pelo site — ${String(data.get("empresa") || data.get("nome"))}`);
    const body = encodeURIComponent([
      `Nome: ${data.get("nome")}`,
      `Empresa: ${data.get("empresa")}`,
      `E-mail: ${data.get("email")}`,
      `Telefone: ${data.get("telefone") || "Não informado"}`,
      "",
      String(data.get("mensagem")),
    ].join("\n"));
    setSent(true);
    window.location.href = `mailto:contato@itamifood.com.br?subject=${subject}&body=${body}`;
  };

  return (
    <main>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <div className="scroll-progress" aria-hidden="true"><span /></div>

      <header className={`site-header ${headerCompact ? "is-compact" : ""}`}>
        <a className="brand" href="#inicio" aria-label="Itami Food Consulting — início">
          <Image src="/assets/logo-itami-light.png" alt="Itami Food Consulting" width={180} height={71} priority />
        </a>
        <nav aria-label="Navegação principal">
          <a href="#atuacao">Atuação</a>
          <a href="#sara">Sara Itami</a>
          <a href="#contato" className="nav-cta">Iniciar conversa <span aria-hidden="true">↗</span></a>
        </nav>
      </header>

      <div id="conteudo">
        <section className="hero" id="inicio">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-photo" aria-hidden="true">
            <Image src="/assets/sara-hero.webp" alt="" fill sizes="(max-width: 900px) 100vw, 50vw" priority />
          </div>
          <div className="hero-copy">
            <div className="hero-overline"><span>Consultoria B2B</span><span>Indústria de alimentos</span><span>Brasil</span></div>
            <h1>Decisões<br />técnicas.<br /><em>Produtos</em><br />consistentes.</h1>
            <div className="hero-note">
              <p>Qualidade, desenvolvimento e inovação para empresas que precisam avançar com precisão.</p>
              <a href="#transformacao">Da ideia ao produto <span aria-hidden="true">↓</span></a>
            </div>
          </div>
          <div className="hero-code" aria-hidden="true"><span>IFC</span><strong>01</strong></div>
          <div className="hero-manifesto" aria-label="Ideias. Ingredientes. Impacto.">
            <span><b>01</b>Ideias</span><span><b>02</b>Ingredientes</span><span><b>03</b>Impacto</span>
          </div>
        </section>

        <section className="intro-statement" id="transformacao">
          <p className="section-index">01 / Perspectiva</p>
          <p className="statement">Entre uma boa ideia e um produto confiável existe uma sequência de decisões. <span>A Itami transforma complexidade técnica em direção prática.</span></p>
          <div className="statement-meta"><span>P&amp;D</span><span>Qualidade</span><span>Conformidade</span><span>Implementação</span></div>
        </section>

        <section className="journey" aria-labelledby="journey-title">
          <div className="journey-head">
            <p className="section-index inverse">02 / Processo</p>
            <h2 id="journey-title">Da ideia<br />ao impacto.</h2>
            <p>Uma progressão contínua que combina visão de negócio, rigor técnico e aplicação real.</p>
          </div>
          <div className="journey-stage-panel">
            <div className="stage-display" aria-hidden="true">
              <span className="stage-ruler">00 — 100</span>
              <strong>{stages[activeStage].name}</strong>
              <div className="stage-crosshair"><i /><i /></div>
              <div className="stage-progress"><span style={{ width: `${((activeStage + 1) / stages.length) * 100}%` }} /></div>
              <small>{stages[activeStage].number} / 05</small>
            </div>
            <div className="journey-steps">
              {stages.map((stage, index) => (
                <article className={`journey-step ${activeStage === index ? "is-active" : ""}`} data-stage={index} key={stage.name}>
                  <div className="step-number">{stage.number}</div>
                  <div className="step-copy">
                    <p>{stage.eyebrow}</p>
                    <h3>{stage.title}</h3>
                    <span>{stage.text}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="services" id="atuacao" aria-labelledby="services-title">
          <div className="services-head">
            <p className="section-index inverse">03 / Especialidades</p>
            <h2 id="services-title">Conhecimento técnico aplicado ao negócio.</h2>
            <p>Atuação sob medida para projetos, diagnósticos e desafios que exigem profundidade sem ampliar a estrutura interna.</p>
          </div>
          <div className="service-list">
            {services.map((service) => (
              <article className="service-row" key={service.number}>
                <span>{service.number}</span><h3>{service.title}</h3><p>{service.text}</p><i aria-hidden="true">↗</i>
              </article>
            ))}
          </div>
        </section>

        <section className="challenges">
          <div className="challenges-intro">
            <p className="section-index">04 / Desafios</p>
            <h2>O ponto de partida é o que precisa mudar.</h2>
            <p>Projetos começam com uma necessidade concreta. A solução nasce do diagnóstico.</p>
          </div>
          <div className="challenge-list">
            {questions.map((question, index) => (
              <a href="#contato" key={question}><span>{String(index + 1).padStart(2, "0")}</span><strong>{question}</strong><i aria-hidden="true">→</i></a>
            ))}
          </div>
        </section>

        <section className="experience" aria-labelledby="experience-title">
          <div className="experience-copy">
            <p className="section-index">05 / Experiência</p>
            <h2 id="experience-title">Repertório construído na prática.</h2>
            <p>A trajetória de Sara Itami reúne experiências com marcas e empresas de diferentes portes e segmentos.</p>
          </div>
          <div className="brand-line" aria-label="Marcas e empresas presentes na trajetória profissional de Sara Itami">
            <div className="brand-track">
              <div className="brand-group">{brands.map((brand) => <span key={brand}>{brand}</span>)}</div>
              <div className="brand-group" aria-hidden="true">{brands.map((brand) => <span key={`repeat-${brand}`}>{brand}</span>)}</div>
            </div>
          </div>
          <p className="brand-note">Marcas e empresas que fizeram parte da trajetória profissional de Sara Itami. Não representam, necessariamente, clientes da Itami Food Consulting.</p>
        </section>

        <section className="sara" id="sara">
          <div className="sara-portrait">
            <Image src="/assets/sara-profile.webp" alt="Sara Itami em retrato profissional" fill sizes="(max-width: 900px) 100vw, 54vw" />
            <span className="portrait-caption">Fundadora / Consultora técnica</span>
          </div>
          <div className="sara-copy">
            <p className="section-index inverse">06 / À frente da Itami</p>
            <h2>Sara<br /><em>Itami</em></h2>
            <p className="sara-lead">Nutrição, qualidade e P&amp;D com a perspectiva de quem conhece a indústria por dentro.</p>
            <p>Sara possui experiência em Qualidade e Pesquisa &amp; Desenvolvimento na indústria de alimentos e está em especialização ligada à produção de carne bovina.</p>
            <ul aria-label="Áreas de atuação de Sara Itami"><li>Nutrição</li><li>Qualidade</li><li>Pesquisa &amp; Desenvolvimento</li><li>Indústria de Alimentos</li></ul>
            <figure>
              <div className="sara-speaking"><Image src="/assets/sara-palestra.webp" alt="Sara Itami durante uma palestra sobre política da qualidade" fill sizes="240px" /></div>
              <figcaption>Experiência que combina conhecimento técnico, comunicação e implementação.</figcaption>
            </figure>
          </div>
        </section>

        <section className="method" aria-labelledby="method-title">
          <div className="method-head"><p className="section-index">07 / Como trabalhamos</p><h2 id="method-title">Clareza em cada etapa.</h2></div>
          <ol>{workProcess.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong><i aria-hidden="true" /></li>)}</ol>
        </section>

        <section className="contact" id="contato">
          <div className="contact-intro">
            <p className="section-index inverse">08 / Contato</p><p className="contact-kicker">Tem um desafio?</p><h2>Vamos<br /><em>conversar.</em></h2><a href="mailto:contato@itamifood.com.br">contato@itamifood.com.br ↗</a>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <label><span>Nome</span><input name="nome" autoComplete="name" required /></label>
              <label><span>Empresa</span><input name="empresa" autoComplete="organization" required /></label>
              <label><span>E-mail</span><input name="email" type="email" autoComplete="email" required /></label>
              <label><span>Telefone</span><input name="telefone" type="tel" autoComplete="tel" /></label>
            </div>
            <label><span>Como podemos ajudar?</span><textarea name="mensagem" rows={4} required /></label>
            <div className="form-footer"><p>Ao continuar, seu aplicativo de e-mail será aberto. Nenhum dado é armazenado neste site.</p><button type="submit">Enviar mensagem <span aria-hidden="true">↗</span></button></div>
            {sent ? <p className="form-status" role="status">Mensagem preparada. Se o seu aplicativo não abrir, escreva para contato@itamifood.com.br.</p> : null}
            {whatsappUrl ? <a className="whatsapp-link" href={whatsappUrl} target="_blank" rel="noreferrer">Conversar pelo WhatsApp ↗</a> : null}
          </form>
          <div className="contact-signature" aria-label="Ideias. Ingredientes. Impacto."><span>IDEIAS.</span><span>INGREDIENTES.</span><span>IMPACTO.</span></div>
        </section>
      </div>

      <footer><Image src="/assets/logo-itami-light.png" alt="Itami Food Consulting" width={140} height={55} /><p>© 2026 Itami Food Consulting</p><a href="#inicio">Voltar ao topo ↑</a></footer>
    </main>
  );
}
