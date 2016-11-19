/*
 * Netease Demo UMI实现文件
 */
NEJ.define([
	'util/dispatcher/dispatcher'
],function(_e){
	var _config = {
		//规则匹配
		rules:{
			rewrite:{
				//重写规则匹配
				'404':'/m'
			},
			title:{
				//标题匹配
			},
			alias:{
				//别名匹配
				//建议模块实现文件中的注册采用这里配置的别名
			}
		},
		//模块配置
		modules:{
			//模块UMI对应实现文件的映射表
			//同时完成模块的组合
			'/m':'m/index.html',
			
			//单页demo
			'/pages':'pages/index.html',
			'/pages/train':'pages/train/index.html',
			'/pages/datepicker':'pages/datepicker/index.html',
			'/pages/animate':'pages/animate/index.html',
            '/pages/util':'pages/util/index.html',
			
			//regular相关demo
			'/regular':'regular/index.html',
			'/regular/helloworld':'/regular/helloworld/index.html',
			'/regular/todomvc':'/regular/todomvc/index.html',
			'/regular/reactdemo':'/regular/reactdemo/index.html'
		}
	};
	
	return _config;
});
