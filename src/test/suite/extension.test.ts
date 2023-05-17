import * as assert from "assert";

import * as vscode from "vscode";
import { convertNamedToArrowFunction } from "../../util";

suite("Extension Test Suite", () => {
  vscode.window.showInformationMessage("Start all tests.");

  test("Converts named function to arrow function", () => {
    const namedFunction = "function test(arg1, arg2) {\n  return arg1 + arg2;\n}";
    const expectedArrowFunction = "const test = (arg1, arg2) => {\n  return arg1 + arg2;\n}";
    const result = convertNamedToArrowFunction(namedFunction);
    assert.equal(result, expectedArrowFunction);
  });
});
