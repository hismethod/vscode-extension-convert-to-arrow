import * as vscode from "vscode";
import { getFunctionRange } from "./util";

export class ConvertToArrowCodeAction implements vscode.CodeActionProvider {
  public static readonly providedCodeActionKinds = [vscode.CodeActionKind.RefactorRewrite];

  public provideCodeActions(
    document: vscode.TextDocument,
    range: vscode.Range | vscode.Selection,
    context: vscode.CodeActionContext,
    token: vscode.CancellationToken
  ): vscode.ProviderResult<(vscode.CodeAction | vscode.Command)[]> {
    const functionRange = getFunctionRange(document, range);
    console.log(functionRange);
    if (!functionRange) {
      return;
    }

    const action = new vscode.CodeAction("Convert to Arrow functions", vscode.CodeActionKind.RefactorRewrite);
    action.command = {
      command: "extension.convertToArrowFunction",
      title: "Convert to Arrow functions",
      arguments: [document.uri, functionRange],
    };

    return [action];
  }
}
