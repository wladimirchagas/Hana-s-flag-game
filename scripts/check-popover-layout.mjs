/** Geometry/contrast regression checks; does not substitute for rendered Safari QA. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import postcss from 'postcss';
const context = { exports: {} };
vm.runInNewContext(ts.transpileModule(fs.readFileSync('src/lib/popoverBounds.ts', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText, context);
let cases = 0;
for (const width of [160, 320, 375, 390, 430, 768, 1024]) {
  for (const height of [240, 390, 640, 844]) {
    for (const offset of [0, 40]) {
      const viewport = { left: offset, top: offset, width, height };
      for (const left of [offset, offset + width / 2, offset + width - 44]) {
        for (const top of [offset, offset + height / 2, offset + height - 44]) {
          for (const panelWidth of [256, 280]) {
            const box = context.exports.popoverBounds({ left, right: left + 44, top, bottom: top + 44 }, viewport, panelWidth);
            assert.ok(box.left >= offset + 8);
            assert.ok(box.left + box.width <= offset + width - 8 + .001);
            assert.ok(box.top >= offset + 8);
            assert.ok(box.top + box.maxHeight <= offset + height - 8 + .001);
            assert.ok(box.maxHeight > 0);
            cases++;
          }
        }
      }
    }
  }
}
const styles = postcss.parse(fs.readFileSync('src/ButtonControls.css', 'utf8'));
const declarations = selector => {
  const result = {};
  styles.walkRules(rule => { if (rule.selector === selector) rule.walkDecls(d => { result[d.prop] = d.value; }); });
  return result;
};
const active = declarations('body .learn-toolbar__era-option--active,\nbody .learn-toolbar__era-option--active:hover');
assert.equal(active.background, 'var(--atlas-tint)');
assert.equal(active.color, 'var(--atlas-accent)');
assert.equal(declarations('body .learn-toolbar__era-option--active .learn-toolbar__era-option-caption').color, 'var(--ink)');
const luminance = hex => {
  const rgb = hex.replace('#', '').match(/../g).map(x => parseInt(x, 16) / 255).map(x => x <= .04045 ? x / 12.92 : ((x + .055) / 1.055) ** 2.4);
  return rgb[0] * .2126 + rgb[1] * .7152 + rgb[2] * .0722;
};
const ratio = (a, b) => { const x = luminance(a), y = luminance(b); return (Math.max(x, y) + .05) / (Math.min(x, y) + .05); };
const palette = postcss.parse(fs.readFileSync('src/pages/LearnAtlas.css', 'utf8'));
for (const dark of [false, true]) {
  const vars = {};
  palette.walkRules(rule => {
    if (rule.selector === (dark ? ':root[data-theme="dark"]:has(.learn-page--atlas)' : ':root:has(.learn-page--atlas)')) rule.walkDecls(d => { vars[d.prop] = d.value; });
  });
  for (const [fg, bg] of [['--atlas-accent', '--atlas-tint'], ['--ink', '--atlas-tint'], ['--ink-soft', '--paper'], ['--ink', '--paper']]) {
    assert.ok(ratio(vars[fg], vars[bg]) >= 4.5, `${dark ? 'dark' : 'light'}: ${fg}/${bg} must be readable`);
  }
  const badge = declarations(dark ? ':root[data-theme="dark"] body .learn-toolbar__era-today-badge' : 'body .learn-toolbar__era-today-badge');
  const text = badge.color === '#fff' ? '#ffffff' : badge.color;
  assert.ok(ratio(text, vars['--atlas-accent']) >= 4.5, 'NOW badge contrast');
}
console.log(`PASS: ${cases} popover edge/viewport cases, including narrow/landscape/zoomed viewports; all menu text pairs pass 4.5:1 in light and dark themes.`);
