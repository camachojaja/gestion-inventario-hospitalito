"use client";

import { useState } from "react";
import type { FormEvent } from "react";

const sections = [
  ["Panorama del inventario", "panorama"],
  ["Herramientas que ayudan", "herramientas"],
  ["Orden para cada insumo", "organizacion"],
  ["Un equipo bien conectado", "equipo"],
  ["Ideas para empezar", "conclusion"],
];

const relatedStories = [
  {
    category: "GESTIÓN",
    title: "Una ruta sencilla para organizar el almacén clínico",
    time: "5 min de lectura",
    icon: "▤",
    color: "blue",
  },
  {
    category: "BUENAS PRÁCTICAS",
    title: "Cómo cuidar los insumos y evitar compras de última hora",
    time: "4 min de lectura",
    icon: "♧",
    color: "green",
  },
  {
    category: "TECNOLOGÍA",
    title: "Herramientas digitales para tener todo a la vista",
    time: "6 min de lectura",
    icon: "⌘",
    color: "purple",
  },
];

function InventoryIllustration() {
  return (
    <div className="inventory-illustration" aria-label="Ilustración de un inventario organizado">
      <div className="illustration-topline">
        <span className="live-dot" /> VISTA GENERAL
        <span className="illustration-date">HOY · 09:41</span>
      </div>
      <div className="illustration-summary">
        <div>
          <span className="summary-label">Insumos disponibles</span>
          <strong>1,284</strong>
          <span className="summary-note">en 8 categorías</span>
        </div>
        <div className="summary-icon">✚</div>
      </div>
      <div className="stock-bars" aria-hidden="true">
        <div className="stock-row">
          <span className="stock-symbol symbol-blue">✚</span>
          <span className="stock-bar"><i style={{ width: "78%" }} /></span>
          <span className="stock-count">342</span>
        </div>
        <div className="stock-row">
          <span className="stock-symbol symbol-coral">▱</span>
          <span className="stock-bar"><i className="bar-coral" style={{ width: "56%" }} /></span>
          <span className="stock-count">218</span>
        </div>
        <div className="stock-row">
          <span className="stock-symbol symbol-green">⌁</span>
          <span className="stock-bar"><i className="bar-green" style={{ width: "66%" }} /></span>
          <span className="stock-count">276</span>
        </div>
      </div>
      <div className="illustration-alert">
        <span className="alert-check">✓</span>
        <span><strong>Todo en orden</strong><small>Revisión actualizada hace 2 min</small></span>
        <span className="alert-arrow">↗</span>
      </div>
      <div className="floating-pill"><span>↗</span> Más control, menos desperdicio</div>
    </div>
  );
}

export default function Home() {
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [query, setQuery] = useState("");
  const [searchMessage, setSearchMessage] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  async function copyPageLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setCopyError(false);
      window.setTimeout(() => setCopied(false), 1800);
    } catch (error) {
      console.error("No fue posible copiar el enlace.", error);
      setCopied(false);
      setCopyError(true);
    }
  }

  function searchArticles(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const search = query.trim();
    if (!search) {
      setSearchMessage("Escribe una palabra para buscar.");
      return;
    }
    const match = Array.from(document.querySelectorAll<HTMLElement>(".article h1, .article h2, .article p, .related-card"))
      .find((element) => element.textContent?.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
    if (match) {
      setSearchMessage("");
      match.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      setSearchMessage("No encontramos coincidencias en esta página.");
    }
  }

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="#" aria-label="Gestión de inventario Hospitalito, inicio">
            <span className="brand-mark"><span>H</span><i>+</i></span>
            <span className="brand-wordmark">HOSPITALITO<small>GESTIÓN DE INVENTARIO</small></span>
          </a>
          <div className="header-tools">
            <div className="account-links"><a href="#boletin">Únete a la comunidad</a><span /> <a href="#boletin">Iniciar sesión</a></div>
            <form className="search-form" onSubmit={searchArticles}>
              <label className="visually-hidden" htmlFor="site-search">Buscar contenido</label>
              <input id="site-search" placeholder="Buscar por palabra clave" value={query} onChange={(event) => setQuery(event.target.value)} />
              <button type="submit" aria-label="Buscar">⌕</button>
            </form>
            {searchMessage && <span className="search-message" role="status">{searchMessage}</span>}
          </div>
          <button className="menu-toggle" type="button" aria-label="Abrir menú" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
            <span /><span /><span />
          </button>
        </div>
        <nav className={`main-nav${menuOpen ? " nav-open" : ""}`} aria-label="Navegación principal">
          <div className="nav-inner">
            <a href="#panorama">Inicio</a>
            <a href="#herramientas">Gestión y tecnología</a>
            <a href="#organizacion">Buenas prácticas</a>
            <a href="#equipo">Para instituciones</a>
            <a href="#boletin">Novedades</a>
          </div>
        </nav>
      </header>

      <main>
        <div className="top-banner">
          <div className="banner-copy">
            <span className="banner-kicker">HOSPITALITO · RECURSOS QUE CUIDAN</span>
            <strong>Una mejor gestión empieza con buena información.</strong>
          </div>
          <div className="banner-art" aria-hidden="true"><span>✚</span><span>＋</span><span>✚</span><span>＋</span></div>
          <a href="#panorama">DESCUBRE MÁS <span>↗</span></a>
        </div>

        <div className="page-shell">
          <nav className="breadcrumbs" aria-label="Migas de pan">
            <a href="#">Inicio</a><span>/</span><a href="#panorama">Gestión</a><span>/</span><span>Gestión de inventario Hospitalito</span>
          </nav>

          <div className="article-layout">
            <article className="article">
              <div className="article-meta">
                <div><span className="eyebrow">GESTIÓN Y OPERACIONES</span><span className="meta-divider">·</span><time dateTime="2026-10-14">14 de octubre de 2026</time></div>
                <div className="article-actions">
                  <button className={`like-button${liked ? " is-liked" : ""}`} onClick={() => setLiked(!liked)} aria-pressed={liked}>
                    <span>{liked ? "♥" : "♡"}</span> {liked ? "TE GUSTA" : "ME GUSTA"}
                  </button>
                  <button className="print-button" onClick={() => window.print()}><span>▣</span> Imprimir</button>
                </div>
              </div>

              <h1>Gestión de inventario Hospitalito</h1>
              <p className="article-deck">Una guía cercana para mantener los insumos de salud organizados, disponibles y listos cuando las personas los necesitan.</p>

              <InventoryIllustration />

              <div className="article-body">
                <p className="executive-summary"><strong>En pocas palabras:</strong> tener cada insumo en el lugar correcto y en el momento oportuno puede hacer más sencillo el trabajo diario de una institución de salud. Con registros claros, revisiones periódicas y herramientas adecuadas, los equipos pueden anticipar necesidades y aprovechar mejor sus recursos.</p>

                <nav className="contents-box" aria-label="Contenido del artículo">
                  <h2>EN ESTA GUÍA</h2>
                  <ol>
                    {sections.map(([label, id], index) => <li key={id}><a href={`#${id}`}><span>0{index + 1}</span>{label}<b>↗</b></a></li>)}
                  </ol>
                </nav>

                <section id="panorama">
                  <span className="section-number">01 / EL PUNTO DE PARTIDA</span>
                  <h2>Un inventario que acompaña el cuidado</h2>
                  <p>En una clínica, un centro médico o un hospital, cada material cumple una función: desde los elementos de protección hasta los productos de farmacia y los artículos de uso cotidiano. Saber qué hay, dónde está y cuándo hace falta ayuda a que las tareas fluyan y los equipos puedan concentrarse en atender.</p>
                  <p>El reto no siempre es tener más. A veces hay productos guardados que no se utilizan mientras otros se agotan sin aviso. Un registro actualizado ofrece una imagen más fiel de la realidad y permite planear los pedidos con calma, cuidar el presupuesto y reducir las pérdidas por deterioro o vencimiento.</p>
                  <blockquote>“Cuando la información es clara, cada equipo puede tomar mejores decisiones, día a día.”</blockquote>
                </section>

                <section id="herramientas">
                  <span className="section-number">02 / INFORMACIÓN A TIEMPO</span>
                  <h2>Herramientas que hacen más fácil el seguimiento</h2>
                  <p>Una hoja de control bien diseñada puede ser un buen comienzo. A medida que crecen los movimientos y las ubicaciones, los códigos de barras y los sistemas digitales permiten registrar entradas y salidas con mayor agilidad. Lo importante es escoger una solución que se ajuste al tamaño y a la forma de trabajar de cada institución.</p>
                  <p>Con datos consistentes es más sencillo reconocer qué productos se usan con mayor frecuencia, qué artículos necesitan reposición y cuáles están próximos a su fecha de vencimiento. Las alertas y los reportes periódicos ayudan a convertir esa información en acciones concretas, sin perder de vista las necesidades de los servicios.</p>
                  <div className="tip-card"><span className="tip-icon">✦</span><div><strong>Un consejo útil</strong><p>Empieza con una lista corta de insumos esenciales. Revisarla cada semana ayuda a crear un hábito de control y a detectar oportunidades de mejora temprano.</p></div></div>
                </section>

                <section id="organizacion">
                  <span className="section-number">03 / ORDEN Y ROTACIÓN</span>
                  <h2>Un lugar claro para cada insumo</h2>
                  <p>Una organización sencilla reduce el tiempo que se dedica a buscar materiales. Agrupar productos por tipo, identificar estantes y mantener visibles las etiquetas facilita tanto la reposición como los conteos. Si hay varias áreas de almacenamiento, conviene que los nombres y las reglas sean los mismos en todas.</p>
                  <p>Al ordenar los productos por fecha de vencimiento, el equipo puede usar primero aquellos que deben salir antes. Las revisiones regulares también permiten identificar empaques dañados, diferencias en los registros o artículos que ya no se requieren, antes de que se conviertan en un problema.</p>
                  <div className="table-wrap"><table><thead><tr><th>Área</th><th>Revisión recomendada</th><th>Qué se busca</th></tr></thead><tbody><tr><td>Farmacia y almacén</td><td>Fechas y cantidades</td><td>Rotación y reposición oportuna</td></tr><tr><td>Servicios de atención</td><td>Disponibilidad básica</td><td>Insumos listos para el trabajo diario</td></tr><tr><td>Compras y administración</td><td>Consumo y pedidos</td><td>Planificación con información reciente</td></tr><tr><td>Depósito general</td><td>Orden y condiciones</td><td>Ubicación clara y conservación adecuada</td></tr></tbody></table></div>
                </section>

                <section id="equipo">
                  <span className="section-number">04 / UN ESFUERZO COMPARTIDO</span>
                  <h2>Un equipo bien conectado cuida mejor los recursos</h2>
                  <p>El control de inventario funciona mejor cuando cada persona conoce su parte. Quienes reciben los pedidos, quienes guardan los materiales y quienes los utilizan pueden acordar un proceso común: registrar los movimientos, avisar cuando algo está por terminarse y comunicar cambios en las necesidades.</p>
                  <p>Una capacitación breve y procedimientos fáciles de consultar ayudan a que estas prácticas se mantengan entre turnos. También es valioso revisar los resultados juntos: qué se agotó, qué quedó de más y qué ajustes podrían facilitar el trabajo de la próxima semana.</p>
                </section>

                <section id="conclusion">
                  <span className="section-number">05 / PRIMEROS PASOS</span>
                  <h2>Pequeñas mejoras que suman cada día</h2>
                  <p>No hace falta cambiarlo todo de una vez. Elegir un área para empezar, ordenar el registro de los artículos esenciales y establecer una rutina de revisión ya crea una base sólida. Con el tiempo, los aprendizajes del equipo pueden orientar nuevas herramientas y formas de trabajo.</p>
                  <p>En Hospitalito creemos que una gestión clara hace más fácil cuidar lo que importa. Un inventario ordenado aporta tranquilidad, fortalece la coordinación y ayuda a que los recursos estén disponibles para las personas y los equipos que los necesitan.</p>
                </section>
              </div>

              <div className="tag-list"><span>Temas:</span><a href="#panorama">Gestión de inventario</a><a href="#organizacion">Organización</a><a href="#equipo">Recursos de salud</a></div>
              <div className="share-row"><span>{copyError ? "No se pudo copiar. Comparte el enlace desde tu navegador." : "¿Te resultó útil esta guía?"}</span><button onClick={copyPageLink}>{copied ? "✓ Enlace copiado" : copyError ? "Intentar de nuevo" : "↗ Compartir artículo"}</button></div>
            </article>

            <aside className="sidebar">
              <div className="sidebar-sticky">
                <div className="sidebar-heading"><span>PARA SEGUIR EXPLORANDO</span><i>✳</i></div>
                <p className="sidebar-intro">Ideas sencillas para acompañar la gestión diaria de tu institución.</p>
                <div className="related-list">
                  {relatedStories.map((story) => <a className="related-card" href="#boletin" key={story.title}>
                    <span className={`related-icon ${story.color}`}>{story.icon}</span>
                    <span className="related-content"><small>{story.category}</small><strong>{story.title}</strong><span>{story.time} <i>↗</i></span></span>
                  </a>)}
                </div>
                <div className="newsletter-card" id="boletin">
                  <span className="newsletter-spark">✳</span>
                  <h2>Una idea útil, de vez en cuando.</h2>
                  <p>Recibe novedades y recomendaciones de Hospitalito en tu correo.</p>
                  <a href="mailto:hola@hospitalito.example?subject=Novedades%20Hospitalito">Quiero estar al tanto <span>→</span></a>
                </div>
                <div className="share-panel">
                  <h2>COMPARTE ESTA GUÍA</h2>
                  <button onClick={copyPageLink}>{copied ? "✓ Enlace copiado" : copyError ? "Intentar de nuevo" : "↗ Copiar enlace"}</button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <footer className="site-footer">
        <div className="footer-top" id="footer">
          <div className="footer-brand">
            <a className="brand footer-logo" href="#"><span className="brand-mark"><span>H</span><i>+</i></span><span className="brand-wordmark">HOSPITALITO<small>GESTIÓN DE INVENTARIO</small></span></a>
            <p>Recursos claros para una gestión de salud más cercana y organizada.</p>
          </div>
          <div className="footer-column"><strong>EXPLORA</strong><a href="#panorama">Gestión</a><a href="#herramientas">Tecnología</a><a href="#organizacion">Buenas prácticas</a></div>
          <div className="footer-column"><strong>HOSPITALITO</strong><a href="#equipo">Nuestra propuesta</a><a href="#boletin">Novedades</a><a href="mailto:hola@hospitalito.example">Contáctanos</a></div>
          <div className="footer-note"><span>✳</span><p>Mejor organizados.<br /><strong>Más cerca de cuidar.</strong></p></div>
        </div>
        <div className="footer-bottom"><span>© 2026 Gestión de inventario Hospitalito</span><span>Hecho para quienes cuidan.</span></div>
      </footer>
    </>
  );
}
