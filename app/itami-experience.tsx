"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const asset = (name: string) => `${basePath}/assets/${name}`;
const brands = ["Nestlé", "Garoto", "Sadia", "Perdigão", "Qualy", "La Guapa", "ArcelorMittal"];
const solutions = [
  { title: "Desenvolver & padronizar", question: "Uma ideia para tirar do papel?", text: "Da formulação aos testes, apoio técnico para criar, melhorar e padronizar seu produto.", deliverables: "Plano de testes · Fichas técnicas · Padrões de produto", topic: "Quero desenvolver ou padronizar um produto." },
  { title: "Estruturar a qualidade", question: "Sua operação precisa de mais consistência?", text: "Processos, boas práticas e controles de segurança dos alimentos que fazem sentido no dia a dia.", deliverables: "Diagnóstico · Procedimentos · Capacitação da equipe", topic: "Quero estruturar os processos de qualidade da minha empresa." },
  { title: "Somar apoio técnico", question: "Precisa de conhecimento especializado?", text: "Acompanhamento próximo para resolver desafios e orientar decisões, sem ampliar sua equipe interna.", deliverables: "Plano de ação · Revisão técnica · Acompanhamento", topic: "Quero apoio técnico para a minha operação." },
];
const stages = [
  { label: "Desenvolver", image: "product-development.webp", alt: "Composição ilustrativa de almôndegas e ingredientes para desenvolvimento de produto", tag: "01 / Formulação", title: "Uma boa ideia ganha forma.", description: "Ingredientes, textura e aplicação: transformar a intenção em um produto que pode ser testado." },
  { label: "Padronizar", image: "product-process.webp", alt: "Ilustração de almôndegas em uma linha de produção industrial", tag: "02 / Processo", title: "Qualidade que se repete.", description: "Definir parâmetros e organizar processos para buscar consistência a cada produção." },
  { label: "Levar ao mercado", image: "product-retail.webp", alt: "Embalagens ilustrativas de almôndegas bovinas em um expositor de congelados", tag: "03 / Produto", title: "O cuidado chega ao produto.", description: "Conectar produto, documentação e operação para preparar os próximos passos da comercialização." },
];
const method = [
  { title: "Entender", text: "Conversamos sobre o desafio e o momento da sua empresa." },
  { title: "Definir", text: "Alinhamos prioridades, entregas e um escopo de trabalho." },
  { title: "Aplicar", text: "Desenvolvemos as soluções e acompanhamos sua aplicação." },
];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={diagonal ? "arrow diagonal" : "arrow"}><path d="M4 12h15M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" /></svg>;
}

export function ItamiExperience() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [stage, setStage] = useState(0);
  const [message, setMessage] = useState("");
  const [prepared, setPrepared] = useState(false);
  const [copied, setCopied] = useState(false);
  const [draft, setDraft] = useState("");
  const menuButton = useRef<HTMLButtonElement>(null);
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_URL;
  const whatsappUrl = whatsapp && /^https:\/\/(wa\.me|api\.whatsapp\.com)\//.test(whatsapp) ? whatsapp : undefined;

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("in-view"); observer.unobserve(entry.target); } });
    }, { threshold: 0.12 });
    document.querySelectorAll("[data-reveal]").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  function chooseTopic(topic: string) {
    setMessage(topic);
    setPrepared(false);
  }
  function onTabKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % stages.length;
    else if (event.key === "ArrowLeft") next = (index + stages.length - 1) % stages.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = stages.length - 1;
    else return;
    event.preventDefault(); setStage(next); document.getElementById(`stage-tab-${next}`)?.focus();
  }
  function prepareEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = `Nome: ${data.get("nome")}\nEmpresa: ${data.get("empresa")}\nE-mail: ${data.get("email")}\nTelefone: ${data.get("telefone") || "Não informado"}\n\n${message}`;
    setDraft(body); setPrepared(true); setCopied(false);
    window.location.href = `mailto:contato@itamifood.com.br?subject=${encodeURIComponent(`Projeto — ${data.get("empresa")}`)}&body=${encodeURIComponent(body)}`;
  }

  return <>
    <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <header className="site-header">
      <div className="header-inner">
        <a href="#inicio" className="brand" aria-label="Itami Food Consulting — início"><Image src={asset("logo-itami-light.png")} alt="Itami Food Consulting" width={145} height={57} priority /></a>
        <button ref={menuButton} className="menu-toggle" aria-expanded={menuOpen} aria-controls="main-nav" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "Fechar" : "Menu"}<span aria-hidden="true">{menuOpen ? "−" : "+"}</span></button>
        <nav id="main-nav" className={menuOpen ? "is-open" : ""} aria-label="Navegação principal" onKeyDown={e => { if (e.key === "Escape") { setMenuOpen(false); menuButton.current?.focus(); } }}>
          <a href="#atuacao" onClick={() => setMenuOpen(false)}>Soluções</a>
          <a href="#sara" onClick={() => setMenuOpen(false)}>Sara Itami</a>
          <a href="#contato" className="header-cta" onClick={() => setMenuOpen(false)}>Vamos conversar <Arrow diagonal /></a>
        </nav>
      </div>
    </header>
    <main id="conteudo">
      <section className="hero section-shell" id="inicio" aria-labelledby="hero-title">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow"><span className="orange-square" /> Consultoria para a indústria de alimentos</p>
          <h1 id="hero-title">Da ideia<br />ao produto.<br /><span>Com precisão.</span></h1>
          <p className="hero-description">Desenvolvimento e qualidade para fazer sua empresa avançar. Com método, visão prática e acompanhamento próximo.</p>
          <div className="hero-actions"><a href="#contato" className="button button-orange">Vamos falar do seu projeto <Arrow diagonal /></a><a href="#atuacao" className="text-link">Conheça as soluções <span aria-hidden="true">↓</span></a></div>
        </div>
        <div className="hero-visual">
          <div className="visual-label"><span>CONHECIMENTO EM APLICAÇÃO</span><span aria-hidden="true">[ IF / 01 ]</span></div>
          <div className="industrial-frame">
            <Image src={asset("product-process.webp")} alt="Detalhe ilustrativo de uma linha de produção de alimentos" fill sizes="(max-width: 760px) 100vw, 46vw" priority />
            <div className="frame-corner top" aria-hidden="true" /><div className="frame-corner bottom" aria-hidden="true" />
            <div className="image-caption"><span>Da formulação<br />à consistência.</span><span className="cross" aria-hidden="true">+</span></div>
          </div>
          <div className="visual-baseline"><span>MATÉRIA. MÉTODO. PRODUTO.</span><span className="technical-rule" aria-hidden="true" /></div>
        </div>
        <div className="hero-bottom"><span>Ideias. Ingredientes. Impacto.</span><span>P&amp;D <i /> Qualidade <i /> Apoio técnico</span><a href="#atuacao" aria-label="Explorar as soluções">Explore <span aria-hidden="true">↓</span></a></div>
      </section>

      <section className="experience section-shell" aria-label="Experiência profissional de Sara Itami">
        <div className="experience-intro"><p className="eyebrow">Experiência construída na prática</p><p>Marcas e empresas presentes na trajetória profissional de Sara Itami.</p></div>
        <div className="brand-list">{brands.map(brand => <span key={brand}>{brand}</span>)}</div>
        <p className="brand-context">Experiências de Sara, anteriores à Itami. Sadia, Perdigão e Qualy integram sua atuação com produtos do grupo BRF/MBRF.</p>
      </section>

      <section className="solutions section-shell" id="atuacao" aria-labelledby="solutions-title">
        <div className="section-heading" data-reveal><p className="eyebrow">01 / Onde podemos ajudar</p><h2 id="solutions-title">Seu desafio.<br /><span>Uma direção técnica.</span></h2><p>Para empresas, marcas e novos negócios que precisam desenvolver produtos e fortalecer a operação.</p></div>
        <div className="solution-list">{solutions.map((solution, i) => <article className="solution" key={solution.title} data-reveal>
          <span className="solution-number">0{i + 1}</span>
          <div className="solution-title"><p>{solution.question}</p><h3>{solution.title}</h3></div>
          <div className="solution-body"><p>{solution.text}</p><span>{solution.deliverables}</span></div>
          <a href="#contato" className="solution-link" onClick={() => chooseTopic(solution.topic)} aria-label={`Conversar sobre ${solution.title.toLowerCase()}`}><Arrow diagonal /></a>
        </article>)}</div>
        <p className="scope-note">Rotulagem e documentação técnica podem integrar o escopo conforme a necessidade do projeto.</p>
      </section>

      <section className="product-story section-shell" aria-labelledby="story-title">
        <div className="story-heading" data-reveal><p className="eyebrow">02 / Da ideia à aplicação</p><h2 id="story-title">O método transforma.<br /><span>O produto mostra.</span></h2><p>Um mesmo produto. Decisões diferentes em cada etapa.</p></div>
        <div className="story-layout">
          <div className="story-controls">
            <div className="stage-tabs" role="tablist" aria-label="Etapas do desenvolvimento">{stages.map((item, i) => <button type="button" key={item.label} id={`stage-tab-${i}`} role="tab" aria-selected={stage === i} aria-controls={`stage-panel-${i}`} tabIndex={stage === i ? 0 : -1} onClick={() => setStage(i)} onKeyDown={event => onTabKey(event, i)}><span>0{i + 1}</span>{item.label}<Arrow /></button>)}</div>
            <p className="illustration-note">Exemplo ilustrativo de desenvolvimento de produto. Imagens geradas por IA.</p>
          </div>
          {stages.map((item, i) => <div key={item.label} role="tabpanel" id={`stage-panel-${i}`} aria-labelledby={`stage-tab-${i}`} hidden={stage !== i} tabIndex={0} className="stage-panel">
            <div className="stage-image"><Image src={asset(item.image)} alt={item.alt} fill sizes="(max-width: 760px) 100vw, 62vw" /><span className="image-tag">{item.tag}</span></div>
            <div className="stage-description"><h3>{item.title}</h3><p>{item.description}</p></div>
          </div>)}
        </div>
      </section>

      <section className="sara section-shell" id="sara" aria-labelledby="sara-title">
        <div className="sara-photo" data-reveal><Image src={asset("sara-profile.webp")} alt="Sara Itami, fundadora da Itami Food Consulting" fill sizes="(max-width: 760px) 100vw, 40vw" /><div className="portrait-label"><span>SARA ITAMI</span><span>Fundadora / Consultora</span></div></div>
        <div className="sara-copy" data-reveal><p className="eyebrow">03 / Quem está ao seu lado</p><h2 id="sara-title">Conhecimento técnico.<br /><span>Presença de verdade.</span></h2><p className="sara-lead">Você conversa com quem entende o projeto — e acompanha cada etapa.</p><p>Sou Sara Itami, nutricionista com experiência em Qualidade e Pesquisa &amp; Desenvolvimento na indústria de alimentos. Criei a Itami para aproximar esse conhecimento da realidade de cada negócio.</p><p>Minha atuação conecta produto, processo e equipe, com clareza nas decisões e foco na aplicação.</p><div className="sara-tags"><span>Nutrição</span><span>Qualidade</span><span>Pesquisa &amp; Desenvolvimento</span></div><a href="#contato" className="text-link dark-link">Converse comigo <Arrow diagonal /></a>
          <div className="speaking-note"><div className="speaking-photo"><Image src={asset("sara-palestra.webp")} alt="Sara Itami conduzindo uma apresentação sobre qualidade" fill sizes="96px" /></div><p>Conhecimento que também se compartilha.<br /><strong>Orientação e capacitação de equipes.</strong></p></div>
        </div>
      </section>

      <section className="contact section-shell" id="contato" aria-labelledby="contact-title">
        <div className="method"><p className="eyebrow">04 / Como começamos</p><ol>{method.map((item, i) => <li key={item.title}><span>0{i + 1}</span><div><h3>{item.title}</h3><p>{item.text}</p></div></li>)}</ol></div>
        <div className="contact-layout"><div className="contact-copy" data-reveal><p className="eyebrow">Vamos dar o próximo passo?</p><h2 id="contact-title">Seu próximo<br />produto começa<br /><span>com uma conversa.</span></h2><p>Conte o que sua empresa precisa desenvolver, melhorar ou organizar.</p><a href="mailto:contato@itamifood.com.br" className="email-link">contato@itamifood.com.br <Arrow diagonal /></a>{whatsappUrl && <a href={whatsappUrl} className="text-link whatsapp" target="_blank" rel="noreferrer">Conversar pelo WhatsApp <Arrow diagonal /></a>}</div>
        <form onSubmit={prepareEmail} className="contact-form"><div className="form-grid"><label>Nome<input name="nome" autoComplete="name" required maxLength={100} placeholder="Como podemos chamar você?" /></label><label>Empresa<input name="empresa" autoComplete="organization" required maxLength={120} placeholder="Nome da empresa" /></label><label>E-mail<input name="email" type="email" autoComplete="email" required maxLength={180} placeholder="voce@empresa.com.br" /></label><label>Telefone <span>(opcional)</span><input name="telefone" type="tel" autoComplete="tel" maxLength={30} placeholder="DDD + número" /></label></div><label>Qual é o seu desafio?<textarea name="mensagem" rows={3} required maxLength={2000} value={message} onChange={e => { setMessage(e.target.value); setPrepared(false); }} placeholder="Conte um pouco sobre o projeto." /></label><p className="form-note" id="email-explanation">Ao continuar, abriremos seu aplicativo de e-mail com a mensagem preenchida. O envio é concluído por você.</p><button className="button button-orange" type="submit" aria-describedby="email-explanation">Preparar meu e-mail <Arrow diagonal /></button>
          {prepared && <div className="form-status" role="status"><p>Rascunho preparado. Se o aplicativo não abriu, copie a mensagem e envie para contato@itamifood.com.br.</p><button type="button" className="text-link" onClick={async () => { try { await navigator.clipboard.writeText(draft); setCopied(true); } catch { setCopied(false); } }}>{copied ? "Mensagem copiada" : "Copiar mensagem"}</button><details><summary>Ver mensagem</summary><pre>{draft}</pre></details></div>}
          <details className="privacy"><summary>Como tratamos seus dados</summary><p>Este formulário não armazena seus dados no site. Eles são incluídos no e-mail somente quando você decide enviá-lo. A Itami utiliza as informações recebidas para responder ao seu contato e tratar do projeto. Para solicitar acesso, correção ou exclusão, escreva para contato@itamifood.com.br. Esta página não utiliza cookies de publicidade.</p></details>
        </form></div>
      </section>
    </main>
    <footer className="site-footer section-shell"><a href="#inicio" aria-label="Itami Food Consulting — voltar ao início"><Image src={asset("logo-itami-light.png")} alt="Itami Food Consulting" width={122} height={48} /></a><p>Ideias. Ingredientes. Impacto.</p><div><span>© {new Date().getFullYear()} Itami Food Consulting</span><a href="#inicio">Voltar ao topo ↑</a></div></footer>
  </>;
}
