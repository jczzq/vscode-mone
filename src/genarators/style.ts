import Style from "../models/Style";

export default (name: string, style: Style) => {
  let langText = "";

  if (style) {
    style.lang && (langText = ` lang="${style.lang}"`);
  }

  return `<style${langText}>
    .${name} {
        box-sizing: border-box;
    }\n</style>\n`;
};
