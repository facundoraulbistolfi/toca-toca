#!/usr/bin/env node

import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const UNICODE_VERSION = "15.1";
const EMOJI_TEST_URL = `https://unicode.org/Public/emoji/${UNICODE_VERSION}/emoji-test.txt`;
const CLDR_SOURCES = {
  en: [
    "https://raw.githubusercontent.com/unicode-org/cldr/main/common/annotations/en.xml",
    "https://raw.githubusercontent.com/unicode-org/cldr/main/common/annotationsDerived/en.xml",
  ],
  es: [
    "https://raw.githubusercontent.com/unicode-org/cldr/main/common/annotations/es.xml",
    "https://raw.githubusercontent.com/unicode-org/cldr/main/common/annotationsDerived/es.xml",
  ],
};

const GROUP_LABEL_ES = new Map([
  ["Smileys & Emotion", "Caritas y emocion"],
  ["People & Body", "Personas y cuerpo"],
  ["Component", "Componentes"],
  ["Animals & Nature", "Animales y naturaleza"],
  ["Food & Drink", "Comida y bebida"],
  ["Travel & Places", "Viajes y lugares"],
  ["Activities", "Actividades"],
  ["Objects", "Objetos"],
  ["Symbols", "Simbolos"],
  ["Flags", "Banderas"],
]);

const SUBGROUP_WORD_ES = new Map([
  ["face", "cara"],
  ["emotion", "emocion"],
  ["smiling", "sonriendo"],
  ["affection", "afecto"],
  ["tongue", "lengua"],
  ["hand", "mano"],
  ["hands", "manos"],
  ["person", "persona"],
  ["people", "personas"],
  ["family", "familia"],
  ["animal", "animal"],
  ["plant", "planta"],
  ["food", "comida"],
  ["drink", "bebida"],
  ["dishware", "vajilla"],
  ["fruit", "fruta"],
  ["vehicle", "vehiculo"],
  ["transport", "transporte"],
  ["map", "mapa"],
  ["time", "tiempo"],
  ["place", "lugar"],
  ["sport", "deporte"],
  ["game", "juego"],
  ["event", "evento"],
  ["award", "premio"],
  ["clothing", "ropa"],
  ["money", "dinero"],
  ["mail", "correo"],
  ["office", "oficina"],
  ["computer", "computadora"],
  ["light", "luz"],
  ["religion", "religion"],
  ["zodiac", "zodiaco"],
  ["warning", "advertencia"],
  ["arrow", "flecha"],
  ["math", "matematica"],
  ["punctuation", "puntuacion"],
  ["flag", "bandera"],
  ["country", "pais"],
  ["subdivision", "subdivision"],
]);

const XML_ENTITIES = new Map([
  ["amp", "&"],
  ["lt", "<"],
  ["gt", ">"],
  ["quot", '"'],
  ["apos", "'"],
]);

async function main() {
  const [emojiTestRaw, enAnnotations, esAnnotations] = await Promise.all([
    fetchText(EMOJI_TEST_URL),
    loadAnnotations(CLDR_SOURCES.en),
    loadAnnotations(CLDR_SOURCES.es),
  ]);

  const parsed = parseEmojiTest(emojiTestRaw);
  const clusters = buildCanonicalClusters(parsed.entries);
  const catalog = buildCatalog({
    unicodeVersion: UNICODE_VERSION,
    groupsOrder: parsed.groupsOrder,
    subgroupOrderByGroup: parsed.subgroupOrderByGroup,
    clusters,
    annotationsEn: enAnnotations,
    annotationsEs: esAnnotations,
  });

  const outputPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "emoji-catalog.js");
  await writeCatalogFile(outputPath, catalog);

  const totalGroups = catalog.groups.length;
  const totalSubgroups = catalog.groups.reduce((acc, group) => acc + group.subgroups.length, 0);
  const totalEmojis = Object.keys(catalog.emojiMap).length;
  console.log(`Catalog generated at ${outputPath}`);
  console.log(`Groups: ${totalGroups} | Subgroups: ${totalSubgroups} | Canonical emojis: ${totalEmojis}`);
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "toca-toca-emoji-catalog-generator",
      Accept: "text/plain,application/xml;q=0.9,*/*;q=0.8",
    },
  });
  if (!response.ok) {
    throw new Error(`Request failed (${response.status}) for ${url}`);
  }
  return response.text();
}

function parseEmojiTest(rawText) {
  const entries = [];
  const groupsOrder = [];
  const subgroupOrderByGroup = new Map();
  let currentGroup = "";
  let currentSubgroup = "";

  rawText.split(/\r?\n/).forEach((line) => {
    if (!line) {
      return;
    }

    if (line.startsWith("# group:")) {
      currentGroup = line.replace("# group:", "").trim();
      if (!groupsOrder.includes(currentGroup)) {
        groupsOrder.push(currentGroup);
      }
      if (!subgroupOrderByGroup.has(currentGroup)) {
        subgroupOrderByGroup.set(currentGroup, []);
      }
      return;
    }

    if (line.startsWith("# subgroup:")) {
      currentSubgroup = line.replace("# subgroup:", "").trim();
      if (!currentGroup) {
        return;
      }
      const subgroups = subgroupOrderByGroup.get(currentGroup) || [];
      if (!subgroups.includes(currentSubgroup)) {
        subgroups.push(currentSubgroup);
      }
      subgroupOrderByGroup.set(currentGroup, subgroups);
      return;
    }

    if (!line.includes(";")) {
      return;
    }

    const match = line.match(/^\s*([0-9A-F ]+)\s*;\s*([^#]+?)\s*#\s*(\S+)\s+E[0-9.]+\s+(.+)$/u);
    if (!match) {
      return;
    }

    const status = match[2].trim();
    if (status !== "fully-qualified") {
      return;
    }

    const emoji = match[3].trim();
    if (!emoji) {
      return;
    }

    const codePoints = match[1]
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((hex) => Number.parseInt(hex, 16));

    entries.push({
      index: entries.length,
      emoji,
      codePoints,
      nameEn: match[4].trim(),
      groupEn: currentGroup || "Other",
      subgroupEn: currentSubgroup || "other",
    });
  });

  return { entries, groupsOrder, subgroupOrderByGroup };
}

async function loadAnnotations(urls) {
  const chunks = await Promise.all(urls.map((url) => fetchText(url)));
  const merged = new Map();
  chunks.forEach((xmlText) => {
    const parsed = parseAnnotationXml(xmlText);
    parsed.forEach((value, emoji) => {
      const current = merged.get(emoji) || { tts: "", aliases: [] };
      if (!current.tts && value.tts) {
        current.tts = value.tts;
      }
      current.aliases = uniqStrings([...current.aliases, ...value.aliases]);
      merged.set(emoji, current);
    });
  });
  return merged;
}

function parseAnnotationXml(xmlText) {
  const map = new Map();
  const annotationRegex = /<annotation\s+([^>]+)>([\s\S]*?)<\/annotation>/g;
  let match = annotationRegex.exec(xmlText);

  while (match) {
    const attrs = parseXmlAttributes(match[1]);
    const emoji = attrs.cp ? decodeXmlEntities(attrs.cp) : "";
    if (!emoji) {
      match = annotationRegex.exec(xmlText);
      continue;
    }

    const rawBody = decodeXmlEntities(match[2]).replace(/\s+/g, " ").trim();
    if (!rawBody) {
      match = annotationRegex.exec(xmlText);
      continue;
    }

    const current = map.get(emoji) || { tts: "", aliases: [] };
    if (attrs.type === "tts") {
      current.tts = rawBody;
    } else {
      const aliases = rawBody
        .split("|")
        .map((part) => part.trim())
        .filter(Boolean);
      current.aliases = uniqStrings([...current.aliases, ...aliases]);
    }

    map.set(emoji, current);
    match = annotationRegex.exec(xmlText);
  }

  return map;
}

function parseXmlAttributes(raw) {
  const attrs = {};
  raw.replace(/([\w:-]+)="([^"]*)"/g, (_full, key, value) => {
    attrs[key] = value;
    return "";
  });
  return attrs;
}

function decodeXmlEntities(value) {
  return value.replace(/&(#x?[0-9A-Fa-f]+|\w+);/g, (_full, entity) => {
    if (XML_ENTITIES.has(entity)) {
      return XML_ENTITIES.get(entity) || "";
    }
    if (entity.startsWith("#x") || entity.startsWith("#X")) {
      const codePoint = Number.parseInt(entity.slice(2), 16);
      return Number.isFinite(codePoint) ? String.fromCodePoint(codePoint) : "";
    }
    if (entity.startsWith("#")) {
      const codePoint = Number.parseInt(entity.slice(1), 10);
      return Number.isFinite(codePoint) ? String.fromCodePoint(codePoint) : "";
    }
    return `&${entity};`;
  });
}

function buildCanonicalClusters(entries) {
  const clusters = new Map();

  entries.forEach((entry) => {
    const key = buildCanonicalKey(entry.codePoints);
    const current = clusters.get(key) || { key, entries: [], minIndex: Number.POSITIVE_INFINITY };
    current.entries.push(entry);
    current.minIndex = Math.min(current.minIndex, entry.index);
    clusters.set(key, current);
  });

  const ordered = Array.from(clusters.values());
  ordered.sort((a, b) => a.minIndex - b.minIndex);

  return ordered.map((cluster) => {
    const ranked = [...cluster.entries].sort((a, b) => {
      const scoreA = canonicalCandidateScore(a);
      const scoreB = canonicalCandidateScore(b);
      if (scoreA !== scoreB) {
        return scoreB - scoreA;
      }
      return a.index - b.index;
    });
    return {
      ...cluster,
      canonical: ranked[0],
      variants: ranked.slice(1),
    };
  });
}

function buildCanonicalKey(codePoints) {
  const filtered = [];

  for (let i = 0; i < codePoints.length; i += 1) {
    const cp = normalizeGenderedPersonCodePoint(codePoints[i]);
    const next = codePoints[i + 1];

    if (cp === 0x200d && isCanonicalRemoval(next)) {
      continue;
    }
    if (isCanonicalRemoval(cp)) {
      continue;
    }
    filtered.push(cp);
  }

  while (filtered.length > 0 && filtered[0] === 0x200d) {
    filtered.shift();
  }
  while (filtered.length > 0 && filtered[filtered.length - 1] === 0x200d) {
    filtered.pop();
  }

  const stable = filtered.length > 0 ? filtered : codePoints.filter((cp) => !isVariationSelector(cp));
  return stable.map((cp) => cp.toString(16)).join("-");
}

function isCanonicalRemoval(codePoint) {
  return isVariationSelector(codePoint) || isSkinToneModifier(codePoint) || isGenderSign(codePoint);
}

function isVariationSelector(codePoint) {
  return codePoint === 0xfe0e || codePoint === 0xfe0f;
}

function isSkinToneModifier(codePoint) {
  return codePoint >= 0x1f3fb && codePoint <= 0x1f3ff;
}

function isGenderSign(codePoint) {
  return codePoint === 0x2640 || codePoint === 0x2642;
}

function canonicalCandidateScore(entry) {
  const cps = entry.codePoints;
  const hasGender = cps.some((cp) => isGenderSign(cp));
  const hasSkinTone = cps.some((cp) => isSkinToneModifier(cp));
  const hasNeutralPerson = cps.includes(0x1f9d1) || cps.includes(0x1f9d2);

  let score = 0;
  if (hasNeutralPerson) {
    score += 100;
  }
  if (!hasGender) {
    score += 20;
  }
  if (!hasSkinTone) {
    score += 10;
  }
  return score;
}

function normalizeGenderedPersonCodePoint(codePoint) {
  if (codePoint === 0x1f468 || codePoint === 0x1f469) {
    return 0x1f9d1; // person
  }
  if (codePoint === 0x1f466 || codePoint === 0x1f467) {
    return 0x1f9d2; // child
  }
  return codePoint;
}

function buildCatalog({ unicodeVersion, groupsOrder, subgroupOrderByGroup, clusters, annotationsEn, annotationsEs }) {
  const groupBuckets = new Map();

  groupsOrder.forEach((groupEn) => {
    const subgroupOrder = subgroupOrderByGroup.get(groupEn) || [];
    const subgroupBuckets = new Map();
    subgroupOrder.forEach((subgroupEn) => subgroupBuckets.set(subgroupEn, []));
    groupBuckets.set(groupEn, subgroupBuckets);
  });

  const canonicalRecords = clusters.map((cluster) => {
    const canonical = cluster.canonical;
    const canonicalAnnEn = getAnnotationForEmoji(annotationsEn, canonical.emoji);
    const canonicalAnnEs = getAnnotationForEmoji(annotationsEs, canonical.emoji);
    const canonicalEn = pickName(canonicalAnnEn, canonical.nameEn);
    const canonicalEs = pickName(canonicalAnnEs, canonicalEn);

    const aliasesEn = [];
    const aliasesEs = [];

    const collectAliasesFor = (entry) => {
      const annEn = getAnnotationForEmoji(annotationsEn, entry.emoji);
      const annEs = getAnnotationForEmoji(annotationsEs, entry.emoji);

      if (entry.emoji !== canonical.emoji) {
        aliasesEn.push(entry.nameEn);
        if (annEn?.tts) {
          aliasesEn.push(annEn.tts);
        }
        if (annEs?.tts) {
          aliasesEs.push(annEs.tts);
        }
      }

      if (annEn?.aliases) {
        aliasesEn.push(...annEn.aliases);
      }
      if (annEs?.aliases) {
        aliasesEs.push(...annEs.aliases);
      }
    };

    collectAliasesFor(canonical);
    cluster.variants.forEach((variant) => collectAliasesFor(variant));

    const cleanAliasesEn = uniqStrings(
      aliasesEn.filter((value) => normalizeSearch(value) !== normalizeSearch(canonicalEn)),
    );
    const cleanAliasesEs = uniqStrings(
      aliasesEs.filter((value) => normalizeSearch(value) !== normalizeSearch(canonicalEs)),
    );

    return {
      emoji: canonical.emoji,
      en: canonicalEn,
      es: canonicalEs,
      aliasesEn: cleanAliasesEn,
      aliasesEs: cleanAliasesEs,
      groupEn: canonical.groupEn,
      subgroupEn: canonical.subgroupEn,
      order: cluster.minIndex,
    };
  });

  canonicalRecords.forEach((record) => {
    const subgroupBuckets = groupBuckets.get(record.groupEn);
    if (!subgroupBuckets) {
      return;
    }
    if (!subgroupBuckets.has(record.subgroupEn)) {
      subgroupBuckets.set(record.subgroupEn, []);
    }
    subgroupBuckets.get(record.subgroupEn).push(record);
  });

  const groups = [];
  const emojiMap = {};

  groupsOrder.forEach((groupEn) => {
    const groupId = slugify(groupEn);
    const groupLabelEs = GROUP_LABEL_ES.get(groupEn) || groupEn;
    const subgroupBuckets = groupBuckets.get(groupEn) || new Map();
    const subgroupOrder = subgroupOrderByGroup.get(groupEn) || [];

    const subgroupLabels = uniqStrings([...subgroupOrder, ...Array.from(subgroupBuckets.keys())]);
    const subgroups = [];

    subgroupLabels.forEach((subgroupEn) => {
      const records = subgroupBuckets.get(subgroupEn) || [];
      if (records.length === 0) {
        return;
      }

      records.sort((a, b) => a.order - b.order);

      const subgroupId = `${groupId}--${slugify(subgroupEn)}`;
      const subgroupLabelEs = translateSubgroupToSpanish(subgroupEn);
      const items = records.map((record) => record.emoji);

      records.forEach((record) => {
        const searchable = normalizeSearch(
          [
            record.emoji,
            record.en,
            record.es,
            ...record.aliasesEn,
            ...record.aliasesEs,
            groupEn,
            groupLabelEs,
            subgroupEn,
            subgroupLabelEs,
            groupId,
            subgroupId,
          ].join(" "),
        );

        emojiMap[record.emoji] = {
          emoji: record.emoji,
          en: record.en,
          es: record.es,
          aliasesEn: record.aliasesEn,
          aliasesEs: record.aliasesEs,
          groupId,
          subgroupId,
          groupLabelEn: groupEn,
          groupLabelEs,
          subgroupLabelEn: subgroupEn,
          subgroupLabelEs,
          searchable,
        };
      });

      subgroups.push({
        id: subgroupId,
        labelEn: subgroupEn,
        labelEs: subgroupLabelEs,
        items,
      });
    });

    if (subgroups.length === 0) {
      return;
    }

    groups.push({
      id: groupId,
      labelEn: groupEn,
      labelEs: groupLabelEs,
      subgroups,
    });
  });

  return {
    version: 1,
    unicodeVersion,
    generatedAt: new Date().toISOString(),
    groups,
    emojiMap,
  };
}

function pickName(annotation, fallback) {
  if (annotation?.tts && annotation.tts.trim()) {
    return annotation.tts.trim();
  }
  return (fallback || "").trim();
}

function normalizeSearch(value) {
  if (typeof value !== "string") {
    return "";
  }
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’']/g, "")
    .replace(/[^\p{L}\p{N}\s#*]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getAnnotationForEmoji(map, emoji) {
  const direct = map.get(emoji);
  if (direct) {
    return direct;
  }
  const normalized = normalizeAnnotationKey(emoji);
  if (!normalized || normalized === emoji) {
    return null;
  }
  return map.get(normalized) || null;
}

function normalizeAnnotationKey(emoji) {
  if (typeof emoji !== "string") {
    return "";
  }
  return emoji.replace(/[\uFE0E\uFE0F]/g, "");
}

function uniqStrings(values) {
  const out = [];
  const seen = new Set();

  values.forEach((value) => {
    if (typeof value !== "string") {
      return;
    }
    const trimmed = value.trim();
    if (!trimmed) {
      return;
    }
    const key = normalizeSearch(trimmed);
    if (!key || seen.has(key)) {
      return;
    }
    seen.add(key);
    out.push(trimmed);
  });

  return out;
}

function slugify(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function translateSubgroupToSpanish(labelEn) {
  const tokens = labelEn
    .split(/([\s\-\/&]+)/)
    .map((token) => {
      if (/^[\s\-\/&]+$/.test(token)) {
        return token;
      }
      const lower = token.toLowerCase();
      return SUBGROUP_WORD_ES.get(lower) || token;
    })
    .join("")
    .trim();

  return tokens || labelEn;
}

async function writeCatalogFile(outputPath, catalog) {
  const content = `/* eslint-disable */\n// Auto-generated by scripts/generate-emoji-catalog.mjs\nwindow.TOCA_TOCA_EMOJI_CATALOG = ${JSON.stringify(catalog, null, 2)};\n`;
  await writeFile(outputPath, content, "utf8");
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
