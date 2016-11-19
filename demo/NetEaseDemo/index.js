/**
 * 模块入口文件
 */
NEJ.define([
	'util/dispatcher/dispatcher',
	'pro/config'
],function(
	_p,
	_config
){
	_p._$startup(_config);
});