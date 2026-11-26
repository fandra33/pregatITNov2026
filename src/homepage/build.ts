// Builds the cat homepage into dist/

import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { cats, type Cat } from "./cats.ts";

const out = "dist";
const colors = ["#f4a261", "#2a9d8f", "#e76f51", "#457b9d", "#e9c46a", "#8d99ae"];
const perPage = 20;

function colorIndex(cat: Cat): number {
  return cat.id % colors.length;
}

function picture(fill: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64"><polygon points="10,26 16,4 30,18" fill="${fill}"/><polygon points="54,26 48,4 34,18" fill="${fill}"/><circle cx="32" cy="36" r="24" fill="${fill}"/><circle cx="23" cy="32" r="4" fill="#222"/><circle cx="41" cy="32" r="4" fill="#222"/><polygon points="29,40 35,40 32,44" fill="#222"/><path d="M32 44 Q28 50 24 46 M32 44 Q36 50 40 46" stroke="#222" stroke-width="2" fill="none"/></svg>`;
}

function card(cat: Cat): string {
  const idx = colorIndex(cat);
  return `<article class="card c-${idx}"><img src="img/cat-${idx}.svg" alt="${cat.name}" width="64" height="64"><h3>${cat.name}</h3><p>${cat.quirk}</p><p>naps: <b>${cat.naps}</b> hours a day</p></article>`;
}

function pageFile(pageNum: number): string {
  return pageNum === 1 ? "index.html" : `page-${pageNum}.html`;
}

rmSync(out, { recursive: true, force: true });
mkdirSync(`${out}/img`, { recursive: true });

colors.forEach((fill, idx) => {
  writeFileSync(`${out}/img/cat-${idx}.svg`, picture(fill));
});

const colorStyles = colors
  .map((c, idx) => `.c-${idx}{border-color:${c}}.c-${idx} h3{color:${c}}`)
  .join("");

const totalPages = Math.ceil(cats.length / perPage);

for (let p = 1; p <= totalPages; p++) {
  const slice = cats.slice((p - 1) * perPage, p * perPage);
  const nav = Array.from({ length: totalPages }, (_, i) => {
    const num = i + 1;
    return num === p ? `<b>${num}</b>` : `<a href="${pageFile(num)}">${num}</a>`;
  }).join(" ");

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>The cats - Page ${p}</title>
<style>body{font-family:sans-serif;margin:24px}.grid{display:flex;flex-wrap:wrap;gap:16px}.card{border:2px solid;border-radius:8px;padding:8px;width:260px}nav{margin:16px 0;display:flex;gap:8px}${colorStyles}</style>
</head>
<body>
<h1>The cats</h1>
<nav>${nav}</nav>
<main class="grid">${slice.map(card).join("")}</main>
</body>
</html>`;

  writeFileSync(`${out}/${pageFile(p)}`, html);
}

console.log(`${cats.length} cats across ${totalPages} pages in ${out}/`);