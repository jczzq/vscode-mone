interface Style {
  lang: string;
}

const enum ViewTypes {
  "Form",
  "Detail",
  "List"
}

interface View {
  type: ViewTypes;
  config: any;
}

export class PageView {
  public name: string;
  public style: Style;
  public views: Array<View>;
  constructor(data) {
    this.name = data.name;
    this.style = data.style;
    this.views = data.views;
  }
}
