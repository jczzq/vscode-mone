/**
 * DOM生成器
 * @param input 输入参数
 */
import * as vscode from "vscode";

import { Page } from "./models";
import GenarateField from "./genarators/Field";

export function genarateDOMText(
  input: Page,
  activeTextEditor: vscode.TextEditor
) {
  const { name, style, views } = input;
  // 视图
  let viewSlots = views.reduce((str, view) => {
    const { fields } = view.config;
    const fieldsText = fields
      .map(
        f => {
            return `<el-form-item label="${f.label}" prop="${f.name}">${GenarateField(f)}</el-form-item>`
        }
      )
      .join("");
    return (
      str +
      `<el-form${view.config.inline?' inline':''}>
          ${fieldsText}
      </el-form>`
    );
  }, "");

  let domText = `
    <template>
    <div class="${name}">
        ${viewSlots}
    </div>
    </template>

    <script>
    export default {
        name: "${name}",
        components: {},
        data() {
            return {
            };
        },
        computed: {},
        mounted() {},
        watch: {},
        methods: {},
        filters: {}
    };
    </script>

    <style lang="${style.lang}">
    .${name} {
        box-sizing: border-box;
    }
    </style>
  `;
  return domText;
}
