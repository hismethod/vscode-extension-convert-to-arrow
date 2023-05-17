export function convertNamedToArrowFunction(text: string): string {
  const namedFunctionPattern = /function\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\s*\(([^)]*)\)\s*\{([^}]*)\}/g;
  const arrowFunctionReplacement = "const $1 = ($2) => {$3}";
  return text.replace(namedFunctionPattern, arrowFunctionReplacement);
}

export function convertFunction(text: string): string {
  if (isNamedFunction(text)) {
    return convertNamedToArrowFunction(text);
  } else {
    return text;
  }
}

export function isNamedFunction(text: string): boolean {
  const namedFunctionPattern = /function\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\s*\(([^)]*)\)\s*\{([^}]*)\}/;
  return namedFunctionPattern.test(text);
}
