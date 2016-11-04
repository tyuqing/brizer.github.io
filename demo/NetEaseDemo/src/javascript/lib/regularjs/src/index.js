/*0.整个打包入口*/
var env =  require("./env.js");
var config = require("./config"); 
var Regular = module.exports = require("./Regular.js");
/*模板语法解析*/
var Parser = Regular.Parser;
var Lexer = Regular.Lexer;

if(env.browser){
		/*13.激活内建指令*/
    require("./directive/base.js");
    /*14.激活声明式动画相关指令*/
    require("./directive/animation.js");
    /*15.激活延时器模块*/
    require("./module/timeout.js");
    /*16.DOM相关处理*/
    Regular.dom = require("./dom.js");
}
Regular.env = env;
Regular.util = require("./util.js");
Regular.parse = function(str, options){
  options = options || {};

  if(options.BEGIN || options.END){
    if(options.BEGIN) config.BEGIN = options.BEGIN;
    if(options.END) config.END = options.END;
    Lexer.setup();
  }
  var ast = new Parser(str).parse();
  return !options.stringify? ast : JSON.stringify(ast);
}
/*17.进入页面逻辑*/

