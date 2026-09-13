/** Regression checks for touch hover flicker and a drag consuming the next tap.
 * Runs actual JSX handlers and the zoom hook with minimal hook state; no browser
 * layout simulation. Run: node scripts/check-map-pointer-selection.mjs
 */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

const compile = (source) => ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
let pairs = 0;
for (const name of ['WorldProgressMap', 'SubdivisionMap', 'HistoricalMap']) {
  const file = `src/components/${name}.tsx`;
  const source = fs.readFileSync(file, 'utf8');
  const tree = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  function visit(node) {
    if (ts.isJsxOpeningElement(node) && ['path', 'g'].includes(node.tagName.getText(tree))) {
      const props = new Map(node.attributes.properties.filter(ts.isJsxAttribute).map(p => [p.name.getText(tree), p]));
      assert.ok(!props.has('onMouseEnter') && !props.has('onMouseLeave'), `${name}: no synthetic touch/mouse hover`);
      if (props.has('onPointerEnter')) {
        const hover = [];
        const selected = [];
        const context = {
          exports: {}, clickable: true, isInteractive: true, alpha2: 'AU', code: 'AU-NSW', name: 'New South Wales',
          f: { name: 'Historical polity' },
          selectable: { territoryParent: {}, onHover: value => hover.push(value) },
          onHover: value => hover.push(value), setHoveredCode: () => {},
          handlePathClick: (_e, value) => selected.push(value), onSelect: value => selected.push(value),
        };
        const handler = prop => {
          const expression = props.get(prop).initializer.expression.getText(tree);
          vm.runInNewContext(compile(`export const fn = (${expression});`), context);
          return context.exports.fn;
        };
        const enter = handler('onPointerEnter'), leave = handler('onPointerLeave'), click = handler('onClick');
        for (const pointerType of ['touch', 'pen']) {
          enter({ pointerType }); leave({ pointerType });
          assert.equal(hover.length, 0, `${name}: ${pointerType} must not resize the page through hover`);
        }
        enter({ pointerType: 'mouse' });
        assert.equal(hover.length, 1, `${name}: mouse preview retained`);
        leave({ pointerType: 'mouse' });
        assert.equal(hover.at(-1), null, `${name}: mouse leave clears preview`);
        click({ pointerType: 'touch' });
        assert.equal(selected.length, 1, `${name}: a tap selects once`);
        leave({ pointerType: 'touch' });
        assert.equal(selected.length, 1, `${name}: lifting the finger does not clear selection`);
        pairs++;
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(tree);
}
assert.equal(pairs, 4, 'world, historical, subdivision polygons and subdivision point markers covered');

const module = { exports: {} };
vm.runInNewContext(compile(fs.readFileSync('src/hooks/useZoomPan.ts', 'utf8')), {
  exports: module.exports,
  require: name => {
    assert.equal(name, 'react');
    return {
      useRef: current => ({ current }), useCallback: fn => fn,
      useState: initial => { let state = initial; return [state, next => { state = typeof next === 'function' ? next(state) : next; }]; },
    };
  },
});
const handlers = module.exports.useZoomPan(960, 500).svgHandlers;
const listeners = new Set();
const svg = {
  getBoundingClientRect: () => ({ width: 960, height: 500 }),
  setPointerCapture: () => {}, releasePointerCapture: () => {},
  addEventListener: (_name, fn) => listeners.add(fn), removeEventListener: (_name, fn) => listeners.delete(fn),
};
const event = (type, x = 0) => ({ type, button: 0, pointerId: 1, pointerType: 'touch', clientX: x, clientY: 0, currentTarget: svg });
function drag(end) {
  handlers.onPointerDown(event('pointerdown'));
  handlers.onPointerMove(event('pointermove', 20));
  handlers[end](event(end === 'onPointerCancel' ? 'pointercancel' : 'pointerup', 20));
}
drag('onPointerCancel');
assert.equal(listeners.size, 0, 'cancelled drag cannot swallow a later selection');
drag('onPointerUp');
assert.equal(listeners.size, 1, 'completed drag suppresses its accidental click');
let stopped = false;
for (const fn of listeners) fn({ stopPropagation: () => { stopped = true; }, preventDefault: () => {} });
assert.equal(stopped, true);
assert.equal(listeners.size, 0, 'suppression removes itself after the drag click');
drag('onPointerUp'); // Browser does not always emit a click after a touch drag.
handlers.onPointerDown(event('pointerdown'));
handlers.onPointerUp(event('pointerup'));
assert.equal(listeners.size, 0, 'the next intentional tap is never swallowed');
console.log('PASS: all four map hit targets preserve mouse hover and touch clicks; cancellation and subsequent-tap regressions passed.');
