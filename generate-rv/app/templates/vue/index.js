import 'babel-polyfill'

import Vue from 'vue'
import Index from './Index.vue'
import router from './router'
import store from './store'
import vconsole from 'vconsole'
import './style/index.scss'


if(process.env.NODE_ENV == 'development'){
  new vconsole()
}


new Vue({
    el: '#app',
    store,
    router,
    template: '<Index/>',
    components: { Index }
})

