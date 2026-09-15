# Contributing

Read `README.md` first — "The deal" is the licence, and by opening a pull request you confirm
that everything in it is your own work (or public domain / CC0 already) and that you dedicate it
to the public domain under CC0 1.0.

## Folder contracts

### A character — `characters/<Name>/`

| File | What |
| --- | --- |
| `character.json` | the asset manifest entry the game reads: `id` (lowercase, `char_…`), `type: "character"`, `path` (the game-ready GLB, relative to this folder), `clips` (`"role:Clip Name"` pairs — `idle`, `walk`, `run`, `attack`, `death` are required), `defaultScale`, `loop` |
| `<name>.game-ready.glb` | the shipped model: ≤ 8k triangles, ≤ 1024px textures. **Textures inside must be PNG or JPEG** (the Forge decodes those directly). The game's own pipeline emits WebP here plus a `.u.glb` twin (KTX2 textures) for Unity; if your GLB uses WebP you must also provide that `<name>.game-ready.u.glb` twin or it renders as a placeholder capsule |
| `<name>.raw.glb` | your source export with the mesh and every animation clip, so it can be re-optimized later |

### A monster — `monsters/<Name>/`

| File | What |
| --- | --- |
| `monster.json` | the asset manifest entry, as above (`id` may be `beast_…`, `critter_…`, `dino_…`, …) |
| `entity.json` | the monster definition: `id` (`ent_…`), `name`, `model` (= the manifest id), `scale`, `stats`, `ai`, `skills`, `xp`, `essence`, `loot`. Copy `monsters/Forest_Wolf/entity.json` and change the numbers. Skill and item ids must exist in the game; if you are inventing a monster with no loot, use an empty `loot: []` |
| `ai.json` | optional: a behaviour profile. Reuse one of the shipped ones by name in `entity.json` (`ai_aggressive_beast`, `ai_passive_critter`, …) unless you need new behaviour |
| the GLBs | as for a character; `clips` need `idle`, `walk`, `attack`, `death` |

### A map — `maps/<map_id>/`

| File | What |
| --- | --- |
| `map.json` | the map: `id` (`map_…`, must equal the folder name), `name`, `mapType`, `shape` (`hex` + `radius`, or `rect` + `width`/`height`), `defaults`, `tiles`, `spawns`, `portals`, `playerSpawn`, `ambience`. For an open-world map add `terrain` and the raws below |
| `worlds/<id>/height.r16`, `splat.rgba`, `mask.r8` | terrain raws for `terrain` maps, at the paths `map.json` names |

The easiest way to make a map is the Forge: it can save what you build. Hand-editing `map.json`
works too; `maps/map_test_chamber/map.json` is a complete, small example.

## Rules that get a PR merged

1. **The folder loads in the Forge.** Point it at your clone; your thing must appear in the
   menu and load without an error. `node tools/validate.mjs` checks the structural rules
   (files referenced exist, ids match folder names, required clips present).
2. **Game-ready, not raw.** Never ship a raw export as the game-ready file. Budgets: characters
   ≤ 8k tris / 1024px, monsters ≤ 8k tris, props ≤ 3k tris / 512px. Textures inside the GLB.
3. **The look.** Stylized low-poly, hand-painted textures, vibrant but slightly muted (pull
   saturation back 10–20%), no neon, no photorealism, flat-to-soft shading with painted-in
   ambient occlusion, no metallic/glossy PBR. Silhouettes must read at isometric distance.
   Theme: nature-overrun ancient ruins with subtle high-tech remnants. No undead, no graves —
   "dark" in this world is dark matter and void constructs.
4. **Humanoids use the two canonical bodies.** A new playable character is a head, hair, outfit
   and tints on the shared male or female body, not a new body. Ask in an issue before modelling
   a humanoid from scratch.
5. **One thing per pull request**, named for it (`monsters/Cinder_Bat`), with a screenshot from
   the Forge in the PR description.
6. **File size**: keep any single file under 50 MB. This repo does not use Git LFS on purpose,
   so a plain `git clone` gets everything.

## Credits

Add yourself to `CREDITS.md` in the same PR if you want to be credited. Credit is a courtesy,
not a licence term (CC0 needs none).
