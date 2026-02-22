const CONFIG_VERSION = 1;
const COOKIE_KEY = "tocaTocaConfig";
const STORAGE_KEY = "tocaTocaConfigFallback";
const DEFAULT_SPIN_DURATION_MIN = 5;
const DEFAULT_SPIN_DURATION_MAX = 8;
const MIN_SPIN_DURATION = 1;
const MAX_SPIN_DURATION = 60;
const DEFAULT_TEXT_LAYOUT = "radial";
const TEXT_LAYOUT_VALUES = new Set(["radial", "tangent", "horizontal"]);
const DEFAULT_WHEEL_EMOJI_MODE = "suffix";
const WHEEL_EMOJI_MODE_VALUES = new Set(["both", "prefix", "suffix", "none"]);
const MAX_PARTICIPANT_NAME_LENGTH = 10;
const DEFAULT_TEXT_POSITION_PCT = 54;
const MIN_TEXT_POSITION_PCT = 30;
const MAX_TEXT_POSITION_PCT = 80;
const DEFAULT_FONT_SIZE_PX = 26;
const MIN_FONT_SIZE_PX = 12;
const MAX_FONT_SIZE_PX = 30;
const DEFAULT_FONT_FAMILY_ID = "cinzelDecorative";
const FONT_OPTIONS = [
  { id: "cinzel", label: "Cinzel Clasica", family: "'Cinzel', 'Georgia', 'Times New Roman', serif" },
  {
    id: "cinzelDecorative",
    label: "Cinzel Decorative",
    family: "'Cinzel Decorative', 'Cinzel', 'Georgia', 'Times New Roman', serif",
  },
  {
    id: "barlow",
    label: "Barlow Condensed",
    family: "'Barlow Condensed', 'Montserrat', 'Avenir Next', sans-serif",
  },
  { id: "montserrat", label: "Montserrat", family: "'Montserrat', 'Avenir Next', 'Trebuchet MS', sans-serif" },
  {
    id: "casinoSerif",
    label: "Casino Serif",
    family: "'Cinzel', 'Barlow Condensed', 'Georgia', 'Times New Roman', serif",
  },
  {
    id: "playfairSC",
    label: "Playfair Display SC",
    family: "'Playfair Display SC', 'Cinzel', 'Georgia', 'Times New Roman', serif",
  },
  {
    id: "cormorant",
    label: "Cormorant Garamond",
    family: "'Cormorant Garamond', 'Cinzel', 'Georgia', 'Times New Roman', serif",
  },
  {
    id: "abrilFatface",
    label: "Abril Fatface",
    family: "'Abril Fatface', 'Playfair Display SC', 'Georgia', 'Times New Roman', serif",
  },
  {
    id: "marcellusSC",
    label: "Marcellus SC",
    family: "'Marcellus SC', 'Cinzel', 'Georgia', 'Times New Roman', serif",
  },
  {
    id: "prata",
    label: "Prata",
    family: "'Prata', 'Playfair Display SC', 'Georgia', 'Times New Roman', serif",
  },
  {
    id: "alfaSlab",
    label: "Alfa Slab One",
    family: "'Alfa Slab One', 'Cinzel Decorative', 'Georgia', 'Times New Roman', serif",
  },
];
const FONT_OPTION_MAP = new Map(FONT_OPTIONS.map((option) => [option.id, option]));
const DEFAULT_WINNER_ANIMATION_MODE = "emojiRain";
const WINNER_ANIMATION_OPTIONS = [
  { id: "random", emoji: "🎲", label: "Aleatorio" },
  { id: "emojiRain", emoji: "🌧️", label: "Lluvia de emojis (clasica)" },
  { id: "emojiRainExtreme", emoji: "🌊", label: "Lluvia de emojis (extrema)" },
  { id: "emojiHose", emoji: "🚿", label: "Manguera de emojis" },
  { id: "fuegosArtificiales", emoji: "🎆", label: "Fuegos artificiales" },
  { id: "cartaBlanca", emoji: "🃏", label: "Carta blanca" },
  { id: "emojiBounce", emoji: "🪀", label: "Rebote emoji" },
  { id: "confeti", emoji: "🎉", label: "Confeti" },
  { id: "estrellas", emoji: "✨", label: "Estrellas" },
  { id: "neonPulse", emoji: "⚡", label: "Pulso neon" },
];
const WINNER_ANIMATION_MODE_VALUES = new Set(WINNER_ANIMATION_OPTIONS.map((option) => option.id));
const WINNER_ANIMATION_RANDOM_POOL = WINNER_ANIMATION_OPTIONS
  .map((option) => option.id)
  .filter((id) => id !== "random");
const WINNER_ANIMATION_OPTION_MAP = new Map(
  WINNER_ANIMATION_OPTIONS.map((option) => [option.id, option]),
);
const DEFAULT_PARTICIPANT_ANIMATION_MODE = "general";
const RETRY_SLICE_COLOR_INDEX = -1;
const RETRY_SLICE_LABEL = "Tira otra vez";
const RETRY_SLICE_EMOJI = "🔁";
const DEFAULT_RETRY_SLICE_ENABLED = false;
const DEFAULT_RETRY_SLICE_PCT = 12;
const MIN_RETRY_SLICE_PCT = 1;
const MAX_RETRY_SLICE_PCT = 70;
const DEFAULT_RETRY_SLICE_COLOR = "#6A1E2A";
const DEFAULT_SOUND_MUTED = false;
const ARGENTINA_ANTHEM_AUDIO_URL =
  "https://upload.wikimedia.org/wikipedia/commons/7/77/Himno_Nacional_Argentino_%28instrumental%29.ogg";
const ARGENTINA_ANTHEM_SNIPPET_START_SEC = 0;
const ARGENTINA_ANTHEM_SNIPPET_DURATION_SEC = 12.5;
const ARGENTINA_ANTHEM_SNIPPET_FADE_MS = 560;
const ARGENTINA_ANTHEM_VOLUME = 0.84;
const PARTICIPANT_ANIMATION_OPTIONS = [
  { id: "general", emoji: "🌐", label: "General (usar ajuste global)" },
  ...WINNER_ANIMATION_OPTIONS
    .filter((option) => option.id !== "random")
    .map((option) => ({
      id: option.id,
      emoji: option.emoji,
      label: option.label,
    })),
];
const PARTICIPANT_ANIMATION_MODE_VALUES = new Set(
  PARTICIPANT_ANIMATION_OPTIONS.map((option) => option.id),
);
const PARTICIPANT_ANIMATION_OPTION_MAP = new Map(
  PARTICIPANT_ANIMATION_OPTIONS.map((option) => [option.id, option]),
);
const WINNER_RESULT_EFFECT_CLASSES = [
  "winner-announce",
  "winner-emoji-burst",
  "winner-emoji-hose",
  "winner-carta",
  "winner-emoji-bounce",
  "winner-confeti",
  "winner-estrellas",
  "winner-fireworks",
  "winner-neon",
  "result-failure-retry",
];
const MIN_PARTICIPANTS = 2;
const MAX_PARTICIPANTS = 20;
const TOTAL_UNITS = 10000; // 100.00%
const MIN_ITEM_UNITS = 1; // 0.01%
const TAU = Math.PI * 2;
const CELEBRATION_DROPS = 78;
const SPIN_FINALIZE_PROGRESS = 0.92;
const SPIN_FINALIZE_REMAINING_DEG = 0.35;
const RIM_LIGHTS_COUNT = 84;
const RIM_STANDBY_ROT_SPEED = 0.0004;
const RIM_LIGHT_MODE = {
  STANDBY: "standby",
  SPIN: "spin",
  WINNER: "winner",
};
const BG_RAIN_EMOJIS = ["🍀", "🎰", "🎲", "🎯", "🧿", "✨", "⭐", "🌟", "🔮", "🪙", "🍀", "🎰", "🎲"];
const BG_RAIN_MIN_DELAY_MS = 180;
const BG_RAIN_MAX_DELAY_MS = 340;
const BG_RAIN_MAX_ACTIVE_DROPS = 64;
const DEFAULT_EMOJIS = ["😀", "😎", "🤖", "🔥", "🍀", "🚀", "🎯", "⭐", "⚡", "🌈"];
const AMERICA_REGION_CODES = [
  "AG",
  "AR",
  "BS",
  "BB",
  "BZ",
  "BO",
  "BR",
  "CA",
  "CL",
  "CO",
  "CR",
  "CU",
  "DM",
  "DO",
  "EC",
  "SV",
  "GD",
  "GT",
  "GY",
  "HT",
  "HN",
  "JM",
  "MX",
  "NI",
  "PA",
  "PY",
  "PE",
  "KN",
  "LC",
  "VC",
  "SR",
  "TT",
  "US",
  "UY",
  "VE",
];
const EMOJI_SECTIONS = buildEmojiSections();
const EMOJI_OPTIONS = EMOJI_SECTIONS.flatMap((section) => section.items);
const EMOJI_NAME_INDEX = buildEmojiNameIndex(EMOJI_SECTIONS);
const COLOR_PALETTES = buildColorPalettes();
const DEFAULT_COLOR_PALETTE_ID = COLOR_PALETTES[0]?.id || "vibrante";
const COLOR_PALETTE_MAP = new Map(COLOR_PALETTES.map((palette) => [palette.id, palette]));

const PALETTE = [
  "#D9553B",
  "#F2A65A",
  "#6DA34D",
  "#3D8EA6",
  "#33658A",
  "#8E6C88",
  "#B06B3D",
  "#7A9E9F",
  "#A23E48",
  "#4E7C59",
];

const DEFAULT_PARTICIPANTS = [
  { name: "Facu", color: "#6F9C7F", emoji: "📚" },
  { name: "Dai", color: "#D98F97", emoji: "💄" },
  { name: "Candy", color: "#8ECADA", emoji: "🍬" },
  { name: "Aaron", color: "#EB791E", emoji: "🐈" },
  { name: "El pipi", color: "#2F323A", emoji: "🐈‍⬛" },
];
const CARD_RANKS = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const CARD_SUITS = [
  { symbol: "♠", red: false },
  { symbol: "♥", red: true },
  { symbol: "♦", red: true },
  { symbol: "♣", red: false },
];
const WINNER_EFFECT_PROFILE = buildWinnerEffectProfile();

const refs = {
  wheelCard: document.querySelector(".wheel-card"),
  hero: document.querySelector(".hero"),
  configPanelToggle: document.getElementById("configPanelToggle"),
  soundToggle: document.getElementById("soundToggle"),
  infoPanelToggle: document.getElementById("infoPanelToggle"),
  configPanelClose: document.getElementById("configPanelClose"),
  configPanel: document.getElementById("configPanel"),
  configBackdrop: document.getElementById("configBackdrop"),
  bgEmojiRain: document.getElementById("bgEmojiRain"),
  canvas: document.getElementById("wheelCanvas"),
  pointer: document.getElementById("wheelPointer"),
  resultText: document.getElementById("resultText"),
  emojiRain: document.getElementById("emojiRain"),
  durationLabel: document.getElementById("durationLabel"),
  durationDualSlider: document.querySelector(".duration-dual-slider"),
  durationRangeMin: document.getElementById("durationRangeMin"),
  durationRangeMax: document.getElementById("durationRangeMax"),
  durationMinNumber: document.getElementById("durationMinNumber"),
  durationMaxNumber: document.getElementById("durationMaxNumber"),
  textLayoutSelect: document.getElementById("textLayoutSelect"),
  emojiDisplaySelect: document.getElementById("emojiDisplaySelect"),
  textPositionLabel: document.getElementById("textPositionLabel"),
  textPositionRange: document.getElementById("textPositionRange"),
  fontSizeLabel: document.getElementById("fontSizeLabel"),
  fontSizeRange: document.getElementById("fontSizeRange"),
  fontFamilySelect: document.getElementById("fontFamilySelect"),
  winAnimationSelect: document.getElementById("winAnimationSelect"),
  itemList: document.getElementById("itemList"),
  addItemButton: document.getElementById("addItemButton"),
  resetButton: document.getElementById("resetButton"),
  formMessage: document.getElementById("formMessage"),
  colorModal: document.getElementById("colorModal"),
  colorModalCancel: document.getElementById("colorModalCancel"),
  colorModalConfirm: document.getElementById("colorModalConfirm"),
  colorRandomButton: document.getElementById("colorRandomButton"),
  colorPaletteSelect: document.getElementById("colorPaletteSelect"),
  colorPresetGrid: document.getElementById("colorPresetGrid"),
  colorPreviewSwatch: document.getElementById("colorPreviewSwatch"),
  colorHexValue: document.getElementById("colorHexValue"),
  colorHexInput: document.getElementById("colorHexInput"),
  colorRRange: document.getElementById("colorRRange"),
  colorGRange: document.getElementById("colorGRange"),
  colorBRange: document.getElementById("colorBRange"),
  colorRNumber: document.getElementById("colorRNumber"),
  colorGNumber: document.getElementById("colorGNumber"),
  colorBNumber: document.getElementById("colorBNumber"),
  emojiModal: document.getElementById("emojiModal"),
  emojiModalBurst: document.getElementById("emojiModalBurst"),
  emojiModalCancel: document.getElementById("emojiModalCancel"),
  emojiModalConfirm: document.getElementById("emojiModalConfirm"),
  emojiRandomButton: document.getElementById("emojiRandomButton"),
  emojiSearchInput: document.getElementById("emojiSearchInput"),
  emojiSelectedPreview: document.getElementById("emojiSelectedPreview"),
  emojiNativeInput: document.getElementById("emojiNativeInput"),
  emojiSections: document.getElementById("emojiSections"),
  infoModal: document.getElementById("infoModal"),
  infoModalClose: document.getElementById("infoModalClose"),
  argentinaFlagButton: document.getElementById("argentinaFlagButton"),
  resetConfirmModal: document.getElementById("resetConfirmModal"),
  resetConfirmClose: document.getElementById("resetConfirmClose"),
  resetConfirmAccept: document.getElementById("resetConfirmAccept"),
  resetConfirmCancel: document.getElementById("resetConfirmCancel"),
};

const ctx = refs.canvas?.getContext("2d");
if (!ctx) {
  throw new Error("No se pudo inicializar el canvas de la rula.");
}

let state = loadState();
let currentRotationDeg = 0;
let isSpinning = false;
let celebrationTimeoutId = null;
let activeColorIndex = null;
let activeColorDraft = null;
let activeColorPaletteId = DEFAULT_COLOR_PALETTE_ID;
let activeEmojiIndex = null;
let activeEmojiDraft = null;
let activeSpin = null;
let audioContext = null;
let rimLightMode = RIM_LIGHT_MODE.STANDBY;
let rimWinnerEndTime = 0;
let rimLightAnimationRafId = null;
let bgEmojiRainTimerId = null;
let winnerCardCascadeRafId = null;
let winnerEmojiBounceRafId = null;
let winnerEmojiHoseRafId = null;
let winnerEmojiHoseController = null;
let emojiModalHoseRafId = null;
let emojiModalHoseController = null;
let winnerFireworkTimeoutIds = [];
let trackedCursorX = Number.NaN;
let trackedCursorY = Number.NaN;
let audioWarmupDone = false;
let argentinaAnthemAudio = null;
let argentinaAnthemStopTimeoutId = null;
let argentinaAnthemFadeRafId = null;

init();

function init() {
  initFontSelector();
  initWinnerAnimationSelector();
  initColorModal();
  initEmojiModal();
  bindEvents();
  bindAudioUnlockEvents();
  document.body.classList.remove("theme-light");
  render();
  setRimLightMode(RIM_LIGHT_MODE.STANDBY);
  startBackgroundEmojiRain();
  closeConfigPanel(false);
}

function bindEvents() {
  refs.canvas.addEventListener("click", spinWheel);
  refs.canvas.addEventListener("pointerdown", updateTrackedCursorFromEvent);
  refs.addItemButton.addEventListener("click", addParticipant);
  refs.resetButton.addEventListener("click", openResetConfirmModal);
  refs.configPanelToggle.addEventListener("click", toggleConfigPanel);
  refs.soundToggle.addEventListener("click", () => setSoundMuted(!state.soundMuted));
  refs.infoPanelToggle.addEventListener("click", openInfoModal);
  refs.configPanelClose.addEventListener("click", () => closeConfigPanel(true));
  refs.configBackdrop.addEventListener("click", () => closeConfigPanel(true));

  refs.durationRangeMin.addEventListener("input", () => {
    setSpinDurationMin(refs.durationRangeMin.value);
  });

  refs.durationRangeMax.addEventListener("input", () => {
    setSpinDurationMax(refs.durationRangeMax.value);
  });

  refs.durationMinNumber.addEventListener("input", () => {
    if (refs.durationMinNumber.value === "") {
      return;
    }
    setSpinDurationMin(refs.durationMinNumber.value);
  });

  refs.durationMaxNumber.addEventListener("input", () => {
    if (refs.durationMaxNumber.value === "") {
      return;
    }
    setSpinDurationMax(refs.durationMaxNumber.value);
  });

  refs.durationMinNumber.addEventListener("blur", () => {
    setSpinDurationMin(refs.durationMinNumber.value || state.spinDurationMinSec);
  });

  refs.durationMaxNumber.addEventListener("blur", () => {
    setSpinDurationMax(refs.durationMaxNumber.value || state.spinDurationMaxSec);
  });

  refs.textLayoutSelect.addEventListener("change", () => {
    setTextLayout(refs.textLayoutSelect.value);
  });
  refs.emojiDisplaySelect.addEventListener("change", () => {
    setWheelEmojiMode(refs.emojiDisplaySelect.value);
  });

  refs.textPositionRange.addEventListener("input", () => {
    setTextPosition(refs.textPositionRange.value);
  });

  refs.fontSizeRange.addEventListener("input", () => {
    setFontSize(refs.fontSizeRange.value);
  });
  refs.fontFamilySelect.addEventListener("change", () => {
    setFontFamily(refs.fontFamilySelect.value);
  });
  refs.winAnimationSelect.addEventListener("change", () => {
    setWinnerAnimationMode(refs.winAnimationSelect.value);
  });

  refs.colorModal.addEventListener("click", (event) => {
    if (event.target instanceof HTMLElement && event.target.hasAttribute("data-close-color-modal")) {
      closeColorModal();
    }
  });

  refs.colorModalCancel.addEventListener("click", closeColorModal);
  refs.colorModalConfirm.addEventListener("click", confirmColorModalSelection);
  refs.colorRandomButton.addEventListener("click", pickRandomColorFromPalette);
  refs.colorPaletteSelect.addEventListener("change", () => {
    activeColorPaletteId = sanitizeColorPaletteId(refs.colorPaletteSelect.value);
    renderColorPresetGrid(refs.colorHexValue.textContent);
  });
  refs.colorHexInput.addEventListener("input", () => {
    const normalized = normalizeHexColorInput(refs.colorHexInput.value);
    if (normalized) {
      setColorFromModal(normalized);
    }
  });
  refs.colorHexInput.addEventListener("blur", () => {
    const normalized = normalizeHexColorInput(refs.colorHexInput.value);
    if (normalized) {
      setColorFromModal(normalized);
      return;
    }
    const fallbackColor = activeColorDraft || "#000000";
    refs.colorHexInput.value = fallbackColor.toUpperCase();
  });
  refs.emojiModal.addEventListener("click", (event) => {
    if (event.target instanceof HTMLElement && event.target.hasAttribute("data-close-emoji-modal")) {
      closeEmojiModal();
    }
  });
  refs.emojiModalCancel.addEventListener("click", closeEmojiModal);
  refs.emojiModalConfirm.addEventListener("click", confirmEmojiModalSelection);
  refs.emojiRandomButton.addEventListener("click", pickRandomEmojiFromFilter);
  refs.emojiSelectedPreview.addEventListener("pointerdown", (event) => {
    if (event.button !== 0) {
      return;
    }
    event.preventDefault();
    spawnEmojiModalPreviewHose(activeEmojiDraft || refs.emojiSelectedPreview.textContent, {
      sustainWhilePressed: true,
    });
    refs.emojiNativeInput.focus();
  });
  refs.emojiSelectedPreview.addEventListener("click", () => {
    refs.emojiNativeInput.focus();
  });
  refs.emojiSearchInput.addEventListener("input", () => {
    renderEmojiSections(refs.emojiSearchInput.value);
  });
  refs.emojiNativeInput.addEventListener("input", () => {
    const normalized = sanitizeEmoji(refs.emojiNativeInput.value, activeEmojiIndex ?? 0);
    refs.emojiNativeInput.value = normalized;
    setEmojiFromModal(normalized);
  });
  refs.emojiNativeInput.addEventListener("blur", () => {
    if (activeEmojiIndex === null) {
      return;
    }
    refs.emojiNativeInput.value = sanitizeEmoji(activeEmojiDraft, activeEmojiIndex);
  });
  refs.infoModal.addEventListener("click", (event) => {
    if (event.target instanceof HTMLElement && event.target.hasAttribute("data-close-info-modal")) {
      closeInfoModal();
    }
  });
  refs.infoModalClose.addEventListener("click", closeInfoModal);
  if (refs.argentinaFlagButton instanceof HTMLElement) {
    refs.argentinaFlagButton.addEventListener("click", playArgentinaAnthemSnippet);
  }
  refs.resetConfirmModal.addEventListener("click", (event) => {
    if (event.target instanceof HTMLElement && event.target.hasAttribute("data-close-reset-modal")) {
      closeResetConfirmModal();
    }
  });
  refs.resetConfirmClose.addEventListener("click", closeResetConfirmModal);
  refs.resetConfirmCancel.addEventListener("click", closeResetConfirmModal);
  refs.resetConfirmAccept.addEventListener("click", confirmResetState);
  window.addEventListener("pointerup", requestStopEmojiModalPreviewHose, { passive: true });
  window.addEventListener("pointercancel", requestStopEmojiModalPreviewHose, { passive: true });
  window.addEventListener("blur", requestStopEmojiModalPreviewHose);
  window.addEventListener("pointermove", updateTrackedCursorFromEvent, { passive: true });
  window.addEventListener("touchmove", updateTrackedCursorFromTouchEvent, { passive: true });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !refs.colorModal.hidden) {
      closeColorModal();
      return;
    }
    if (event.key === "Escape" && !refs.emojiModal.hidden) {
      closeEmojiModal();
      return;
    }
    if (event.key === "Escape" && !refs.infoModal.hidden) {
      closeInfoModal();
      return;
    }
    if (event.key === "Escape" && !refs.resetConfirmModal.hidden) {
      closeResetConfirmModal();
      return;
    }
    if (event.key === "Escape") {
      closeConfigPanel(true);
    }
  });
}

function updateTrackedCursorFromEvent(event) {
  if (!event) {
    return;
  }
  const x = Number(event.clientX);
  const y = Number(event.clientY);
  if (!Number.isFinite(x) || !Number.isFinite(y)) {
    return;
  }
  trackedCursorX = x;
  trackedCursorY = y;
}

function updateTrackedCursorFromTouchEvent(event) {
  if (!event || !event.touches || event.touches.length === 0) {
    return;
  }
  const touch = event.touches[0];
  updateTrackedCursorFromEvent(touch);
}

function buildWinnerEffectProfile() {
  const nav = typeof navigator !== "undefined" ? navigator : {};
  const hardware = Number(nav.hardwareConcurrency) || 0;
  const memory = Number(nav.deviceMemory) || 0;
  const reducedMotion =
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let scale = 0.92;
  if (reducedMotion) {
    scale = 0.42;
  } else if ((hardware > 0 && hardware <= 4) || (memory > 0 && memory <= 4)) {
    scale = 0.56;
  } else if ((hardware > 0 && hardware <= 8) || (memory > 0 && memory <= 8)) {
    scale = 0.72;
  }

  return {
    scale,
    heavyGlow: scale >= 0.72 && !reducedMotion,
    extremeBurstCount: clamp(Math.round(240 * scale), 90, 220),
    extremeSizeMin: clamp(Math.round(26 * scale), 18, 28),
    extremeSizeMax: clamp(Math.round(92 * scale), 42, 92),
    extremeDurationMinSec: reducedMotion ? 1.5 : 1.9,
    extremeDurationMaxSec: reducedMotion ? 3.6 : 5.2,
    extremeDelayMaxSec: reducedMotion ? 0.7 : 1.15,
    extremeDriftMax: clamp(Math.round(320 * scale), 150, 300),
    extremeSpinMax: clamp(Math.round(1200 * scale), 520, 1120),
    hoseMaxParticles: clamp(Math.round(260 * scale), 100, 240),
    hoseSpawnRatePerSec: clamp(Math.round(150 * scale), 56, 138),
    hoseSpawnCapPerStep: clamp(Math.round(18 * scale), 8, 16),
    hoseEmissionDurationMs: clamp(Math.round(2600 + 1600 * scale), 2400, 4200),
    hoseLifetimeMs: clamp(Math.round(5200 + 2400 * scale), 5200, 7600),
    hoseSizeMin: clamp(Math.round(22 * scale), 16, 24),
    hoseSizeMax: clamp(Math.round(64 * scale), 34, 64),
    hoseSpeedMin: clamp(Math.round(460 * scale), 260, 430),
    hoseSpeedMax: clamp(Math.round(1160 * scale), 620, 1040),
    hoseFrameIntervalMs: reducedMotion ? 50 : scale < 0.7 ? 42 : 34,
    hoseParticleLifeMinMs: clamp(Math.round(1400 + 800 * scale), 1300, 2200),
    hoseParticleLifeMaxMs: clamp(Math.round(2800 + 1300 * scale), 2500, 3900),
    fireworkBurstMin: reducedMotion ? 5 : clamp(Math.round(6 + scale * 4), 6, 10),
    fireworkBurstMax: reducedMotion ? 8 : clamp(Math.round(9 + scale * 4.5), 9, 13),
    fireworkSparkMin: reducedMotion ? 16 : clamp(Math.round(20 + scale * 12), 20, 30),
    fireworkSparkMax: reducedMotion ? 26 : clamp(Math.round(36 + scale * 22), 34, 56),
    fireworkSparkBudget: reducedMotion ? 170 : clamp(Math.round(260 + scale * 220), 260, 420),
    fireworkLaunchDelayMaxSec: reducedMotion ? 1.35 : 2.15,
    fireworkLaunchDurationMinSec: reducedMotion ? 0.85 : 0.9,
    fireworkLaunchDurationMaxSec: reducedMotion ? 1.08 : 1.28,
    fireworkDistanceMin: reducedMotion ? 130 : clamp(Math.round(150 + scale * 90), 180, 250),
    fireworkDistanceMax: reducedMotion ? 310 : clamp(Math.round(320 + scale * 190), 360, 520),
    fireworkFallMin: reducedMotion ? 62 : clamp(Math.round(70 + scale * 45), 88, 125),
    fireworkFallMax: reducedMotion ? 190 : clamp(Math.round(170 + scale * 120), 200, 290),
    fireworkSparkSizeMin: reducedMotion ? 5 : clamp(Math.round(5 + scale * 3), 7, 9),
    fireworkSparkSizeMax: reducedMotion ? 11 : clamp(Math.round(11 + scale * 8), 13, 18),
    fireworkSparkDurationMinSec: reducedMotion ? 1.3 : 1.75,
    fireworkSparkDurationMaxSec: reducedMotion ? 2.2 : 2.8,
    fireworkSparkDelayMaxSec: reducedMotion ? 0.15 : 0.2,
    fireworkFlashMinPx: reducedMotion ? 130 : 170,
    fireworkFlashMaxPx: reducedMotion ? 220 : 280,
    fireworkMinCelebrationMs: reducedMotion ? 5400 : 7200,
  };
}

function toggleConfigPanel() {
  const isOpen = refs.configPanel.classList.contains("is-open");
  if (isOpen) {
    closeConfigPanel(true);
    return;
  }
  openConfigPanel();
}

function openConfigPanel() {
  refs.configPanel.classList.add("is-open");
  refs.configPanel.setAttribute("aria-hidden", "false");
  refs.configBackdrop.hidden = false;
  refs.configPanelToggle.setAttribute("aria-expanded", "true");
  document.body.classList.add("panel-open");
}

function closeConfigPanel(restoreFocus) {
  refs.configPanel.classList.remove("is-open");
  refs.configPanel.setAttribute("aria-hidden", "true");
  refs.configBackdrop.hidden = true;
  refs.configPanelToggle.setAttribute("aria-expanded", "false");
  document.body.classList.remove("panel-open");
  if (restoreFocus) {
    refs.configPanelToggle.focus();
  }
}

function initFontSelector() {
  refs.fontFamilySelect.replaceChildren();
  FONT_OPTIONS.forEach((option) => {
    const row = document.createElement("option");
    row.value = option.id;
    row.textContent = option.label;
    refs.fontFamilySelect.append(row);
  });
}

function initWinnerAnimationSelector() {
  refs.winAnimationSelect.replaceChildren();
  WINNER_ANIMATION_OPTIONS.forEach((option) => {
    const row = document.createElement("option");
    row.value = option.id;
    row.textContent = `${option.emoji} ${option.label}`;
    refs.winAnimationSelect.append(row);
  });
}

function openInfoModal() {
  refs.infoModal.hidden = false;
  refs.infoPanelToggle.setAttribute("aria-expanded", "true");
}

function closeInfoModal() {
  refs.infoModal.hidden = true;
  refs.infoPanelToggle.setAttribute("aria-expanded", "false");
  stopArgentinaAnthemSnippet(true);
  refs.infoPanelToggle.focus();
}

function openResetConfirmModal() {
  if (isSpinning) {
    return;
  }
  refs.resetConfirmModal.hidden = false;
}

function closeResetConfirmModal() {
  refs.resetConfirmModal.hidden = true;
  refs.resetButton.focus();
}

function confirmResetState() {
  closeResetConfirmModal();
  resetState();
}

function initColorModal() {
  refs.colorPaletteSelect.replaceChildren();
  COLOR_PALETTES.forEach((palette) => {
    const option = document.createElement("option");
    option.value = palette.id;
    option.textContent = palette.label;
    refs.colorPaletteSelect.append(option);
  });
  activeColorPaletteId = sanitizeColorPaletteId(activeColorPaletteId);
  refs.colorPaletteSelect.value = activeColorPaletteId;
  renderColorPresetGrid("#000000");

  bindRgbPair(refs.colorRRange, refs.colorRNumber);
  bindRgbPair(refs.colorGRange, refs.colorGNumber);
  bindRgbPair(refs.colorBRange, refs.colorBNumber);
}

function initEmojiModal() {
  renderEmojiSections("");
}

function sanitizeColorPaletteId(rawValue) {
  if (typeof rawValue === "string" && COLOR_PALETTE_MAP.has(rawValue)) {
    return rawValue;
  }
  return DEFAULT_COLOR_PALETTE_ID;
}

function renderColorPresetGrid(selectedColor) {
  const palette = COLOR_PALETTE_MAP.get(sanitizeColorPaletteId(activeColorPaletteId));
  const selected = typeof selectedColor === "string" ? sanitizeColor(selectedColor).toUpperCase() : null;
  refs.colorPresetGrid.replaceChildren();
  if (!palette) {
    return;
  }
  palette.colors.forEach((color) => {
    const normalizedColor = sanitizeColor(color).toUpperCase();
    const button = document.createElement("button");
    button.type = "button";
    button.className = "color-preset-chip";
    if (selected && normalizedColor === selected) {
      button.classList.add("is-selected");
    }
    button.style.background = normalizedColor;
    button.title = `${palette.label} ${normalizedColor}`;
    button.setAttribute("aria-label", `Usar color ${normalizedColor}`);
    button.addEventListener("click", () => {
      setColorFromModal(normalizedColor);
    });
    button.addEventListener("dblclick", () => {
      setColorFromModal(normalizedColor);
    });
    refs.colorPresetGrid.append(button);
  });
}

function renderEmojiSections(rawFilter) {
  const selectedEmoji = activeEmojiIndex === null ? null : sanitizeEmoji(activeEmojiDraft, activeEmojiIndex);
  syncEmojiModalPreview(selectedEmoji || "😀");
  const sections = getFilteredEmojiSections(rawFilter);
  refs.emojiSections.replaceChildren();
  let hasMatches = false;

  sections.forEach((section) => {
    hasMatches = true;

    const sectionEl = document.createElement("section");
    sectionEl.className = "emoji-section";

    const title = document.createElement("h4");
    title.className = "emoji-section-title";
    title.textContent = section.label;

    const grid = document.createElement("div");
    grid.className = "emoji-grid";

    section.items.forEach((emoji) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "emoji-chip";
      if (selectedEmoji && emoji === selectedEmoji) {
        button.classList.add("is-selected");
      }
      button.textContent = emoji;
      const meta = EMOJI_NAME_INDEX.get(emoji);
      if (meta?.title) {
        button.title = meta.title;
      }
      button.setAttribute("aria-label", `Elegir emoji ${emoji}`);
      button.addEventListener("click", () => {
        setEmojiFromModal(emoji);
      });
      button.addEventListener("dblclick", () => {
        setEmojiFromModal(emoji, true);
      });
      grid.append(button);
    });

    sectionEl.append(title, grid);
    refs.emojiSections.append(sectionEl);
  });

  if (hasMatches) {
    return;
  }
  const empty = document.createElement("p");
  empty.className = "emoji-empty";
  empty.textContent = "No hay emojis que coincidan con la busqueda.";
  refs.emojiSections.append(empty);
}

function getFilteredEmojiSections(rawFilter) {
  const sectionsWithFavorites = getEmojiSectionsWithFavorites();
  const filter = typeof rawFilter === "string" ? rawFilter.trim() : "";
  const normalizedFilter = normalizeSearch(filter);
  const hasEmojiFilter = isLikelyEmoji(filter);
  const emojiFilter = hasEmojiFilter ? firstGrapheme(filter) : "";

  if (!filter) {
    return sectionsWithFavorites.map((section) => ({ ...section, items: [...section.items] }));
  }

  if (!hasEmojiFilter && normalizedFilter.length <= 1) {
    return sectionsWithFavorites.map((section) => ({ ...section, items: [...section.items] }));
  }

  const tokens = normalizedFilter.split(/\s+/).filter(Boolean);

  return sectionsWithFavorites
    .map((section) => {
      if (hasEmojiFilter) {
        const items = section.items.filter((emoji) => emoji.includes(emojiFilter));
        return { ...section, items };
      }

      const sectionCorpus = [
        normalizeSearch(section.label),
        ...section.keywords.map((keyword) => normalizeSearch(keyword)),
      ].join(" ");
      const sectionMatch =
        sectionCorpus.includes(normalizedFilter) ||
        tokens.every((token) => sectionCorpus.includes(token));

      const items = section.items.filter((emoji) => {
        if (sectionMatch) {
          return true;
        }
        const meta = EMOJI_NAME_INDEX.get(emoji);
        if (!meta) {
          return false;
        }
        return (
          meta.searchable.includes(normalizedFilter) ||
          tokens.every((token) => meta.searchable.includes(token))
        );
      });
      items.sort((a, b) => {
        const scoreB = emojiMatchScore(b, normalizedFilter, tokens);
        const scoreA = emojiMatchScore(a, normalizedFilter, tokens);
        return scoreB - scoreA;
      });

      return { ...section, items };
    })
    .filter((section) => section.items.length > 0);
}

function getEmojiSectionsWithFavorites() {
  const favoriteSet = new Set(getFavoriteEmojiItems());
  return EMOJI_SECTIONS.map((section) => {
    if (section.id !== "favoritos") {
      return { ...section, items: [...section.items] };
    }
    const fallback = section.items.slice(0, 24);
    const dynamic = Array.from(favoriteSet).slice(0, 24);
    return {
      ...section,
      items: dynamic.length > 0 ? dynamic : fallback,
    };
  });
}

function getFavoriteEmojiItems() {
  const ordered = [];
  const seen = new Set();

  const add = (rawEmoji) => {
    if (typeof rawEmoji !== "string" || !rawEmoji.trim()) {
      return;
    }
    const emoji = sanitizeEmoji(rawEmoji);
    if (!emoji || seen.has(emoji)) {
      return;
    }
    seen.add(emoji);
    ordered.push(emoji);
  };

  state.items.forEach((item, index) => {
    add(sanitizeEmoji(item?.emoji, index));
  });
  add(activeEmojiDraft);
  add(RETRY_SLICE_EMOJI);

  return ordered;
}

function emojiMatchScore(emoji, normalizedFilter, tokens) {
  const meta = EMOJI_NAME_INDEX.get(emoji);
  if (!meta || !normalizedFilter) {
    return 0;
  }
  let score = 0;
  if (meta.searchable.includes(normalizedFilter)) {
    score += 4;
  }
  if (meta.en && normalizeSearch(meta.en).startsWith(normalizedFilter)) {
    score += 2;
  }
  if (meta.es && normalizeSearch(meta.es).startsWith(normalizedFilter)) {
    score += 2;
  }
  if (tokens.length > 1 && tokens.every((token) => meta.searchable.includes(token))) {
    score += 1;
  }
  return score;
}

function bindRgbPair(rangeInput, numberInput) {
  rangeInput.addEventListener("input", () => {
    numberInput.value = rangeInput.value;
    setColorFromRgbControls();
  });
  numberInput.addEventListener("input", () => {
    if (numberInput.value === "") {
      return;
    }
    const clamped = clamp(Math.round(Number(numberInput.value) || 0), 0, 255);
    numberInput.value = String(clamped);
    rangeInput.value = String(clamped);
    setColorFromRgbControls();
  });
  numberInput.addEventListener("blur", () => {
    const clamped = clamp(Math.round(Number(numberInput.value) || 0), 0, 255);
    numberInput.value = String(clamped);
    rangeInput.value = String(clamped);
    setColorFromRgbControls();
  });
}

function render() {
  renderDuration();
  renderTextSettings();
  renderSoundToggle();
  drawWheel();
  setControlsDisabled(isSpinning);
}

function renderSoundToggle() {
  if (!(refs.soundToggle instanceof HTMLElement)) {
    return;
  }
  const muted = sanitizeSoundMuted(state.soundMuted);
  refs.soundToggle.textContent = muted ? "🔇" : "🔊";
  refs.soundToggle.classList.toggle("is-muted", muted);
  refs.soundToggle.setAttribute("aria-pressed", String(muted));
  refs.soundToggle.title = muted ? "Activar sonido" : "Silenciar sonido";
  refs.soundToggle.setAttribute("aria-label", muted ? "Activar sonido" : "Silenciar sonido");
}

function renderDuration() {
  refs.durationRangeMin.value = String(state.spinDurationMinSec);
  refs.durationRangeMax.value = String(state.spinDurationMaxSec);
  refs.durationMinNumber.value = String(state.spinDurationMinSec);
  refs.durationMaxNumber.value = String(state.spinDurationMaxSec);
  refs.durationLabel.textContent = `Duracion aleatoria: ${state.spinDurationMinSec}s - ${state.spinDurationMaxSec}s`;
  const minPct =
    ((state.spinDurationMinSec - MIN_SPIN_DURATION) / (MAX_SPIN_DURATION - MIN_SPIN_DURATION)) *
    100;
  const maxPct =
    ((state.spinDurationMaxSec - MIN_SPIN_DURATION) / (MAX_SPIN_DURATION - MIN_SPIN_DURATION)) *
    100;
  refs.durationDualSlider.style.setProperty("--min-pct", `${minPct}%`);
  refs.durationDualSlider.style.setProperty("--max-pct", `${maxPct}%`);
}

function renderTextSettings() {
  refs.textLayoutSelect.value = state.textLayout;
  refs.emojiDisplaySelect.value = state.wheelEmojiMode;
  refs.textPositionRange.value = String(state.textPositionPct);
  refs.fontSizeRange.value = String(state.fontSizePx);
  refs.fontFamilySelect.value = state.fontFamilyId;
  refs.winAnimationSelect.value = state.winnerAnimationMode;
  refs.textPositionLabel.textContent = `Posicion en la seccion: ${state.textPositionPct}%`;
  refs.fontSizeLabel.textContent = `Tamano de fuente: ${state.fontSizePx}px`;
}

function renderItemList() {
  const maxParticipantsReached = state.items.length >= MAX_PARTICIPANTS;
  refs.addItemButton.disabled = isSpinning || maxParticipantsReached;
  refs.addItemButton.title = maxParticipantsReached
    ? `Maximo ${MAX_PARTICIPANTS} participantes por configuracion.`
    : "Agregar participante";
  refs.addItemButton.setAttribute(
    "aria-label",
    maxParticipantsReached
      ? `Maximo ${MAX_PARTICIPANTS} participantes alcanzado`
      : "Agregar participante",
  );

  refs.itemList.replaceChildren();
  const visibleCount = getVisibleParticipantCount(state.items);

  state.items.forEach((item, index) => {
    const row = document.createElement("div");
    row.className = "item-row";
    const isHidden = sanitizeParticipantHidden(item.hidden);
    if (isHidden) {
      row.classList.add("is-hidden");
    }

    const emojiButton = document.createElement("button");
    emojiButton.type = "button";
    emojiButton.className = "emoji-trigger";
    emojiButton.dataset.participantIndex = String(index);
    emojiButton.textContent = sanitizeEmoji(item.emoji, index);
    emojiButton.title = "Elegir emoji";
    emojiButton.setAttribute("aria-label", `Elegir emoji del participante ${index + 1}`);
    emojiButton.disabled = isSpinning;
    emojiButton.addEventListener("click", () => {
      openEmojiModal(index);
    });

    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.maxLength = MAX_PARTICIPANT_NAME_LENGTH;
    nameInput.value = item.name;
    nameInput.setAttribute("aria-label", `Nombre del participante ${index + 1}`);
    nameInput.disabled = isSpinning;
    nameInput.addEventListener("input", () => {
      state.items[index].name = String(nameInput.value || "").slice(0, MAX_PARTICIPANT_NAME_LENGTH);
      saveState();
      drawWheel();
    });
    nameInput.addEventListener("blur", () => {
      state.items[index].name = normalizeName(nameInput.value, index);
      nameInput.value = state.items[index].name;
      saveState();
      drawWheel();
    });

    const colorSwatch = document.createElement("button");
    colorSwatch.type = "button";
    colorSwatch.className = "color-swatch";
    colorSwatch.dataset.participantIndex = String(index);
    colorSwatch.style.background = sanitizeColor(item.color, index);
    colorSwatch.disabled = isSpinning;
    colorSwatch.setAttribute("aria-label", `Elegir color del participante ${index + 1}`);
    colorSwatch.addEventListener("click", () => {
      openColorModal(index);
    });

    const pctInput = document.createElement("input");
    pctInput.type = "number";
    pctInput.className = "pct-input";
    pctInput.step = "1";
    pctInput.min = "1";
    pctInput.max = "99";
    pctInput.value = String(Math.round(item.pct));
    pctInput.setAttribute("aria-label", `Porcentaje del participante ${index + 1}`);
    pctInput.disabled = isSpinning || isHidden;
    if (isHidden) {
      pctInput.title = "Porcentaje bloqueado porque esta oculto de la rula.";
    }
    pctInput.addEventListener("change", () => {
      const parsed = Number.parseFloat(pctInput.value);
      if (!Number.isFinite(parsed)) {
        pctInput.value = String(Math.round(state.items[index].pct));
        return;
      }
      setParticipantPercent(index, Math.round(parsed));
      render();
      saveState();
    });

    const animationMode = sanitizeParticipantAnimationMode(item.animationMode);
    const animationChoice =
      PARTICIPANT_ANIMATION_OPTION_MAP.get(animationMode) ||
      PARTICIPANT_ANIMATION_OPTION_MAP.get(DEFAULT_PARTICIPANT_ANIMATION_MODE);

    const animationPicker = document.createElement("details");
    animationPicker.className = "participant-animation-picker";
    if (isSpinning) {
      animationPicker.classList.add("is-disabled");
    }

    const animationSummary = document.createElement("summary");
    animationSummary.textContent = animationChoice?.emoji || "🌐";
    animationSummary.title = `Animacion: ${animationChoice?.label || "General"}`;
    animationSummary.setAttribute(
      "aria-label",
      `Animacion del participante ${index + 1}: ${animationChoice?.label || "General"}`,
    );
    animationPicker.append(animationSummary);

    const animationMenu = document.createElement("div");
    animationMenu.className = "participant-animation-menu";
    PARTICIPANT_ANIMATION_OPTIONS.forEach((option) => {
      const optionButton = document.createElement("button");
      optionButton.type = "button";
      optionButton.className = "participant-animation-option";
      if (option.id === animationMode) {
        optionButton.classList.add("is-active");
      }
      optionButton.textContent = `${option.emoji} ${option.label}`;
      optionButton.disabled = isSpinning;
      optionButton.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        setParticipantAnimationMode(index, option.id);
        animationPicker.removeAttribute("open");
      });
      animationMenu.append(optionButton);
    });
    animationPicker.append(animationMenu);

    const visibilityButton = document.createElement("button");
    visibilityButton.type = "button";
    visibilityButton.className = "visibility-button";
    visibilityButton.textContent = isHidden ? "🙈" : "👁";
    visibilityButton.title = isHidden ? "Mostrar en la rula" : "Ocultar de la rula";
    visibilityButton.setAttribute(
      "aria-label",
      isHidden
        ? `Mostrar participante ${index + 1} en la rula`
        : `Ocultar participante ${index + 1} de la rula`,
    );
    visibilityButton.disabled =
      isSpinning || (!isHidden && visibleCount <= MIN_PARTICIPANTS);
    if (!isHidden && visibleCount <= MIN_PARTICIPANTS) {
      visibilityButton.title = "La rula necesita al menos 2 participantes visibles";
    }
    visibilityButton.addEventListener("click", () => {
      setParticipantHidden(index, !isHidden);
    });

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "remove-button";
    removeButton.textContent = "🗑";
    removeButton.title = "Eliminar participante";
    removeButton.setAttribute("aria-label", `Eliminar participante ${index + 1}`);
    removeButton.disabled = isSpinning || state.items.length <= MIN_PARTICIPANTS;
    removeButton.addEventListener("click", () => removeParticipant(index));

    row.append(
      emojiButton,
      nameInput,
      colorSwatch,
      pctInput,
      animationPicker,
      visibilityButton,
      removeButton,
    );
    refs.itemList.append(row);
  });

  renderRetrySliceRow();
}

function renderRetrySliceRow() {
  const row = document.createElement("div");
  row.className = "item-row retry-row";

  const enabled = sanitizeRetrySliceEnabled(state.retrySliceEnabled);
  const retryColor = sanitizeRetrySliceColor(state.retrySliceColor);
  const retryPct = sanitizeRetrySlicePct(state.retrySlicePct);

  const emojiPlaceholder = document.createElement("span");
  emojiPlaceholder.className = "retry-placeholder retry-emoji-placeholder";
  emojiPlaceholder.textContent = RETRY_SLICE_EMOJI;
  emojiPlaceholder.title = "Emoji fijo de la seccion Tira otra vez";
  emojiPlaceholder.setAttribute("aria-label", "Emoji fijo de la seccion Tira otra vez");

  const nameTag = document.createElement("div");
  nameTag.className = "retry-name-tag";
  nameTag.textContent = RETRY_SLICE_LABEL;
  if (!enabled) {
    nameTag.classList.add("is-disabled");
  }

  const colorButton = document.createElement("button");
  colorButton.type = "button";
  colorButton.className = "color-swatch retry-color-swatch";
  colorButton.style.background = retryColor;
  colorButton.title = "Color de la seccion Tira otra vez";
  colorButton.setAttribute("aria-label", "Color de la seccion Tira otra vez");
  colorButton.disabled = isSpinning || !enabled;
  colorButton.addEventListener("click", () => {
    openColorModal(RETRY_SLICE_COLOR_INDEX);
  });

  const pctInput = document.createElement("input");
  pctInput.type = "number";
  pctInput.className = "pct-input retry-pct-input";
  pctInput.step = "1";
  pctInput.min = String(MIN_RETRY_SLICE_PCT);
  pctInput.max = String(MAX_RETRY_SLICE_PCT);
  pctInput.value = String(retryPct);
  pctInput.title = `Porcentaje de ${RETRY_SLICE_LABEL}`;
  pctInput.setAttribute("aria-label", `Porcentaje de ${RETRY_SLICE_LABEL}`);
  pctInput.disabled = isSpinning || !enabled;
  pctInput.addEventListener("change", () => {
    setRetrySlicePct(pctInput.value);
  });

  const animationPlaceholder = document.createElement("span");
  animationPlaceholder.className = "retry-placeholder retry-control-placeholder";
  animationPlaceholder.textContent = "—";
  animationPlaceholder.setAttribute("aria-hidden", "true");

  const visibilityButton = document.createElement("button");
  visibilityButton.type = "button";
  visibilityButton.className = "visibility-button";
  visibilityButton.textContent = enabled ? "👁" : "🙈";
  visibilityButton.title = enabled
    ? "Ocultar seccion Tira otra vez de la rula"
    : "Mostrar seccion Tira otra vez en la rula";
  visibilityButton.setAttribute(
    "aria-label",
    enabled
      ? "Ocultar seccion Tira otra vez de la rula"
      : "Mostrar seccion Tira otra vez en la rula",
  );
  visibilityButton.disabled = isSpinning;
  visibilityButton.addEventListener("click", () => {
    setRetrySliceEnabled(!enabled);
  });

  const placeholderRemove = document.createElement("span");
  placeholderRemove.className = "retry-placeholder";
  placeholderRemove.textContent = "—";
  placeholderRemove.setAttribute("aria-hidden", "true");

  row.append(
    emojiPlaceholder,
    nameTag,
    colorButton,
    pctInput,
    animationPlaceholder,
    visibilityButton,
    placeholderRemove,
  );
  refs.itemList.append(row);
}

function openColorModal(index) {
  if (isSpinning) {
    return;
  }
  activeColorIndex = index;
  if (isRetrySliceColorIndex(index)) {
    activeColorDraft = sanitizeRetrySliceColor(state.retrySliceColor);
  } else {
    activeColorDraft = sanitizeColor(state.items[index]?.color, index);
  }
  refs.colorModal.hidden = false;
  refs.colorPaletteSelect.value = sanitizeColorPaletteId(activeColorPaletteId);
  syncColorModal(activeColorDraft);
}

function closeColorModal() {
  refs.colorModal.hidden = true;
  activeColorIndex = null;
  activeColorDraft = null;
}

function confirmColorModalSelection() {
  if (activeColorIndex === null) {
    closeColorModal();
    return;
  }

  if (isRetrySliceColorIndex(activeColorIndex)) {
    const color = sanitizeRetrySliceColor(activeColorDraft || state.retrySliceColor);
    state.retrySliceColor = color;
    const swatch = refs.itemList.querySelector(".retry-color-swatch");
    if (swatch instanceof HTMLElement) {
      swatch.style.background = color;
    }
    saveState();
    drawWheel();
    closeColorModal();
    return;
  }

  const color = sanitizeColor(activeColorDraft || state.items[activeColorIndex]?.color, activeColorIndex);
  state.items[activeColorIndex].color = color;
  const swatch = refs.itemList.querySelector(`.color-swatch[data-participant-index="${activeColorIndex}"]`);
  if (swatch instanceof HTMLElement) {
    swatch.style.background = color;
  }
  saveState();
  drawWheel();
  closeColorModal();
}

function syncColorModal(hexColor) {
  const color = sanitizeColor(hexColor, activeColorIndex ?? 0);
  const rgb = hexToRgb(color);
  refs.colorPreviewSwatch.style.background = color;
  refs.colorHexValue.textContent = color.toUpperCase();
  refs.colorHexInput.value = color.toUpperCase();
  refs.colorRRange.value = String(rgb.r);
  refs.colorGRange.value = String(rgb.g);
  refs.colorBRange.value = String(rgb.b);
  refs.colorRNumber.value = String(rgb.r);
  refs.colorGNumber.value = String(rgb.g);
  refs.colorBNumber.value = String(rgb.b);
  renderColorPresetGrid(color);
}

function setColorFromRgbControls() {
  const r = clamp(Math.round(Number(refs.colorRRange.value) || 0), 0, 255);
  const g = clamp(Math.round(Number(refs.colorGRange.value) || 0), 0, 255);
  const b = clamp(Math.round(Number(refs.colorBRange.value) || 0), 0, 255);
  setColorFromModal(rgbToHex(r, g, b));
}

function setColorFromModal(hexColor) {
  if (activeColorIndex === null) {
    return;
  }
  const color = isRetrySliceColorIndex(activeColorIndex)
    ? sanitizeRetrySliceColor(hexColor)
    : sanitizeColor(hexColor, activeColorIndex);
  activeColorDraft = color;
  syncColorModal(color);
}

function openEmojiModal(index) {
  if (isSpinning) {
    return;
  }
  activeEmojiIndex = index;
  activeEmojiDraft = sanitizeEmoji(state.items[index]?.emoji, index);
  refs.emojiModal.hidden = false;
  refs.emojiSearchInput.value = "";
  refs.emojiNativeInput.value = activeEmojiDraft;
  syncEmojiModalPreview(activeEmojiDraft);
  renderEmojiSections("");
  refs.emojiSearchInput.focus();
}

function closeEmojiModal() {
  stopEmojiModalPreviewHose(true);
  refs.emojiModal.hidden = true;
  activeEmojiIndex = null;
  activeEmojiDraft = null;
  syncEmojiModalPreview("😀");
}

function setEmojiFromModal(rawEmoji, confirmSelection = false) {
  if (activeEmojiIndex === null) {
    return;
  }

  const nextEmoji = sanitizeEmoji(rawEmoji, activeEmojiIndex);
  activeEmojiDraft = nextEmoji;
  refs.emojiNativeInput.value = nextEmoji;
  syncEmojiModalPreview(nextEmoji);
  renderEmojiSections(refs.emojiSearchInput.value);

  if (confirmSelection) {
    confirmEmojiModalSelection();
  }
}

function confirmEmojiModalSelection() {
  if (activeEmojiIndex === null) {
    closeEmojiModal();
    return;
  }

  const nextEmoji = sanitizeEmoji(activeEmojiDraft, activeEmojiIndex);
  state.items[activeEmojiIndex].emoji = nextEmoji;

  const trigger = refs.itemList.querySelector(
    `.emoji-trigger[data-participant-index="${activeEmojiIndex}"]`,
  );
  if (trigger instanceof HTMLElement) {
    trigger.textContent = nextEmoji;
  }

  saveState();
  drawWheel();
  closeEmojiModal();
}

function syncEmojiModalPreview(emoji) {
  if (!(refs.emojiSelectedPreview instanceof HTMLElement)) {
    return;
  }
  const next = sanitizeEmoji(emoji, activeEmojiIndex ?? 0);
  refs.emojiSelectedPreview.textContent = next;
  refs.emojiSelectedPreview.setAttribute("aria-label", `Emoji seleccionado: ${next}`);
}

function stopEmojiModalPreviewHose(clearNodes = false) {
  if (emojiModalHoseRafId !== null) {
    cancelAnimationFrame(emojiModalHoseRafId);
    emojiModalHoseRafId = null;
  }
  emojiModalHoseController = null;
  if (clearNodes && refs.emojiModalBurst instanceof HTMLElement) {
    refs.emojiModalBurst.replaceChildren();
  }
}

function requestStopEmojiModalPreviewHose() {
  if (!emojiModalHoseController) {
    return;
  }
  emojiModalHoseController.stopRequested = true;
}

function spawnEmojiModalPreviewHose(rawEmoji, options = {}) {
  if (!(refs.emojiModalBurst instanceof HTMLElement) || !(refs.emojiSelectedPreview instanceof HTMLElement)) {
    return;
  }
  const emoji = sanitizeEmoji(rawEmoji, activeEmojiIndex ?? 0);
  stopEmojiModalPreviewHose(true);

  const burstArea = refs.emojiModalBurst;
  const areaRect = burstArea.getBoundingClientRect();
  if (areaRect.width <= 0 || areaRect.height <= 0) {
    return;
  }
  const sourceRect = refs.emojiSelectedPreview.getBoundingClientRect();
  const originX = clamp(sourceRect.left + sourceRect.width * 0.5 - areaRect.left, 0, areaRect.width);
  const originY = clamp(sourceRect.top + sourceRect.height * 0.56 - areaRect.top, 0, areaRect.height);

  const sustainWhilePressed = Boolean(options?.sustainWhilePressed);
  const controller = { stopRequested: false };
  emojiModalHoseController = controller;

  const particles = [];
  const gravity = 1540;
  const emissionDurationMs = sustainWhilePressed ? Number.POSITIVE_INFINITY : 760;
  const lifeMinMs = sustainWhilePressed ? 1550 : 620;
  const lifeMaxMs = sustainWhilePressed ? 3100 : 1320;
  const spawnRatePerSec = sustainWhilePressed ? 112 : 132;
  const spawnCapPerFrame = 10;
  const maxParticles = sustainWhilePressed ? 150 : 128;
  let elapsedMs = 0;
  let spawnCarry = 0;
  let sweepPhase = 0;
  let lastTimestamp = performance.now();

  const step = (timestamp) => {
    if (emojiModalHoseController !== controller) {
      emojiModalHoseRafId = null;
      return;
    }

    const deltaMs = clamp(timestamp - lastTimestamp, 8, 44);
    lastTimestamp = timestamp;
    const deltaSec = deltaMs / 1000;
    elapsedMs += deltaMs;
    sweepPhase += deltaSec * 8.6;

    if (!controller.stopRequested && elapsedMs <= emissionDurationMs) {
      const spawnFloat = spawnRatePerSec * deltaSec + spawnCarry;
      const plannedCount = Math.floor(spawnFloat);
      spawnCarry = spawnFloat - plannedCount;
      const spawnCount = Math.min(plannedCount, spawnCapPerFrame);
      const fragment = document.createDocumentFragment();

      for (let i = 0; i < spawnCount && particles.length < maxParticles; i += 1) {
        const node = document.createElement("span");
        node.className = "emoji-modal-hose-drop";
        node.textContent = emoji;
        const size = randomInt(18, 42);
        node.style.fontSize = `${size}px`;
        const sprayAngle = -Math.PI / 2 + Math.sin(sweepPhase + i * 0.26) * 0.72 + randomFloat(-0.35, 0.35);
        const speed = randomFloat(420, 980);
        const particle = {
          node,
          x: originX + randomFloat(-10, 10),
          y: originY + randomFloat(-10, 10),
          vx: Math.cos(sprayAngle) * speed + randomFloat(-90, 90),
          vy: Math.sin(sprayAngle) * speed + randomFloat(-120, 60),
          rot: randomFloat(-24, 24),
          vr: randomFloat(-780, 780),
          ageMs: 0,
          lifeMs: randomInt(lifeMinMs, lifeMaxMs),
          alive: true,
          size,
        };
        node.style.transform = `translate3d(${particle.x}px, ${particle.y}px, 0) rotate(${particle.rot}deg)`;
        fragment.append(node);
        particles.push(particle);
      }
      burstArea.append(fragment);
    } else {
      controller.stopRequested = true;
      spawnCarry = 0;
    }

    let aliveCount = 0;
    for (let i = 0; i < particles.length; i += 1) {
      const particle = particles[i];
      if (!particle.alive) {
        continue;
      }
      particle.ageMs += deltaMs;
      if (particle.ageMs >= particle.lifeMs) {
        particle.alive = false;
        particle.node.remove();
        continue;
      }

      particle.vy += gravity * deltaSec;
      particle.vx *= 0.995;
      particle.vr *= 0.994;
      particle.x += particle.vx * deltaSec;
      particle.y += particle.vy * deltaSec;
      particle.rot += particle.vr * deltaSec;

      const timeLeft = particle.lifeMs - particle.ageMs;
      const fadeWindow = sustainWhilePressed ? 920 : 420;
      const fade = timeLeft < fadeWindow ? clamp(timeLeft / fadeWindow, 0, 1) : 1;
      particle.node.style.opacity = fade.toFixed(3);
      particle.node.style.transform = `translate3d(${particle.x.toFixed(2)}px, ${particle.y.toFixed(2)}px, 0) rotate(${particle.rot.toFixed(2)}deg)`;

      const offScreen =
        particle.y > areaRect.height + particle.size * 1.1 ||
        particle.x < -particle.size * 1.2 ||
        particle.x > areaRect.width + particle.size * 1.2;
      if (offScreen) {
        particle.alive = false;
        particle.node.remove();
        continue;
      }
      aliveCount += 1;
    }

    const shouldStop = controller.stopRequested && aliveCount === 0;
    if (shouldStop) {
      stopEmojiModalPreviewHose(true);
      return;
    }

    emojiModalHoseRafId = requestAnimationFrame(step);
  };

  emojiModalHoseRafId = requestAnimationFrame(step);
}

function drawWheel() {
  const size = refs.canvas.width;
  const center = size / 2;
  const outerRadius = center - 12;
  const woodBorderWidth = 14;
  const sectionRadius = outerRadius - woodBorderWidth;

  ctx.clearRect(0, 0, size, size);

  ctx.save();
  ctx.translate(center, center);
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.arc(0, 0, outerRadius + 8, 0, TAU);
  ctx.fill();
  ctx.restore();

  const rotationRad = degToRad(currentRotationDeg);
  let cursor = rotationRad - Math.PI / 2;
  const wheelEntries = getSpinEntries();

  wheelEntries.forEach((entry) => {
    const segmentRad = (entry.pct / 100) * TAU;
    const startAngle = cursor;
    const endAngle = cursor + segmentRad;

    ctx.save();
    ctx.translate(center, center);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, sectionRadius, startAngle, endAngle);
    ctx.closePath();
    ctx.fillStyle = getSpinEntryColor(entry);
    ctx.fill();
    ctx.lineWidth = 1.2;
    ctx.strokeStyle = "rgba(255, 255, 255, 0.75)";
    ctx.stroke();
    ctx.restore();

    drawSegmentLabel(entry, startAngle + segmentRad / 2, sectionRadius);
    cursor = endAngle;
  });

  drawWoodenBorder(center, outerRadius, sectionRadius);
  drawWheelRim(center, outerRadius);

  ctx.save();
  ctx.translate(center, center);
  const hubWood = ctx.createLinearGradient(-20, -20, 20, 20);
  hubWood.addColorStop(0, "rgba(84, 49, 25, 0.98)");
  hubWood.addColorStop(0.45, "rgba(125, 79, 45, 0.98)");
  hubWood.addColorStop(1, "rgba(48, 27, 13, 0.99)");
  ctx.fillStyle = hubWood;
  ctx.beginPath();
  ctx.arc(0, 0, 21, 0, TAU);
  ctx.fill();
  ctx.lineWidth = 1.8;
  ctx.strokeStyle = "rgba(34, 20, 10, 0.86)";
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(-5.5, -5.5, 8, 0, TAU);
  ctx.fillStyle = "rgba(255, 224, 176, 0.13)";
  ctx.fill();

  ctx.beginPath();
  ctx.arc(0, 0, 5.2, 0, TAU);
  ctx.fillStyle = "rgba(26, 33, 40, 0.58)";
  ctx.fill();
  ctx.restore();
}

function drawWoodenBorder(center, outerRadius, sectionRadius) {
  ctx.save();
  ctx.translate(center, center);

  const borderWood = ctx.createLinearGradient(-outerRadius, -outerRadius, outerRadius, outerRadius);
  borderWood.addColorStop(0, "rgba(74, 43, 22, 0.99)");
  borderWood.addColorStop(0.28, "rgba(121, 77, 43, 0.98)");
  borderWood.addColorStop(0.52, "rgba(58, 33, 17, 0.99)");
  borderWood.addColorStop(0.76, "rgba(136, 88, 50, 0.98)");
  borderWood.addColorStop(1, "rgba(41, 23, 12, 0.99)");

  ctx.beginPath();
  ctx.arc(0, 0, outerRadius + 0.4, 0, TAU);
  ctx.arc(0, 0, sectionRadius - 0.7, 0, TAU, true);
  ctx.closePath();
  ctx.fillStyle = borderWood;
  ctx.fill();

  ctx.strokeStyle = "rgba(25, 14, 7, 0.92)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(0, 0, outerRadius - 1.8, 0, TAU);
  ctx.stroke();

  ctx.strokeStyle = "rgba(214, 171, 116, 0.24)";
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.arc(0, 0, sectionRadius + 1.5, 0, TAU);
  ctx.stroke();

  for (let i = 0; i < 18; i += 1) {
    const angle = (i / 18) * TAU + Math.PI / 30;
    const r1 = sectionRadius + 1.4;
    const r2 = outerRadius - 1.6;
    ctx.beginPath();
    ctx.moveTo(Math.cos(angle) * r1, Math.sin(angle) * r1);
    ctx.lineTo(Math.cos(angle) * r2, Math.sin(angle) * r2);
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgba(208, 159, 103, 0.13)";
    ctx.stroke();
  }

  ctx.restore();
}

function drawWheelRim(center, radius) {
  ctx.save();
  ctx.translate(center, center);
  const standbyPalette = getStandbyLightPalette();

  const outer = ctx.createLinearGradient(-radius, -radius, radius, radius);
  outer.addColorStop(0, "rgba(34, 47, 68, 0.9)");
  outer.addColorStop(0.5, "rgba(21, 31, 45, 0.92)");
  outer.addColorStop(1, "rgba(9, 17, 30, 0.9)");
  ctx.beginPath();
  ctx.arc(0, 0, radius + 1.5, 0, TAU);
  ctx.lineWidth = 10;
  ctx.strokeStyle = outer;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(0, 0, radius - 6, 0, TAU);
  ctx.lineWidth = 2;
  ctx.strokeStyle = "rgba(218, 232, 246, 0.24)";
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(0, 0, radius + 4.8, 0, TAU);
  ctx.lineWidth = 6;
  ctx.strokeStyle = "rgba(6, 14, 24, 0.74)";
  ctx.stroke();

  const halo = getRimHaloStyle();
  ctx.beginPath();
  ctx.arc(0, 0, radius + 5.3, 0, TAU);
  ctx.lineWidth = 5;
  ctx.strokeStyle = halo.stroke;
  ctx.shadowColor = halo.glow;
  ctx.shadowBlur = halo.blur;
  ctx.stroke();

  for (let i = 0; i < RIM_LIGHTS_COUNT; i += 1) {
    const angle = (i / RIM_LIGHTS_COUNT) * TAU;
    const light = getRimLightStyle(i, standbyPalette);
    const rBulb = radius + 5.4;
    const xBulb = Math.cos(angle) * rBulb;
    const yBulb = Math.sin(angle) * rBulb;

    ctx.beginPath();
    ctx.arc(xBulb, yBulb, light.bulbRadius + 1.4, 0, TAU);
    ctx.fillStyle = "rgba(5, 13, 22, 0.72)";
    ctx.shadowBlur = 0;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(xBulb, yBulb, light.bulbRadius, 0, TAU);
    ctx.fillStyle = light.bulbFill;
    ctx.shadowColor = light.glow;
    ctx.shadowBlur = light.blur;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(xBulb, yBulb, light.coreRadius, 0, TAU);
    ctx.fillStyle = light.coreFill;
    ctx.shadowColor = light.glow;
    ctx.shadowBlur = Math.max(3, Math.round(light.blur * 0.45));
    ctx.fill();

    ctx.beginPath();
    ctx.arc(
      xBulb - light.bulbRadius * 0.33,
      yBulb - light.bulbRadius * 0.33,
      Math.max(0.9, light.bulbRadius * 0.24),
      0,
      TAU,
    );
    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    ctx.shadowBlur = 0;
    ctx.fill();
  }

  ctx.shadowBlur = 0;
  ctx.restore();
}

function getRimHaloStyle() {
  if (rimLightMode === RIM_LIGHT_MODE.SPIN) {
    return {
      stroke: "rgba(255, 255, 255, 0.56)",
      glow: "rgba(255, 255, 255, 0.95)",
      blur: 20,
    };
  }

  if (rimLightMode === RIM_LIGHT_MODE.WINNER) {
    const t = performance.now();
    const hue = (t * 0.24) % 360;
    return {
      stroke: `hsla(${hue}, 100%, 62%, 0.68)`,
      glow: `hsla(${(hue + 26) % 360}, 100%, 64%, 0.95)`,
      blur: 24,
    };
  }

  return {
    stroke: "rgba(126, 229, 255, 0.5)",
    glow: "rgba(126, 229, 255, 0.9)",
    blur: 18,
  };
}

function getRimLightStyle(index, standbyPalette) {
  if (rimLightMode === RIM_LIGHT_MODE.SPIN) {
    const pulse = 0.85 + Math.sin(performance.now() * 0.03 + index * 0.15) * 0.12;
    return {
      glow: `rgba(255, 255, 255, ${pulse})`,
      blur: 26,
      bulbRadius: 4.9,
      bulbFill: "rgba(255, 255, 255, 0.97)",
      coreRadius: 2.35,
      coreFill: "rgba(255, 255, 255, 0.98)",
    };
  }

  if (rimLightMode === RIM_LIGHT_MODE.WINNER) {
    const t = performance.now();
    const hue = (t * 0.34 + index * 23) % 360;
    const pulse = 0.72 + Math.sin((t + index * 27) * 0.024) * 0.22;
    const alpha = 0.92 + Math.sin((t + index * 11) * 0.008) * 0.08;
    const bulbRadius = 4.6 + Math.sin((t + index * 13) * 0.012) * 0.55;
    return {
      glow: `hsla(${(hue + 16) % 360}, 100%, 66%, ${pulse})`,
      blur: 30,
      bulbRadius,
      bulbFill: `hsla(${hue}, 100%, 63%, ${clamp(alpha, 0.7, 1)})`,
      coreRadius: Math.max(1.8, bulbRadius * 0.49),
      coreFill: `hsla(${(hue + 12) % 360}, 100%, 78%, 0.98)`,
    };
  }

  const t = performance.now();
  const palette = Array.isArray(standbyPalette) && standbyPalette.length > 0
    ? standbyPalette
    : [
        { r: 73, g: 228, b: 255 },
        { r: 255, g: 94, b: 199 },
        { r: 255, g: 214, b: 88 },
        { r: 118, g: 255, b: 139 },
      ];
  const len = palette.length;
  const travel = t * RIM_STANDBY_ROT_SPEED;
  const position = ((index / RIM_LIGHTS_COUNT) * len + travel) % len;
  const baseIndex = Math.floor(position);
  const nextIndex = (baseIndex + 1) % len;
  const mix = position - baseIndex;
  const color = mixRgb(palette[baseIndex], palette[nextIndex], mix);
  const pulse = 0.65 + Math.sin(t * 0.004 + index * 0.2) * 0.25;
  const alpha = clamp(0.45 + pulse * 0.5, 0.35, 0.95);
  const bulbRadius = 4.2 + Math.sin(t * 0.006 + index * 0.22) * 0.35;

  return {
    glow: `rgba(${color.r}, ${color.g}, ${color.b}, ${clamp(alpha + 0.12, 0.4, 1)})`,
    blur: 24,
    bulbRadius,
    bulbFill: `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`,
    coreRadius: Math.max(1.7, bulbRadius * 0.48),
    coreFill: `rgba(${clamp(color.r + 70, 0, 255)}, ${clamp(color.g + 70, 0, 255)}, ${clamp(
      color.b + 70,
      0,
      255,
    )}, ${clamp(alpha + 0.12, 0.5, 1)})`,
  };
}

function getStandbyLightPalette() {
  const unique = new Set();
  const palette = [];
  const spinEntries = getSpinEntries();
  const colorSource = spinEntries.length > 0
    ? spinEntries.map((entry, index) => ({ color: getSpinEntryColor(entry), index }))
    : state.items.map((item, index) => ({ color: sanitizeColor(item?.color, index), index }));
  colorSource.forEach((row) => {
    const baseHex = sanitizeColor(row.color, row.index).toUpperCase();
    const compHex = complementHexColor(baseHex);
    [baseHex, compHex].forEach((hex) => {
      if (!unique.has(hex)) {
        unique.add(hex);
        palette.push(hexToRgb(hex));
      }
    });
  });
  return palette;
}

function complementHexColor(hexColor) {
  const rgb = hexToRgb(hexColor);
  return rgbToHex(255 - rgb.r, 255 - rgb.g, 255 - rgb.b);
}

function drawSegmentLabel(entry, midAngle, radius) {
  const text = formatSpinEntryLabel(entry);
  const centerX = refs.canvas.width / 2;
  const centerY = refs.canvas.height / 2;

  if (state.textLayout === "tangent") {
    drawLabelTangential(text, midAngle, radius, centerX, centerY);
    return;
  }

  if (state.textLayout === "horizontal") {
    drawLabelHorizontal(text, midAngle, radius, centerX, centerY);
    return;
  }

  drawLabelRadial(text, midAngle, radius, centerX, centerY);
}

function formatParticipantLabel(item) {
  const emoji = sanitizeEmoji(item.emoji);
  const name = normalizeName(item.name);
  return `${emoji} ${name}`.trim();
}

function formatWheelParticipantLabel(item) {
  const emoji = sanitizeEmoji(item.emoji);
  const name = normalizeName(item.name);
  const mode = sanitizeWheelEmojiMode(state.wheelEmojiMode);
  if (mode === "none") {
    return name;
  }
  if (mode === "prefix") {
    return `${emoji} ${name}`.trim();
  }
  if (mode === "suffix") {
    return `${name} ${emoji}`.trim();
  }
  return `${emoji} ${name} ${emoji}`.trim();
}

function formatSpinEntryLabel(entry) {
  if (!entry || typeof entry !== "object") {
    return "";
  }
  if (entry.type === "retry") {
    return shorten(formatRetryWheelLabel(), 22);
  }
  return shorten(formatWheelParticipantLabel(entry.item), 22);
}

function formatRetryWheelLabel() {
  const mode = sanitizeWheelEmojiMode(state.wheelEmojiMode);
  if (mode === "none") {
    return RETRY_SLICE_LABEL;
  }
  if (mode === "prefix") {
    return `${RETRY_SLICE_EMOJI} ${RETRY_SLICE_LABEL}`.trim();
  }
  if (mode === "suffix") {
    return `${RETRY_SLICE_LABEL} ${RETRY_SLICE_EMOJI}`.trim();
  }
  return `${RETRY_SLICE_EMOJI} ${RETRY_SLICE_LABEL} ${RETRY_SLICE_EMOJI}`.trim();
}

function getSpinEntryColor(entry) {
  if (!entry || typeof entry !== "object") {
    return sanitizeColor(undefined, 0);
  }
  if (entry.type === "retry") {
    return sanitizeRetrySliceColor(entry.color || state.retrySliceColor);
  }
  return sanitizeColor(entry.item?.color);
}

function drawLabelRadial(text, midAngle, radius, centerX, centerY) {
  const labelRadius = radius * (state.textPositionPct / 100);
  const x = centerX + Math.cos(midAngle) * labelRadius;
  const y = centerY + Math.sin(midAngle) * labelRadius;

  drawWoodNameLabel(text, x, y, midAngle);
}

function drawLabelTangential(text, midAngle, radius, centerX, centerY) {
  const labelRadius = radius * (state.textPositionPct / 100);
  const x = centerX + Math.cos(midAngle) * labelRadius;
  const y = centerY + Math.sin(midAngle) * labelRadius;
  const normalized = ((midAngle % TAU) + TAU) % TAU;
  const shouldFlip = normalized > Math.PI / 2 && normalized < Math.PI * 1.5;
  const rotation = midAngle + Math.PI / 2 + (shouldFlip ? Math.PI : 0);

  drawWoodNameLabel(text, x, y, rotation);
}

function drawLabelHorizontal(text, midAngle, radius, centerX, centerY) {
  const labelRadius = radius * (state.textPositionPct / 100);
  const x = centerX + Math.cos(midAngle) * labelRadius;
  const y = centerY + Math.sin(midAngle) * labelRadius;

  drawWoodNameLabel(text, x, y, 0);
}

function drawWoodNameLabel(text, x, y, rotation) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  applyNameTextStyle();
  ctx.textAlign = "center";
  ctx.fillText(text, 0, 0);
  ctx.restore();
}

function applyNameTextStyle() {
  const font = FONT_OPTION_MAP.get(state.fontFamilyId) || FONT_OPTION_MAP.get(DEFAULT_FONT_FAMILY_ID);
  ctx.fillStyle = "#ffffff";
  ctx.font = `700 ${state.fontSizePx}px ${font.family}`;
  ctx.textBaseline = "middle";
  ctx.shadowColor = "transparent";
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;
}

function spinWheel() {
  if (isSpinning) {
    stopSpinNow();
    return;
  }
  if (requestEmojiHoseStop(true)) {
    return;
  }
  const visibleParticipants = getVisibleItems();
  if (visibleParticipants.length < MIN_PARTICIPANTS) {
    setMessage("La rula necesita al menos 2 participantes visibles.", "error");
    return;
  }
  const spinEntries = getSpinEntries();
  if (spinEntries.length < MIN_PARTICIPANTS) {
    setMessage("No hay suficientes secciones disponibles para girar.", "error");
    return;
  }

  clearWinnerCelebrationVisuals();
  isSpinning = true;
  setRimLightMode(RIM_LIGHT_MODE.SPIN);
  resumeAudioContext();
  triggerPointerTick();
  setControlsDisabled(true);
  refs.resultText.textContent = "Girando...";
  setMessage("");

  const winnerIndex = weightedRandomIndex(spinEntries);
  if (winnerIndex < 0) {
    setControlsDisabled(false);
    isSpinning = false;
    setRimLightMode(RIM_LIGHT_MODE.STANDBY);
    setMessage("No hay secciones visibles para girar.", "error");
    refs.resultText.textContent = "Mostra al menos 2 participantes visibles para girar.";
    return;
  }
  const durationSec = randomInt(state.spinDurationMinSec, state.spinDurationMaxSec);
  const durationMs = durationSec * 1000;
  const minTurns = clamp(Math.round(durationSec * 0.8), 2, 30);
  const maxTurns = clamp(Math.round(durationSec * 1.2), 3, 40);
  const turns = randomInt(minTurns, Math.max(minTurns, maxTurns));

  const segments = getSegmentsDeg(spinEntries);
  const winnerSegment = segments[winnerIndex];
  const safeMargin = Math.min(winnerSegment.spanDeg * 0.2, 4);
  const insideDeg = randomFloat(
    safeMargin,
    Math.max(safeMargin, winnerSegment.spanDeg - safeMargin),
  );

  const targetMod = mod360(-(winnerSegment.startDeg + insideDeg));
  const currentMod = mod360(currentRotationDeg);
  const deltaToTarget = mod360(targetMod - currentMod);
  const totalDelta = turns * 360 + deltaToTarget;
  const startRotation = currentRotationDeg;
  const endRotation = startRotation + totalDelta;
  const startTime = performance.now();
  activeSpin = {
    rafId: null,
  };

  const animate = (timestamp) => {
    if (!isSpinning || !activeSpin) {
      return;
    }
    const progress = clamp((timestamp - startTime) / durationMs, 0, 1);
    const eased = easeOutQuint(progress);
    const nextRotation = startRotation + totalDelta * eased;
    setSpinRotation(nextRotation);
    drawWheel();

    const remainingDeg = Math.abs(endRotation - nextRotation);
    const shouldFinalizeEarly =
      progress >= SPIN_FINALIZE_PROGRESS && remainingDeg <= SPIN_FINALIZE_REMAINING_DEG;

    if (!shouldFinalizeEarly && progress < 1) {
      activeSpin.rafId = requestAnimationFrame(animate);
      return;
    }

    setSpinRotation(endRotation);
    drawWheel();
    finalizeSpin(false);
  };

  activeSpin.rafId = requestAnimationFrame(animate);
}

function stopSpinNow() {
  if (!isSpinning) {
    return;
  }
  if (activeSpin?.rafId) {
    cancelAnimationFrame(activeSpin.rafId);
  }
  drawWheel();
  finalizeSpin(true);
}

function finalizeSpin(stoppedByClick) {
  const spinEntries = getSpinEntries();
  if (spinEntries.length === 0) {
    isSpinning = false;
    activeSpin = null;
    setControlsDisabled(false);
    refs.resultText.textContent = "No hay secciones visibles en la rula.";
    setMessage("No se pudo resolver resultado porque no hay secciones visibles.", "error");
    return;
  }
  const winnerIndex = getWinnerIndexFromRotation(currentRotationDeg, spinEntries);
  const safeIndex = winnerIndex < 0 ? 0 : winnerIndex;
  const winnerEntry = spinEntries[safeIndex];

  isSpinning = false;
  activeSpin = null;
  setControlsDisabled(false);

  if (winnerEntry?.type === "retry") {
    refs.resultText.textContent = stoppedByClick
      ? `${RETRY_SLICE_LABEL}. Volve a girar.`
      : `${RETRY_SLICE_LABEL}. Nadie gana esta ronda.`;
    playFailureTone();
    const celebrationDurationMs = triggerRetryFailureCelebration();
    startWinnerLights(Math.max(1000, celebrationDurationMs));
    return;
  }

  const winnerItem = winnerEntry?.item;
  const winnerLabel = formatParticipantLabel(winnerItem);
  refs.resultText.textContent = `Ganó ${winnerLabel}.`;
  playSpinEndFanfare();
  playWinApplause();
  const celebrationDurationMs = triggerWinnerCelebration(winnerItem);
  startWinnerLights(Math.max(1200, celebrationDurationMs));
}

function getWinnerIndexFromRotation(rotationDeg, items = getSpinEntries()) {
  if (!Array.isArray(items) || items.length === 0) {
    return -1;
  }
  const angleInWheel = mod360(-rotationDeg);
  let cursor = 0;
  for (let i = 0; i < items.length; i += 1) {
    const span = (items[i].pct / 100) * 360;
    if (angleInWheel >= cursor && angleInWheel < cursor + span) {
      return i;
    }
    cursor += span;
  }
  return items.length - 1;
}

function setSpinRotation(nextRotationDeg) {
  const previous = currentRotationDeg;
  currentRotationDeg = nextRotationDeg;
  if (!isSpinning) {
    return;
  }
  const crossings = countSegmentCrossings(previous, nextRotationDeg);
  if (crossings > 0) {
    triggerSelectorFeedback(crossings);
  }
}

function countSegmentCrossings(previousRotationDeg, nextRotationDeg) {
  const delta = nextRotationDeg - previousRotationDeg;
  if (delta === 0) {
    return 0;
  }

  const boundaries = getSegmentBoundariesDeg(getSpinEntries());
  if (boundaries.length === 0) {
    return 0;
  }

  const absDelta = Math.abs(delta);
  const fullTurns = Math.floor(absDelta / 360);
  const remainder = absDelta - fullTurns * 360;
  let count = fullTurns * boundaries.length;
  if (remainder <= 0.000001) {
    return count;
  }

  const previousPointerAngle = mod360(-previousRotationDeg);
  const direction = delta > 0 ? -1 : 1;
  const epsilon = 0.00001;

  boundaries.forEach((boundary) => {
    let distance = 0;
    if (direction < 0) {
      distance = mod360(previousPointerAngle - boundary);
    } else {
      distance = mod360(boundary - previousPointerAngle);
    }
    if (distance > epsilon && distance <= remainder + epsilon) {
      count += 1;
    }
  });

  return count;
}

function getSegmentBoundariesDeg(items = getSpinEntries()) {
  if (!Array.isArray(items) || items.length === 0) {
    return [];
  }
  const boundaries = [0];
  let cumulative = 0;
  for (let i = 0; i < items.length - 1; i += 1) {
    cumulative += (items[i].pct / 100) * 360;
    boundaries.push(mod360(cumulative));
  }
  return boundaries;
}

function triggerSelectorFeedback(crossings) {
  const pulses = Math.max(1, crossings);
  for (let i = 0; i < pulses; i += 1) {
    window.setTimeout(() => {
      triggerPointerTick();
      playPointerPulse();
    }, i * 14);
  }
}

function triggerPointerTick() {
  if (!(refs.pointer instanceof HTMLElement)) {
    return;
  }
  refs.pointer.classList.remove("tick");
  void refs.pointer.offsetWidth;
  refs.pointer.classList.add("tick");
}

function bindAudioUnlockEvents() {
  const unlock = () => {
    if (sanitizeSoundMuted(state.soundMuted)) {
      return;
    }
    resumeAudioContext(true);
  };
  window.addEventListener("pointerdown", unlock, { passive: true, once: true });
  window.addEventListener("touchstart", unlock, { passive: true, once: true });
  window.addEventListener("keydown", unlock, { once: true });
}

function resumeAudioContext(forcePrime = false) {
  if (sanitizeSoundMuted(state.soundMuted)) {
    return;
  }
  const ContextCtor = window.AudioContext || window.webkitAudioContext;
  if (!ContextCtor) {
    return;
  }
  if (!audioContext) {
    audioContext = new ContextCtor({ latencyHint: "interactive" });
  }
  if (audioContext.state === "running") {
    primeAudioContext(forcePrime);
    return;
  }
  if (audioContext.state === "suspended") {
    audioContext
      .resume()
      .then(() => {
        primeAudioContext(forcePrime);
      })
      .catch(() => {});
  }
}

function primeAudioContext(force = false) {
  if (!audioContext || audioContext.state !== "running") {
    return;
  }
  if (audioWarmupDone && !force) {
    return;
  }
  const now = audioContext.currentTime + 0.005;
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(440, now);
  gain.gain.setValueAtTime(0.00001, now);
  gain.gain.exponentialRampToValueAtTime(0.00035, now + 0.004);
  gain.gain.exponentialRampToValueAtTime(0.00001, now + 0.02);
  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start(now);
  oscillator.stop(now + 0.025);
  audioWarmupDone = true;
}

function playPointerPulse() {
  if (sanitizeSoundMuted(state.soundMuted)) {
    return;
  }
  if (!audioContext) {
    resumeAudioContext();
    return;
  }
  if (audioContext.state !== "running") {
    resumeAudioContext();
    return;
  }

  const now = audioContext.currentTime;
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.type = "square";
  oscillator.frequency.setValueAtTime(960, now);
  oscillator.frequency.exponentialRampToValueAtTime(440, now + 0.052);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.11, now + 0.005);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.062);
  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start(now);
  oscillator.stop(now + 0.068);
}

function playSpinEndFanfare() {
  if (sanitizeSoundMuted(state.soundMuted)) {
    return;
  }
  if (!audioContext) {
    resumeAudioContext();
    return;
  }
  if (audioContext.state !== "running") {
    resumeAudioContext();
    return;
  }
  const start = audioContext.currentTime + 0.01;
  const phrase = [
    { freq: 523.25, duration: 0.14, gain: 0.1 },
    { freq: 659.25, duration: 0.16, gain: 0.115 },
    { freq: 783.99, duration: 0.2, gain: 0.13 },
    { freq: 1046.5, duration: 0.68, gain: 0.19, final: true },
  ];

  let cursor = start;
  phrase.forEach((note) => {
    playFanfareTone(cursor, note.freq, note.duration, note.gain, note.final === true);
    cursor += note.duration * 0.72;
  });

  const shimmerStart = cursor - 0.16;
  const shimmerDuration = 0.34;
  const shimmerBuffer = createNoiseBuffer(shimmerDuration);
  const shimmerSource = audioContext.createBufferSource();
  shimmerSource.buffer = shimmerBuffer;
  const shimmerBand = audioContext.createBiquadFilter();
  shimmerBand.type = "bandpass";
  shimmerBand.frequency.setValueAtTime(2800, shimmerStart);
  shimmerBand.Q.setValueAtTime(1.1, shimmerStart);
  const shimmerGain = audioContext.createGain();
  shimmerGain.gain.setValueAtTime(0.0001, shimmerStart);
  shimmerGain.gain.exponentialRampToValueAtTime(0.03, shimmerStart + 0.04);
  shimmerGain.gain.exponentialRampToValueAtTime(0.0001, shimmerStart + shimmerDuration);
  shimmerSource.connect(shimmerBand);
  shimmerBand.connect(shimmerGain);
  shimmerGain.connect(audioContext.destination);
  shimmerSource.start(shimmerStart);
  shimmerSource.stop(shimmerStart + shimmerDuration + 0.02);
}

function playFanfareTone(when, freq, duration, gainValue, isFinal) {
  if (!audioContext || audioContext.state !== "running") {
    return;
  }
  const peak = Math.max(0.02, Number(gainValue) || 0.08);
  const releaseAt = when + Math.max(0.1, Number(duration) || 0.2);
  const oscA = audioContext.createOscillator();
  const oscB = audioContext.createOscillator();
  const sub = audioContext.createOscillator();
  oscA.type = "triangle";
  oscB.type = "square";
  sub.type = "sine";

  const gainA = audioContext.createGain();
  const gainB = audioContext.createGain();
  const gainSub = audioContext.createGain();
  const lowpass = audioContext.createBiquadFilter();
  lowpass.type = "lowpass";
  lowpass.frequency.setValueAtTime(isFinal ? 4200 : 3400, when);
  lowpass.Q.setValueAtTime(0.45, when);

  oscA.frequency.setValueAtTime(freq, when);
  oscA.frequency.exponentialRampToValueAtTime(freq * (isFinal ? 1.02 : 0.995), releaseAt);
  oscB.frequency.setValueAtTime(freq * 2.01, when);
  oscB.frequency.exponentialRampToValueAtTime(freq * (isFinal ? 1.44 : 1.24), releaseAt);
  sub.frequency.setValueAtTime(Math.max(60, freq * 0.5), when);
  sub.frequency.exponentialRampToValueAtTime(Math.max(50, freq * 0.45), releaseAt);

  gainA.gain.setValueAtTime(0.0001, when);
  gainA.gain.exponentialRampToValueAtTime(peak, when + 0.012);
  gainA.gain.exponentialRampToValueAtTime(Math.max(0.0001, peak * 0.48), when + duration * 0.4);
  gainA.gain.exponentialRampToValueAtTime(0.0001, releaseAt);

  gainB.gain.setValueAtTime(0.0001, when);
  gainB.gain.exponentialRampToValueAtTime(Math.max(0.01, peak * 0.36), when + 0.01);
  gainB.gain.exponentialRampToValueAtTime(0.0001, releaseAt);

  gainSub.gain.setValueAtTime(0.0001, when);
  gainSub.gain.exponentialRampToValueAtTime(Math.max(0.008, peak * 0.32), when + 0.018);
  gainSub.gain.exponentialRampToValueAtTime(0.0001, releaseAt);

  oscA.connect(gainA);
  oscB.connect(gainB);
  sub.connect(gainSub);
  gainA.connect(lowpass);
  gainB.connect(lowpass);
  gainSub.connect(lowpass);
  lowpass.connect(audioContext.destination);

  oscA.start(when);
  oscB.start(when);
  sub.start(when);
  oscA.stop(releaseAt + 0.04);
  oscB.stop(releaseAt + 0.04);
  sub.stop(releaseAt + 0.04);
}

function playWinApplause() {
  if (sanitizeSoundMuted(state.soundMuted)) {
    return;
  }
  if (!audioContext || audioContext.state !== "running") {
    return;
  }

  const now = audioContext.currentTime + 0.02;
  const clapCount = 18;
  for (let i = 0; i < clapCount; i += 1) {
    const when = now + i * 0.065 + randomFloat(0, 0.018);
    scheduleClap(when, randomFloat(0.025, 0.055));
  }
  scheduleCrowdBed(now, 1.25);
}

function playFailureTone() {
  if (sanitizeSoundMuted(state.soundMuted)) {
    return;
  }
  if (!audioContext || audioContext.state !== "running") {
    return;
  }
  const now = audioContext.currentTime + 0.01;
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.type = "sawtooth";
  oscillator.frequency.setValueAtTime(520, now);
  oscillator.frequency.exponentialRampToValueAtTime(180, now + 0.26);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.085, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.32);
  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start(now);
  oscillator.stop(now + 0.35);
}

function playArgentinaAnthemSnippet() {
  if (sanitizeSoundMuted(state.soundMuted)) {
    return;
  }
  stopArgentinaAnthemSnippet(false);
  const anthemAudio = getArgentinaAnthemAudio();
  if (!anthemAudio) {
    playArgentinaAnthemSynthSnippet();
    return;
  }

  const startPlayback = () => {
    try {
      anthemAudio.currentTime = ARGENTINA_ANTHEM_SNIPPET_START_SEC;
    } catch (_error) {
      // Ignorar seeks tempranos antes de metadata.
    }
    anthemAudio.volume = ARGENTINA_ANTHEM_VOLUME;
    const playPromise = anthemAudio.play();
    if (playPromise && typeof playPromise.then === "function") {
      playPromise
        .then(() => {
          scheduleArgentinaAnthemStop(anthemAudio);
        })
        .catch(() => {
          stopArgentinaAnthemSnippet(true);
          playArgentinaAnthemSynthSnippet();
        });
      return;
    }
    scheduleArgentinaAnthemStop(anthemAudio);
  };

  if (anthemAudio.readyState >= 1) {
    startPlayback();
    return;
  }

  const onMetadata = () => {
    startPlayback();
  };
  anthemAudio.addEventListener("loadedmetadata", onMetadata, { once: true });
  anthemAudio.load();
}

function getArgentinaAnthemAudio() {
  if (typeof Audio !== "function") {
    return null;
  }
  if (!argentinaAnthemAudio || typeof argentinaAnthemAudio.play !== "function") {
    const audio = new Audio(ARGENTINA_ANTHEM_AUDIO_URL);
    audio.preload = "auto";
    audio.crossOrigin = "anonymous";
    audio.loop = false;
    argentinaAnthemAudio = audio;
  }
  return argentinaAnthemAudio;
}

function scheduleArgentinaAnthemStop(anthemAudio) {
  if (argentinaAnthemStopTimeoutId !== null) {
    clearTimeout(argentinaAnthemStopTimeoutId);
    argentinaAnthemStopTimeoutId = null;
  }
  argentinaAnthemStopTimeoutId = window.setTimeout(() => {
    argentinaAnthemStopTimeoutId = null;
    fadeOutAndStopArgentinaAnthem(anthemAudio);
  }, Math.max(0, ARGENTINA_ANTHEM_SNIPPET_DURATION_SEC * 1000));
}

function fadeOutAndStopArgentinaAnthem(anthemAudio) {
  if (!anthemAudio || anthemAudio.paused) {
    stopArgentinaAnthemSnippet(true);
    return;
  }
  if (argentinaAnthemFadeRafId !== null) {
    cancelAnimationFrame(argentinaAnthemFadeRafId);
    argentinaAnthemFadeRafId = null;
  }
  const fromVolume = Math.max(0.01, Number(anthemAudio.volume) || ARGENTINA_ANTHEM_VOLUME);
  const startAt = performance.now();
  const step = (timestamp) => {
    const elapsed = Math.max(0, timestamp - startAt);
    const ratio = clamp(elapsed / ARGENTINA_ANTHEM_SNIPPET_FADE_MS, 0, 1);
    if (anthemAudio.paused) {
      argentinaAnthemFadeRafId = null;
      stopArgentinaAnthemSnippet(true);
      return;
    }
    anthemAudio.volume = fromVolume * (1 - ratio);
    if (ratio >= 1) {
      argentinaAnthemFadeRafId = null;
      stopArgentinaAnthemSnippet(true);
      return;
    }
    argentinaAnthemFadeRafId = requestAnimationFrame(step);
  };
  argentinaAnthemFadeRafId = requestAnimationFrame(step);
}

function stopArgentinaAnthemSnippet(resetPosition = true) {
  if (argentinaAnthemStopTimeoutId !== null) {
    clearTimeout(argentinaAnthemStopTimeoutId);
    argentinaAnthemStopTimeoutId = null;
  }
  if (argentinaAnthemFadeRafId !== null) {
    cancelAnimationFrame(argentinaAnthemFadeRafId);
    argentinaAnthemFadeRafId = null;
  }
  if (!argentinaAnthemAudio || typeof argentinaAnthemAudio.pause !== "function") {
    return;
  }
  argentinaAnthemAudio.pause();
  argentinaAnthemAudio.volume = ARGENTINA_ANTHEM_VOLUME;
  if (resetPosition) {
    try {
      argentinaAnthemAudio.currentTime = ARGENTINA_ANTHEM_SNIPPET_START_SEC;
    } catch (_error) {
      // Ignorar si no se puede seekear todavia.
    }
  }
}

function playArgentinaAnthemSynthSnippet(attempt = 0) {
  if (sanitizeSoundMuted(state.soundMuted)) {
    return;
  }
  if (!audioContext || audioContext.state !== "running") {
    resumeAudioContext(true);
    if (attempt < 3) {
      window.setTimeout(() => {
        playArgentinaAnthemSynthSnippet(attempt + 1);
      }, 40);
    }
    return;
  }

  const start = audioContext.currentTime + 0.03;
  const phrase = [
    { freq: 392, duration: 0.24, gain: 0.07 },
    { freq: 440, duration: 0.24, gain: 0.075 },
    { freq: 493.88, duration: 0.29, gain: 0.082 },
    { freq: 523.25, duration: 0.35, gain: 0.09 },
    { freq: 493.88, duration: 0.24, gain: 0.082 },
    { freq: 440, duration: 0.22, gain: 0.076 },
    { freq: 392, duration: 0.29, gain: 0.074 },
    { freq: 440, duration: 0.24, gain: 0.078 },
    { freq: 493.88, duration: 0.29, gain: 0.086 },
    { freq: 523.25, duration: 0.34, gain: 0.092 },
    { freq: 587.33, duration: 0.6, gain: 0.1, final: true },
  ];

  let cursor = start;
  phrase.forEach((note) => {
    playAnthemTone(cursor, note.freq, note.duration, note.gain, note.final === true);
    cursor += note.duration * 0.9;
  });
}

function playAnthemTone(when, freq, duration, gainValue, isFinal) {
  if (!audioContext || audioContext.state !== "running") {
    return;
  }
  const sustain = Math.max(0.12, Number(duration) || 0.2);
  const releaseAt = when + sustain;
  const peak = Math.max(0.02, Number(gainValue) || 0.08);

  const lead = audioContext.createOscillator();
  const harmony = audioContext.createOscillator();
  const low = audioContext.createOscillator();
  lead.type = "triangle";
  harmony.type = "sawtooth";
  low.type = "sine";
  lead.frequency.setValueAtTime(freq, when);
  harmony.frequency.setValueAtTime(freq * 2.01, when);
  low.frequency.setValueAtTime(Math.max(70, freq * 0.5), when);

  const leadGain = audioContext.createGain();
  const harmonyGain = audioContext.createGain();
  const lowGain = audioContext.createGain();
  const master = audioContext.createGain();
  const lowpass = audioContext.createBiquadFilter();
  lowpass.type = "lowpass";
  lowpass.frequency.setValueAtTime(isFinal ? 3600 : 3000, when);
  lowpass.Q.setValueAtTime(0.6, when);

  leadGain.gain.setValueAtTime(0.0001, when);
  leadGain.gain.exponentialRampToValueAtTime(peak, when + 0.02);
  leadGain.gain.exponentialRampToValueAtTime(Math.max(0.0001, peak * 0.45), when + sustain * 0.55);
  leadGain.gain.exponentialRampToValueAtTime(0.0001, releaseAt);

  harmonyGain.gain.setValueAtTime(0.0001, when);
  harmonyGain.gain.exponentialRampToValueAtTime(Math.max(0.01, peak * 0.25), when + 0.015);
  harmonyGain.gain.exponentialRampToValueAtTime(0.0001, releaseAt);

  lowGain.gain.setValueAtTime(0.0001, when);
  lowGain.gain.exponentialRampToValueAtTime(Math.max(0.008, peak * 0.2), when + 0.02);
  lowGain.gain.exponentialRampToValueAtTime(0.0001, releaseAt);

  master.gain.setValueAtTime(0.96, when);
  master.gain.exponentialRampToValueAtTime(isFinal ? 1.05 : 0.88, releaseAt);

  lead.connect(leadGain);
  harmony.connect(harmonyGain);
  low.connect(lowGain);
  leadGain.connect(lowpass);
  harmonyGain.connect(lowpass);
  lowGain.connect(lowpass);
  lowpass.connect(master);
  master.connect(audioContext.destination);

  lead.start(when);
  harmony.start(when);
  low.start(when);
  lead.stop(releaseAt + 0.05);
  harmony.stop(releaseAt + 0.05);
  low.stop(releaseAt + 0.05);
}

function scheduleClap(when, gainValue) {
  const duration = 0.028;
  const buffer = createNoiseBuffer(duration);
  const source = audioContext.createBufferSource();
  source.buffer = buffer;

  const band = audioContext.createBiquadFilter();
  band.type = "bandpass";
  band.frequency.value = randomFloat(1200, 2200);
  band.Q.value = 0.65;

  const gain = audioContext.createGain();
  gain.gain.setValueAtTime(0.0001, when);
  gain.gain.exponentialRampToValueAtTime(gainValue, when + 0.002);
  gain.gain.exponentialRampToValueAtTime(0.0001, when + duration);

  source.connect(band);
  band.connect(gain);
  gain.connect(audioContext.destination);
  source.start(when);
  source.stop(when + duration + 0.005);
}

function scheduleCrowdBed(when, duration) {
  const buffer = createNoiseBuffer(duration);
  const source = audioContext.createBufferSource();
  source.buffer = buffer;

  const lowpass = audioContext.createBiquadFilter();
  lowpass.type = "lowpass";
  lowpass.frequency.value = 520;
  lowpass.Q.value = 0.4;

  const gain = audioContext.createGain();
  gain.gain.setValueAtTime(0.0001, when);
  gain.gain.exponentialRampToValueAtTime(0.014, when + 0.08);
  gain.gain.exponentialRampToValueAtTime(0.0001, when + duration);

  source.connect(lowpass);
  lowpass.connect(gain);
  gain.connect(audioContext.destination);
  source.start(when);
  source.stop(when + duration + 0.01);
}

function createNoiseBuffer(durationSec) {
  const safeDuration = Math.max(0.012, Number(durationSec) || 0.03);
  const frameCount = Math.max(1, Math.floor(audioContext.sampleRate * safeDuration));
  const buffer = audioContext.createBuffer(1, frameCount, audioContext.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < frameCount; i += 1) {
    const envelope = 1 - i / frameCount;
    data[i] = (Math.random() * 2 - 1) * envelope;
  }
  return buffer;
}

function setRimLightMode(nextMode) {
  rimLightMode = nextMode;
  if (nextMode === RIM_LIGHT_MODE.SPIN) {
    rimWinnerEndTime = 0;
    if (rimLightAnimationRafId !== null) {
      cancelAnimationFrame(rimLightAnimationRafId);
      rimLightAnimationRafId = null;
    }
    return;
  }
  if (nextMode !== RIM_LIGHT_MODE.WINNER) {
    rimWinnerEndTime = 0;
  }
  ensureRimLightAnimationLoop();
}

function startWinnerLights(durationMs) {
  setRimLightMode(RIM_LIGHT_MODE.WINNER);
  rimWinnerEndTime = performance.now() + Math.max(0, Number(durationMs) || 0);
  ensureRimLightAnimationLoop();
}

function startBackgroundEmojiRain() {
  if (!(refs.bgEmojiRain instanceof HTMLElement)) {
    return;
  }
  const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  if (prefersReducedMotion) {
    return;
  }
  stopBackgroundEmojiRain();

  const scheduleNext = () => {
    bgEmojiRainTimerId = window.setTimeout(() => {
      spawnBackgroundEmojiDrop();
      scheduleNext();
    }, randomInt(BG_RAIN_MIN_DELAY_MS, BG_RAIN_MAX_DELAY_MS));
  };

  for (let i = 0; i < 14; i += 1) {
    spawnBackgroundEmojiDrop(true);
  }
  scheduleNext();
}

function stopBackgroundEmojiRain() {
  if (bgEmojiRainTimerId !== null) {
    clearTimeout(bgEmojiRainTimerId);
    bgEmojiRainTimerId = null;
  }
}

function spawnBackgroundEmojiDrop(seed = false) {
  if (!(refs.bgEmojiRain instanceof HTMLElement)) {
    return;
  }
  if (refs.bgEmojiRain.childElementCount >= BG_RAIN_MAX_ACTIVE_DROPS) {
    return;
  }

  const drop = document.createElement("span");
  drop.className = "bg-emoji-drop";
  drop.textContent = BG_RAIN_EMOJIS[randomInt(0, BG_RAIN_EMOJIS.length - 1)];
  drop.style.left = `${randomFloat(-6, 100)}%`;
  drop.style.fontSize = `${randomInt(20, 40)}px`;
  drop.style.setProperty("--drift-x", `${randomInt(-95, 95)}px`);
  drop.style.setProperty("--spin", `${randomInt(-70, 70)}deg`);
  drop.style.setProperty("--drop-alpha", randomFloat(0.3, 0.55).toFixed(2));
  const duration = randomFloat(10.2, 19.6);
  drop.style.animationDuration = `${duration.toFixed(2)}s`;
  if (seed) {
    drop.style.animationDelay = `${randomFloat(-duration, -0.2).toFixed(2)}s`;
  }
  drop.addEventListener(
    "animationend",
    () => {
      drop.remove();
    },
    { once: true },
  );
  refs.bgEmojiRain.append(drop);
}

function ensureRimLightAnimationLoop() {
  if (rimLightMode === RIM_LIGHT_MODE.SPIN) {
    return;
  }
  if (rimLightAnimationRafId !== null) {
    return;
  }
  const animate = (timestamp) => {
    if (rimLightMode === RIM_LIGHT_MODE.SPIN) {
      rimLightAnimationRafId = null;
      return;
    }
    if (rimLightMode === RIM_LIGHT_MODE.WINNER && timestamp >= rimWinnerEndTime) {
      setRimLightMode(RIM_LIGHT_MODE.STANDBY);
    }
    drawWheel();
    rimLightAnimationRafId = requestAnimationFrame(animate);
  };
  rimLightAnimationRafId = requestAnimationFrame(animate);
}

function addParticipant() {
  if (state.items.length >= MAX_PARTICIPANTS) {
    setMessage(`Maximo ${MAX_PARTICIPANTS} participantes por configuracion.`, "error");
    return;
  }

  const number = state.items.length + 1;
  state.items.push({
    id: makeId(),
    emoji: sanitizeEmoji(undefined, number - 1),
    name: normalizeName(`Jugador ${number}`, number - 1),
    color: PALETTE[(number - 1) % PALETTE.length],
    animationMode: DEFAULT_PARTICIPANT_ANIMATION_MODE,
    hidden: false,
    pct: 0,
  });
  const visibleItems = getVisibleItems(state.items);
  if (visibleItems.length > 0) {
    equalizePercentages(
      visibleItems,
      getParticipantTargetUnits(
        visibleItems.length,
        getParticipantSharePctForConfig(state.retrySliceEnabled, state.retrySlicePct),
      ),
    );
  }
  saveState();
  render();
  setMessage("Participante agregado y porcentajes equilibrados.", "success");
}

function removeParticipant(index) {
  if (state.items.length <= MIN_PARTICIPANTS) {
    setMessage("No se puede bajar de 2 participantes.", "error");
    return;
  }
  state.items.splice(index, 1);
  normalizeVisiblePercentages(
    state.items,
    getParticipantSharePctForConfig(state.retrySliceEnabled, state.retrySlicePct),
  );
  saveState();
  render();
  setMessage("Participante eliminado.", "success");
}

function resetState() {
  state = defaultState();
  currentRotationDeg = 0;
  isSpinning = false;
  setRimLightMode(RIM_LIGHT_MODE.STANDBY);
  saveState();
  render();
  refs.resultText.textContent = "Configuracion restablecida. Listo para girar.";
  setMessage("Se restablecio la configuracion por defecto.", "success");
}

function setSpinDurationMin(rawValue) {
  const nextMin = sanitizeSpinDurationValue(rawValue);
  const nextMax = Math.max(nextMin, state.spinDurationMaxSec);
  if (nextMin === state.spinDurationMinSec && nextMax === state.spinDurationMaxSec) {
    renderDuration();
    return;
  }
  state.spinDurationMinSec = nextMin;
  state.spinDurationMaxSec = nextMax;
  saveState();
  renderDuration();
}

function setSpinDurationMax(rawValue) {
  const nextMax = sanitizeSpinDurationValue(rawValue);
  const nextMin = Math.min(state.spinDurationMinSec, nextMax);
  if (nextMin === state.spinDurationMinSec && nextMax === state.spinDurationMaxSec) {
    renderDuration();
    return;
  }
  state.spinDurationMinSec = nextMin;
  state.spinDurationMaxSec = nextMax;
  saveState();
  renderDuration();
}

function setTextLayout(rawValue) {
  const next = sanitizeTextLayout(rawValue);
  if (next === state.textLayout) {
    renderTextSettings();
    return;
  }
  state.textLayout = next;
  saveState();
  renderTextSettings();
  drawWheel();
}

function setWheelEmojiMode(rawValue) {
  const next = sanitizeWheelEmojiMode(rawValue);
  if (next === state.wheelEmojiMode) {
    renderTextSettings();
    return;
  }
  state.wheelEmojiMode = next;
  saveState();
  renderTextSettings();
  drawWheel();
}

function setTextPosition(rawValue) {
  const next = sanitizeTextPosition(rawValue);
  if (next === state.textPositionPct) {
    renderTextSettings();
    return;
  }
  state.textPositionPct = next;
  saveState();
  renderTextSettings();
  drawWheel();
}

function setFontSize(rawValue) {
  const next = sanitizeFontSize(rawValue);
  if (next === state.fontSizePx) {
    renderTextSettings();
    return;
  }
  state.fontSizePx = next;
  saveState();
  renderTextSettings();
  drawWheel();
}

function setFontFamily(rawValue) {
  const next = sanitizeFontFamily(rawValue);
  if (next === state.fontFamilyId) {
    renderTextSettings();
    return;
  }
  state.fontFamilyId = next;
  saveState();
  renderTextSettings();
  drawWheel();
}

function setWinnerAnimationMode(rawValue) {
  const next = sanitizeWinnerAnimationMode(rawValue);
  if (next === state.winnerAnimationMode) {
    renderTextSettings();
    return;
  }
  state.winnerAnimationMode = next;
  saveState();
  renderTextSettings();
}

function setSoundMuted(rawValue) {
  const next = sanitizeSoundMuted(rawValue);
  if (next === sanitizeSoundMuted(state.soundMuted)) {
    renderSoundToggle();
    return;
  }
  state.soundMuted = next;
  if (next) {
    stopArgentinaAnthemSnippet(true);
    if (audioContext && audioContext.state === "running") {
      audioContext.suspend().catch(() => {});
    }
  } else {
    resumeAudioContext(true);
  }
  saveState();
  renderSoundToggle();
}

function setParticipantAnimationMode(index, rawValue) {
  if (!state.items[index]) {
    return;
  }
  const next = sanitizeParticipantAnimationMode(rawValue);
  if (next === sanitizeParticipantAnimationMode(state.items[index].animationMode)) {
    return;
  }
  state.items[index].animationMode = next;
  saveState();
  drawWheel();
  renderItemList();
}

function setParticipantHidden(index, hidden) {
  if (!state.items[index]) {
    return;
  }
  const nextHidden = sanitizeParticipantHidden(hidden);
  const currentHidden = sanitizeParticipantHidden(state.items[index].hidden);
  if (nextHidden === currentHidden) {
    return;
  }
  if (nextHidden && getVisibleParticipantCount(state.items) <= MIN_PARTICIPANTS) {
    setMessage("La rula necesita al menos 2 participantes visibles.", "error");
    return;
  }
  state.items[index].hidden = nextHidden;
  normalizeVisiblePercentages(
    state.items,
    getParticipantSharePctForConfig(state.retrySliceEnabled, state.retrySlicePct),
  );
  saveState();
  render();
}

function setRetrySliceEnabled(rawValue) {
  const next = sanitizeRetrySliceEnabled(rawValue);
  if (next === sanitizeRetrySliceEnabled(state.retrySliceEnabled)) {
    renderItemList();
    return;
  }
  state.retrySliceEnabled = next;
  normalizeVisiblePercentages(
    state.items,
    getParticipantSharePctForConfig(state.retrySliceEnabled, state.retrySlicePct),
  );
  saveState();
  render();
}

function setRetrySlicePct(rawValue) {
  const next = sanitizeRetrySlicePct(rawValue);
  if (next === sanitizeRetrySlicePct(state.retrySlicePct)) {
    renderItemList();
    return;
  }
  state.retrySlicePct = next;
  normalizeVisiblePercentages(
    state.items,
    getParticipantSharePctForConfig(state.retrySliceEnabled, state.retrySlicePct),
  );
  saveState();
  render();
}

function setParticipantPercent(index, nextPct) {
  if (!state.items[index] || sanitizeParticipantHidden(state.items[index].hidden)) {
    return;
  }
  const visibleIndexes = state.items
    .map((item, itemIndex) => ({ item, itemIndex }))
    .filter((entry) => !sanitizeParticipantHidden(entry.item.hidden))
    .map((entry) => entry.itemIndex);
  const visibleCount = visibleIndexes.length;
  if (visibleCount < 2) {
    return;
  }

  const targetUnits = getParticipantTargetUnits(
    visibleCount,
    getParticipantSharePctForConfig(state.retrySliceEnabled, state.retrySlicePct),
  );
  const maxUnits = targetUnits - MIN_ITEM_UNITS * (visibleCount - 1);
  const editedUnits = clamp(Math.round(nextPct * 100), MIN_ITEM_UNITS, maxUnits);
  const restUnits = targetUnits - editedUnits;
  const restExtraUnits = restUnits - MIN_ITEM_UNITS * (visibleCount - 1);
  const otherIndexes = visibleIndexes.filter((itemIndex) => itemIndex !== index);
  const otherWeights = otherIndexes.map((i) =>
    Math.max(0, Math.round(state.items[i].pct * 100) - MIN_ITEM_UNITS),
  );

  const redistributedExtra = distributeUnits(otherWeights, restExtraUnits);
  const nextUnits = new Array(visibleCount).fill(MIN_ITEM_UNITS);
  const visibleOrderMap = new Map(visibleIndexes.map((itemIndex, order) => [itemIndex, order]));
  const editedOrder = visibleOrderMap.get(index);
  if (editedOrder === undefined) {
    return;
  }

  nextUnits[editedOrder] = editedUnits;

  otherIndexes.forEach((itemIndex, order) => {
    const nextOrder = visibleOrderMap.get(itemIndex);
    if (nextOrder === undefined) {
      return;
    }
    nextUnits[nextOrder] = MIN_ITEM_UNITS + redistributedExtra[order];
  });

  visibleIndexes.forEach((itemIndex, order) => {
    state.items[itemIndex].pct = nextUnits[order] / 100;
  });
}

function weightedRandomIndex(items) {
  if (!Array.isArray(items) || items.length === 0) {
    return -1;
  }
  const total = items.reduce((acc, item) => acc + Math.max(0, Number(item?.pct) || 0), 0);
  if (total <= 0) {
    return 0;
  }
  const target = Math.random() * total;
  let cursor = 0;
  for (let i = 0; i < items.length; i += 1) {
    cursor += Math.max(0, Number(items[i]?.pct) || 0);
    if (target <= cursor) {
      return i;
    }
  }
  return items.length - 1;
}

function getSegmentsDeg(items = getSpinEntries()) {
  let start = 0;
  return items.map((item) => {
    const spanDeg = (item.pct / 100) * 360;
    const segment = { startDeg: start, spanDeg };
    start += spanDeg;
    return segment;
  });
}

function normalizePercentages(items, targetUnitsRaw = TOTAL_UNITS) {
  if (!Array.isArray(items) || items.length === 0) {
    return;
  }
  const totalUnits = Math.max(MIN_ITEM_UNITS * items.length, Math.round(Number(targetUnitsRaw) || TOTAL_UNITS));
  if (items.length === 1) {
    items[0].pct = totalUnits / 100;
    return;
  }
  const minBase = MIN_ITEM_UNITS * items.length;
  const extraPool = totalUnits - minBase;
  const weights = items.map((item) => Math.max(0, Number(item.pct) || 0));
  const distributed = distributeUnits(weights, extraPool);
  items.forEach((item, index) => {
    item.pct = (MIN_ITEM_UNITS + distributed[index]) / 100;
  });
}

function equalizePercentages(items, targetUnitsRaw = TOTAL_UNITS) {
  if (!Array.isArray(items) || items.length === 0) {
    return;
  }
  const totalUnits = Math.max(MIN_ITEM_UNITS * items.length, Math.round(Number(targetUnitsRaw) || TOTAL_UNITS));
  const base = Math.floor(totalUnits / items.length);
  let remainder = totalUnits - base * items.length;
  items.forEach((item) => {
    let units = base;
    if (remainder > 0) {
      units += 1;
      remainder -= 1;
    }
    item.pct = units / 100;
  });
}

function distributeUnits(weights, targetUnits) {
  const size = weights.length;
  if (size === 0 || targetUnits <= 0) {
    return new Array(size).fill(0);
  }

  const clean = weights.map((w) => Math.max(0, Number(w) || 0));
  const totalWeight = clean.reduce((acc, value) => acc + value, 0);

  if (totalWeight === 0) {
    const even = Math.floor(targetUnits / size);
    const units = new Array(size).fill(even);
    let remainder = targetUnits - even * size;
    for (let i = 0; i < size && remainder > 0; i += 1) {
      units[i] += 1;
      remainder -= 1;
    }
    return units;
  }

  const exact = clean.map((weight) => (weight / totalWeight) * targetUnits);
  const units = exact.map((value) => Math.floor(value));
  let remainder = targetUnits - units.reduce((acc, value) => acc + value, 0);

  const order = exact
    .map((value, index) => ({ index, fraction: value - units[index] }))
    .sort((a, b) => b.fraction - a.fraction);

  for (let i = 0; i < order.length && remainder > 0; i += 1) {
    units[order[i].index] += 1;
    remainder -= 1;
  }
  return units;
}

function loadState() {
  const cookieConfig = safeParse(readCookie(COOKIE_KEY));
  if (cookieConfig) {
    return sanitizeState(cookieConfig);
  }

  const storageConfig = safeParse(safeLocalGet(STORAGE_KEY));
  if (storageConfig) {
    return sanitizeState(storageConfig);
  }

  return defaultState();
}

function defaultState() {
  const items = DEFAULT_PARTICIPANTS.map((participant, index) => ({
    id: makeId(),
    emoji: sanitizeEmoji(participant.emoji, index),
    name: normalizeName(participant.name, index),
    color: sanitizeColor(participant.color, index),
    animationMode: DEFAULT_PARTICIPANT_ANIMATION_MODE,
    hidden: false,
    pct: 0,
  }));
  equalizePercentages(items);
  return {
    version: CONFIG_VERSION,
    spinDurationMinSec: DEFAULT_SPIN_DURATION_MIN,
    spinDurationMaxSec: DEFAULT_SPIN_DURATION_MAX,
    textLayout: DEFAULT_TEXT_LAYOUT,
    wheelEmojiMode: DEFAULT_WHEEL_EMOJI_MODE,
    textPositionPct: DEFAULT_TEXT_POSITION_PCT,
    fontSizePx: DEFAULT_FONT_SIZE_PX,
    fontFamilyId: DEFAULT_FONT_FAMILY_ID,
    winnerAnimationMode: DEFAULT_WINNER_ANIMATION_MODE,
    soundMuted: DEFAULT_SOUND_MUTED,
    retrySliceEnabled: DEFAULT_RETRY_SLICE_ENABLED,
    retrySlicePct: DEFAULT_RETRY_SLICE_PCT,
    retrySliceColor: DEFAULT_RETRY_SLICE_COLOR,
    items,
  };
}

function sanitizeState(input) {
  const fallback = defaultState();
  const legacyDuration = input?.spinDurationSec;
  const durationMinRaw = input?.spinDurationMinSec ?? legacyDuration;
  const durationMaxRaw = input?.spinDurationMaxSec ?? legacyDuration;
  const [durationMin, durationMax] = sanitizeSpinDurationRange(durationMinRaw, durationMaxRaw);
  const rawItems = Array.isArray(input?.items) ? input.items.slice(0, MAX_PARTICIPANTS) : [];

  const items = rawItems
    .map((item, index) => {
      const emoji = sanitizeEmoji(item?.emoji, index);
      const normalizedName = normalizeName(item?.name, index);
      const migratedName = normalizedName === "Pipi" && emoji === "🐈‍⬛" ? "El pipi" : normalizedName;
      return {
        id: typeof item?.id === "string" && item.id.trim() ? item.id.trim() : makeId(),
        emoji,
        name: migratedName,
        color: sanitizeColor(item?.color, index),
        animationMode: sanitizeParticipantAnimationMode(item?.animationMode),
        hidden: sanitizeParticipantHidden(item?.hidden),
        pct: Number.isFinite(Number(item?.pct)) ? Number(item.pct) : 0,
      };
    })
    .filter((item) => item.name.length > 0);

  if (items.length < MIN_PARTICIPANTS) {
    return fallback;
  }

  const retryEnabled = sanitizeRetrySliceEnabled(input?.retrySliceEnabled);
  const retryPct = sanitizeRetrySlicePct(input?.retrySlicePct);
  normalizeVisiblePercentages(items, getParticipantSharePctForConfig(retryEnabled, retryPct));
  return {
    version: CONFIG_VERSION,
    spinDurationMinSec: durationMin,
    spinDurationMaxSec: durationMax,
    textLayout: sanitizeTextLayout(input?.textLayout),
    wheelEmojiMode: sanitizeWheelEmojiMode(input?.wheelEmojiMode),
    textPositionPct: sanitizeTextPosition(input?.textPositionPct),
    fontSizePx: sanitizeFontSize(input?.fontSizePx),
    fontFamilyId: sanitizeFontFamily(input?.fontFamilyId),
    winnerAnimationMode: sanitizeWinnerAnimationMode(input?.winnerAnimationMode),
    soundMuted: sanitizeSoundMuted(input?.soundMuted),
    retrySliceEnabled: retryEnabled,
    retrySlicePct: retryPct,
    retrySliceColor: sanitizeRetrySliceColor(input?.retrySliceColor),
    items,
  };
}

function saveState() {
  const payload = JSON.stringify({
    version: CONFIG_VERSION,
    spinDurationMinSec: sanitizeSpinDurationValue(state.spinDurationMinSec),
    spinDurationMaxSec: sanitizeSpinDurationValue(state.spinDurationMaxSec),
    textLayout: sanitizeTextLayout(state.textLayout),
    wheelEmojiMode: sanitizeWheelEmojiMode(state.wheelEmojiMode),
    textPositionPct: sanitizeTextPosition(state.textPositionPct),
    fontSizePx: sanitizeFontSize(state.fontSizePx),
    fontFamilyId: sanitizeFontFamily(state.fontFamilyId),
    winnerAnimationMode: sanitizeWinnerAnimationMode(state.winnerAnimationMode),
    soundMuted: sanitizeSoundMuted(state.soundMuted),
    retrySliceEnabled: sanitizeRetrySliceEnabled(state.retrySliceEnabled),
    retrySlicePct: sanitizeRetrySlicePct(state.retrySlicePct),
    retrySliceColor: sanitizeRetrySliceColor(state.retrySliceColor),
    items: state.items.map((item, index) => ({
      id: item.id,
      emoji: sanitizeEmoji(item.emoji, index),
      name: normalizeName(item.name, index),
      color: sanitizeColor(item.color, index),
      animationMode: sanitizeParticipantAnimationMode(item.animationMode),
      hidden: sanitizeParticipantHidden(item.hidden),
      pct: round2(item.pct),
    })),
  });

  const encoded = encodeURIComponent(payload);
  let wroteCookie = false;
  try {
    document.cookie = `${COOKIE_KEY}=${encoded}; Max-Age=31536000; Path=/; SameSite=Lax`;
    wroteCookie = readCookie(COOKIE_KEY) === encoded;
  } catch (_error) {
    wroteCookie = false;
  }

  if (!wroteCookie) {
    setMessage("Cookie no disponible. Se guardo en almacenamiento local.", "error");
  }

  try {
    localStorage.setItem(STORAGE_KEY, payload);
  } catch (_error) {
    if (!wroteCookie) {
      setMessage("No se pudo guardar la configuracion local.", "error");
    }
  }
}

function safeLocalGet(key) {
  try {
    return localStorage.getItem(key);
  } catch (_error) {
    return null;
  }
}

function readCookie(name) {
  const prefix = `${name}=`;
  const chunks = document.cookie ? document.cookie.split("; ") : [];
  const row = chunks.find((part) => part.startsWith(prefix));
  return row ? row.slice(prefix.length) : null;
}

function safeParse(rawValue) {
  if (!rawValue || typeof rawValue !== "string") {
    return null;
  }

  try {
    return JSON.parse(decodeURIComponent(rawValue));
  } catch (_firstError) {
    try {
      return JSON.parse(rawValue);
    } catch (_secondError) {
      return null;
    }
  }
}

function setControlsDisabled(disabled) {
  refs.addItemButton.disabled = disabled;
  refs.resetButton.disabled = disabled;
  refs.resetConfirmAccept.disabled = disabled;
  refs.resetConfirmCancel.disabled = disabled;
  refs.canvas.classList.toggle("spinning", disabled);
  if (disabled && !refs.colorModal.hidden) {
    closeColorModal();
  }
  if (disabled && !refs.emojiModal.hidden) {
    closeEmojiModal();
  }
  if (disabled && !refs.resetConfirmModal.hidden) {
    closeResetConfirmModal();
  }
  refs.durationRangeMin.disabled = disabled;
  refs.durationRangeMax.disabled = disabled;
  refs.durationMinNumber.disabled = disabled;
  refs.durationMaxNumber.disabled = disabled;
  refs.textLayoutSelect.disabled = disabled;
  refs.emojiDisplaySelect.disabled = disabled;
  refs.textPositionRange.disabled = disabled;
  refs.fontSizeRange.disabled = disabled;
  refs.fontFamilySelect.disabled = disabled;
  refs.winAnimationSelect.disabled = disabled;
  renderItemList();
}

function setMessage(text, type = "") {
  refs.formMessage.textContent = text;
  refs.formMessage.className = "form-message";
  if (type) {
    refs.formMessage.classList.add(type);
  }
}

function sanitizeSpinDurationValue(value) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    return DEFAULT_SPIN_DURATION_MIN;
  }
  return clamp(Math.round(parsed), MIN_SPIN_DURATION, MAX_SPIN_DURATION);
}

function sanitizeSpinDurationRange(minValue, maxValue) {
  const parsedMin = Number(minValue);
  const parsedMax = Number(maxValue);
  const min = Number.isFinite(parsedMin)
    ? sanitizeSpinDurationValue(parsedMin)
    : DEFAULT_SPIN_DURATION_MIN;
  const max = Number.isFinite(parsedMax)
    ? sanitizeSpinDurationValue(parsedMax)
    : DEFAULT_SPIN_DURATION_MAX;
  return min <= max ? [min, max] : [max, min];
}

function sanitizeTextLayout(value) {
  if (typeof value === "string" && TEXT_LAYOUT_VALUES.has(value)) {
    return value;
  }
  return DEFAULT_TEXT_LAYOUT;
}

function sanitizeWheelEmojiMode(value) {
  if (typeof value === "string" && WHEEL_EMOJI_MODE_VALUES.has(value)) {
    return value;
  }
  return DEFAULT_WHEEL_EMOJI_MODE;
}

function sanitizeTextPosition(value) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    return DEFAULT_TEXT_POSITION_PCT;
  }
  return clamp(Math.round(parsed), MIN_TEXT_POSITION_PCT, MAX_TEXT_POSITION_PCT);
}

function sanitizeFontSize(value) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    return DEFAULT_FONT_SIZE_PX;
  }
  return clamp(Math.round(parsed), MIN_FONT_SIZE_PX, MAX_FONT_SIZE_PX);
}

function sanitizeFontFamily(value) {
  if (typeof value === "string" && FONT_OPTION_MAP.has(value)) {
    return value;
  }
  return DEFAULT_FONT_FAMILY_ID;
}

function sanitizeWinnerAnimationMode(value) {
  if (typeof value === "string" && WINNER_ANIMATION_MODE_VALUES.has(value)) {
    return value;
  }
  return DEFAULT_WINNER_ANIMATION_MODE;
}

function sanitizeParticipantAnimationMode(value) {
  if (typeof value === "string" && PARTICIPANT_ANIMATION_MODE_VALUES.has(value)) {
    return value;
  }
  return DEFAULT_PARTICIPANT_ANIMATION_MODE;
}

function sanitizeParticipantHidden(value) {
  return value === true;
}

function sanitizeSoundMuted(value) {
  return value === true;
}

function sanitizeRetrySliceEnabled(value) {
  return value === true;
}

function sanitizeRetrySlicePct(value) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    return DEFAULT_RETRY_SLICE_PCT;
  }
  return clamp(Math.round(parsed), MIN_RETRY_SLICE_PCT, MAX_RETRY_SLICE_PCT);
}

function sanitizeRetrySliceColor(value) {
  const normalized = typeof value === "string" ? value.trim() : "";
  if (/^#[0-9a-fA-F]{6}$/.test(normalized)) {
    return normalized.toUpperCase();
  }
  return DEFAULT_RETRY_SLICE_COLOR;
}

function isRetrySliceColorIndex(index) {
  return Number(index) === RETRY_SLICE_COLOR_INDEX;
}

function getVisibleItems(items = state.items) {
  if (!Array.isArray(items)) {
    return [];
  }
  return items.filter((item) => !sanitizeParticipantHidden(item?.hidden));
}

function getSpinEntries() {
  const participants = getVisibleItems();
  if (participants.length === 0) {
    return [];
  }

  const retryEnabled = sanitizeRetrySliceEnabled(state.retrySliceEnabled);
  const retryPct = retryEnabled ? sanitizeRetrySlicePct(state.retrySlicePct) : 0;
  const entries = participants.map((item) => ({
    type: "participant",
    item,
    pct: Math.max(0, Number(item?.pct) || 0),
  }));

  if (retryEnabled && retryPct > 0) {
    entries.push({
      type: "retry",
      label: RETRY_SLICE_LABEL,
      color: sanitizeRetrySliceColor(state.retrySliceColor),
      pct: retryPct,
    });
  }

  const total = entries.reduce((acc, entry) => acc + Math.max(0, Number(entry?.pct) || 0), 0);
  if (total <= 0) {
    return [];
  }

  return entries
    .map((entry) => ({
      ...entry,
      pct: (Math.max(0, Number(entry?.pct) || 0) / total) * 100,
    }))
    .filter((entry) => entry.pct > 0);
}

function getVisibleParticipantCount(items = state.items) {
  return getVisibleItems(items).length;
}

function normalizeVisiblePercentages(items, participantSharePct = 100) {
  const visibleItems = getVisibleItems(items);
  if (visibleItems.length === 0) {
    return;
  }
  const targetUnits = getParticipantTargetUnits(visibleItems.length, participantSharePct);
  if (visibleItems.length === 1) {
    visibleItems[0].pct = targetUnits / 100;
    return;
  }
  normalizePercentages(visibleItems, targetUnits);
}

function getParticipantSharePctForConfig(retryEnabledValue, retryPctValue) {
  const retryEnabled = sanitizeRetrySliceEnabled(retryEnabledValue);
  if (!retryEnabled) {
    return 100;
  }
  const retryPct = sanitizeRetrySlicePct(retryPctValue);
  return clamp(100 - retryPct, 0, 100);
}

function getParticipantTargetUnits(visibleCount, participantSharePct = 100) {
  const count = Math.max(0, Math.floor(Number(visibleCount) || 0));
  const minUnits = MIN_ITEM_UNITS * count;
  const desiredUnits = Math.round(clamp(Number(participantSharePct) || 0, 0, 100) * 100);
  return Math.max(minUnits, desiredUnits);
}

function normalizeName(rawName, index = 0) {
  const asString = typeof rawName === "string" ? rawName : "";
  const trimmed = asString.trim().slice(0, MAX_PARTICIPANT_NAME_LENGTH);
  return trimmed || `Jugador ${index + 1}`;
}

function sanitizeColor(rawColor, index = 0) {
  const color = typeof rawColor === "string" ? rawColor.trim() : "";
  if (/^#[0-9a-fA-F]{6}$/.test(color)) {
    return color;
  }
  const safeIndex = ((index % PALETTE.length) + PALETTE.length) % PALETTE.length;
  return PALETTE[safeIndex];
}

function normalizeHexColorInput(rawValue) {
  if (typeof rawValue !== "string") {
    return null;
  }
  const clean = rawValue.trim();
  if (!clean) {
    return null;
  }
  const prefixed = clean.startsWith("#") ? clean : `#${clean}`;
  if (!/^#[0-9a-fA-F]{6}$/.test(prefixed)) {
    return null;
  }
  return prefixed.toUpperCase();
}

function sanitizeEmoji(rawEmoji, index = 0) {
  if (typeof rawEmoji === "string") {
    const trimmed = rawEmoji.trim();
    if (trimmed) {
      const emoji = firstGrapheme(trimmed);
      if (isLikelyEmoji(emoji)) {
        return emoji;
      }
    }
  }
  return DEFAULT_EMOJIS[index % DEFAULT_EMOJIS.length];
}

function hexToRgb(hexColor) {
  const color = sanitizeColor(hexColor);
  return {
    r: Number.parseInt(color.slice(1, 3), 16),
    g: Number.parseInt(color.slice(3, 5), 16),
    b: Number.parseInt(color.slice(5, 7), 16),
  };
}

function rgbToHex(r, g, b) {
  const rr = clamp(Math.round(r), 0, 255).toString(16).padStart(2, "0");
  const gg = clamp(Math.round(g), 0, 255).toString(16).padStart(2, "0");
  const bb = clamp(Math.round(b), 0, 255).toString(16).padStart(2, "0");
  return `#${rr}${gg}${bb}`.toUpperCase();
}

function firstGrapheme(value) {
  try {
    if (typeof Intl !== "undefined" && typeof Intl.Segmenter === "function") {
      const segmenter = new Intl.Segmenter(undefined, { granularity: "grapheme" });
      const iterator = segmenter.segment(value)[Symbol.iterator]();
      const first = iterator.next();
      if (!first.done && typeof first.value?.segment === "string" && first.value.segment) {
        return first.value.segment;
      }
    }
  } catch (_error) {
    // fallback below
  }
  return Array.from(value)[0] || value;
}

function isLikelyEmoji(value) {
  if (typeof value !== "string" || !value.trim()) {
    return false;
  }
  const sample = value.trim();
  try {
    if (/\p{Regional_Indicator}/u.test(sample)) {
      return true;
    }
    if (sample.includes("\u200d") || sample.includes("\ufe0f")) {
      return true;
    }
    if (/\p{Emoji_Presentation}/u.test(sample)) {
      return true;
    }
    return /^[0-9#*]\uFE0F?\u20E3$/u.test(sample);
  } catch (_error) {
    return sample.length <= 4;
  }
}

function normalizeSearch(value) {
  if (typeof value !== "string") {
    return "";
  }
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function buildEmojiNameIndex(sections) {
  const map = new Map();
  const seed = [
    ["😀", "grinning face", "cara sonriendo", ["smile", "sonrisa", "feliz"]],
    ["😎", "smiling face with sunglasses", "cara con lentes de sol", ["cool", "lentes"]],
    ["🤖", "robot", "robot", ["ia", "bot"]],
    ["🔥", "fire", "fuego", ["hot", "caliente"]],
    ["🍀", "four leaf clover", "trebol de cuatro hojas", ["luck", "suerte", "trebol"]],
    ["🚀", "rocket", "cohete", ["space", "espacio"]],
    ["🎯", "bullseye", "diana", ["target", "objetivo"]],
    ["⭐", "star", "estrella", ["favorite", "favorito"]],
    ["⚡", "high voltage", "rayo", ["energia", "electricidad"]],
    ["🌈", "rainbow", "arcoiris", ["color"]],
    ["😂", "face with tears of joy", "cara llorando de risa", ["jaja", "risa", "laugh"]],
    ["😍", "smiling face with heart-eyes", "cara con ojos de corazon", ["amor", "love"]],
    ["🥳", "partying face", "cara de fiesta", ["party", "fiesta"]],
    ["😭", "loudly crying face", "cara llorando", ["triste", "cry"]],
    ["👍", "thumbs up", "pulgar arriba", ["ok", "bien"]],
    ["👏", "clapping hands", "aplausos", ["bravo", "clap"]],
    ["🙏", "folded hands", "manos juntas", ["rezar", "please"]],
    ["💪", "flexed biceps", "biceps flexionado", ["fuerza", "strong"]],
    ["🐶", "dog face", "cara de perro", ["perro", "dog"]],
    ["🐱", "cat face", "cara de gato", ["gato", "cat"]],
    ["🦁", "lion", "leon", ["lion", "king"]],
    ["🐼", "panda", "panda", ["oso"]],
    ["🍕", "pizza", "pizza", ["comida", "food"]],
    ["🍔", "hamburger", "hamburguesa", ["burger"]],
    ["🍬", "candy", "caramelo", ["dulce", "sweet", "golosina"]],
    ["🍭", "lollipop", "chupetin", ["caramelo", "dulce", "sweet", "paleta"]],
    ["🍫", "chocolate bar", "chocolate", ["candy", "caramelo", "dulce", "sweet"]],
    ["🌮", "taco", "taco", ["mexico"]],
    ["🍣", "sushi", "sushi", ["japon", "japan"]],
    ["☕", "hot beverage", "cafe", ["coffee"]],
    ["🎉", "party popper", "confeti", ["celebracion", "party"]],
    ["🏆", "trophy", "trofeo", ["winner", "ganador"]],
    ["⚽", "soccer ball", "pelota de futbol", ["football", "futbol"]],
    ["🏀", "basketball", "pelota de basquet", ["nba", "basket"]],
    ["🎮", "video game", "videojuego", ["game", "juego"]],
    ["🎵", "musical note", "nota musical", ["music", "musica"]],
    ["📚", "books", "libros", ["book", "leer"]],
    ["💼", "briefcase", "maletin", ["trabajo", "work"]],
    ["💡", "light bulb", "bombilla", ["idea"]],
    ["🧠", "brain", "cerebro", ["inteligencia", "brain"]],
    ["❤️", "red heart", "corazon rojo", ["amor", "heart"]],
    ["💙", "blue heart", "corazon azul", ["heart"]],
    ["💚", "green heart", "corazon verde", ["heart"]],
    ["🖤", "black heart", "corazon negro", ["heart"]],
    ["🧡", "orange heart", "corazon naranja", ["heart"]],
    ["💜", "purple heart", "corazon violeta", ["heart"]],
    ["🤍", "white heart", "corazon blanco", ["heart"]],
    ["🏳️", "white flag", "bandera blanca", ["flag", "bandera"]],
    ["🏴", "black flag", "bandera negra", ["flag", "bandera"]],
    ["🏁", "chequered flag", "bandera a cuadros", ["flag", "racing"]],
  ];

  seed.forEach(([emoji, en, es, keywords]) => {
    map.set(emoji, {
      en,
      es,
      keywords: Array.isArray(keywords) ? keywords : [],
    });
  });

  mapFlagNames(map);

  sections.forEach((section) => {
    section.items.forEach((emoji) => {
      const current = map.get(emoji) || { en: "", es: "", keywords: [] };
      const searchable = normalizeSearch(
        [current.en, current.es, section.label, ...section.keywords, ...current.keywords].join(" "),
      );
      const title =
        current.en || current.es ? `${emoji} - ${current.es || current.en} / ${current.en || current.es}` : emoji;
      map.set(emoji, {
        en: current.en,
        es: current.es,
        keywords: [...current.keywords],
        searchable,
        title,
      });
    });
  });

  return map;
}

function mapFlagNames(map) {
  const flags = new Set();
  EMOJI_SECTIONS.forEach((section) => {
    if (section.id === "banderas") {
      section.items.forEach((emoji) => flags.add(emoji));
    }
  });
  if (flags.size === 0) {
    return;
  }

  let enDisplay = null;
  let esDisplay = null;
  try {
    enDisplay = new Intl.DisplayNames(["en"], { type: "region" });
    esDisplay = new Intl.DisplayNames(["es"], { type: "region" });
  } catch (_error) {
    enDisplay = null;
    esDisplay = null;
  }

  flags.forEach((flag) => {
    const code = flagToRegionCode(flag);
    if (!code) {
      return;
    }
    const en = enDisplay?.of(code) || code;
    const es = esDisplay?.of(code) || code;
    map.set(flag, {
      en: `flag: ${en}`,
      es: `bandera: ${es}`,
      keywords: [code.toLowerCase(), "flag", "bandera", "country", "pais"],
    });
  });
}

function flagToRegionCode(flag) {
  const symbols = Array.from(flag);
  if (symbols.length !== 2) {
    return "";
  }
  const chars = symbols.map((symbol) => symbol.codePointAt(0) || 0);
  if (!chars.every((cp) => cp >= 0x1f1e6 && cp <= 0x1f1ff)) {
    return "";
  }
  return String.fromCharCode(chars[0] - 0x1f1e6 + 65, chars[1] - 0x1f1e6 + 65);
}

function pickRandomColorFromPalette() {
  if (activeColorIndex === null) {
    return;
  }
  const palette = COLOR_PALETTE_MAP.get(sanitizeColorPaletteId(activeColorPaletteId));
  const colors = Array.isArray(palette?.colors) && palette.colors.length > 0 ? palette.colors : PALETTE;
  const color = colors[randomInt(0, colors.length - 1)];
  setColorFromModal(color);
}

function pickRandomEmojiFromFilter() {
  if (activeEmojiIndex === null) {
    return;
  }
  const sections = getFilteredEmojiSections(refs.emojiSearchInput.value);
  const candidates = sections.flatMap((section) => section.items);
  if (candidates.length === 0) {
    return;
  }
  const emoji = candidates[randomInt(0, candidates.length - 1)];
  setEmojiFromModal(emoji);
}

function buildEmojiSections() {
  const sections = [
    {
      id: "favoritos",
      label: "Favoritos en uso",
      keywords: ["favoritos", "usados", "participantes", "top"],
      ranges: [],
      preset: DEFAULT_EMOJIS,
    },
    {
      id: "caras",
      label: "Caras y emociones",
      keywords: ["cara", "caras", "emocion", "feliz", "triste", "smile", "face", "laugh", "risa"],
      ranges: [
        [0x1f600, 0x1f64f],
        [0x1f910, 0x1f92f],
        [0x1f970, 0x1f97a],
      ],
    },
    {
      id: "personas",
      label: "Personas y manos",
      keywords: ["persona", "mano", "gesto", "gente", "hands", "people", "human", "body"],
      ranges: [
        [0x1f44a, 0x1f64b],
        [0x1f466, 0x1f487],
        [0x1f9cd, 0x1f9dd],
      ],
    },
    {
      id: "animales",
      label: "Animales y naturaleza",
      keywords: ["animal", "naturaleza", "plantas", "pet", "nature", "dog", "cat", "perro", "gato"],
      ranges: [
        [0x1f330, 0x1f43e],
        [0x1f980, 0x1f9a2],
      ],
    },
    {
      id: "comida",
      label: "Comida y bebida",
      keywords: [
        "comida",
        "bebida",
        "food",
        "drink",
        "candy",
        "caramelo",
        "dulce",
        "sweet",
        "golosina",
      ],
      ranges: [
        [0x1f345, 0x1f37f],
        [0x1f950, 0x1f96f],
      ],
    },
    {
      id: "deporte",
      label: "Actividades y deporte",
      keywords: ["deporte", "actividad", "futbol", "juego", "sport", "sports", "fitness"],
      ranges: [
        [0x1f3a0, 0x1f3cf],
        [0x1f93a, 0x1f94f],
      ],
    },
    {
      id: "viaje",
      label: "Viajes y lugares",
      keywords: ["viaje", "lugar", "auto", "avion", "travel", "trip", "city", "ciudad"],
      ranges: [
        [0x1f680, 0x1f6c5],
        [0x1f5fa, 0x1f5ff],
      ],
    },
    {
      id: "objetos",
      label: "Objetos y simbolos",
      keywords: [
        "objeto",
        "simbolo",
        "herramienta",
        "icons",
        "symbol",
        "tools",
        "heart",
        "corazon",
      ],
      ranges: [
        [0x1f4a0, 0x1f4ff],
        [0x1f500, 0x1f53d],
        [0x1f6e0, 0x1f6ec],
        [0x1f9f0, 0x1f9ff],
        [0x1fa70, 0x1faff],
      ],
      preset: [
        "❤️",
        "🧡",
        "💛",
        "💚",
        "💙",
        "💜",
        "🖤",
        "🤍",
        "🤎",
        "💔",
        "💕",
        "💖",
        "✨",
        "⭐",
        "🌟",
        "⚡",
        "☕",
        "☎️",
        "✉️",
        "⚠️",
        "✅",
        "❌",
        "⚽",
        "🏀",
      ],
    },
    {
      id: "banderas",
      label: "Banderas",
      keywords: ["bandera", "banderas", "flag", "flags", "country", "pais", "paises"],
      ranges: [],
      preset: buildFlagEmojiList(),
    },
  ];

  const used = new Set();
  return sections
    .map((section) => {
      const items = [];
      if (Array.isArray(section.preset)) {
        section.preset.forEach((emoji) => {
          const normalized = sanitizeEmoji(emoji);
          if (!used.has(normalized)) {
            used.add(normalized);
            items.push(normalized);
          }
        });
      }

      section.ranges.forEach(([start, end]) => {
        items.push(...collectEmojiFromRange(start, end, used));
      });

      return {
        id: section.id,
        label: section.label,
        keywords: section.keywords || [],
        items,
      };
    })
    .filter((section) => section.items.length > 0);
}

function buildFlagEmojiList() {
  const fallback = AMERICA_REGION_CODES;
  const codes = [...AMERICA_REGION_CODES, ...getRegionCodes()];
  const uniqueCodes = [];
  const codeSet = new Set();
  codes.forEach((code) => {
    if (typeof code !== "string") {
      return;
    }
    const normalizedCode = code.trim().toUpperCase();
    if (!/^[A-Z]{2}$/.test(normalizedCode) || codeSet.has(normalizedCode)) {
      return;
    }
    codeSet.add(normalizedCode);
    uniqueCodes.push(normalizedCode);
  });
  const flags = [];
  uniqueCodes.forEach((code) => {
    const flag = regionCodeToFlag(code);
    if (flag && isLikelyEmoji(flag)) {
      flags.push(flag);
    }
  });
  if (flags.length > 0) {
    return flags;
  }
  return fallback
    .map((code) => regionCodeToFlag(code))
    .filter((flag) => Boolean(flag) && isLikelyEmoji(flag));
}

function getRegionCodes() {
  try {
    if (typeof Intl !== "undefined" && typeof Intl.supportedValuesOf === "function") {
      return Intl.supportedValuesOf("region").filter((value) => /^[A-Z]{2}$/.test(value));
    }
  } catch (_error) {
    // fallback below
  }
  return ["AR", "US", "ES", "BR", "MX", "UY", "CL", "CO", "PE", "FR", "DE", "IT", "GB", "JP"];
}

function regionCodeToFlag(code) {
  if (typeof code !== "string" || !/^[A-Z]{2}$/.test(code)) {
    return "";
  }
  const points = [...code].map((letter) => 0x1f1e6 + letter.charCodeAt(0) - 65);
  return String.fromCodePoint(...points);
}

function collectEmojiFromRange(start, end, used) {
  const list = [];
  for (let codePoint = start; codePoint <= end; codePoint += 1) {
    const emoji = String.fromCodePoint(codePoint);
    if (!isLikelyEmoji(emoji)) {
      continue;
    }
    const normalized = firstGrapheme(emoji);
    if (!used.has(normalized)) {
      used.add(normalized);
      list.push(normalized);
    }
  }
  return list;
}

function buildColorPalettes() {
  return [
    {
      id: "vibrante",
      label: "Vibrante",
      colors: buildPaletteGrid({
        hues: [6, 24, 46, 72, 112, 156, 196, 226, 262, 304],
        lights: [70, 64, 58, 52, 46, 40],
        sat: 88,
      }),
    },
    {
      id: "pastel",
      label: "Pastel",
      colors: buildPaletteGrid({
        hues: [4, 18, 34, 58, 88, 122, 166, 204, 246, 304],
        lights: [88, 82, 76, 70, 64, 58],
        sat: 58,
      }),
    },
    {
      id: "calida",
      label: "Calida",
      colors: buildPaletteGrid({
        hues: [350, 2, 12, 22, 34, 44, 54, 68, 86, 98],
        lights: [68, 62, 56, 50, 44, 38],
        sat: 86,
      }),
    },
    {
      id: "fria",
      label: "Fria",
      colors: buildPaletteGrid({
        hues: [112, 132, 152, 174, 192, 208, 222, 238, 256, 278],
        lights: [66, 60, 54, 48, 42, 36],
        sat: 82,
      }),
    },
    {
      id: "tierra",
      label: "Tierra",
      colors: buildPaletteGrid({
        hues: [16, 28, 40, 56, 76, 96, 114, 132, 148, 164],
        lights: [66, 58, 50, 42, 34, 26],
        sat: 58,
      }),
    },
    {
      id: "neon",
      label: "Neon",
      colors: buildPaletteGrid({
        hues: [0, 22, 44, 68, 96, 134, 176, 214, 256, 304],
        lights: [72, 64, 56, 48, 40, 32],
        sat: 98,
      }),
    },
    {
      id: "gris",
      label: "Escala de grises",
      colors: buildMonochromeGrid(10, 6),
    },
  ];
}

function buildPaletteGrid(config) {
  const hues = Array.isArray(config.hues) ? config.hues : [];
  const lights = Array.isArray(config.lights) ? config.lights : [];
  const sat = clamp(Math.round(config.sat || 70), 0, 100);
  const colors = [];

  lights.forEach((light, row) => {
    hues.forEach((hue, col) => {
      const wobble = row % 2 === 0 ? 0 : 2.5;
      const satDelta = (col % 2 === 0 ? 1 : -1) * Math.min(8, row + 1);
      colors.push(hslToHex(hue + wobble, sat + satDelta, light));
    });
  });

  return uniqueColors(colors);
}

function buildMonochromeGrid(cols, rows) {
  const total = clamp(Math.round(cols * rows), 8, 120);
  const colors = [];
  for (let i = 0; i < total; i += 1) {
    const ratio = i / (total - 1);
    const light = 96 - ratio * 84;
    const warmTint = ratio * 8;
    colors.push(hslToHex(210 - warmTint, 5 + warmTint, light));
  }
  return uniqueColors(colors);
}

function uniqueColors(values) {
  const seen = new Set();
  const deduped = [];
  values.forEach((value) => {
    const color = sanitizeColor(value);
    if (!seen.has(color)) {
      seen.add(color);
      deduped.push(color);
    }
  });
  if (deduped.length > 0) {
    return deduped;
  }
  return PALETTE.slice();
}

function hslToHex(h, s, l) {
  const hue = ((Number(h) % 360) + 360) % 360;
  const sat = clamp(Number(s) / 100, 0, 1);
  const light = clamp(Number(l) / 100, 0, 1);
  const c = (1 - Math.abs(2 * light - 1)) * sat;
  const x = c * (1 - Math.abs(((hue / 60) % 2) - 1));
  const m = light - c / 2;

  let rPrime = 0;
  let gPrime = 0;
  let bPrime = 0;

  if (hue < 60) {
    rPrime = c;
    gPrime = x;
  } else if (hue < 120) {
    rPrime = x;
    gPrime = c;
  } else if (hue < 180) {
    gPrime = c;
    bPrime = x;
  } else if (hue < 240) {
    gPrime = x;
    bPrime = c;
  } else if (hue < 300) {
    rPrime = x;
    bPrime = c;
  } else {
    rPrime = c;
    bPrime = x;
  }

  const r = Math.round((rPrime + m) * 255);
  const g = Math.round((gPrime + m) * 255);
  const b = Math.round((bPrime + m) * 255);
  return rgbToHex(r, g, b);
}

function resolveWinnerAnimationMode(rawMode) {
  const selectedMode = sanitizeWinnerAnimationMode(rawMode);
  if (selectedMode !== "random") {
    return selectedMode;
  }
  if (WINNER_ANIMATION_RANDOM_POOL.length === 0) {
    return "emojiRain";
  }
  return WINNER_ANIMATION_RANDOM_POOL[randomInt(0, WINNER_ANIMATION_RANDOM_POOL.length - 1)];
}

function resolveWinnerAnimationModeForParticipant(item) {
  const participantMode = sanitizeParticipantAnimationMode(item?.animationMode);
  if (participantMode === "general") {
    return resolveWinnerAnimationMode(state.winnerAnimationMode);
  }
  if (participantMode === "random") {
    return resolveWinnerAnimationMode("random");
  }
  return sanitizeWinnerAnimationMode(participantMode);
}

function clearWinnerCelebrationVisuals() {
  if (celebrationTimeoutId) {
    clearTimeout(celebrationTimeoutId);
    celebrationTimeoutId = null;
  }
  if (winnerCardCascadeRafId !== null) {
    cancelAnimationFrame(winnerCardCascadeRafId);
    winnerCardCascadeRafId = null;
  }
  if (winnerEmojiBounceRafId !== null) {
    cancelAnimationFrame(winnerEmojiBounceRafId);
    winnerEmojiBounceRafId = null;
  }
  if (winnerEmojiHoseRafId !== null) {
    cancelAnimationFrame(winnerEmojiHoseRafId);
    winnerEmojiHoseRafId = null;
  }
  if (winnerFireworkTimeoutIds.length > 0) {
    winnerFireworkTimeoutIds.forEach((timeoutId) => {
      clearTimeout(timeoutId);
    });
    winnerFireworkTimeoutIds = [];
  }
  winnerEmojiHoseController = null;
  refs.emojiRain.replaceChildren();
  refs.resultText.classList.remove(...WINNER_RESULT_EFFECT_CLASSES);
  refs.canvas.classList.remove("winner-neon");
  if (refs.wheelCard instanceof HTMLElement) {
    refs.wheelCard.classList.remove("winner-neon-section");
  }
  if (refs.hero instanceof HTMLElement) {
    refs.hero.classList.remove("winner-neon-title");
  }
}

function requestEmojiHoseStop(byClick = false) {
  if (!winnerEmojiHoseController) {
    return false;
  }
  if (!winnerEmojiHoseController.stopRequested) {
    winnerEmojiHoseController.stopRequested = true;
    winnerEmojiHoseController.fastStop = Boolean(byClick);
    return true;
  }
  if (byClick) {
    winnerEmojiHoseController.fastStop = true;
  }
  return true;
}

function spawnEmojiWinnerDrops(emoji) {
  let maxDropMs = 0;
  for (let i = 0; i < CELEBRATION_DROPS; i += 1) {
    const drop = document.createElement("span");
    drop.className = "emoji-drop";
    drop.textContent = emoji;
    drop.style.left = `${Math.random() * 100}%`;
    drop.style.fontSize = `${randomInt(24, 56)}px`;
    const durationSec = randomFloat(2.8, 5.9);
    const delaySec = randomFloat(0, 1.25);
    drop.style.animationDuration = `${durationSec.toFixed(2)}s`;
    drop.style.animationDelay = `${delaySec.toFixed(2)}s`;
    drop.style.setProperty("--drift-x", `${randomInt(-120, 120)}px`);
    drop.style.setProperty("--spin", `${randomInt(-360, 360)}deg`);
    maxDropMs = Math.max(maxDropMs, (durationSec + delaySec) * 1000);
    refs.emojiRain.append(drop);
  }
  return maxDropMs;
}

function spawnEmojiWinnerDropsExtreme(emoji) {
  const profile = WINNER_EFFECT_PROFILE;
  let maxDropMs = 0;
  const burstCount = profile.extremeBurstCount;
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < burstCount; i += 1) {
    const drop = document.createElement("span");
    drop.className = "emoji-drop emoji-drop-extreme";
    drop.textContent = emoji;
    drop.style.left = `${Math.random() * 100}%`;
    drop.style.fontSize = `${randomInt(profile.extremeSizeMin, profile.extremeSizeMax)}px`;
    const durationSec = randomFloat(profile.extremeDurationMinSec, profile.extremeDurationMaxSec);
    const delaySec = randomFloat(0, profile.extremeDelayMaxSec);
    const drift = randomInt(-profile.extremeDriftMax, profile.extremeDriftMax);
    const spin = randomInt(-profile.extremeSpinMax, profile.extremeSpinMax);
    drop.style.animationDuration = `${durationSec.toFixed(2)}s`;
    drop.style.animationDelay = `${delaySec.toFixed(2)}s`;
    drop.style.setProperty("--drift-x", `${drift}px`);
    drop.style.setProperty("--spin", `${spin}deg`);
    if (profile.heavyGlow) {
      drop.style.filter = `drop-shadow(0 0 ${randomInt(3, 8)}px rgba(255, 255, 255, 0.55))`;
    }
    maxDropMs = Math.max(maxDropMs, (durationSec + delaySec) * 1000);
    fragment.append(drop);
  }
  refs.emojiRain.append(fragment);
  return Math.max(maxDropMs, 4200);
}

function getTrackedCursorPosition() {
  const viewportWidth = window.innerWidth || document.documentElement.clientWidth || 1280;
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 720;
  if (Number.isFinite(trackedCursorX) && Number.isFinite(trackedCursorY)) {
    return {
      x: clamp(trackedCursorX, 0, viewportWidth),
      y: clamp(trackedCursorY, 0, viewportHeight),
    };
  }
  const rect = refs.canvas.getBoundingClientRect();
  return {
    x: rect.left + rect.width * 0.5,
    y: rect.top + rect.height * 0.5,
  };
}

function spawnEmojiHoseDrops(emoji) {
  const profile = WINNER_EFFECT_PROFILE;
  if (winnerEmojiHoseRafId !== null) {
    cancelAnimationFrame(winnerEmojiHoseRafId);
    winnerEmojiHoseRafId = null;
  }
  const naturalFadeDurationMs = 1200;
  const fastFadeDurationMs = 380;
  const controller = {
    stopRequested: false,
    fastStop: false,
    fadeStartMs: null,
    fadeDurationMs: naturalFadeDurationMs,
  };
  winnerEmojiHoseController = controller;

  const viewportWidth = window.innerWidth || document.documentElement.clientWidth || 1280;
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 720;
  const gravity = 1780;
  const maxParticles = profile.hoseMaxParticles;
  const spawnRatePerSec = profile.hoseSpawnRatePerSec;
  const emissionDurationMs = profile.hoseEmissionDurationMs;
  const hoseLifetimeMs = profile.hoseLifetimeMs;
  const particles = [];
  let elapsedMs = 0;
  let spawnCarry = 0;
  let sweepPhase = 0;
  let accumulatedMs = 0;

  let lastTimestamp = performance.now();
  const step = (timestamp) => {
    if (winnerEmojiHoseController !== controller) {
      winnerEmojiHoseRafId = null;
      return;
    }

    const rawDeltaMs = clamp(timestamp - lastTimestamp, 8, 52);
    lastTimestamp = timestamp;
    accumulatedMs += rawDeltaMs;
    if (accumulatedMs < profile.hoseFrameIntervalMs) {
      winnerEmojiHoseRafId = requestAnimationFrame(step);
      return;
    }
    const deltaSec = accumulatedMs / 1000;
    accumulatedMs = 0;
    elapsedMs += deltaSec * 1000;
    sweepPhase += deltaSec * 7.3;

    if (!controller.stopRequested && elapsedMs >= hoseLifetimeMs) {
      controller.stopRequested = true;
      controller.fastStop = false;
    }
    if (controller.stopRequested && controller.fadeStartMs === null) {
      controller.fadeStartMs = elapsedMs;
      controller.fadeDurationMs = controller.fastStop ? fastFadeDurationMs : naturalFadeDurationMs;
    }
    const globalFade =
      controller.fadeStartMs === null
        ? 1
        : clamp(1 - (elapsedMs - controller.fadeStartMs) / controller.fadeDurationMs, 0, 1);

    if (!controller.stopRequested && elapsedMs <= emissionDurationMs) {
      const countFloat = spawnRatePerSec * deltaSec + spawnCarry;
      const plannedCount = Math.floor(countFloat);
      spawnCarry = countFloat - plannedCount;
      const spawnCount = Math.min(plannedCount, profile.hoseSpawnCapPerStep);
      const origin = getTrackedCursorPosition();
      const fragment = document.createDocumentFragment();
      for (let i = 0; i < spawnCount && particles.length < maxParticles; i += 1) {
        const drop = document.createElement("span");
        drop.className = "winner-emoji-hose-drop";
        drop.textContent = emoji;
        const size = randomInt(profile.hoseSizeMin, profile.hoseSizeMax);
        drop.style.fontSize = `${size}px`;
        const sprayAngle = -Math.PI / 2 + Math.sin(sweepPhase + i * 0.12) * 0.82 + randomFloat(-0.3, 0.3);
        const speed = randomFloat(profile.hoseSpeedMin, profile.hoseSpeedMax);
        const particle = {
          node: drop,
          x: origin.x + randomFloat(-14, 14),
          y: origin.y + randomFloat(-14, 14),
          vx: Math.cos(sprayAngle) * speed + randomFloat(-90, 90),
          vy: Math.sin(sprayAngle) * speed + randomFloat(-80, 80),
          rot: randomFloat(-24, 24),
          vr: randomFloat(-720, 720),
          size,
          ageMs: 0,
          lifeMs: randomInt(profile.hoseParticleLifeMinMs, profile.hoseParticleLifeMaxMs),
          alive: true,
        };
        if (profile.heavyGlow) {
          drop.style.filter = `drop-shadow(0 0 ${randomInt(2, 6)}px rgba(255, 255, 255, 0.5))`;
        }
        drop.style.transform = `translate3d(${particle.x}px, ${particle.y}px, 0) rotate(${particle.rot}deg)`;
        fragment.append(drop);
        particles.push(particle);
      }
      refs.emojiRain.append(fragment);
    } else {
      spawnCarry = 0;
    }

    let aliveCount = 0;
    let inactiveCount = 0;
    for (let i = 0; i < particles.length; i += 1) {
      const particle = particles[i];
      if (!particle.alive) {
        inactiveCount += 1;
        continue;
      }
      particle.ageMs += deltaSec * 1000;
      if (particle.ageMs >= particle.lifeMs) {
        particle.alive = false;
        particle.node.remove();
        continue;
      }

      particle.vy += gravity * deltaSec;
      particle.vx *= 0.996;
      particle.vr *= 0.994;
      particle.x += particle.vx * deltaSec;
      particle.y += particle.vy * deltaSec;
      particle.rot += particle.vr * deltaSec;

      const floorY = viewportHeight - particle.size * 0.86;
      if (particle.x <= -particle.size * 0.24) {
        particle.x = -particle.size * 0.24;
        particle.vx = Math.abs(particle.vx) * 0.82;
      } else if (particle.x >= viewportWidth - particle.size * 0.76) {
        particle.x = viewportWidth - particle.size * 0.76;
        particle.vx = -Math.abs(particle.vx) * 0.82;
      }
      if (particle.y >= floorY) {
        particle.y = floorY;
        particle.vy = -Math.abs(particle.vy) * randomFloat(0.46, 0.72);
        particle.vx *= 0.96;
      }

      const timeLeft = particle.lifeMs - particle.ageMs;
      const particleFade = timeLeft < 600 ? clamp(timeLeft / 600, 0, 1) : 1;
      const opacity = particleFade * globalFade;
      particle.node.style.opacity = opacity.toFixed(3);
      particle.node.style.transform = `translate3d(${particle.x.toFixed(2)}px, ${particle.y.toFixed(2)}px, 0) rotate(${particle.rot.toFixed(2)}deg)`;
      aliveCount += 1;
    }
    if (inactiveCount > 32 && particles.length > 120) {
      for (let i = particles.length - 1; i >= 0; i -= 1) {
        if (!particles[i].alive) {
          particles.splice(i, 1);
        }
      }
    }

    if (globalFade <= 0.001 && aliveCount > 0) {
      for (let i = 0; i < particles.length; i += 1) {
        if (particles[i].alive) {
          particles[i].alive = false;
          particles[i].node.remove();
        }
      }
      aliveCount = 0;
    }

    const fadeFinished = controller.fadeStartMs !== null && globalFade <= 0.001;
    const shouldStop = fadeFinished || (elapsedMs >= hoseLifetimeMs && aliveCount === 0);
    if (shouldStop) {
      winnerEmojiHoseController = null;
      winnerEmojiHoseRafId = null;
      return;
    }
    winnerEmojiHoseRafId = requestAnimationFrame(step);
  };

  winnerEmojiHoseRafId = requestAnimationFrame(step);
  return hoseLifetimeMs + naturalFadeDurationMs + 120;
}

function buildWinnerCardFace(index) {
  const rank = CARD_RANKS[index % CARD_RANKS.length];
  const suit = CARD_SUITS[randomInt(0, CARD_SUITS.length - 1)];
  return {
    label: `${rank}${suit.symbol}`,
    red: suit.red,
  };
}

function spawnCartaBlancaDrops() {
  if (winnerCardCascadeRafId !== null) {
    cancelAnimationFrame(winnerCardCascadeRafId);
    winnerCardCascadeRafId = null;
  }

  const viewportWidth = window.innerWidth || document.documentElement.clientWidth || 1280;
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 720;
  const cardCount = 52;
  const gravity = 1900;
  const floorFriction = 0.986;
  const wallBounce = 0.86;
  const cards = [];
  let maxDropMs = 0;

  for (let i = 0; i < cardCount; i += 1) {
    const face = buildWinnerCardFace(i);
    const card = document.createElement("span");
    card.className = "winner-card-cascade";
    if (face.red) {
      card.classList.add("is-red");
    }
    card.textContent = face.label;
    card.style.width = `${randomInt(44, 56)}px`;
    card.style.height = `${randomInt(62, 76)}px`;
    card.style.fontSize = `${randomInt(16, 22)}px`;

    const width = Number.parseFloat(card.style.width) || 50;
    const height = Number.parseFloat(card.style.height) || 70;
    const lifeMs = randomInt(5600, 8600);

    const cardState = {
      node: card,
      x: randomFloat(viewportWidth * 0.2, viewportWidth * 0.8),
      y: randomFloat(-viewportHeight * 0.18, viewportHeight * 0.14),
      vx: randomFloat(-410, 410),
      vy: randomFloat(160, 540),
      rot: randomFloat(-30, 30),
      vr: randomFloat(-220, 220),
      bounce: randomFloat(0.63, 0.78),
      airDrag: randomFloat(0.992, 0.998),
      spinDrag: randomFloat(0.993, 0.999),
      width,
      height,
      lifeMs,
      ageMs: 0,
      alive: true,
    };

    card.style.transform = `translate3d(${cardState.x}px, ${cardState.y}px, 0) rotate(${cardState.rot}deg)`;
    refs.emojiRain.append(card);
    cards.push(cardState);
    maxDropMs = Math.max(maxDropMs, lifeMs);
  }

  let lastTimestamp = performance.now();
  const step = (timestamp) => {
    const deltaSec = clamp((timestamp - lastTimestamp) / 1000, 0.008, 0.033);
    lastTimestamp = timestamp;
    let aliveCount = 0;

    for (let i = 0; i < cards.length; i += 1) {
      const card = cards[i];
      if (!card.alive) {
        continue;
      }

      card.ageMs += deltaSec * 1000;
      if (card.ageMs >= card.lifeMs) {
        card.alive = false;
        card.node.remove();
        continue;
      }

      card.vy += gravity * deltaSec;
      card.vx *= card.airDrag;
      card.vr *= card.spinDrag;
      card.x += card.vx * deltaSec;
      card.y += card.vy * deltaSec;
      card.rot += card.vr * deltaSec;

      const minX = -card.width * 0.35;
      const maxX = viewportWidth - card.width * 0.65;
      const maxY = viewportHeight - card.height;

      if (card.x <= minX) {
        card.x = minX;
        card.vx = Math.abs(card.vx) * wallBounce;
      } else if (card.x >= maxX) {
        card.x = maxX;
        card.vx = -Math.abs(card.vx) * wallBounce;
      }

      if (card.y >= maxY) {
        card.y = maxY;
        card.vy = -Math.abs(card.vy) * card.bounce;
        card.vx *= floorFriction;
        if (Math.abs(card.vy) < 140) {
          card.vy = -randomFloat(180, 260);
        }
      }

      const timeLeftMs = card.lifeMs - card.ageMs;
      const opacity = timeLeftMs < 900 ? clamp(timeLeftMs / 900, 0, 1) : 1;
      card.node.style.opacity = opacity.toFixed(3);
      card.node.style.transform = `translate3d(${card.x.toFixed(2)}px, ${card.y.toFixed(2)}px, 0) rotate(${card.rot.toFixed(2)}deg)`;
      aliveCount += 1;
    }

    if (aliveCount === 0) {
      winnerCardCascadeRafId = null;
      return;
    }
    winnerCardCascadeRafId = requestAnimationFrame(step);
  };

  winnerCardCascadeRafId = requestAnimationFrame(step);
  return maxDropMs;
}

function spawnEmojiBounceDrops(emoji) {
  if (winnerEmojiBounceRafId !== null) {
    cancelAnimationFrame(winnerEmojiBounceRafId);
    winnerEmojiBounceRafId = null;
  }

  const viewportWidth = window.innerWidth || document.documentElement.clientWidth || 1280;
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 720;
  const gravity = 3200;
  const wallBounce = 0.94;
  const floorDrag = 0.992;
  const dropCount = 64;
  const particles = [];
  let maxDropMs = 0;

  for (let i = 0; i < dropCount; i += 1) {
    const drop = document.createElement("span");
    drop.className = "winner-emoji-bounce-drop";
    drop.textContent = emoji;
    const size = randomInt(32, 74);
    const lifeMs = randomInt(6800, 10400);
    drop.style.fontSize = `${size}px`;

    const stateItem = {
      node: drop,
      size,
      x: randomFloat(viewportWidth * 0.08, viewportWidth * 0.92),
      y: randomFloat(-viewportHeight * 0.16, viewportHeight * 0.04),
      vx: randomFloat(-560, 560),
      vy: randomFloat(320, 940),
      rot: randomFloat(-34, 34),
      vr: randomFloat(-420, 420),
      bounce: randomFloat(0.86, 0.95),
      airDrag: randomFloat(0.994, 0.998),
      spinDrag: randomFloat(0.993, 0.997),
      lifeMs,
      ageMs: 0,
      alive: true,
    };

    drop.style.transform = `translate3d(${stateItem.x}px, ${stateItem.y}px, 0) rotate(${stateItem.rot}deg)`;
    refs.emojiRain.append(drop);
    particles.push(stateItem);
    maxDropMs = Math.max(maxDropMs, lifeMs);
  }

  let lastTimestamp = performance.now();
  const step = (timestamp) => {
    const deltaSec = clamp((timestamp - lastTimestamp) / 1000, 0.008, 0.033);
    lastTimestamp = timestamp;
    let aliveCount = 0;

    for (let i = 0; i < particles.length; i += 1) {
      const particle = particles[i];
      if (!particle.alive) {
        continue;
      }

      particle.ageMs += deltaSec * 1000;
      if (particle.ageMs >= particle.lifeMs) {
        particle.alive = false;
        particle.node.remove();
        continue;
      }

      particle.vy += gravity * deltaSec;
      particle.vx *= particle.airDrag;
      particle.vr *= particle.spinDrag;
      particle.x += particle.vx * deltaSec;
      particle.y += particle.vy * deltaSec;
      particle.rot += particle.vr * deltaSec;

      const minX = -particle.size * 0.2;
      const maxX = viewportWidth - particle.size * 0.8;
      const floorY = viewportHeight - particle.size * 0.98;

      if (particle.x <= minX) {
        particle.x = minX;
        particle.vx = Math.abs(particle.vx) * wallBounce;
      } else if (particle.x >= maxX) {
        particle.x = maxX;
        particle.vx = -Math.abs(particle.vx) * wallBounce;
      }

      if (particle.y >= floorY) {
        particle.y = floorY;
        particle.vy = -Math.abs(particle.vy) * particle.bounce;
        particle.vx *= floorDrag;
        particle.vr *= 0.9;
        if (Math.abs(particle.vy) < 240) {
          particle.vy = -randomFloat(520, 980);
        }
        particle.vx += randomFloat(-140, 140);
      }

      const timeLeftMs = particle.lifeMs - particle.ageMs;
      const opacity = timeLeftMs < 1100 ? clamp(timeLeftMs / 1100, 0, 1) : 1;
      const pulseScale = 0.96 + Math.abs(Math.sin((particle.ageMs / 1000) * 8.2)) * 0.14;
      particle.node.style.opacity = opacity.toFixed(3);
      particle.node.style.transform = `translate3d(${particle.x.toFixed(2)}px, ${particle.y.toFixed(2)}px, 0) rotate(${particle.rot.toFixed(2)}deg) scale(${pulseScale.toFixed(3)})`;
      aliveCount += 1;
    }

    if (aliveCount === 0) {
      winnerEmojiBounceRafId = null;
      return;
    }
    winnerEmojiBounceRafId = requestAnimationFrame(step);
  };

  winnerEmojiBounceRafId = requestAnimationFrame(step);
  return maxDropMs;
}

function spawnConfettiDrops() {
  let maxDropMs = 0;
  const count = 96;
  const colors = ["#ff7a3a", "#ffd34d", "#52d572", "#40b8ff", "#8c6bff", "#ff5fb7"];
  for (let i = 0; i < count; i += 1) {
    const drop = document.createElement("span");
    drop.className = "winner-confetti-drop";
    const size = randomInt(8, 16);
    drop.style.left = `${Math.random() * 100}%`;
    drop.style.width = `${size}px`;
    drop.style.height = `${size}px`;
    drop.style.background = colors[randomInt(0, colors.length - 1)];
    drop.style.borderRadius = Math.random() < 0.3 ? "50%" : "2px";
    const durationSec = randomFloat(2.4, 4.8);
    const delaySec = randomFloat(0, 0.95);
    drop.style.animationDuration = `${durationSec.toFixed(2)}s`;
    drop.style.animationDelay = `${delaySec.toFixed(2)}s`;
    drop.style.setProperty("--drift-x", `${randomInt(-210, 210)}px`);
    drop.style.setProperty("--spin", `${randomInt(-540, 540)}deg`);
    drop.style.setProperty("--flip", `${randomInt(-360, 360)}deg`);
    maxDropMs = Math.max(maxDropMs, (durationSec + delaySec) * 1000);
    refs.emojiRain.append(drop);
  }
  return maxDropMs;
}

function spawnStarDrops() {
  let maxDropMs = 0;
  const stars = ["⭐", "🌟", "✨", "💫"];
  const count = 62;
  const immediateBurstCount = 22;
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < count; i += 1) {
    const drop = document.createElement("span");
    drop.className = "winner-star-drop";
    drop.textContent = stars[randomInt(0, stars.length - 1)];
    drop.style.left = `${Math.random() * 100}%`;
    drop.style.fontSize = `${randomInt(20, 46)}px`;
    const durationSec = randomFloat(2.2, 4.8);
    const delaySec =
      i < immediateBurstCount
        ? randomFloat(0, 0.12)
        : randomFloat(0.08, 0.58);
    drop.style.animationDuration = `${durationSec.toFixed(2)}s`;
    drop.style.animationDelay = `${delaySec.toFixed(2)}s`;
    drop.style.setProperty("--drift-x", `${randomInt(-150, 150)}px`);
    drop.style.setProperty("--spin", `${randomInt(-260, 260)}deg`);
    maxDropMs = Math.max(maxDropMs, (durationSec + delaySec) * 1000);
    fragment.append(drop);
  }
  refs.emojiRain.append(fragment);
  return maxDropMs;
}

function spawnFireworksDrops() {
  const profile = WINNER_EFFECT_PROFILE;
  if (winnerFireworkTimeoutIds.length > 0) {
    winnerFireworkTimeoutIds.forEach((timeoutId) => {
      clearTimeout(timeoutId);
    });
    winnerFireworkTimeoutIds = [];
  }

  const viewportWidth = window.innerWidth || document.documentElement.clientWidth || 1280;
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 720;
  const colors = [
    "#ff684b",
    "#ffd34d",
    "#73f17c",
    "#47d6ff",
    "#88a3ff",
    "#cf7bff",
    "#ff75c3",
  ];
  const burstCount = randomInt(profile.fireworkBurstMin, Math.max(profile.fireworkBurstMin, profile.fireworkBurstMax));
  let maxDropMs = 0;
  let sparkBudget = profile.fireworkSparkBudget;

  for (let burstIndex = 0; burstIndex < burstCount; burstIndex += 1) {
    const launchStartX = randomFloat(viewportWidth * 0.1, viewportWidth * 0.9);
    const launchEndX = clamp(
      launchStartX + randomFloat(-viewportWidth * 0.14, viewportWidth * 0.14),
      viewportWidth * 0.08,
      viewportWidth * 0.92,
    );
    const launchEndY = randomFloat(viewportHeight * 0.06, viewportHeight * 0.42);
    const launchDelaySec = randomFloat(0, profile.fireworkLaunchDelayMaxSec);
    const launchDurationSec = randomFloat(
      profile.fireworkLaunchDurationMinSec,
      profile.fireworkLaunchDurationMaxSec,
    );
    const burstDelaySec = launchDelaySec + launchDurationSec - 0.02;
    const burstsLeft = burstCount - burstIndex;
    const minReserved = profile.fireworkSparkMin * Math.max(0, burstsLeft - 1);
    const maxAvailableForBurst = Math.max(
      profile.fireworkSparkMin,
      Math.min(profile.fireworkSparkMax, sparkBudget - minReserved),
    );
    const sparkCount = randomInt(profile.fireworkSparkMin, Math.max(profile.fireworkSparkMin, maxAvailableForBurst));
    sparkBudget = Math.max(0, sparkBudget - sparkCount);
    const dxLaunch = launchEndX - launchStartX;
    const dyLaunch = launchEndY - viewportHeight;
    const launchHue = randomInt(0, 359);
    const launchColor = colors[randomInt(0, colors.length - 1)];
    const coreColor = colors[randomInt(0, colors.length - 1)];
    maxDropMs = Math.max(maxDropMs, (launchDelaySec + launchDurationSec) * 1000);
    maxDropMs = Math.max(maxDropMs, (burstDelaySec + 1.05) * 1000);
    maxDropMs = Math.max(maxDropMs, (burstDelaySec + 1.2) * 1000);

    const launchTimeoutId = window.setTimeout(() => {
      const timeoutIndex = winnerFireworkTimeoutIds.indexOf(launchTimeoutId);
      if (timeoutIndex >= 0) {
        winnerFireworkTimeoutIds.splice(timeoutIndex, 1);
      }
      const burstFragment = document.createDocumentFragment();

      const trail = document.createElement("span");
      trail.className = "winner-firework-trail";
      trail.style.left = `${launchStartX.toFixed(1)}px`;
      trail.style.top = `${viewportHeight.toFixed(1)}px`;
      trail.style.setProperty("--launch-dx", `${dxLaunch.toFixed(1)}px`);
      trail.style.setProperty("--launch-dy", `${dyLaunch.toFixed(1)}px`);
      trail.style.setProperty("--trail-hue", String(launchHue));
      trail.style.animationDuration = `${launchDurationSec.toFixed(2)}s`;
      burstFragment.append(trail);

      const rocket = document.createElement("span");
      rocket.className = "winner-firework-rocket";
      rocket.style.left = `${launchStartX.toFixed(1)}px`;
      rocket.style.top = `${viewportHeight.toFixed(1)}px`;
      rocket.style.background = launchColor;
      rocket.style.boxShadow = `0 0 16px ${launchColor}, 0 0 30px hsla(${launchHue}, 100%, 72%, 0.7)`;
      rocket.style.setProperty("--launch-dx", `${dxLaunch.toFixed(1)}px`);
      rocket.style.setProperty("--launch-dy", `${dyLaunch.toFixed(1)}px`);
      rocket.style.animationDuration = `${launchDurationSec.toFixed(2)}s`;
      burstFragment.append(rocket);

      const flash = document.createElement("span");
      flash.className = "winner-firework-flash";
      flash.style.left = `${launchEndX.toFixed(1)}px`;
      flash.style.top = `${launchEndY.toFixed(1)}px`;
      flash.style.background = coreColor;
      flash.style.setProperty("--flash-size", `${randomInt(profile.fireworkFlashMinPx, profile.fireworkFlashMaxPx)}px`);
      flash.style.animationDelay = `${Math.max(0, launchDurationSec - 0.02).toFixed(2)}s`;
      burstFragment.append(flash);

      const core = document.createElement("span");
      core.className = "winner-firework-core";
      core.style.left = `${launchEndX.toFixed(1)}px`;
      core.style.top = `${launchEndY.toFixed(1)}px`;
      core.style.background = coreColor;
      core.style.animationDelay = `${Math.max(0, launchDurationSec - 0.02).toFixed(2)}s`;
      burstFragment.append(core);

      for (let i = 0; i < sparkCount; i += 1) {
        const spark = document.createElement("span");
        spark.className = "winner-firework-spark";
        spark.style.left = `${launchEndX.toFixed(1)}px`;
        spark.style.top = `${launchEndY.toFixed(1)}px`;
        const angle = (i / sparkCount) * TAU + randomFloat(-0.14, 0.14);
        const distance = randomFloat(profile.fireworkDistanceMin, profile.fireworkDistanceMax);
        const driftX = Math.cos(angle) * distance;
        const driftY = Math.sin(angle) * distance;
        const fallY = randomFloat(profile.fireworkFallMin, profile.fireworkFallMax);
        const durationSec = randomFloat(profile.fireworkSparkDurationMinSec, profile.fireworkSparkDurationMaxSec);
        const delaySec = Math.max(0, launchDurationSec - 0.02) + randomFloat(0, profile.fireworkSparkDelayMaxSec);
        const size = randomInt(profile.fireworkSparkSizeMin, profile.fireworkSparkSizeMax);
        const color = colors[randomInt(0, colors.length - 1)];
        spark.style.width = `${size}px`;
        spark.style.height = `${size}px`;
        spark.style.background = color;
        spark.style.boxShadow = `0 0 ${size + 16}px ${color}, 0 0 ${size + 34}px ${color}`;
        spark.style.setProperty("--dx", `${driftX.toFixed(1)}px`);
        spark.style.setProperty("--dy", `${driftY.toFixed(1)}px`);
        spark.style.setProperty("--fall-y", `${fallY.toFixed(1)}px`);
        spark.style.animationDuration = `${durationSec.toFixed(2)}s`;
        spark.style.animationDelay = `${delaySec.toFixed(2)}s`;
        burstFragment.append(spark);
      }

      refs.emojiRain.append(burstFragment);
    }, Math.max(0, launchDelaySec * 1000));
    winnerFireworkTimeoutIds.push(launchTimeoutId);
  }
  return Math.max(maxDropMs, profile.fireworkMinCelebrationMs);
}

function spawnNeonPulseDrops(emoji) {
  let maxDropMs = 0;
  const count = 96;
  for (let i = 0; i < count; i += 1) {
    const drop = document.createElement("span");
    drop.className = "winner-neon-drop";
    drop.textContent = Math.random() < 0.28 ? emoji : "";
    const size = randomInt(14, 40);
    const hue = randomInt(0, 359);
    const accentHue = (hue + randomInt(105, 190)) % 360;
    const glowRadius = randomInt(26, 62);
    drop.style.left = `${Math.random() * 100}%`;
    drop.style.width = `${size}px`;
    drop.style.height = `${size}px`;
    drop.style.fontSize = `${Math.max(16, Math.round(size * 0.82))}px`;
    drop.style.color = `hsla(${hue}, 100%, 90%, 0.98)`;
    drop.style.borderColor = `hsla(${hue}, 100%, 76%, 0.95)`;
    drop.style.background = `radial-gradient(circle at 28% 24%, hsla(0, 0%, 100%, 0.95) 0%, hsla(${hue}, 100%, 66%, 0.95) 36%, hsla(${accentHue}, 100%, 54%, 0.86) 70%, hsla(${accentHue}, 100%, 42%, 0.14) 100%)`;
    drop.style.boxShadow = `0 0 ${glowRadius}px hsla(${hue}, 100%, 64%, 0.98), 0 0 ${Math.round(glowRadius * 1.8)}px hsla(${accentHue}, 100%, 54%, 0.78)`;
    const durationSec = randomFloat(2.8, 5.8);
    const delaySec = randomFloat(0, 0.95);
    drop.style.animationDuration = `${durationSec.toFixed(2)}s`;
    drop.style.animationDelay = `${delaySec.toFixed(2)}s`;
    drop.style.setProperty("--drift-x", `${randomInt(-260, 260)}px`);
    drop.style.setProperty("--spin", `${randomInt(-760, 760)}deg`);
    drop.style.setProperty("--pulse-scale", randomFloat(1.18, 1.75).toFixed(2));
    maxDropMs = Math.max(maxDropMs, (durationSec + delaySec) * 1000);
    refs.emojiRain.append(drop);
  }
  return Math.max(maxDropMs, 6200);
}

function spawnRetryFailureDrops() {
  let maxDropMs = 0;
  const symbols = ["💥", "❌", "🔁", "⚠️"];
  const count = 52;
  for (let i = 0; i < count; i += 1) {
    const drop = document.createElement("span");
    drop.className = "retry-failure-drop";
    drop.textContent = symbols[randomInt(0, symbols.length - 1)];
    drop.style.left = `${Math.random() * 100}%`;
    drop.style.fontSize = `${randomInt(18, 46)}px`;
    const durationSec = randomFloat(1.2, 2.7);
    const delaySec = randomFloat(0, 0.45);
    drop.style.animationDuration = `${durationSec.toFixed(2)}s`;
    drop.style.animationDelay = `${delaySec.toFixed(2)}s`;
    drop.style.setProperty("--drift-x", `${randomInt(-170, 170)}px`);
    drop.style.setProperty("--spin", `${randomInt(-460, 460)}deg`);
    maxDropMs = Math.max(maxDropMs, (durationSec + delaySec) * 1000);
    refs.emojiRain.append(drop);
  }
  return Math.max(maxDropMs, 1400);
}

function triggerRetryFailureCelebration() {
  clearWinnerCelebrationVisuals();
  refs.resultText.classList.add("result-failure-retry");
  const maxDropMs = spawnRetryFailureDrops();
  const celebrationDurationMs = Math.ceil(maxDropMs) + 240;
  celebrationTimeoutId = window.setTimeout(() => {
    clearWinnerCelebrationVisuals();
  }, celebrationDurationMs);
  return celebrationDurationMs;
}

function triggerWinnerCelebration(winnerItem) {
  const emoji = sanitizeEmoji(winnerItem?.emoji);
  const winnerMode = resolveWinnerAnimationModeForParticipant(winnerItem);

  clearWinnerCelebrationVisuals();

  let maxDropMs = 0;
  if (winnerMode === "cartaBlanca") {
    refs.resultText.classList.add("winner-carta");
    maxDropMs = spawnCartaBlancaDrops();
  } else if (winnerMode === "emojiBounce") {
    refs.resultText.classList.add("winner-emoji-bounce");
    maxDropMs = spawnEmojiBounceDrops(emoji);
  } else if (winnerMode === "confeti") {
    refs.resultText.classList.add("winner-confeti");
    maxDropMs = spawnConfettiDrops();
  } else if (winnerMode === "estrellas") {
    refs.resultText.classList.add("winner-estrellas");
    maxDropMs = spawnStarDrops();
  } else if (winnerMode === "fuegosArtificiales") {
    refs.resultText.classList.add("winner-fireworks");
    maxDropMs = spawnFireworksDrops();
  } else if (winnerMode === "neonPulse") {
    refs.resultText.classList.add("winner-neon");
    refs.canvas.classList.add("winner-neon");
    if (refs.wheelCard instanceof HTMLElement) {
      refs.wheelCard.classList.add("winner-neon-section");
    }
    if (refs.hero instanceof HTMLElement) {
      refs.hero.classList.add("winner-neon-title");
    }
    maxDropMs = spawnNeonPulseDrops(emoji);
  } else if (winnerMode === "emojiHose") {
    refs.resultText.classList.add("winner-emoji-hose");
    maxDropMs = spawnEmojiHoseDrops(emoji);
  } else if (winnerMode === "emojiRainExtreme") {
    refs.resultText.classList.add("winner-emoji-burst");
    maxDropMs = spawnEmojiWinnerDropsExtreme(emoji);
  } else {
    refs.resultText.classList.add("winner-announce");
    maxDropMs = spawnEmojiWinnerDrops(emoji);
  }

  const celebrationDurationMs = Math.ceil(maxDropMs) + 220;
  celebrationTimeoutId = window.setTimeout(() => {
    clearWinnerCelebrationVisuals();
  }, celebrationDurationMs);
  return celebrationDurationMs;
}

function makeId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `item-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function round2(value) {
  return Math.round(value * 100) / 100;
}

function shorten(value, max) {
  if (value.length <= max) {
    return value;
  }
  return `${value.slice(0, Math.max(0, max - 3))}...`;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function mod360(value) {
  return ((value % 360) + 360) % 360;
}

function degToRad(value) {
  return (value * Math.PI) / 180;
}

function randomInt(min, max) {
  const lo = Math.ceil(min);
  const hi = Math.floor(max);
  return Math.floor(Math.random() * (hi - lo + 1)) + lo;
}

function randomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

function mixRgb(a, b, t) {
  const p = clamp(Number(t) || 0, 0, 1);
  return {
    r: Math.round(a.r + (b.r - a.r) * p),
    g: Math.round(a.g + (b.g - a.g) * p),
    b: Math.round(a.b + (b.b - a.b) * p),
  };
}

function easeOutQuint(t) {
  const p = clamp(t, 0, 1);
  return 1 - (1 - p) ** 5;
}
