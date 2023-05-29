import * as vscode from "vscode";
import { convertNamedToArrowFunction, getFunctionRange } from "./util";
import { ConvertToArrowCodeAction } from "./arrowizer";

const fileTypesToApply = [{ language: "javascript" }, { language: "typescript" }, { language: "javascriptreact" }, { language: "typescriptreact" }];
export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(vscode.commands.registerCommand("extension.convertSelectionToArrowFunction", convertSelectionToArrowFunction));
  context.subscriptions.push(vscode.commands.registerCommand("extension.convertToArrowFunction", convertFunction));
  context.subscriptions.push(vscode.languages.registerCodeActionsProvider(fileTypesToApply, new ConvertToArrowCodeAction()));
}

async function convertSelectionToArrowFunction() {
  const activeEditor = vscode.window.activeTextEditor;

  if (!activeEditor) {
    vscode.window.showInformationMessage("No active editor found");
    return;
  }

  const document = activeEditor.document;
  const selection = activeEditor.selection;

  await convertFunction(document.uri, selection);
}

async function convertFunction(uri: vscode.Uri, functionRange: vscode.Range) {
  let document;
  if (!uri) {
    const activeEditor = vscode.window.activeTextEditor;

    if (!activeEditor) {
      vscode.window.showInformationMessage("No active editor found");
      return;
    }

    document = activeEditor.document;
    uri = document.uri;
    functionRange = getFunctionRange(document, activeEditor.selection) ?? activeEditor.selection;
  } else {
    document = await vscode.workspace.openTextDocument(uri);
  }

  const functionText = document.getText(functionRange);
  console.log("range: " + JSON.stringify(functionRange));
  console.log("text : " + functionText);
  const arrowFunctionText = convertNamedToArrowFunction(functionText);
  if (!arrowFunctionText) {
    vscode.window.showInformationMessage("No Named funtion found to convert");
    return;
  }

  const edit = new vscode.WorkspaceEdit();
  edit.replace(uri, functionRange, arrowFunctionText);
  return vscode.workspace.applyEdit(edit);
}

export function deactivate() {}
