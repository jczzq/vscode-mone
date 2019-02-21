/**
 * 字段
 */
export default class Field {
  // 字段值
  name: string;
  // 字段描述
  label: string;
  // 字段类型
  type: FieldTypes = FieldTypes.Text;
  options: string | Array<Option>;
  placeholder: string;
}

interface Option {
  label: string;
  value: any;
}

/**
 * 字段类型
 */
export const enum FieldTypes {
  Text = "Text", // 文本输入框
  TextArea = "TextArea", // 文本域
  Number = "Number", // 数字框
  Select = "Select", // 下拉选框
  Radio = "Radio", // 单选框
  Checkbox = "Checkbox", // 多选框
  Date = "Date", // 日期选择框
  DateTime = "DateTime", // 日期时间选择框
  Time = "Time", // 时间选择框
  TimeSelect = "TimeSelect", // 时间选择框
  DateRange = "DateRange", // 日期范围选择框
  DateTimeRange = "DateTimeRange", // 日期时间范围选择框
  TimeRange = "TimeRange" // 时间范围选择框
}
