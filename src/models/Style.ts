/**
 * 样式
 * <style>块的描述对象
 */
export default class Style {
  // 样式预编译器 => <style lang="${Style.lang}">
  public lang: string;
  constructor(data?) {
    if (data) {
      this.lang = data.lang;
    }
  }
}
