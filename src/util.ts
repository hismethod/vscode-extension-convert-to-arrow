import * as vscode from "vscode";

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

export function isNamedFunction(text: string): boolean {
  const namedFunctionPattern = /function\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\s*\(([^)]*)\)\s*\{([^}]*)\}/;
  return namedFunctionPattern.test(text);
}
