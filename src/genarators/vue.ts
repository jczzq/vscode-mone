/**
 * DOM生成器
 * @param input 输入参数
 */
import * as vscode from "vscode";

import { Page } from "../models";
import GenarateTemplate from "./template";
import GenarateScript from "./script";
import GenarateStyle from "./style";

export default (input: Page, activeTextEditor: vscode.TextEditor) => {
  const { name, style, views, ajax } = input;
  return `${GenarateTemplate(name, views)}\n${GenarateScript(name, views, ajax)}\n${GenarateStyle(name, style)}`;
};
