/**
 * Created by liuxiaoxiao1 on 17/9/19.
 */
/**
 * 自定义Api异常
 */
const ApiErrorNames = require('./ApiErrorNames');
class ApiError extends Error{
    //构造方法
    constructor(error_name){
    super();

    var error_info = ApiErrorNames.getErrorInfo(error_name);

    this.name = error_name;
    this.code = error_info.code;
    this.message = error_info.message;
}
}

module.exports = ApiError;
