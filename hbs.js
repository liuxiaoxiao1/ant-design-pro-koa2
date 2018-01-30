var hbs = require('hbs');

var blocks = {};

hbs.registerHelper('extend', function(name, context) {
    var block = blocks[name];
    if (!block) {
        block = blocks[name] = [];
    }

    block.push(context); // for older versions of handlebars, use block.push(context(this));
});

hbs.registerHelper('block', function(name) {
    var val = (blocks[name] || []);
    var result  = [];
    for(var i = 0,context;context=val[i];i++){
        result.push(context.fn(this));
    }
    // clear the block
    blocks[name] = [];
    return result.join('');
});
hbs.registerHelper('stringify', function(v) {
    if(v instanceof Object){
        return JSON.stringify(v);
    }else{
        return ''
    }
});
hbs.registerHelper('date_format', function(pro_date,param) {
    var format = require('date-format');
    var fstr = typeof(param) == 'string'?param:'yyyy/MM/dd hh:mm:ss';
    if(typeof(pro_date) == 'number'){
        pro_date = new Date(pro_date);
    }
    if(pro_date instanceof Date){
        return format(fstr, pro_date);
    }else{
        return ''
    }
});
module.exports = hbs;
