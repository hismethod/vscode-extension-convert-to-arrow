import * as vscode from "vscode";
import { convertNamedToArrowFunction } from "./util";

const fileTypesToApply = [
  { scheme: "file", language: "javascript" },
  { scheme: "file", language: "typescript" },
];
export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(vscode.commands.registerCommand("hismethod.convertToArrow", convertFunction));

  context.subscriptions.push(
    vscode.languages.registerCodeActionsProvider(fileTypesToApply, {
      provideCodeActions: (document, range, context, token) => {
        const functionRange = getFunctionRange(document, range);
        if (!functionRange) {
          return; // No function found
        }

        const action = new vscode.CodeAction("Convert to arrow function", vscode.CodeActionKind.RefactorRewrite);
        action.command = { command: "hismethod.convertToArrow", title: "Convert to Arrow Function" };
        action.isPreferred = true;

        return [action];
      },
    })
  );

  function getFunctionRange(document: vscode.TextDocument, range: vscode.Range): vscode.Range | undefined {
    const functionPattern = /(async\s*)?function(\s+\w+)?\s*\((.*?)\)/g;
    const text = document.getText();
    let match;

    while ((match = functionPattern.exec(text))) {
      const start = document.positionAt(match.index);
      const end = document.positionAt(match.index + match[0].length);

      if (range.intersection(new vscode.Range(start, end))) {
        return new vscode.Range(start, end);
      }
    }

    return undefined; // No function found
  }

  function convertFunction() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      return; // No active editor
    }

    const document = editor.document;
    const selection = editor.selection;

    // Convert the selected function to an arrow function
    const text = document.getText(selection);
    const arrowFunctionText = convertNamedToArrowFunction(text);

    if (!arrowFunctionText) {
      vscode.window.showInformationMessage("No Named funtion found to convert");
      return;
    }

    editor.edit((editBuilder) => {
      editBuilder.replace(selection, arrowFunctionText);
    });
  }
}

export function deactivate() {}
