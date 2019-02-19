/**
 * 视图
 */
export default class View {
  type: ViewTypes;
  name: string;
  config: any;
  constructor(data?) {
    if (data) {
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
}

/**
 * 视图类型
 */
const enum ViewTypes {
  Form = "Form", // 表单
  Detail = "Detail", // 详情
  List = "List" // 列表
}
