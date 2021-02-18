const {override, fixBabelImports, addLessLoader} = require('customize-cra'); 
module.exports = override( 
    fixBabelImports('import', { 
        libraryName: 'antd', 
        libraryDirectory: 'es', 
        style: true, 
    }), 
    //使用 less-loader 对样式文件进行样式修改
    addLessLoader({
        lessOptions:{  //新版本变化，需要加lessOptions才能生效，不然报错
            javascriptEnabled: true, 
            modifyVars: {'@primary-color': '#1DA57A'},  
        } ,
    }), 
);