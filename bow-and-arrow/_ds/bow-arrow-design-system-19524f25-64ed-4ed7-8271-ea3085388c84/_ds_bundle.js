/* @ds-bundle: {"format":3,"namespace":"BowArrowDesignSystem_19524f","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Panel","sourcePath":"components/core/Panel.jsx"},{"name":"CurrencyLabel","sourcePath":"components/game/CurrencyLabel.jsx"},{"name":"ProgressBar","sourcePath":"components/game/ProgressBar.jsx"},{"name":"ResourceCounter","sourcePath":"components/game/ResourceCounter.jsx"},{"name":"SegmentedControl","sourcePath":"components/game/SegmentedControl.jsx"},{"name":"StatUpgradeRow","sourcePath":"components/game/StatUpgradeRow.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"409f82ba3512","components/core/Button.jsx":"d62311f2f93d","components/core/Panel.jsx":"8fb6c07ea36f","components/game/CurrencyLabel.jsx":"2c31587ded2f","components/game/ProgressBar.jsx":"08bae2aabae0","components/game/ResourceCounter.jsx":"a2ce83b94027","components/game/SegmentedControl.jsx":"1fc62f28ceba","components/game/StatUpgradeRow.jsx":"48deecff8bcc","ui_kits/game/Frame.jsx":"42f02fee5167","ui_kits/game/Screens.jsx":"15a4b5527ee1","ui_kits/website/Sections.jsx":"de5eacbcaeac"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.BowArrowDesignSystem_19524f = window.BowArrowDesignSystem_19524f || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Badge / Tag — small pixel label. Used for rarity, status, counts, and
 * heraldic labels. Square-ish corners, hard 1px dark outline.
 */
function Badge({
  children,
  variant = "gold",
  size = "md",
  icon = null,
  style = {},
  ...rest
}) {
  const palettes = {
    gold: {
      bg: "var(--ba-gradient-gold)",
      fg: "var(--ba-ink)",
      ring: "var(--ba-stroke-dark)"
    },
    stone: {
      bg: "var(--ba-panel-raised)",
      fg: "var(--ba-parchment)",
      ring: "var(--ba-panel-border)"
    },
    sapphire: {
      bg: "#1E3A6B",
      fg: "#BFD4F2",
      ring: "var(--ba-sapphire)"
    },
    success: {
      bg: "#1E3D22",
      fg: "#8FD79B",
      ring: "var(--ba-success)"
    },
    warning: {
      bg: "#3D2E0A",
      fg: "#F2C766",
      ring: "var(--ba-warning)"
    },
    danger: {
      bg: "#3D0F0F",
      fg: "#F2A6A6",
      ring: "var(--ba-danger)"
    },
    bronze: {
      bg: "#3A2517",
      fg: "#E0A878",
      ring: "var(--ba-rarity-bronze)"
    },
    silver: {
      bg: "#2A2E36",
      fg: "#DCE2EC",
      ring: "var(--ba-rarity-silver)"
    },
    epic: {
      bg: "#2A1838",
      fg: "#C79BE0",
      ring: "var(--ba-royal)"
    }
  };
  const p = palettes[variant] || palettes.gold;
  const sizes = {
    sm: {
      h: 22,
      px: 8,
      fs: "var(--text-2xs)"
    },
    md: {
      h: 28,
      px: 11,
      fs: "var(--text-xs)"
    },
    lg: {
      h: 34,
      px: 14,
      fs: "var(--text-base)"
    }
  };
  const s = sizes[size] || sizes.md;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 5,
      height: s.h,
      padding: `0 ${s.px}px`,
      background: p.bg,
      color: p.fg,
      fontFamily: "var(--font-pixel)",
      fontSize: s.fs,
      lineHeight: 1,
      letterSpacing: "var(--tracking-wide)",
      borderRadius: "var(--radius-sm)",
      boxShadow: `0 0 0 1.5px ${p.ring}, 0 0 0 3px var(--ba-stroke-dark)`,
      textShadow: variant === "gold" ? "none" : "var(--text-outline)",
      whiteSpace: "nowrap",
      ...style
    }
  }, rest), icon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      imageRendering: "pixelated"
    }
  }, icon), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Bow & Arrow primary action button — the "RetroRPG" gold plate.
 * A chiselled stone plate with the signature gold double-stroke edge,
 * hard drop shadow, and a fast press (scale .96 + dim). Pixel font.
 */
function Button({
  children,
  variant = "primary",
  size = "md",
  icon = null,
  disabled = false,
  full = false,
  style = {},
  ...rest
}) {
  const [pressed, setPressed] = React.useState(false);
  const sizes = {
    sm: {
      h: 40,
      px: 16,
      fs: "var(--text-base)"
    },
    md: {
      h: 52,
      px: 22,
      fs: "var(--text-md)"
    },
    lg: {
      h: 64,
      px: 30,
      fs: "var(--text-lg)"
    }
  };
  const s = sizes[size] || sizes.md;
  const variants = {
    primary: {
      background: "var(--ba-gradient-gold)",
      color: "var(--ba-ink)",
      boxShadow: "0 0 0 2px var(--ba-stroke-dark), inset 0 2px 0 rgba(255,255,255,0.35), inset 0 -3px 0 rgba(0,0,0,0.28), var(--shadow-md)",
      textShadow: "0 1px 0 rgba(255,255,255,0.35)"
    },
    secondary: {
      background: "var(--ba-gradient-panel)",
      color: "var(--ba-parchment)",
      boxShadow: "0 0 0 2px var(--ba-gold), 0 0 0 4px var(--ba-stroke-dark), var(--shadow-md)",
      textShadow: "var(--text-outline)"
    },
    danger: {
      background: "linear-gradient(180deg,#C23030 0%,#8C1414 100%)",
      color: "#F2E4D0",
      boxShadow: "0 0 0 2px var(--ba-stroke-dark), inset 0 2px 0 rgba(255,255,255,0.22), var(--shadow-md)",
      textShadow: "0 1px 0 rgba(0,0,0,0.5)"
    },
    ghost: {
      background: "transparent",
      color: "var(--ba-gold)",
      boxShadow: "inset 0 0 0 2px var(--ba-panel-border)",
      textShadow: "var(--text-outline)"
    }
  };
  const v = variants[variant] || variants.primary;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    disabled: disabled,
    onMouseDown: () => setPressed(true),
    onMouseUp: () => setPressed(false),
    onMouseLeave: () => setPressed(false),
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "var(--space-2)",
      width: full ? "100%" : "auto",
      height: s.h,
      padding: `0 ${s.px}px`,
      fontFamily: "var(--font-pixel)",
      fontSize: s.fs,
      lineHeight: 1,
      letterSpacing: "var(--tracking-wide)",
      border: "none",
      borderRadius: "var(--radius-md)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.45 : 1,
      transform: pressed && !disabled ? "scale(0.96)" : "scale(1)",
      filter: pressed && !disabled ? "brightness(0.94)" : "none",
      transition: "transform var(--dur-press) var(--ease-snap), filter var(--dur-press) var(--ease-snap)",
      WebkitTapHighlightColor: "transparent",
      userSelect: "none",
      ...v,
      ...style
    }
  }, rest), icon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      imageRendering: "pixelated"
    }
  }, icon), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Panel.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Panel — the signature Bow & Arrow carved-stone container.
 * Dark stone fill, gold double-stroke edge, hard shadow. Everything in the
 * game lives inside one of these. Optional `title` renders a gold header bar.
 */
function Panel({
  children,
  title = null,
  icon = null,
  variant = "default",
  inset = false,
  style = {},
  bodyStyle = {},
  ...rest
}) {
  const edges = {
    default: "0 0 0 2px var(--ba-gold), 0 0 0 4px var(--ba-stroke-dark)",
    plain: "0 0 0 2px var(--ba-panel-border)",
    legendary: "0 0 0 2px var(--ba-gold-bright), 0 0 0 4px var(--ba-stroke-dark), var(--glow-gold)"
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      position: "relative",
      background: "var(--ba-gradient-panel)",
      borderRadius: "var(--radius-lg)",
      boxShadow: `${edges[variant] || edges.default}, var(--shadow-lg)`,
      color: "var(--ba-parchment)",
      fontFamily: "var(--font-pixel)",
      overflow: "hidden",
      ...style
    }
  }, rest), title && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-2)",
      padding: "8px 16px",
      background: "var(--ba-gradient-gold)",
      color: "var(--ba-ink)",
      fontSize: "var(--text-md)",
      letterSpacing: "var(--tracking-wide)",
      textShadow: "0 1px 0 rgba(255,255,255,0.3)",
      boxShadow: "inset 0 -2px 0 rgba(0,0,0,0.25)"
    }
  }, icon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      imageRendering: "pixelated"
    }
  }, icon), title), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "var(--space-4)",
      ...(inset ? {
        background: "var(--ba-bg-deep)",
        boxShadow: "var(--shadow-inset)",
        margin: "var(--space-3)",
        borderRadius: "var(--radius-md)"
      } : {}),
      ...bodyStyle
    }
  }, children));
}
Object.assign(__ds_scope, { Panel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Panel.jsx", error: String((e && e.message) || e) }); }

// components/game/CurrencyLabel.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * CurrencyLabel — the gold/mana cost pill used on buy & upgrade buttons.
 * Mirrors the in-game CurrencyCostButtonLabel: a coin/drop icon followed by
 * an amount, with an "insufficient" dim+red state.
 */
const ICONS = {
  gold: "var(--coin)",
  mana: "var(--mana)"
};
function CurrencyLabel({
  amount = 0,
  currency = "gold",
  affordable = true,
  size = "md",
  iconSrc = null,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: {
      fs: "var(--text-base)",
      ic: 16,
      gap: 5
    },
    md: {
      fs: "var(--text-md)",
      ic: 20,
      gap: 6
    },
    lg: {
      fs: "var(--text-lg)",
      ic: 26,
      gap: 8
    }
  };
  const s = sizes[size] || sizes.md;
  const tint = currency === "mana" ? "#7FB0F2" : "var(--ba-gold-bright)";
  const fallbackGlyph = currency === "mana" ? "✦" : "◈";
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: s.gap,
      fontFamily: "var(--font-pixel)",
      fontSize: s.fs,
      lineHeight: 1,
      color: affordable ? tint : "var(--ba-danger)",
      opacity: affordable ? 1 : 0.85,
      textShadow: "var(--text-outline)",
      letterSpacing: "var(--tracking-wide)",
      ...style
    }
  }, rest), iconSrc ? /*#__PURE__*/React.createElement("img", {
    src: iconSrc,
    alt: currency,
    width: s.ic,
    height: s.ic,
    style: {
      imageRendering: "pixelated",
      display: "block"
    }
  }) : null, amount.toLocaleString());
}
Object.assign(__ds_scope, { CurrencyLabel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/game/CurrencyLabel.jsx", error: String((e && e.message) || e) }); }

// components/game/ProgressBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * ProgressBar — sunken stone track with a gold (or tinted) pixel fill.
 * Used for XP, upgrade levels, health, and mana across the game.
 * Segmented option renders notched pips like the in-game level bars.
 */
function ProgressBar({
  value = 0,
  max = 100,
  variant = "gold",
  segments = 0,
  height = 16,
  label = null,
  style = {},
  ...rest
}) {
  const pct = Math.max(0, Math.min(100, value / max * 100));
  const fills = {
    gold: "var(--ba-gradient-gold)",
    mana: "linear-gradient(180deg,#7FB0F2 0%,#4D8CF2 60%,#3359A6 100%)",
    health: "linear-gradient(180deg,#C23030 0%,#8C1414 100%)",
    poison: "linear-gradient(180deg,#66B36A 0%,#408040 100%)",
    xp: "linear-gradient(180deg,#C79BE0 0%,#663380 100%)"
  };
  const fill = fills[variant] || fills.gold;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      width: "100%",
      ...style
    }
  }, rest), label && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      fontFamily: "var(--font-pixel)",
      fontSize: "var(--text-xs)",
      color: "var(--ba-parchment-dim)",
      letterSpacing: "var(--tracking-wide)",
      marginBottom: 4,
      textShadow: "var(--text-outline)"
    }
  }, /*#__PURE__*/React.createElement("span", null, label), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--ba-parchment)"
    }
  }, value, "/", max)), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height,
      background: "var(--ba-bg-deep)",
      borderRadius: "var(--radius-sm)",
      boxShadow: "var(--shadow-inset), 0 0 0 1.5px var(--ba-panel-border)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      width: `${pct}%`,
      background: fill,
      borderRadius: "var(--radius-sm)",
      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -2px 0 rgba(0,0,0,0.3)",
      transition: "width var(--dur-base) var(--ease-snap)"
    }
  }), segments > 1 && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      display: "flex"
    }
  }, Array.from({
    length: segments - 1
  }).map((_, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      flex: 1,
      borderRight: "2px solid var(--ba-bg-deep)"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }))));
}
Object.assign(__ds_scope, { ProgressBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/game/ProgressBar.jsx", error: String((e && e.message) || e) }); }

// components/game/ResourceCounter.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * ResourceCounter — the top-HUD currency capsule (coin/mana + amount).
 * A dark stone pill with a gold edge, pixel icon on the left. Optional "+"
 * affordance on the right for shop entry points.
 */
function ResourceCounter({
  amount = 0,
  iconSrc = null,
  glyph = "◈",
  tint = "var(--ba-gold-bright)",
  showAdd = false,
  onAdd = () => {},
  size = "md",
  style = {},
  ...rest
}) {
  const sizes = {
    sm: {
      h: 30,
      fs: "var(--text-base)",
      ic: 18
    },
    md: {
      h: 38,
      fs: "var(--text-md)",
      ic: 24
    },
    lg: {
      h: 46,
      fs: "var(--text-lg)",
      ic: 30
    }
  };
  const s = sizes[size] || sizes.md;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      height: s.h,
      padding: showAdd ? "0 4px 0 12px" : "0 14px",
      background: "var(--ba-gradient-panel)",
      borderRadius: "var(--radius-pill)",
      boxShadow: "0 0 0 1.5px var(--ba-gold), 0 0 0 3px var(--ba-stroke-dark), var(--shadow-sm)",
      fontFamily: "var(--font-pixel)",
      ...style
    }
  }, rest), iconSrc ? /*#__PURE__*/React.createElement("img", {
    src: iconSrc,
    width: s.ic,
    height: s.ic,
    alt: "",
    style: {
      imageRendering: "pixelated",
      display: "block"
    }
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      color: tint,
      fontSize: s.fs
    }
  }, glyph), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: s.fs,
      color: "var(--ba-parchment)",
      letterSpacing: "var(--tracking-wide)",
      textShadow: "var(--text-outline)",
      minWidth: 0
    }
  }, amount.toLocaleString()), showAdd && /*#__PURE__*/React.createElement("button", {
    onClick: onAdd,
    "aria-label": "Add",
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: s.h - 10,
      height: s.h - 10,
      marginLeft: 2,
      border: "none",
      cursor: "pointer",
      borderRadius: "var(--radius-pill)",
      background: "var(--ba-gradient-gold)",
      color: "var(--ba-ink)",
      fontFamily: "var(--font-pixel)",
      fontSize: s.fs,
      lineHeight: 1,
      boxShadow: "0 0 0 1.5px var(--ba-stroke-dark), inset 0 1px 0 rgba(255,255,255,0.4)"
    }
  }, "+"));
}
Object.assign(__ds_scope, { ResourceCounter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/game/ResourceCounter.jsx", error: String((e && e.message) || e) }); }

// components/game/SegmentedControl.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * SegmentedControl — the pixel tab switcher used for hub navigation
 * (Forge / Training / Map). A sunken stone track with a raised gold
 * plate sliding under the active segment.
 */
function SegmentedControl({
  options = [],
  value,
  onChange = () => {},
  size = "md",
  style = {},
  ...rest
}) {
  const sizes = {
    sm: {
      h: 38,
      fs: "var(--text-base)"
    },
    md: {
      h: 48,
      fs: "var(--text-md)"
    },
    lg: {
      h: 58,
      fs: "var(--text-lg)"
    }
  };
  const s = sizes[size] || sizes.md;
  const items = options.map(o => typeof o === "string" ? {
    value: o,
    label: o
  } : o);
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "tablist",
    style: {
      display: "inline-flex",
      gap: 4,
      padding: 4,
      height: s.h,
      background: "var(--ba-bg-deep)",
      borderRadius: "var(--radius-md)",
      boxShadow: "var(--shadow-inset), 0 0 0 1.5px var(--ba-panel-border)",
      ...style
    }
  }, rest), items.map(it => {
    const active = it.value === value;
    return /*#__PURE__*/React.createElement("button", {
      key: it.value,
      role: "tab",
      "aria-selected": active,
      onClick: () => onChange(it.value),
      style: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        padding: "0 18px",
        height: "100%",
        border: "none",
        cursor: "pointer",
        borderRadius: "var(--radius-sm)",
        fontFamily: "var(--font-pixel)",
        fontSize: s.fs,
        letterSpacing: "var(--tracking-wide)",
        color: active ? "var(--ba-ink)" : "var(--ba-parchment-dim)",
        background: active ? "var(--ba-gradient-gold)" : "transparent",
        boxShadow: active ? "0 0 0 1.5px var(--ba-stroke-dark), inset 0 2px 0 rgba(255,255,255,0.3), 0 2px 0 rgba(0,0,0,0.4)" : "none",
        textShadow: active ? "0 1px 0 rgba(255,255,255,0.3)" : "var(--text-outline)",
        transition: "background var(--dur-base) var(--ease-snap), color var(--dur-base)",
        whiteSpace: "nowrap"
      }
    }, it.icon && /*#__PURE__*/React.createElement("img", {
      src: it.icon,
      width: 20,
      height: 20,
      alt: "",
      style: {
        imageRendering: "pixelated"
      }
    }), it.label);
  }));
}
Object.assign(__ds_scope, { SegmentedControl });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/game/SegmentedControl.jsx", error: String((e && e.message) || e) }); }

// components/game/StatUpgradeRow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * StatUpgradeRow — the training/forge upgrade line item.
 * Mirrors the game's BuildingStatUpgradeRow: pixel stat icon, name + level
 * pips, and a gold cost button on the right. Sunken stone row.
 */
function StatUpgradeRow({
  icon = null,
  name = "Stat",
  level = 1,
  maxLevel = 10,
  cost = 0,
  currency = "gold",
  affordable = true,
  maxed = false,
  costIconSrc = null,
  onUpgrade = () => {},
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-3)",
      padding: "10px 12px",
      background: "var(--ba-panel-raised)",
      borderRadius: "var(--radius-md)",
      boxShadow: "0 0 0 1.5px var(--ba-panel-border), var(--shadow-inset)",
      ...style
    }
  }, rest), icon && /*#__PURE__*/React.createElement("img", {
    src: icon,
    width: 44,
    height: 44,
    alt: "",
    style: {
      imageRendering: "pixelated",
      background: "var(--ba-bg-deep)",
      borderRadius: "var(--radius-sm)",
      boxShadow: "0 0 0 1.5px var(--ba-panel-border)",
      padding: 2,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      fontFamily: "var(--font-pixel)",
      marginBottom: 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-md)",
      color: "var(--ba-parchment)",
      letterSpacing: "var(--tracking-wide)",
      textShadow: "var(--text-outline)",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-xs)",
      color: "var(--ba-gold-bright)",
      letterSpacing: "var(--tracking-wide)",
      textShadow: "var(--text-outline)",
      flexShrink: 0,
      marginLeft: 8
    }
  }, "Lv ", level, maxLevel ? `/${maxLevel}` : "")), /*#__PURE__*/React.createElement(__ds_scope.ProgressBar, {
    value: level,
    max: maxLevel,
    segments: maxLevel <= 12 ? maxLevel : 0,
    height: 12
  })), maxed ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-pixel)",
      fontSize: "var(--text-base)",
      color: "var(--ba-gold-bright)",
      letterSpacing: "var(--tracking-wide)",
      textShadow: "var(--text-outline)",
      padding: "0 8px",
      flexShrink: 0
    }
  }, "MAX") : /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: affordable ? "primary" : "secondary",
    size: "sm",
    disabled: !affordable,
    onClick: onUpgrade,
    style: {
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.CurrencyLabel, {
    amount: cost,
    currency: currency,
    affordable: affordable,
    iconSrc: costIconSrc,
    size: "sm"
  })));
}
Object.assign(__ds_scope, { StatUpgradeRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/game/StatUpgradeRow.jsx", error: String((e && e.message) || e) }); }

// ui_kits/game/Frame.jsx
try { (() => {
/* Shared phone frame + scene helpers for the Bow & Arrow game UI kit.
   Exposed on window so sibling babel scripts can use them. */
const {
  useState
} = React;
const NS = window.BowArrowDesignSystem_19524f;
function PhoneFrame({
  children,
  label
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 390,
      height: 760,
      background: "var(--ba-bg)",
      borderRadius: 44,
      boxShadow: "0 0 0 10px #05070d, 0 0 0 13px #2a2622, 0 30px 60px rgba(0,0,0,0.6)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 0,
      left: "50%",
      transform: "translateX(-50%)",
      width: 150,
      height: 28,
      background: "#05070d",
      borderBottomLeftRadius: 16,
      borderBottomRightRadius: 16,
      zIndex: 50
    }
  }), children), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-pixel)",
      fontSize: 16,
      color: "var(--ba-parchment-dim)",
      letterSpacing: 1
    }
  }, label));
}
function StatusBar() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      zIndex: 40,
      height: 44,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 22px 0 26px",
      fontFamily: "var(--font-pixel)",
      fontSize: 18,
      color: "var(--ba-parchment)",
      textShadow: "var(--text-outline)"
    }
  }, /*#__PURE__*/React.createElement("span", null, "9:41"), /*#__PURE__*/React.createElement("span", {
    style: {
      letterSpacing: 2
    }
  }, "\u25CF \u25CF \u25AE"));
}
Object.assign(window, {
  PhoneFrame,
  StatusBar,
  NS
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/game/Frame.jsx", error: String((e && e.message) || e) }); }

// ui_kits/game/Screens.jsx
try { (() => {
/* Bow & Arrow — game screens. Each is a 390x760 phone screen body.
   Composes design-system components from window.NS. */
const {
  Button,
  Panel,
  Badge,
  ProgressBar,
  ResourceCounter,
  SegmentedControl,
  StatUpgradeRow,
  CurrencyLabel
} = window.NS;
const A = "../../assets/";

/* ---------- Top resource bar shared by hub screens ---------- */
function HubTopBar() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      padding: "4px 14px 12px",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(ResourceCounter, {
    amount: 12500,
    iconSrc: A + "league-gold.png",
    size: "sm",
    showAdd: true
  }), /*#__PURE__*/React.createElement(ResourceCounter, {
    amount: 40,
    iconSrc: A + "mana-drop.png",
    size: "sm"
  }), /*#__PURE__*/React.createElement(ResourceCounter, {
    amount: 8,
    iconSrc: A + "trophy.png",
    size: "sm"
  }));
}

/* ---------- Bottom nav ---------- */
function HubNav({
  tab,
  setTab
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      padding: "10px 16px 24px",
      background: "linear-gradient(180deg, transparent, var(--ba-bg-deep) 40%)",
      display: "flex",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(SegmentedControl, {
    value: tab,
    onChange: setTab,
    size: "md",
    options: [{
      value: "map",
      label: "MAP"
    }, {
      value: "forge",
      label: "FORGE"
    }, {
      value: "training",
      label: "TRAINING"
    }]
  }));
}

/* ---------- TITLE ---------- */
function TitleScreen({
  onPlay
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "var(--ba-gradient-sky)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingTop: 70
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: A + "app-icon-dark.png",
    width: 150,
    height: 150,
    style: {
      imageRendering: "pixelated",
      borderRadius: 24,
      boxShadow: "0 0 0 3px var(--ba-gold), 0 0 0 6px var(--ba-stroke-dark), var(--glow-gold)"
    }
  }), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-pixel)",
      fontSize: 64,
      lineHeight: 0.86,
      textAlign: "center",
      color: "var(--ba-gold)",
      textShadow: "var(--text-outline)",
      margin: "26px 0 0"
    }
  }, "BOW &", /*#__PURE__*/React.createElement("br", null), "ARROW"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-pixel)",
      fontSize: 22,
      color: "var(--ba-parchment-dim)",
      letterSpacing: 2,
      margin: "10px 0 0"
    }
  }, "DEFEND THE KEEP"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "auto",
      marginBottom: 70,
      width: "78%",
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    full: true,
    onClick: onPlay
  }, "PLAY"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "md",
    full: true
  }, "HALL OF FAME")));
}

/* ---------- HUB / MAP ---------- */
function MapScreen() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      top: 44,
      background: "url(" + A + "battlefield-bg.png) center/cover",
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement(HubTopBar, null), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 30,
      left: "50%",
      transform: "translateX(-50%)",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: A + "menu-castle-hub.png",
    width: 120,
    style: {
      imageRendering: "pixelated"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: "gold"
  }, "YOUR KEEP"))), /*#__PURE__*/React.createElement("img", {
    src: A + "tree-1.png",
    width: 70,
    style: {
      position: "absolute",
      top: 150,
      left: 18,
      imageRendering: "pixelated"
    }
  }), /*#__PURE__*/React.createElement("img", {
    src: A + "old-wagon.png",
    width: 64,
    style: {
      position: "absolute",
      top: 200,
      right: 24,
      imageRendering: "pixelated"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      bottom: 96,
      left: 16,
      right: 16
    }
  }, /*#__PURE__*/React.createElement(Panel, {
    title: "STAGE 12 \u2014 ORC PASS",
    variant: "default"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: A + "enemy-ork-warrior.png",
    width: 56,
    style: {
      imageRendering: "pixelated"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: "danger",
    size: "sm"
  }, "12 ORCS"), /*#__PURE__*/React.createElement(Badge, {
    variant: "epic",
    size: "sm"
  }, "BOSS")), /*#__PURE__*/React.createElement(ProgressBar, {
    value: 11,
    max: 12,
    segments: 12,
    variant: "gold",
    height: 12,
    label: "STAGE PROGRESS"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "md",
    full: true
  }, "MARCH TO BATTLE"))))));
}

/* ---------- FORGE ---------- */
function ForgeScreen() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      top: 44,
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement(HubTopBar, null), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: "hidden",
      padding: "0 16px"
    }
  }, /*#__PURE__*/React.createElement(Panel, {
    title: "ROYAL FORGE",
    icon: /*#__PURE__*/React.createElement("img", {
      src: A + "weapon-longbow.png",
      width: 22,
      style: {
        imageRendering: "pixelated"
      }
    })
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      alignItems: "center",
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: A + "weapon-longbow.png",
    width: 64,
    style: {
      imageRendering: "pixelated",
      background: "var(--ba-bg-deep)",
      borderRadius: 8,
      boxShadow: "var(--shadow-inset)",
      padding: 4
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-pixel)",
      fontSize: 26,
      color: "var(--ba-parchment)",
      textShadow: "var(--text-outline)"
    }
  }, "Royal Longbow"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: "gold",
    size: "sm"
  }, "+12 DMG"), " ", /*#__PURE__*/React.createElement(Badge, {
    variant: "silver",
    size: "sm"
  }, "Lv 7")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(StatUpgradeRow, {
    icon: A + "stat-crit.png",
    name: "CRIT CHANCE",
    level: 3,
    maxLevel: 10,
    cost: 1250,
    costIconSrc: A + "league-gold.png",
    affordable: true
  }), /*#__PURE__*/React.createElement(StatUpgradeRow, {
    icon: A + "stat-attack-speed.png",
    name: "ATTACK SPEED",
    level: 5,
    maxLevel: 10,
    cost: 9800,
    costIconSrc: A + "league-gold.png",
    affordable: false
  }), /*#__PURE__*/React.createElement(StatUpgradeRow, {
    icon: A + "stat-knockback.png",
    name: "KNOCKBACK",
    level: 2,
    maxLevel: 10,
    cost: 640,
    costIconSrc: A + "league-gold.png",
    affordable: true
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 96
    }
  }));
}

/* ---------- TRAINING ---------- */
function TrainingScreen() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      top: 44,
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement(HubTopBar, null), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: "hidden",
      padding: "0 16px",
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Panel, {
    title: "COMPANION \u2014 LEMMRICH",
    icon: /*#__PURE__*/React.createElement("img", {
      src: A + "companion-lemmrich-logo.png",
      width: 22,
      style: {
        imageRendering: "pixelated"
      }
    })
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: A + "companion-lemmrich-portrait.png",
    width: 60,
    style: {
      imageRendering: "pixelated",
      background: "var(--ba-bg-deep)",
      borderRadius: 8,
      padding: 4,
      boxShadow: "var(--shadow-inset)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(ProgressBar, {
    value: 4,
    max: 6,
    segments: 6,
    variant: "xp",
    height: 12,
    label: "BOND LEVEL 4"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      display: "flex",
      gap: 6,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: A + "ability-frozen-wrath.png",
    width: 34,
    style: {
      imageRendering: "pixelated",
      borderRadius: 6,
      boxShadow: "0 0 0 1.5px var(--ba-sapphire)"
    }
  }), /*#__PURE__*/React.createElement(Badge, {
    variant: "sapphire",
    size: "sm"
  }, "FROZEN WRATH"))))), /*#__PURE__*/React.createElement(Panel, {
    title: "WIZARD TRAINING",
    icon: /*#__PURE__*/React.createElement("img", {
      src: A + "stat-max-mana.png",
      width: 22,
      style: {
        imageRendering: "pixelated"
      }
    })
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(StatUpgradeRow, {
    icon: A + "stat-max-mana.png",
    name: "MAX MANA",
    level: 10,
    maxLevel: 10,
    maxed: true
  }), /*#__PURE__*/React.createElement(StatUpgradeRow, {
    icon: A + "spell-healing-wave.png",
    name: "HEALING WAVE",
    level: 4,
    maxLevel: 8,
    cost: 30,
    currency: "mana",
    costIconSrc: A + "mana-drop.png",
    affordable: true
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 96
    }
  }));
}

/* ---------- COMBAT HUD ---------- */
function CombatScreen({
  onExit
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "url(" + A + "battlefield-bg.png) center/cover"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      top: 44
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      padding: "8px 14px"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Badge, {
    variant: "danger",
    size: "lg",
    icon: /*#__PURE__*/React.createElement("img", {
      src: A + "enemy-dragon.png",
      width: 18,
      style: {
        imageRendering: "pixelated"
      }
    })
  }, "WAVE 4 / 6"), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 150,
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement(ProgressBar, {
    value: 62,
    max: 100,
    variant: "health",
    height: 14,
    label: "KEEP HP"
  }))), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm",
    onClick: onExit
  }, "\u275A\u275A")), /*#__PURE__*/React.createElement("img", {
    src: A + "enemy-dragon.png",
    width: 120,
    style: {
      position: "absolute",
      top: 120,
      right: 10,
      imageRendering: "pixelated"
    }
  }), /*#__PURE__*/React.createElement("img", {
    src: A + "enemy-ork-warrior.png",
    width: 70,
    style: {
      position: "absolute",
      top: 250,
      right: 130,
      imageRendering: "pixelated"
    }
  }), /*#__PURE__*/React.createElement("img", {
    src: A + "enemy-ork-warrior.png",
    width: 60,
    style: {
      position: "absolute",
      top: 300,
      right: 40,
      imageRendering: "pixelated",
      transform: "scaleX(-1)"
    }
  }), /*#__PURE__*/React.createElement("img", {
    src: A + "tower.png",
    width: 84,
    style: {
      position: "absolute",
      bottom: 150,
      left: 16,
      imageRendering: "pixelated"
    }
  }), /*#__PURE__*/React.createElement("img", {
    src: A + "weapon-longbow.png",
    width: 72,
    style: {
      position: "absolute",
      bottom: 158,
      left: 80,
      imageRendering: "pixelated"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      bottom: 28,
      left: 16,
      right: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement(ProgressBar, {
    value: 40,
    max: 100,
    variant: "mana",
    height: 16,
    label: "MANA"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(AbilityButton, {
    src: A + "spell-healing-wave.png",
    ready: true
  }), /*#__PURE__*/React.createElement(AbilityButton, {
    src: A + "ability-frozen-wrath.png",
    ready: true
  }), /*#__PURE__*/React.createElement(AbilityButton, {
    src: A + "stat-crit.png",
    cooldown: "3"
  })))));
}
function AbilityButton({
  src,
  ready,
  cooldown
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 64,
      height: 64,
      borderRadius: 12,
      background: "var(--ba-gradient-panel)",
      boxShadow: ready ? "0 0 0 2px var(--ba-gold), 0 0 0 4px var(--ba-stroke-dark), var(--glow-gold)" : "0 0 0 2px var(--ba-panel-border), 0 0 0 4px var(--ba-stroke-dark)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: src,
    width: 44,
    style: {
      imageRendering: "pixelated",
      filter: ready ? "none" : "grayscale(0.7) brightness(0.6)"
    }
  }), cooldown && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "var(--font-pixel)",
      fontSize: 32,
      color: "var(--ba-parchment)",
      textShadow: "var(--text-outline)",
      background: "rgba(8,12,20,0.5)",
      borderRadius: 12
    }
  }, cooldown));
}
Object.assign(window, {
  TitleScreen,
  MapScreen,
  ForgeScreen,
  TrainingScreen,
  CombatScreen,
  HubNav
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/game/Screens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Sections.jsx
try { (() => {
/* Bow & Arrow — marketing website sections. Composes window.NS components.
   Dark-fantasy landing page for the iOS game. */
const {
  Button,
  Panel,
  Badge,
  ProgressBar
} = window.NS;
const A = "../../assets/";
function px(n) {
  return n + "px";
}

/* ---- shared shells ---- */
function Section({
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 1100,
      margin: "0 auto",
      padding: "0 32px",
      ...style
    }
  }, children);
}
function Kicker({
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-pixel)",
      fontSize: 20,
      letterSpacing: 3,
      color: "var(--ba-gold)",
      textShadow: "var(--text-outline)",
      marginBottom: 10
    }
  }, children);
}
function H2({
  children
}) {
  return /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-pixel)",
      fontSize: 56,
      lineHeight: 0.95,
      color: "var(--ba-parchment)",
      textShadow: "var(--text-outline)",
      margin: 0
    }
  }, children);
}

/* ---- top bar ---- */
function NavBar() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 50,
      background: "rgba(8,12,20,0.82)",
      backdropFilter: "blur(6px)",
      boxShadow: "0 2px 0 var(--ba-panel-border)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1100,
      margin: "0 auto",
      padding: "12px 32px",
      display: "flex",
      alignItems: "center",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: A + "app-icon-dark.png",
    width: 40,
    height: 40,
    style: {
      imageRendering: "pixelated",
      borderRadius: 8,
      boxShadow: "0 0 0 2px var(--ba-gold)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-pixel)",
      fontSize: 28,
      color: "var(--ba-gold)",
      textShadow: "var(--text-outline)",
      letterSpacing: 1
    }
  }, "BOW & ARROW"), /*#__PURE__*/React.createElement("nav", {
    style: {
      marginLeft: "auto",
      display: "flex",
      gap: 24,
      alignItems: "center"
    }
  }, ["Features", "Enemies", "Loot"].map(l => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: "#" + l.toLowerCase(),
    style: {
      fontFamily: "var(--font-pixel)",
      fontSize: 22,
      color: "var(--ba-parchment-dim)",
      textDecoration: "none",
      letterSpacing: 1
    }
  }, l)), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "sm"
  }, "GET IT FREE"))));
}

/* ---- hero ---- */
function Hero() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      overflow: "hidden",
      borderBottom: "2px solid var(--ba-panel-border)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "url(" + A + "battlefield-bg.png) center/cover",
      opacity: 0.5
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "linear-gradient(180deg, rgba(8,12,20,0.6), var(--ba-bg) 92%)"
    }
  }), /*#__PURE__*/React.createElement(Section, {
    style: {
      position: "relative",
      display: "grid",
      gridTemplateColumns: "1.1fr 0.9fr",
      gap: 32,
      alignItems: "center",
      padding: "64px 32px 72px"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Kicker, null, "\u2605 RETRO TOWER DEFENSE"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-pixel)",
      fontSize: 92,
      lineHeight: 0.82,
      color: "var(--ba-gold)",
      textShadow: "var(--text-outline)",
      margin: "0 0 18px"
    }
  }, "DEFEND", /*#__PURE__*/React.createElement("br", null), "THE KEEP"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-pixel)",
      fontSize: 26,
      lineHeight: 1.25,
      color: "var(--ba-parchment)",
      maxWidth: 460,
      margin: "0 0 26px"
    }
  }, "Draw your longbow, command companions, and hold the line against the endless orc horde. One archer. One castle. A thousand foes."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 14,
      alignItems: "center",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg"
  }, "\u25B6 PLAY ON iOS"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "lg"
  }, "WATCH TRAILER")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 22,
      display: "flex",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: "gold"
  }, "4.8 \u2605 APP STORE"), /*#__PURE__*/React.createElement(Badge, {
    variant: "stone"
  }, "500K+ KEEPS DEFENDED"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: A + "app-icon-dark.png",
    width: 300,
    style: {
      imageRendering: "pixelated",
      borderRadius: 40,
      boxShadow: "0 0 0 4px var(--ba-gold), 0 0 0 8px var(--ba-stroke-dark), var(--glow-gold), 0 30px 60px rgba(0,0,0,0.6)"
    }
  }))));
}

/* ---- features ---- */
function Features() {
  const items = [{
    icon: A + "weapon-longbow.png",
    title: "MASTER THE BOW",
    body: "Forge and upgrade legendary bows. Tune crit, attack speed, and knockback to your battle style."
  }, {
    icon: A + "ability-frozen-wrath.png",
    title: "CAST SPELLS",
    body: "Spend mana on healing waves, blizzards and frozen wrath to turn the tide of any wave."
  }, {
    icon: A + "companion-lemmrich-logo.png",
    title: "RALLY COMPANIONS",
    body: "Recruit heroes like Lemmrich, bond with them, and unlock devastating ultimate abilities."
  }];
  return /*#__PURE__*/React.createElement(Section, {
    style: {
      padding: "72px 32px"
    },
    id: "features"
  }, /*#__PURE__*/React.createElement(Kicker, null, "WHAT AWAITS YOU"), /*#__PURE__*/React.createElement(H2, null, "Built for the siege"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: 20,
      marginTop: 32
    }
  }, items.map(it => /*#__PURE__*/React.createElement(Panel, {
    key: it.title,
    style: {
      height: "100%"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: it.icon,
    width: 64,
    style: {
      imageRendering: "pixelated",
      marginBottom: 12
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-pixel)",
      fontSize: 30,
      color: "var(--ba-gold)",
      textShadow: "var(--text-outline)",
      marginBottom: 8
    }
  }, it.title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-pixel)",
      fontSize: 22,
      lineHeight: 1.25,
      color: "var(--ba-parchment)",
      margin: 0
    }
  }, it.body)))));
}

/* ---- enemies showcase ---- */
function Enemies() {
  const foes = [{
    src: A + "enemy-ork-warrior.png",
    name: "ORC WARRIOR",
    tier: "stone",
    rank: "COMMON"
  }, {
    src: A + "enemy-dragon.png",
    name: "ELDER DRAGON",
    tier: "danger",
    rank: "BOSS"
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--ba-bg-deep)",
      borderTop: "2px solid var(--ba-panel-border)",
      borderBottom: "2px solid var(--ba-panel-border)"
    },
    id: "enemies"
  }, /*#__PURE__*/React.createElement(Section, {
    style: {
      padding: "72px 32px"
    }
  }, /*#__PURE__*/React.createElement(Kicker, null, "KNOW YOUR ENEMY"), /*#__PURE__*/React.createElement(H2, null, "The horde marches at dusk"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 20,
      marginTop: 32
    }
  }, foes.map(f => /*#__PURE__*/React.createElement(Panel, {
    key: f.name,
    variant: f.rank === "BOSS" ? "legendary" : "default",
    bodyStyle: {
      display: "flex",
      alignItems: "center",
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 120,
      height: 120,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "url(" + A + "battlefield-bg.png) center/cover",
      borderRadius: 8,
      boxShadow: "var(--shadow-inset)"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: f.src,
    style: {
      maxWidth: 100,
      maxHeight: 100,
      imageRendering: "pixelated"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: f.tier,
    size: "sm"
  }, f.rank), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-pixel)",
      fontSize: 32,
      color: "var(--ba-parchment)",
      textShadow: "var(--text-outline)",
      margin: "8px 0 10px"
    }
  }, f.name), /*#__PURE__*/React.createElement(ProgressBar, {
    value: f.rank === "BOSS" ? 100 : 45,
    max: 100,
    variant: "health",
    height: 12,
    label: "THREAT"
  })))))));
}

/* ---- loot / chests ---- */
function Loot() {
  const chests = [{
    src: A + "bronze-chest.png",
    name: "BRONZE",
    tier: "bronze"
  }, {
    src: A + "gold-chest.png",
    name: "GOLD",
    tier: "gold"
  }, {
    src: A + "legendary-chest.png",
    name: "LEGENDARY",
    tier: "epic"
  }];
  return /*#__PURE__*/React.createElement(Section, {
    style: {
      padding: "72px 32px"
    },
    id: "loot"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement(Kicker, null, "SPOILS OF WAR"), /*#__PURE__*/React.createElement(H2, null, "Crack open the loot")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      gap: 40,
      marginTop: 40,
      flexWrap: "wrap"
    }
  }, chests.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.name,
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: c.src,
    width: 120,
    style: {
      imageRendering: "pixelated",
      filter: "drop-shadow(0 8px 0 rgba(0,0,0,0.4))"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: c.tier
  }, c.name))))));
}

/* ---- CTA + footer ---- */
function CTA() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      overflow: "hidden",
      borderTop: "2px solid var(--ba-panel-border)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "url(" + A + "battlefield-bg.png) center/cover",
      opacity: 0.35
    }
  }), /*#__PURE__*/React.createElement(Section, {
    style: {
      position: "relative",
      textAlign: "center",
      padding: "80px 32px"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: A + "coat-of-arms.png",
    width: 90,
    style: {
      imageRendering: "pixelated",
      marginBottom: 18
    }
  }), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-pixel)",
      fontSize: 64,
      color: "var(--ba-gold)",
      textShadow: "var(--text-outline)",
      margin: "0 0 16px",
      lineHeight: 0.9
    }
  }, "The keep needs you, archer."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-pixel)",
      fontSize: 26,
      color: "var(--ba-parchment)",
      margin: "0 0 28px"
    }
  }, "Free to play. Endless to master."), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg"
  }, "\u25B6 DOWNLOAD ON THE APP STORE")));
}
function Footer() {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: "var(--ba-bg-deep)",
      borderTop: "2px solid var(--ba-panel-border)",
      padding: "28px 32px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1100,
      margin: "0 auto",
      display: "flex",
      alignItems: "center",
      gap: 12,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: A + "app-icon-dark.png",
    width: 32,
    style: {
      imageRendering: "pixelated",
      borderRadius: 6
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-pixel)",
      fontSize: 22,
      color: "var(--ba-parchment-dim)"
    }
  }, "BOW & ARROW \u2014 \xA9 The Keep Studios"), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: "auto",
      fontFamily: "var(--font-pixel)",
      fontSize: 20,
      color: "var(--ba-parchment-dim)",
      letterSpacing: 1
    }
  }, "PRIVACY \xB7 TERMS \xB7 SUPPORT")));
}
Object.assign(window, {
  NavBar,
  Hero,
  Features,
  Enemies,
  Loot,
  CTA,
  Footer
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Sections.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Panel = __ds_scope.Panel;

__ds_ns.CurrencyLabel = __ds_scope.CurrencyLabel;

__ds_ns.ProgressBar = __ds_scope.ProgressBar;

__ds_ns.ResourceCounter = __ds_scope.ResourceCounter;

__ds_ns.SegmentedControl = __ds_scope.SegmentedControl;

__ds_ns.StatUpgradeRow = __ds_scope.StatUpgradeRow;

})();
