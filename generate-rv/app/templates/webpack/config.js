
//  多种打包配置,参考vue源码

//  package.json  --  npm run vue:build demo1

const path = require('path')


// 参数
const argvs = process.argv.slice(2)


// 源文件名字
const srcName = argvs[0]
srcName = srcName ? srcName : ''
const srcPath = path.resolve(__dirname, '../src', srcName)
const distPath = path.resolve(__dirname, '../dist', srcName)

const ENV = process.env.VUE

const builds = {
    "test": {

    },

    "dev": {

    },

    "online": {

    }
}

// 将配置处理成统一格式
function genConfig (name) {
    const opts = builds[name]
    const config = {
        srcPath: srcPath,
        distPath: distPath
    }



    return config
}



if( ENV ){   //有明确打包配置目标
    module.exports = genConfig(ENV)
}else{
    exports.getBuild = genConfig
    exports.getAllBuilds = ()=> {
        Object.keys(builds).map(genConfig)
    }
}

