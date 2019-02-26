/**
 * 视图
 */
import Field from "./Field";

export default class View {
  type: ViewTypes;
  name: string;
  fields: Array<Field>;
  constructor(data?) {
    if (data) {
      this.type = data.type;
      this.name = data.name;
      this.fields = data.fields;
    }
  }
}

/**
 * 表单视图配置
 */
export class FormView extends View {
  // 是否为行内表单
  inline: boolean = false;
  labelPosition: string;
  labelWidth: string;
  dialog: boolean;
  constructor(data?) {
    super(data);
    if (data) {
      this.inline = data.inline;
      this.labelPosition = data.labelPosition;
      this.labelWidth = data.labelWidth;
      this.dialog = data.dialog === true;
    }
  }
}

/**
 * 详情视图配置
 */
export class DetailView extends View {
  constructor(data?) {
    super(data);
  }
}

/**
 * 列表视图配置
 */
export class ListView extends View {
  constructor(data?) {
    super(data);
  }
}

/**
 * 视图类型
 */
export const enum ViewTypes {
  Form = "Form", // 表单
  Detail = "Detail", // 详情
  List = "List" // 列表
}
