import { createPatch } from "diff";
import prettier from "prettier";
import parser from "prettier/parser-babel.js";
import * as babel from '@babel/core';
// @ts-expect-error no upstream types
import TSSyntax from '@babel/plugin-syntax-typescript';

function standardize(code: string): string {
  return prettier.format(babel.transform(code, {babelrc: false, configFile: false, plugins: [TSSyntax] })!.code!, { parser: "babel", plugins: [parser]});
}

export function codeEqual(
  actual: string,
  expected: string
): { result: true; diff: undefined } | { result: false; diff: string } {
  let standardActual = standardize(actual)!;
  let standardExpected = standardize(expected)!;

  if (standardActual === standardExpected) {
    return { result: true, diff: undefined };
  } else {
    return {
      result: false,
      diff: createPatch("", standardExpected, standardActual)
        .split("\n")
        .slice(4)
        .join("\n"),
    };
  }
}


export function codeContains(
  actual: string,
  expected: string
): boolean {
  let standardActual = standardize(actual)!;
  let standardExpected = standardize(expected)!;
  return standardActual.indexOf(standardExpected) !== -1;
}