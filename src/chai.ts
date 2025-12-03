import { codeEqual, codeContains } from "./index.js";

export function codeEquality(_chai: any) {
  _chai.Assertion.addMethod(
    "equalCode",
    function (this: any, expectedCode: string) {
      var obj = this._obj;

      let compared = codeEqual(obj, expectedCode);

      this.assert(
        compared.result,
        "expected code to match",
        "expected code to not match",
        compared.standardExpected,
        compared.standardActual
      );
    }
  );

  _chai.Assertion.addMethod(
    "containCode",
    function (this: any, expectedCode: string) {
      var obj = this._obj;

      this.assert(
        codeContains(obj, expectedCode),
        "expected #{this} to contain #{exp}",
        "expected #{this} to not contain #{exp}",
        expectedCode,
        obj,
        false
      );
    }
  );
}

export interface CodeEqualityAssertions {
  equalCode(expectedCode: string): void;
  containCode(expectedCode: string): void;
}
