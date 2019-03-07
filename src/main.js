import Vue from 'vue'


import app from './App.vue'

//按需导入mint-ui
import { Header,Swipe,SwipeItem,Button,Lazyload} from 'mint-ui';
import 'mint-ui/lib/style.css'
//导入
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);

Vue.use(Lazyload);

//导入vue-resource
import VueResource from 'vue-resource';
Vue.use(VueResource)

//设置请求根路径
Vue.http.options.root = 'http://47.89.21.179:8080';

Vue.http.options.emulateJSON = true;

//导入 mui
import './lib/mui/css/mui.min.css';
import './lib/mui/css/icons-extra.css';

//引入图片插件
import VuePreview from 'vue-preview';
Vue.use(VuePreview)


import VueRouter from 'vue-router';

Vue.use(VueRouter);

import router from './router.js'; 

import moment from 'moment';
//导入vuex 
import Vuex from 'vuex';
Vue.use(Vuex);
Vue.filter('dataFormat',function(dataStr,pattern = 'YYYY-MM-DD HH:mm:ss'){
    return moment(dataStr).format(pattern)
})
const store = new Vuex.Store({
    state:{
        carItem:[]
    },
    mutations:{
        addInfo(state,carinfo){
                var flag = false
            state.carItem.some(item=>{
                
                if (item.id == carinfo.id){
                    item.count += parseInt(carinfo.count)
                    
                    flag = true
                    return true
                }
            })
            if(!flag){
                state.carItem.push(carinfo)
            }
        }
    },
    getters:{
        getAllCount(state){
            var c = 0;
            state.carItem.forEach(item=>{
                c += item.count
                
            })
            return c
            
        }
    }

})

var vm = new Vue({
    el:'#app',
    render:c=>c(app),
    router,
    store
})
//版本大声道刷单所
