import View from "./View";
import Style from "./Style";

export class Page {
  public name: string;
  public style: Style;
  public views: View[];
  constructor(data?) {
    if (data) {
      this.name = data.name;
      this.style = data.style;
      this.views = data.views;
    }
  }
}
