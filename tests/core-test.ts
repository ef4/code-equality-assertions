import QUnit from "qunit";
import { codeEqual } from "code-equality-assertions";
const { module, test } = QUnit;

module("core", () => {
  const examples = [
    [`console.log('hello')`, `console.log("hello");`],
    [`const result = { ...content }?.[0].content`, `const result = { \n...content\n }?.[0].content`],
    [`function x(message: string): string { return message + "!" }`, `function x(message: string): string { 
      return message + '!' 
    }`]
  ];

  for (let [left, right] of examples) {
    test(`codeEquals(${left}, ${right})`, (assert) => {
      let result = codeEqual(left, right);
      assert.ok(result.result, result.diff);
    });
  }
});
