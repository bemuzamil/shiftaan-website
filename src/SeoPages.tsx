import { ComponentType, ReactNode } from "react";
import { seoPages, hubs, tools, companyLinks, cityLinks, roleLinks, compareLinks, toolLinks, seoMeta } from "./seo.js";
import { toolComponents } from "./Tools";
import { IconArrowRight } from "./icons";

// Renders the SEO landing pages defined in src/seo.js. Layout and Final come
// from App.tsx as props so this file doesn't import App (no circular import).
type Shell = { Layout: ComponentType<{ children: ReactNode }>; Final: ComponentType };

const Html = ({ html, as: Tag = "p" }: { html: string; as?: any }) => <Tag dangerouslySetInnerHTML={{ __html: html }} />;
const titleFor = (p: string) => (seoMeta as any)[p]?.title.split(" | ")[0].split(":")[0] || p;

function Hero({ tag, h1, intro, crumbs }: { tag: string; h1: string; intro: string; crumbs?: [string, string][] }) {
  return <section className="pagehero seohero"><div className="wrap">
    {crumbs && <nav className="crumbs" aria-label="Breadcrumb">{crumbs.map(([href, label], i) => <span key={href}>{i > 0 && " / "}<a href={href}>{label}</a></span>)}</nav>}
    <span className="eyebrow">{tag}</span><h1>{h1}</h1><p>{intro}</p>
  </div></section>;
}

function Sections({ sections }: { sections: { h: string; p?: string[]; ul?: string[] }[] }) {
  return <>{sections.map((s, i) => <section key={i}>
    {s.h && <h2>{s.h}</h2>}
    {s.p?.map((x, j) => <Html key={j} html={x} />)}
    {s.ul && <ul>{s.ul.map((x, j) => <Html key={j} as="li" html={x} />)}</ul>}
  </section>)}</>;
}

function Faqs({ faqs }: { faqs?: string[][] }) {
  if (!faqs?.length) return null;
  return <section><h2>Common questions</h2>{faqs.map(([q, a]) => <details key={q} className="seofaq"><summary>{q}</summary><p>{a}</p></details>)}</section>;
}

function Related({ paths }: { paths?: string[] }) {
  if (!paths?.length) return null;
  return <section className="section soft"><div className="wrap"><h2 className="relatedtitle">Related</h2><div className="linkgrid">{paths.map(p => <a key={p} href={p}><b>{titleFor(p)}</b><span>Read more <IconArrowRight size={14} /></span></a>)}</div></div></section>;
}

const hubFor = (p: string): [string, string] =>
  p.startsWith("/companies/") ? ["/companies", "Company guides"] : p.startsWith("/compare/") ? ["/compare", "Compare"] : p.startsWith("/tools/") ? ["/tools", "Free tools"] : ["/pay", "Pay guides"];

function Guide({ path, Layout, Final }: { path: string } & Shell) {
  const g = (seoPages as any)[path];
  return <Layout>
    <Hero tag={g.tag} h1={g.h1} intro={g.intro} crumbs={[["/", "Home"], hubFor(path)]} />
    <article className="prose seoprose"><Sections sections={g.sections} /><Faqs faqs={g.faqs} /></article>
    <Related paths={g.related} />
    <Final />
  </Layout>;
}

function ToolPage({ path, Layout, Final }: { path: string } & Shell) {
  const t = (tools as any)[path];
  const Tool = toolComponents[path];
  return <Layout>
    <Hero tag="Free tool" h1={t.h1} intro={t.intro} crumbs={[["/", "Home"], ["/tools", "Free tools"]]} />
    <section className="toolwrap"><div className="wrap"><Tool /></div></section>
    <article className="prose seoprose"><Sections sections={t.explain} /><p className="toolnote">This tool gives an estimate based on UK rules as of October 2026. It isn't legal or tax advice.</p></article>
    <Related paths={toolLinks.map(([p]) => p).filter(p => p !== path).slice(0, 3)} />
    <Final />
  </Layout>;
}

function LinkGrid({ links }: { links: string[][] }) {
  return <div className="linkgrid">{links.map(([href, label, sub]) => <a key={href} href={href}><b>{label}</b>{sub && <small>{sub}</small>}<span>Open <IconArrowRight size={14} /></span></a>)}</div>;
}

function Hub({ path, Layout, Final }: { path: string } & Shell) {
  const h = (hubs as any)[path];
  const body: Record<string, ReactNode> = {
    "/tools": <LinkGrid links={toolLinks} />,
    "/companies": <LinkGrid links={companyLinks} />,
    "/pay": <><h2 className="relatedtitle">By city</h2><LinkGrid links={cityLinks} /><h2 className="relatedtitle spaced">By role</h2><LinkGrid links={roleLinks} /></>,
    "/compare": <LinkGrid links={compareLinks} />,
  };
  return <Layout>
    <Hero tag={h.tag} h1={h.h1} intro={h.intro} />
    <section className="section hubsection"><div className="wrap">{body[path]}</div></section>
    <Final />
  </Layout>;
}

export const isSeoRoute = (p: string) => p in seoMeta;

export function SeoRoute({ path, Layout, Final }: { path: string } & Shell) {
  if (path in hubs) return <Hub path={path} Layout={Layout} Final={Final} />;
  if (path in tools) return <ToolPage path={path} Layout={Layout} Final={Final} />;
  return <Guide path={path} Layout={Layout} Final={Final} />;
}
