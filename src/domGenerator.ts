/**
 * DOM生成器
 * @param input 输入参数
 */
import * as vscode from "vscode";

import { PageView } from "./model/Page";

export function genarateDOMText(input: PageView, activeTextEditor: vscode.TextEditor) {
    // 视图
    let views = input.views.reduce((str, v) => {
        const { fields } = v.config;
        const fieldsText = fields.map(x => `<el-form-item label="${x.label}" prop="${x.name}"></el-form-item>`).join("\n");
        return str + `<el-from>
          ${fieldsText}
        </el-form>`;
    }, '');

    let domText = `
<template>
  <div class="${input.name}">
    ${views}
  </div>
</template>

<script>
export default {
    name: "${input.name}",
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

<style lang="${input.style.lang}">
.${input.name} {
    box-sizing: border-box;
}
</style>
`;
    return domText;
}
