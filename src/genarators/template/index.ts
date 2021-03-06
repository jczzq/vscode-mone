import View, { ViewTypes } from "../../models/View";
import GenarateField from "./field";

export default (name: string, views: Array<any>) => {
  let viewsText = views
    .map(view => {
      let viewText = "";
      switch (view.type) {
        // Form
        case ViewTypes.Form:
          var inline = view.inline ? " inline" : "";
          var labelPositionText = view.labelPosition ? ` label-position="${view.labelPosition}"` : "";
          var labelWidthText = view.labelWidth ? ` label-width="${view.labelWidth}"` : "";
          var dataText = ` :model="${view.name}.instance"`;
          var rulesText = ` :rules="${view.name}.rules"`;
          var vLodingText = ` v-loading="${view.name}.submitting"`;
          var fieldsText = view.fields
            .map(f => {
              var label = f.label ? ` label="${f.label}"` : "";
              var prop = f.name ? ` prop="${f.name}"` : "";
              return `<el-form-item${label}${prop}>
                ${GenarateField(f, view)}
              </el-form-item>`;
            })
            .join("\n");
          fieldsText += `<el-form-item>
              <el-button type="default" @click="$refs.${view.name}.resetFields()">重置</el-button>
              <el-button type="primary" @click="${view.name}Submit()">提交</el-button>
            </el-form-item>`;
          viewText = `<el-form ref="${view.name}"${inline}${dataText}${rulesText}${vLodingText}${labelPositionText}${labelWidthText}>\n${fieldsText}\n</el-form>`;
          if (view.dialog) {
            viewText = `<el-dialog title="${view.name}" :visible.sync="${view.name}.visible">${viewText}</el-dialog>`
          }
          break;

        // Detail
        case ViewTypes.Detail:
          var fieldsText = view.fields
            .map(f => {
              return `<p class="field">
                <label>${f.label} :</label> <span>{{ ${view.name}.instance.${f.name} }}</span>
              </p>`;
            })
            .join("\n");
          viewText = `<el-card shadow="hover">\n${fieldsText}\n</el-card>`;
          break;

        // List
        case ViewTypes.List:
          var dateText = `:data="${view.name}.rows"`;
          var fieldsText = view.fields
            .map(f => {
              var propText = ` prop="${f.name}"`;
              var labelText = ` label="${f.label}"`;
              return `<el-table-column${propText}${labelText}></el-table-column>`;
            })
            .join("\n");
          viewText = `<el-table ${dateText}>\n${fieldsText}\n</el-table>`;
          break;
      }
      return `<!-- ${view.type}视图 ${view.name} -->\n\n` + viewText;
    })
    .join("\n");

  return `
  <template>
    <div class="${name}">
      ${viewsText}
    </div>
  </template>`;
};
