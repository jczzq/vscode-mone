import View from "./View";
import Style from "./Style";

export class Page {
  public name: string;
  public style: Style;
  public views: View[];
  /**
   * 是否需要生成ajax代码
   * true: (推荐)会生成视图调用ajax函数，配合pont生成的ajax请求代码，基本上可以完全接管前端接口绑定这一部分的工作
   * false: 会生成调用函数以及参数，包括请求状态管理，不会配合pont, API请求需要单独完成
   */
  public ajax: boolean;
  constructor(data?) {
    if (data) {
      this.name = data.name;
      this.style = data.style;
      this.views = data.views;
      this.ajax = data.ajax;
    }
  }
}
