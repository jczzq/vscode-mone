import * as vscode from "vscode";
import { genarateDOMText } from "./domGenerator";
import { Page } from "./models";

// 激活扩展时调用此方法
// 您的扩展将在命令第一次执行时被激活
export function activate(context: vscode.ExtensionContext) {
  // 使用控制台输出诊断信息(console.log)和错误(console.error)
  // This line of code will only be executed once when your extension is activated
  console.log("mone is now active!");

  // helloWorld
  let disposable = vscode.commands.registerCommand(
    "extension.helloWorld",
    () => {
      // 在这里放置的代码将在每次执行命令时执行

      // Display a message box to the user
      vscode.window.showInformationMessage("Hello World mone!");
    }
  );
  context.subscriptions.push(disposable);

  // 生成代码
  let genarate = vscode.commands.registerCommand("extension.genarate", () => {
    const currentEditor = vscode.window.activeTextEditor;
    if (!currentEditor.document.uri.fsPath.endsWith(".vue")) {
      return;
    }
    let input = currentEditor.document.getText();

    // 校验数据格式
    let domObj: Page;
    try {
      domObj = JSON.parse(input);
    } catch (error) {
      vscode.window.showErrorMessage("JSON格式不正确!");
    }

    // 分析数据组装成DOM
    const newText = genarateDOMText(domObj, currentEditor);
    currentEditor.edit(editBuilder => {
      const end = new vscode.Position(
        vscode.window.activeTextEditor.document.lineCount + 1,
        0
      );
      editBuilder.replace(
        new vscode.Range(new vscode.Position(0, 0), end),
        newText
      );
    });
  });
  context.subscriptions.push(genarate);
}

// this method is called when your extension is deactivated
export function deactivate() {}
