import * as vscode from "vscode";
import * as parser from "@babel/parser";
import * as t from "@babel/types";
import traverse from "@babel/traverse";
import generate from "@babel/generator";

export function getFunctionRange(document: vscode.TextDocument, range: vscode.Range): vscode.Range | undefined {
  const text = document.getText();
  const ast = parser.parse(text, {
    plugins: ["jsx", "typescript"],
  });

  let functionRange: vscode.Range | undefined = undefined;

  traverse(ast, {
    FunctionDeclaration: function (path) {
      const start = document.positionAt(path.node.start!);
      const end = document.positionAt(path.node.end!);

      if (range.intersection(new vscode.Range(start, end))) {
        functionRange = new vscode.Range(start, end);
        path.stop();
      }
    },
  });

  return functionRange;
}

export function convertNamedToArrowFunction(functionText: string): string | undefined {
  const functionPattern = /(async\s*)?function(\s+\w+)?\s*\((.*?)\)/;
  const match = functionPattern.exec(functionText);

  if (!match) {
    return undefined; // No function found
  }

  const asyncKeyword = match[1] ? "async " : ""; // Check if async keyword is present
  const functionName = match[2] ? match[2].trim() : "";
  const functionArgs = match[3];

  // Convert to arrow function
  const arrowFunction = `const ${functionName} = ${asyncKeyword}(${functionArgs}) =>`;

  // Replace the function definition with the new arrow function
  const arrowFunctionText = functionText.replace(functionPattern, arrowFunction);

  return arrowFunctionText;
}

function convertToArrowViaAST(document: vscode.TextDocument, functionRange: vscode.Range) {
  const code = document.getText(functionRange);

  const ast = parser.parse(code, {
    sourceType: "module",
    plugins: ["jsx", "typescript"],
  });

  traverse(ast, {
    FunctionDeclaration(path) {
      const { id, params, body, async } = path.node;
      const arrowFunction = t.arrowFunctionExpression(params, body, async);
      const variableDeclaration = t.variableDeclaration("const", [t.variableDeclarator(id!, arrowFunction)]);
      path.replaceWith(variableDeclaration);
    },
  });

  const output = generate(ast, {}, code);
  return output.code;
}

export function isNamedFunction(text: string): boolean {
  const namedFunctionPattern = /(async\s*)?function(\s+\w+)?\s*\((.*?)\)/;
  return namedFunctionPattern.test(text);
}
