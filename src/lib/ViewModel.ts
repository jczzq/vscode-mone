const CONFIG = {
  query: {
    pageName: "page",
    sizeName: "size"
  }
};

/**
 * 视图模型
 */
export default class ViewModel {
  public loading = false;
  public visible = false;
  constructor(data?, flag = true) {
    if (data) {
      if (flag) {
        Object.assign(this, data);
      } else {
        Object.keys(this).forEach(key => {
          if (key && data.hasOwnProperty(key)) {
            this[key] = data[key];
          }
        });
      }
    }
  }
}

// 列表视图
export class ListView extends ViewModel {
  needPage: boolean;
  parameters: any;
  _parameters: any;
  rows: any[];
  total: number;
  rowsName: string;
  totalName: string;
  constructor(data?) {
    super();
    this.needPage = true;
    this.rows = [];
    this.total = 0;
    this.rowsName = "data.rows";
    this.totalName = "data.total";
    if (data) {
      Object.assign(this, data);
    }
    this.initParameters(data.parameters);
  }
  initParameters(data?) {
    if (data) {
      this._parameters = JSON.parse(JSON.stringify(data));
    }
    this.parameters = {
      query: {
        [CONFIG.query.pageName]: 1,
        [CONFIG.query.sizeName]: 20
      },
      sort: {}
    };
    if (this._parameters) {
      this.parameters.query = this._parameters.query || {};
      this.parameters.sort = this._parameters.sort || {};
    }
  }
  sizeChange(size) {
    this.parameters.query.size = size;
  }
  async load(loadFunction) {
    try {
      const args = Array.from(arguments);
      var req = args.shift();
      this.loading = true;
      const res = await req.apply(req, args);
      this.rows = getDeepProp(res, this.rowsName.split("."));
      this.total = getDeepProp(res, this.totalName.split("."));
      return Promise.resolve(res);
    } catch (error) {
      console.info("ListView load data error", error);
      return Promise.reject(error);
    } finally {
      this.loading = false;
    }
  }
}

// 详情视图
export class DetailView extends ViewModel {
  instance: any;
  deleting: boolean;
  instanceName: string;
  constructor(data?) {
    super();
    this.instance = {};
    this.deleting = false;
    this.instanceName = "data";
    if (data) {
      Object.assign(this, data);
    }
  }
  clone() {
    return JSON.parse(JSON.stringify(this.instance));
  }
  async delete() {
    try {
      const args = Array.from(arguments);
      var req = args.shift();
      this.deleting = true;
      const res = await req.apply(req, args);
      return Promise.resolve(res);
    } catch (error) {
      console.info("DetailView delete data error", error);
      return Promise.reject(error);
    } finally {
      this.deleting = false;
    }
  }
  async load() {
    try {
      const args = Array.from(arguments);
      var req = args.shift();
      this.loading = true;
      const res = await req.apply(req, args);
      this.instance = res[this.instanceName];
      return Promise.resolve(res);
    } catch (error) {
      console.info("DetailView load data error", error);
      return Promise.reject(error);
    } finally {
      this.loading = false;
    }
  }
}

// 表单视图
export class FormView extends DetailView {
  rules: any;
  // 是否为编辑状态
  editing: boolean;
  submitting: boolean;
  constructor(data?) {
    super();
    this.rules = {};
    this.editing = false;
    this.submitting = false;
    if (data) {
      Object.assign(this, data);
    }
  }
  submit() {
    const args = Array.from(arguments);
    var loadFunction = args.shift();
    return new Promise((resolve, reject) => {
      this.submitting = true;
      loadFunction
        .apply(loadFunction, args)
        .then(res => {
          this.submitting = false;
          resolve(res);
        })
        .catch(err => {
          this.submitting = false;
          reject(err);
        });
    });
  }
}

/**
 * 搜索条件对象
 * 使用示例：
 * var p = new ParameterModel({
 *     sort: {
 *         prop: 'code'
 *         order: 'asc|(desc'
 *     },
 *     query: {
 *         keyword: 'test',
 *         categorieId: 33213444432, // Id结尾会添加_eq_long
 *         date: '2018-10-10',
 *         time: '10:00:00',
 *         datetime: '2018-10-10 10:00:00',
 *         categorie: new QueryModel({
 *             value: [1, 2, 3],
 *             option: 'eq_long',
 *             extra: '$last'
 *         })
 *     }
 * })
 * p.format() 结果为：
 * {
 *     sort_asc: 'code',
 *     keyword: 'test',
 *     categorieId_eq_long: 33213444432,
 *     date_eq_date: '2018-10-10',
 *     time_eq_time: '10:00:00',
 *     datetime_eq_datetime: '2018-10-10 10:00:00',
 *     categorie_eq_long: 3
 * }
 * @export
 * @class ParameterModel
 */
export class ParameterModel {
  sort: any;
  query: any;
  constructor({ query = {}, sort = {} }) {
    this.sort = sort;
    this.query = query;
  }
}

/**
 * query对象
 * @export
 * @class QueryModel
 */
export class QueryModel {
  value: any;
  option: any;
  extra: any;
  format: any;
  constructor({ value = undefined, option = "", extra = "$default" }) {
    this.value = value;
    this.option = option;
    this.extra = extra;
    this.format = field => {
      if (field) {
        let data = {
          key: field,
          value: ""
        };
        if (this.option) {
          data.key += `_${this.option}`;
        }
        switch (this.extra) {
          case "$last":
            if (this.value && this.value.length) {
              data.value = this.value[this.value.length - 1];
            } else {
              return;
            }
            break;
          case "$toString":
            data.value = this.value.toString();
            break;
          default:
            data.value = this.value;
            break;
        }
        return data;
      }
    };
  }
}

const getDeepProp = (a, props) => {
  try {
    if (props.length) {
      let p = props.shift();
      return getDeepProp(a[p], props);
    } else {
      return a;
    }
  } catch (error) {
    return a;
  }
};
