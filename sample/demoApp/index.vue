{
  "name": "demoApp",
  "style": {
    "lang": "scss"
  },
  "views": [
    {
      "type": "Form",
      "name": "Form1",
      "config": {
        "inline": true,
        "labelPosition": "right",
        "labelWidth": "80px",
        "fields": [
          {
            "name": "name",
            "label": "姓名",
            "type": "Text",
            "vModel": "jczzq"
          },
          {
            "name": "age",
            "label": "年龄",
            "type": "Number"
          },
          {
            "name": "startTime",
            "label": "开始时间",
            "type": "DateTime"
          }
        ]
      }
    },
    {
      "type": "Form",
      "name": "form2",
      "config": {
        "inline": false,
        "labelPosition": "left",
        "labelWidth": "120px",
        "fields": [
          {
            "name": "grade",
            "label": "年级",
            "type": "Select",
            "vModel": "grade",
            "options": [
              { "label": "1年级", "value": 1 },
              { "label": "2年级", "value": 2 }
            ]
          },
          {
            "name": "grade",
            "label": "年级",
            "type": "Select",
            "vModel": "grade",
            "options": "app.gradeList"
          },
          {
            "name": "isX",
            "label": "是否结婚",
            "type": "Radio",
            "options": [
              { "label": "是", "value": true },
              { "label": "否", "value": true }
            ]
          },
          {
            "name": "favorite",
            "label": "兴趣",
            "type": "Checkbox",
            "options": ["篮球", "乒乓球", "羽毛球", "游泳"]
          },
          {
            "name": "birthday",
            "label": "生日",
            "type": "Date"
          },
          {
            "name": "studyTime",
            "label": "学习时间",
            "type": "DateTimeRange"
          }
        ]
      }
    }
  ]
}
