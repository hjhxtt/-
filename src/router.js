import VueRouter from 'vue-router';

import HomeContainer from './components/tabbar/homeContainer.vue'
import MenberContainer from './components/tabbar/menberContainer.vue'
import ShopcarContainer from './components/tabbar/shopcarContainer.vue'
import SearchContainer from './components/tabbar/searchContanier.vue'
import NewsList from './components/news/NewsList.vue'
import News_inner from './components/news/news_inner.vue'
import photoList from './components/photos/photolist.vue'
import photoInfo from './components/photos/photoInfo.vue'
import goodsList from './components/goods/goodsList.vue'
import goodsInfo from './components/goods/goodsInfo.vue'

import goodsDist from './components/goods/goodDist.vue'
import goodsComt from './components/goods/goodsCommont.vue'

 // 3. 创建路由对象
var router = new VueRouter({
  routes: [
    {path:'/',redirect:'/home'},
    {path:'/home',component:HomeContainer},
    {path:'/menber',component:MenberContainer},
    {path:'/shopcar',component:ShopcarContainer},
    {path:'/search',component:SearchContainer},
    {path:'/home/newslist',component:NewsList},
    {path:'/home/newslist/news_inner/:id',component:News_inner},
    {path:'/home/photolist',component:photoList},
    {path:'/home/photoInfo/:id',component:photoInfo},
    {path:'/home/goodsList',component:goodsList},
    {path:'/home/goodsInfo/:id',component:goodsInfo},
    {path:'/home/goodDist/:id',component:goodsDist},
    {path:'/home/goodComt/:id',component:goodsComt}
  ],
  linkActiveClass:'mui-active'
})

// 把路由对象暴露出去
export default router