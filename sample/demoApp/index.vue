{
  "name": "demoApp",
  "style": {
    "lang": "scss"
  },
  "views": [
    {
      "type": "Form",
      "name": "Form1",
      "fields": [
        {
          "name": "Text",
          "label": "Text",
          "type": "Text"
        },
        {
          "name": "Number",
          "label": "Number",
          "type": "Number"
        }
      ],
      "inline": true,
      "labelPosition": "right",
      "labelWidth": "80px"
    },
    {
      "type": "Form",
      "name": "form2",
      "fields": [
        {
          "name": "Select",
          "label": "Select",
          "type": "Select",
          "options": [
            { "label": "1年级", "value": 1 },
            { "label": "2年级", "value": 2 }
          ]
        },
        {
          "name": "Select2",
          "label": "Select变量",
          "type": "Select",
          "options": "[]"
        },
        {
          "name": "Radio",
          "label": "Radio",
          "type": "Radio",
          "options": [
            { "label": "是", "value": true },
            { "label": "否", "value": false }
          ]
        },
        {
          "name": "Checkbox",
          "label": "Checkbox",
          "type": "Checkbox",
          "options": ["篮球", "乒乓球", "羽毛球", "游泳"]
        },
        {
          "name": "Date",
          "label": "Date",
          "type": "Date"
        },
        {
          "name": "Time",
          "label": "Time",
          "type": "Time"
        },
        {
          "name": "TimeSelect",
          "label": "TimeSelect",
          "type": "TimeSelect"
        },
        {
          "name": "DateRange",
          "label": "DateRange",
          "type": "DateRange"
        },
        {
          "name": "DateTimeRange",
          "label": "DateTimeRange",
          "type": "DateTimeRange"
        },
        {
          "name": "TimeRange",
          "label": "TimeRange",
          "type": "TimeRange"
        }
      ]
    },
    {
      "type": "List",
      "name": "students",
      "fields": [
        {
          "name": "name",
          "label": "姓名"
        },
        {
          "name": "age",
          "label": "年龄"
        },
        {
          "name": "grade",
          "label": "年级"
        },
        {
          "name": "studyTime",
          "label": "上学时间"
        }
      ]
    },
    {
      "type": "Detail",
      "name": "student",
      "fields": [
        {
          "name": "name",
          "label": "姓名"
        },
        {
          "name": "age",
          "label": "年龄"
        },
        {
          "name": "grade",
          "label": "年级"
        },
        {
          "name": "studyTime",
          "label": "上学时间"
        }
      ]
    }
  ]
}
