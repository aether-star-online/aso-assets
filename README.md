# Aether Star Online — open assets

Characters, monsters and maps for [Aether Star Online](https://aetherstaronline.com), a
fantasy MMO with a hand-painted Final Fantasy Tactics / Ragnarok Online look. This repository is
where 3D artists, level builders and other contributors can add to the game's world without
needing the game's source.

**Everything in this repository is dedicated to the public domain under CC0 1.0** (see
`LICENSE`). Scripts under `tools/` are MIT (`LICENSE-SCRIPTS`). See "The deal" below before you
contribute — it is short and it matters.

## What is here

```
characters/<Name>/   a playable humanoid: character.json + <name>.game-ready.glb (+ the raw export)
monsters/<Name>/     a monster: monster.json + entity.json (+ ai.json) + the GLBs
maps/<map_id>/       a map: map.json (+ worlds/<id>/ terrain raws for open-world maps)
tools/               validation scripts (MIT)
```

Every folder uses the game's own file formats, byte for byte. Nothing here needs converting: an
approved folder is copied into the game as-is. The JSON files are the same ones the game reads
(`character.json` and `monster.json` are asset manifest entries; `entity.json` is a monster
definition; `map.json` is a map). See `CONTRIBUTING.md` for what each field means and the art
rules.

## Looking at your work: the Forge

The **Aether Star Forge** is a free Windows app (download from this repo's
[Releases](../../releases)) that opens a working folder laid out like this repository, lets you
load any map, walk any character around it, cast skills and spawn monsters — the game's own
renderer, without the game. Clone this repo, point the Forge at the clone, and everything in
`characters/`, `monsters/` and `maps/` appears in its menus. Edit a file, reload, look again.

The Forge itself is not open source; only its binary is published here.

## The deal

- **You give:** art and data you made, or have the right to give, dedicated to the public domain
  (CC0). Anyone, including Aether Star Online and including you, may use it for anything,
  commercially or privately, with or without credit.
- **You get:** your work in a real game, and a credit in `CREDITS.md` if you want one.
- **You do not get:** any right, licence or claim in Aether Star Online itself. The game, its
  code, its name, its story and its other assets are proprietary and separate from this
  repository. Contributing here grants nothing in the game, and the game may use, change, keep
  private, or stop using anything from here at any time.

If that does not work for you, please do not contribute. If it does: welcome.

## Art direction, in one line

Stylized low-poly with hand-painted textures, vibrant but slightly muted colours, clean
silhouettes readable at isometric distance, no photorealism, no PBR gloss. Humanoids are built on
two canonical bodies. Details in `CONTRIBUTING.md`.
