var Generator = require('yeoman-generator');

const {pkjConfig} = require('./templates/index.js')
const reactConfig = require('./templates/react/config') 
const vueConfig = require('./templates/vue/config')
const mkdirp = require('mkdirp')
const fs = require('fs');
var extend = require('deep-extend');
const path = require('path');
const {fileDisplay} = require('./templates/util.js')

const ora = require('ora')
const shelljs = require('shelljs')




module.exports = class extends Generator {


    constructor(args, opts){
        super(args, opts)

        this.fn = () =>{

        }


        // 参数处理
        // this.arguments
        this.argument('projectName',{   
			type:String,   
			required:false,
			desc:'name'
        })

    }


    init(){
    }



    _writeVue () {
         // 生成模版文件
         var destinationPath = JSON.parse(JSON.stringify( this.destinationPath('src')))
        
         mkdirp('src')
         
           // 生成模版文件
         this.fs.copyTpl(
             this.templatePath('vue/index.html'),
             this.destinationPath('index.html' ),
             {title : this.answers.projectName }
         )
         this.fs.write(
             this.destinationPath('src/index.js'),
             this.fs.read(this.templatePath('vue/index.js'))
         )

         this.fs.write(
            this.destinationPath('src/Index.vue'),
            this.fs.read(this.templatePath('vue/Index.vue'))
        )
 
         fileDisplay(this.templatePath('vue/directory') , 'directory', destinationPath )
 
         this.fs.write(
             this.destinationPath('.babelrc'), 
             this.fs.read(this.templatePath('vue/.babelrc'))
         )
        return vueConfig.pkjConfig
    }


    _writeReact (){

        var destinationPath = JSON.parse(JSON.stringify( this.destinationPath('src')))
        
        mkdirp('src')
        
          // 生成模版文件
        this.fs.copyTpl(
            this.templatePath('react/index.html'),
            this.destinationPath('index.html' ),
            {title : this.answers.projectName }
        )
        this.fs.write(
            this.destinationPath('src/index.js'),
            this.fs.read(this.templatePath('react/index.js'))
        )
         

        fileDisplay(this.templatePath('react/directory') , 'directory', destinationPath )

        this.fs.write(
            this.destinationPath('.babelrc'), 
            this.fs.read(this.templatePath('react/.babelrc'))
        )

        
        // mkdirp('src/components')
        // mkdirp('src/routes')

        return reactConfig.pkjConfig
    
    }


    // 参数交互
    async prompting (){
        const answer = await this.prompt([
            {
                type: 'input',
                name: 'projectName',
                message: 'enter your project name',
                default: this.appname,
                store: true
            },
            {
                type : 'list',
                name : 'projectType',
                message: '需要使用的框架',
                choices: ['React','Vue']
            },
            {
                type    : 'confirm',
                name    : 'install',
                message : '是否自动安装依赖'
            }
        ])


        this.answers  = answer
    }


    // 写入配置
    writing () {

        var projectPath = './'
        var projectName = this.answers.projectName
        var projectType = this.answers.projectType

        this.destinationRoot(projectPath + projectName)

        
       

        this.fs.write(
            this.destinationPath('webpackConfig/base.js'), 
            this.fs.read(this.templatePath(projectType == 'Vue' ? 'webpack/base.vue.js' : 'webpack/base.react.js' ))
        )

        this.fs.write(
            this.destinationPath('webpackConfig/dev.js'), 
            this.fs.read(this.templatePath('webpack/dev.js'))
        )

        this.fs.write(
            this.destinationPath('webpackConfig/build.js'), 
            this.fs.read(this.templatePath('webpack/build.js'))
        )


        var configPkgJson = {
            dependencies :{},
            devDependencies:{}
        }

        var pkgjson = extend(
            pkjConfig,
            configPkgJson
        )

        if(projectType == 'Vue'){
             var vuePkjConfig = this._writeVue()
             pkgjson = extend(
                pkgjson,
                vuePkjConfig
            )
        }else{
           
            var reactPkjConfig = this._writeReact()
            pkgjson = extend(
                pkgjson,
                reactPkjConfig
            )
        }

        this.fs.extendJSON(this.destinationPath('package.json'), pkgjson)

    }

    install (){

        // 是否需要安装依赖
        if(this.answers.install){
            var done = this.async()
            const spinner = ora('安装依赖中').start();   // ora  loading效果和图标
            shelljs.cd(this.destinationPath('package.json'))  // 进入安装目录
            shelljs.exec('cnpm install',{

            },
            (code, stdout, stderr)=>{
                if(code == 0 ){
                    spinner.succeed()
                }else{
                    spinner.fail('安装成功')
                }
            }
            )
        }
    }

    end(){
        this.log('安装成功')
    }

}