/**
 * 样式
 * <style>块的描述对象
 */
export class Style {
  // 样式预编译器 => <style lang="${Style.lang}">
  lang: string;
}

/**
 * 字段
 */
export class Field {
  // 字段值
  name: string;
  // 字段描述
  label: string;
  // 默认值
  defVal: any = null;
}

/**
 * 视图类型
 */
const enum ViewTypes {
  "Form", // 表单
  "Detail", // 详情
  "List" // 列表
}

/**
 * 视图配置
 */
export class ViewConfig {
  fields: Array<Field>;
  constructor(data?) {
    this.fields = data.fields;
  }
}

/**
 * 表单视图配置
 */
export class FormViewConfig extends ViewConfig {
  // 是否为行内表单
  inline: boolean = false;
  labelPosition: string = "right";
  labelWidth: string;
  constructor(data?) {
    super(data);
    this.inline = data.inline;
    this.labelPosition = data.labelPosition;
    this.labelWidth = data.labelWidth;
  }
}

/**
 * 详情视图配置
 */
export class DetailViewConfig extends ViewConfig {
  constructor(data?) {
    super(data);
  }
}

/**
 * 列表视图配置
 */
export class ListViewConfig extends ViewConfig {
  constructor(data?) {
    super(data);
  }
}

/**
 * 视图
 */
export class View {
  type: ViewTypes;
  config: any;
  constructor(data?) {
    this.type = data.type || "Form";
    this.config = data.config;

    // config 默认值
    if (!this.config) {
      switch (this.type) {
        case ViewTypes.Detail:
          this.config = new DetailViewConfig();
          break;
        case ViewTypes.List:
          this.config = new ListViewConfig();
          break;
        default:
          this.config = new FormViewConfig();
          break;
      }
    }
  }
}

export class PageView {
  public name: string = "";
  public style: Style = (new Style())
  public views: Array<View> = ([new View()]);
  constructor(data) {
    this.name = data.name;
    this.style = data.style;
    this.views = data.views;
  }
}
