#!/usr/bin/env node
// validate.mjs — structural checks for this repo (MIT, see LICENSE-SCRIPTS).
//   node tools/validate.mjs        exit 1 on any error
// Checks: every characters/*/ has character.json + the GLB it names; every monsters/*/ has
// monster.json + entity.json + the GLB; entity.model equals the manifest id; every maps/*/ has
// map.json whose id equals the folder name and whose terrain raws exist; required clips present.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];
const err = (m) => errors.push(m);
const readJson = (p) => { try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch (e) { err(`${rel(p)}: ${e.message}`); return null; } };
const rel = (p) => path.relative(root, p).replaceAll('\\', '/');
const dirs = (p) => (fs.existsSync(p) ? fs.readdirSync(p, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => path.join(p, d.name)) : []);

function checkAsset(dir, file, kind, requiredClips) {
  const p = path.join(dir, file);
  if (!fs.existsSync(p)) { err(`${rel(dir)}: missing ${file}`); return null; }
  const a = readJson(p); if (!a) return null;
  if (!/^[a-z][a-z0-9_]*$/.test(a.id ?? '')) err(`${rel(p)}: id must be lowercase snake_case`);
  if (a.type !== 'character') err(`${rel(p)}: type must be "character" (the game's word for any animated body)`);
  if (!a.path || !fs.existsSync(path.join(dir, a.path))) err(`${rel(p)}: path "${a.path}" does not exist in the folder`);
  if (a.path && !a.path.endsWith('.game-ready.glb')) err(`${rel(p)}: path must be the game-ready GLB, not a raw export`);
  if (a.source && !fs.existsSync(path.join(dir, a.source))) err(`${rel(p)}: source "${a.source}" does not exist`);
  const roles = new Set((a.clips ?? []).map((c) => String(c).split(':')[0]));
  for (const r of requiredClips) if (!roles.has(r)) err(`${rel(p)}: clips need a "${r}:…" entry`);
  if (typeof a.defaultScale !== 'number') err(`${rel(p)}: defaultScale must be a number`);
  const glb = a.path ? path.join(dir, a.path) : null;
  if (glb && fs.existsSync(glb) && fs.statSync(glb).size > 50 * 1024 * 1024) err(`${rel(glb)}: over 50 MB`);
  return a;
}

for (const dir of dirs(path.join(root, 'characters'))) checkAsset(dir, 'character.json', 'character', ['idle', 'walk', 'run', 'attack', 'death']);

for (const dir of dirs(path.join(root, 'monsters'))) {
  const a = checkAsset(dir, 'monster.json', 'monster', ['idle', 'walk', 'attack', 'death']);
  const ep = path.join(dir, 'entity.json');
  if (!fs.existsSync(ep)) { err(`${rel(dir)}: missing entity.json`); continue; }
  const e = readJson(ep); if (!e) continue;
  if (!/^ent_[a-z0-9_]+$/.test(e.id ?? '')) err(`${rel(ep)}: id must be ent_…`);
  if (a && e.model !== a.id) err(`${rel(ep)}: model "${e.model}" must equal monster.json id "${a.id}"`);
  for (const k of ['name', 'stats', 'ai']) if (!(k in e)) err(`${rel(ep)}: missing "${k}"`);
  if (a?.ai && !fs.existsSync(path.join(dir, a.ai))) err(`${rel(dir)}: monster.json names ai "${a.ai}" which does not exist`);
}

for (const dir of dirs(path.join(root, 'maps'))) {
  const mp = path.join(dir, 'map.json');
  if (!fs.existsSync(mp)) { err(`${rel(dir)}: missing map.json`); continue; }
  const m = readJson(mp); if (!m) continue;
  if (m.id !== path.basename(dir)) err(`${rel(mp)}: id "${m.id}" must equal the folder name`);
  if (!/^map_[a-z0-9_]+$/.test(m.id ?? '')) err(`${rel(mp)}: id must be map_…`);
  if (!m.name) err(`${rel(mp)}: missing name`);
  if (!m.shape && !m.terrain) err(`${rel(mp)}: needs shape (hex/rect) or terrain`);
  for (const k of ['heightmap', 'splat', 'mask']) {
    const v = m.terrain?.[k];
    if (v && !fs.existsSync(path.join(dir, v))) err(`${rel(mp)}: terrain.${k} "${v}" does not exist under the map folder`);
  }
}

for (const e of errors) console.error('ERROR ' + e);
console.log(errors.length ? `${errors.length} error(s)` : 'ok');
process.exit(errors.length ? 1 : 0);
