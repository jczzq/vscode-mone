import View, { ViewTypes } from "../models/View";
import { FieldTypes } from '../models/Field';

export default (name: string, views: Array<any>, ajax?) => {
  let importText = "";
  let componentsText = "";
  let fieldsInitText ="";
  let dataText ="";
  let watchText = "";
  let computedText = "";
  let mountedText = "";
  let methodsText = "";

  views.forEach(view => {
    if (!importText.includes(view.type)) importText += `${view.type}View, `;

    switch (view.type) {
      case ViewTypes.Detail:
        methodsText += `${view.name}Load() {
          const primary = this.${view.name};
          if (primary.loading) return;
          primary.load(this.$api.${view.name}.getOne, primary.instance.id);
        },
        ${view.name}Delete() {
          const primary = this.${view.name};
          if (primary.deleting) return;
          primary.delete(this.$api.${view.name}.delete, primary.instance.id);
        },\n`;
        break;

      case ViewTypes.Form:
        let dialogText = "";
        if (view.dialog) {
          dialogText = `show(){\nthis.${view.name}.visible = true;\n},\n`;
        }
        fieldsInitText = view.fields.map(f => {
          let def = f.type === FieldTypes.Checkbox ? "[]" : "null";
          return `${f.name}: ${def}`;
        }).join(",\n") || "";
        fieldsInitText = fieldsInitText ? `{ instance: {${fieldsInitText}} }` : "";
        methodsText += `${dialogText}${view.name}Submit() {
          const primary = this.${view.name};
          if (primary.submitting) return;
          let exec = primary.editing ? this.$api.${view.name}.put : this.$api.${view.name}.post;
          primary.submit(exec, primary.clone());
        },\n`;
        break;

      case ViewTypes.List:
        mountedText += `this.${view.name}Load();\n`;
        methodsText += `${view.name}Load() {
          const primary = this.${view.name};
          if (primary.loading) return;
          primary.load(this.$api.${view.name}.get, primary.parameters);
        },
        async ${view.name}DeleteItem(item) {
          if (item._deleting) return;
          this.$set(item, "_deleting", true);
          try {
            await this.$api.${view.name}.delete(item.id);
          } catch (error) {
            this.$notify.error("删除失败");
          } finally {
            item._deleting = false;
          }
        },\n`;
        break;
    }
    dataText += `${view.name}: new ${view.type}View(${fieldsInitText}),\n`;dataText += `${view.name}: new ${view.type}View(${fieldsInitText}),\n`;dataText += `${view.name}: new ${view.type}View(${fieldsInitText}),\n`;
  });
  importText &&
    (importText = `import { ${importText}} from "@/models/ViewModel.js";`);
  componentsText = `components: {},`;
  dataText = `data() {return {${dataText}};},`;
  watchText = `watch: {},`;
  computedText = `computed: {},`;
  mountedText = `mounted() {\n${mountedText}\n},`;
  methodsText = `methods: {\n${methodsText}\n},`;

  return `<script>
  ${importText}
  export default {
    name: "${name}",
    ${componentsText}
    ${dataText}
    ${watchText}
    ${computedText}
    ${mountedText}
    ${methodsText}
  };\n</script>`;
};
