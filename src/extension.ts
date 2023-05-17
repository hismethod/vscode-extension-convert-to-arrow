import * as vscode from "vscode";
import { convertFunction } from "./util";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "function-to-arrow" is now active!');

  let disposable = vscode.commands.registerCommand("hismethod.function-to-arrow", () => {
    vscode.window.showInformationMessage("Hello World from FunctionToArrow!");

    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      return;
    }

    let selection = editor.selection;
    let text = editor.document.getText(selection);

    let convertedText = convertFunction(text);

    editor.edit((editBuilder) => {
      editBuilder.replace(selection, convertedText);
    });
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
