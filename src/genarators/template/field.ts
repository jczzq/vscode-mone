import Field, { FieldTypes } from "../../models/Field";
import View from '../../models/View';

const GenarateField = (field: Field, view: View) => {
  let text;
  let vModelText = "";
  field.name && (vModelText = ` v-model="${view.name}.instance.${field.name}"`);
  let placeholder = field.placeholder;
  if (placeholder && placeholder.startsWith(":")) {
    placeholder = ` :placeholder=${field.placeholder.replace(":", "")}`;
  } else if (placeholder) {
    placeholder = ` placeholder=${field.placeholder}`;
  } else {
    placeholder = "";
  }
  let options: string = "";
  switch (field.type) {
    case FieldTypes.Text:
      text = `<el-input${vModelText}${placeholder}></el-input>`;
      break;
    case FieldTypes.TextArea:
      text = `<el-input type="textarea"${vModelText}${placeholder}></el-input>`;
      break;
    case FieldTypes.Number:
      text = `<el-input-number${vModelText}></el-input-number>`;
      break;
    case FieldTypes.Select:
      if (Array.isArray(field.options)) {
        options = field.options.map(opt => {
          return `<el-option
            label="${opt.label}"
            value="${opt.value}">
          </el-option>`;
        }).join("");
      } else if (typeof field.options === "string") {
        options = `<el-option
            v-for="item in ${field.options}"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>`;
      }
      text = `<el-select${vModelText}>${placeholder}${options}</el-select>`;
      break;
    case FieldTypes.Radio:
      if (Array.isArray(field.options)) {
        options = field.options.map(opt => {
          const isStr = typeof opt.value === "string" ? "" : ":";
          return `<el-radio ${isStr}label="${opt.value}">${opt.label}</el-radio>`;
        }).join("");
      } else if (typeof field.options === "string") {
        options = `<el-radio
          v-for="item in ${field.options}"
          :key="item.value"
          :label="item.value">{{ item.label }}
        </el-radio>`;
      }
      text = `<el-radio-group${vModelText}>${options}</el-radio-group>`;
      break;
    case FieldTypes.Checkbox:
      if (Array.isArray(field.options)) {
        options = field.options.map(opt => {
          return `<el-checkbox label="${opt}"></el-checkbox>`;
        }).join("");
      } else if (typeof field.options === "string") {
        options = `<el-checkbox
          v-for="item in ${field.options}"
          :key="item"
          :label="item">
        </el-checkbox>`;
      }
      text = `<el-checkbox-group${vModelText}>${options}</el-checkbox-group>`;
      break;
    case FieldTypes.Date:
      text = `<el-date-picker type="date" value-format="yyyy-MM-dd"${vModelText}${placeholder}></el-date-picker>`;
      break;
    case FieldTypes.DateTime:
      text = `<el-date-picker type="datetime" value-format="yyyy-MM-dd HH:mm:ss"${vModelText}${placeholder}></el-date-picker>`;
      break;
    case FieldTypes.Time:
      text = `<el-time-picker value-format="HH:mm:ss"${vModelText}${placeholder}></el-time-picker>`;
      break;
    case FieldTypes.TimeSelect:
      text = `<el-time-select${vModelText}${placeholder}></el-time-select>`;
      break;
    case FieldTypes.DateRange:
      text = `<el-date-picker type="daterange" value-format="yyyy-MM-dd"${vModelText}${placeholder}></el-date-picker>`;
      break;
    case FieldTypes.DateTimeRange:
      text = `<el-date-picker type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss"${vModelText}${placeholder}></el-date-picker>`;
      break;
    case FieldTypes.TimeRange:
      text = `<el-time-picker is-range value-format="HH:mm:ss"${vModelText}${placeholder}></el-time-picker>`;
      break;
  }
  return text;
};

export default GenarateField;
