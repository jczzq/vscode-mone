/**
 * DOM生成器
 * @param input 输入参数
 */
import * as vscode from "vscode";

import { PageView } from "./model/Page";

export function genarateDOMText(
  input: PageView,
  activeTextEditor: vscode.TextEditor
) {
  const { name, style, views } = input;
  // 视图
  let viewSlots = views.reduce((str, view) => {
    const { fields } = view.config;
    const fieldsText = fields
      .map(
        x => `<el-form-item label="${x.label}" prop="${x.name}"></el-form-item>`
      )
      .join("");
    return (
      str +
      `<el-from${view.config.inline?' inline':''}>
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
