import View, { ViewTypes } from "../models/View";

export default (name: string, views: View[]) => {
  let importText = "";
  let componentsText = "";
  let dataText ="";
  let watchText = "";
  let computedText = "";
  let mountedText = "";
  let methodsText = "";

  views.forEach(view => {
    if (!importText.includes(view.type)) importText += `${view.type}View, `;
    dataText += `${view.name}: new ${view.type}View(),\n`;
    switch (view.type) {
      case ViewTypes.Detail:
        methodsText += `${view.name}Load() {
          const primary = this.${view.name};
          if (primary.loading) return;
          primary.submit(API.${view.name}.getOne, primary.instance.id);
        },
        ${view.name}Delete() {
          const primary = this.${view.name};
          if (primary.deleting) return;
          primary.delete(API.${view.name}.delete, primary.instance.id);
        },\n`;
        break;
      case ViewTypes.Form:
        methodsText += `${view.name}Submit() {
          const primary = this.${view.name};
          if (primary.submitting) return;
          let exec = primary.editing ? API.${view.name}.put : API.${view.name}.post;
          primary.submit(exec, primary.clone());
        },\n`;
        break;
      case ViewTypes.List:
        mountedText += `this.${view.name}Load();\n`;
        methodsText += `${view.name}Load() {
          const primary = this.${view.name};
          if (primary.loading) return;
          primary.submit(API.${view.name}.get, primary.parameters);
        },
        async ${view.name}DeleteItem(item) {
          if (item._deleting) return;
          this.$set(item, "_deleting", true);
          try {
            await API.${view.name}.delete(item.id);
          } catch (error) {
            this.$notify.error("删除失败");
          } finally {
            item._deleting = false;
          }
        },\n`;
        break;
    }
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
