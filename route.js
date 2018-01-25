var assign = require('object-assign')
var route = function(options){
    assign(this,options);
};
route.routes = {
    index : function(){
        var r = require('./routes/index');
        this.app.use(r.routes(), r.allowedMethods());
    },
    users : function(){
        var r = require('./routes/users');
        this.app.use(r.routes(), r.allowedMethods());
    },
    test : function(){
        var r = require('./routes/test');
        this.app.use(r.routes(), r.allowedMethods());
    },
    api: function () {
        var r = require('./routes/api');
        this.app.use(r.routes(), r.allowedMethods());
    }
};
route.init = function(app){
    var obj = new this({
        app : app
    });
    for(var key in route.routes){
        console.log(key+'的route增加');
        if(route.routes[key] instanceof Function){
            route.routes[key].call(obj);
        }
    }
};
module.exports = route;