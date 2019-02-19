import Field from "./Field";
import View from "./View";
/**
 * 样式
 * <style>块的描述对象
 */
export class Style {
  // 样式预编译器 => <style lang="${Style.lang}">
  lang: string = "";
  constructor(data?) {
    if (data) {
      this.lang = data.lang;
    }
  }
}

/**
 * 视图配置
 */
export class ViewConfig {
  fields: Array<Field>;
  constructor(data?) {
    if (data) {
      this.fields = data.fields;
    }
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
    if (data) {
      this.inline = data.inline;
      this.labelPosition = data.labelPosition;
      this.labelWidth = data.labelWidth;
    }
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

export class Page {
  public name: string = "";
  public style: Style = new Style();
  public views: Array<View>;
  constructor(data?) {
    this.name = data.name;
    this.style = data.style;
    this.views = data.views;
  }
}
