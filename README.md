# Aether Star Online — open assets

Characters, monsters and maps for [Aether Star Online](https://aetherstaronline.com), a
fantasy MMO inspired by great games of the past like Phantasy [redacted], Final [redacted]
[redacted], Ultima [redacted] and Ragna[dacted]. (Lawyers, if you are reading this: we are just
big fans.) This repository is where 3D artists, level builders and other contributors can add to
the game's world without needing the game's source.

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

## Game lore and mechanics

### The world that was

Long before the walled towns and the green quiet, an age of terrible cleverness learned that the
world had neighbours. Beyond a thin wall lay other dimensions, each humming with a different
essence: fire, tide, stone, storm, starlight and darker things. They named what leaked through
**aether**, learned to draw it, and fed it to their machines. It worked. It worked so well that
they drew more, and more, and never once asked what the wall was made of.

Every draught thins the wall you draw it through.

The wall tore. Wild essence and hungry things poured in, and the clever age was the first thing
swept away. What you walk on now is not the world that fell. It is what grew back: rebuilt towns,
free cities, fenced rift-scars, people who can bend one element and a peace held together by
treaties and forgetting. Somewhere under all of it, the old wound is stirring again. Readings are
climbing, and not by accident.

And what about you? Are you here to help, or to harm? Will you restore the balance of the world,
or tear the hole open for good?

### Aether, elements and a world that changes

There are eight elements, and each has a home dimension you can reach if you find the right
guardian. Harvesting essence tips the world's balance toward that element. Push it far enough and
the world itself answers: warnings first, then a **Rift**, when something tears through and every
player on the server has a reason to show up. The maps change with the balance too, so a road you
knew can be on fire, or under ice, the next time you walk it. Attune to an element and it becomes
part of how you fight; **burn** aether past what is natural and you can reshape reality for a
while, at a cost the world pays with you.

### You are never alone

Parties are the heart of it. Content is tuned so a party wins where a solo hero of the same level
does not, and there is always someone to party with because you can **form a party with your own
other characters**. Bring your alts along as companions, set each one's stance (**Tank**,
**Supporter** or **Attacker**) and they fight beside you with their own skills, follow you through
portals, and get knocked out and revived like anyone else. Real players slot into the same party
the same way. Mercenaries fill the gaps.

### Moving through the world

The world is vertical. Islands float, cliffs matter, and getting somewhere is a skill in itself.
**Float** lets you glide off a ledge and land somewhere the road does not go; **Ground Control**
raises the earth under you into a pillar so you can reach what was above you a moment ago; other
skills leap, blink and fold space. Portals gate on what you have done, not just where you are.

### And the rest

Jobs that branch and combine, a skill constellation to chart, cards that drop from monsters and
sit in an album with permanent bonuses, a forge for refining gear, a player market, elemental
dungeons twelve floors deep, and a story told by someone who has been watching for a very long
time. It is silly in places on purpose. The training dummy has opinions.
