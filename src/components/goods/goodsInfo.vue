<template>
    <div class="infoMain">
            <transition
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter"
            >
                <div class="ball" v-if="ballFlag" ref="ball"></div>
            </transition>
            <!-- 轮播图 -->

            
            <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<lunbotu :lunbolist="lunbotu" :isfull="false"></lunbotu>
					</div>
				</div>
			</div>
            <!--  -->
            <div class="mui-card">
				<div class="mui-card-header">{{goodsInfo.title}}</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p>
                            <span>市场价：<del>{{goodsInfo.market_price}}</del></span>
                            <span>销售价：{{goodsInfo.sell_price}}</span>
                        </p>
                        <p>购买数量:<numBox @getBuyNum="getBuyNum" :max="goodsInfo.stock_quantity"></numBox></p>
                        <p>
                            <mt-button type="primary" size="small">立即购买</mt-button>
                            <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
                        </p>
					</div>
				</div>
			</div>
            <!--  -->
            <div class="mui-card">
				<div class="mui-card-header">商品参数</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p>
                            商品货号：{{goodsInfo.goods_no}}
                        </p>
                        <p>库存情况：{{goodsInfo.stock_quantity}}</p>
                        <p>上架时间：{{goodsInfo.add_time | dataFormat}}</p>
					</div>
				</div>
				<div class="mui-card-footer">
                    <mt-button type="primary" size="large" plain @click="toGoodDist(goodsInfo.id)">图文介绍</mt-button>
                    <mt-button type="danger" size="large" plain @click="toGoodcomt(goodsInfo.id)">商品评论</mt-button>
                </div>
			</div>
    </div>
</template>
<script>
import numBox from '../subcomponents/goodInfo_numbox.vue'
 import lunbotu from '../subcomponents/lunbotu.vue'
 import {Toast} from 'mint-ui'
export default {
    data(){
        return {
            id:this.$route.params.id,
            lunbotu:[],
            goodsInfo:{},
            ballFlag:false,
            buyNum:1

        }
    },
    created(){
        this.getGoodsPic(),
        this.getGoodsInfo()
    },
    methods:{
        getGoodsPic(){
            this.$http.get('api/getthumimages/'+this.id).then(result=>{
                if(result.body.status === 0){
                    result.body.message.forEach(item => {
                        item.img = item.src
                    });
                    this.lunbotu = result.body.message
                    console.log(this.id);
                }else{
                    Toast('获取轮播图数据失败')
                    
                    
                }
            })
        },
        getGoodsInfo(){
            this.$http.get('api/goods/getinfo/'+this.id).then(result=>{
                if(result.body.status === 0){
                    this.goodsInfo = result.body.message[0]
                }
            })
        },
        toGoodDist(id){
            this.$router.push('/home/goodDist/'+id)
        },
        toGoodcomt(id){
            this.$router.push('/home/Goodcomt/'+id)
        },
        getBuyNum(buyNun){
            this.buyNum = buyNun

            console.log(this.buyNum);
            
        },
        addToShopCar(){
           this.ballFlag=!this.ballFlag
           var carinfo ={
               id:this.id,
               count:this.buyNum,
               price:this.goodsInfo.sell_price,
               selected:true
           }
           this.$store.commit('addInfo',carinfo)
        },
        
        beforeEnter(el){
            el.style.transform = "translate(0,0)"
        },
        
        enter(el,done){
            //设置小球的完美动画
            const ballPodition = this.$refs.ball.getBoundingClientRect();

            const badgePosition = document.getElementById('badge').getBoundingClientRect();

            const xDist = badgePosition.left - ballPodition.left;
            const yDist = badgePosition.top - ballPodition.top;

            el.offsetWidth;
            el.style.transform = `translate(${xDist}px,${yDist}px)`;
            el.style.opacity = 0;
            el.style.transition = "all 1s";

            done()
        },
        afterEnter(el){
            this.ballFlag = !this.ballFlag
        }
    },
    components:{
        lunbotu,
        numBox
    }
}
</script>
<style lang="scss" scoped>
    .infoMain{
        background: #eee;
        overflow: hidden;
    }
    .mui-card-footer{
        display: block;
        button{
            margin: 10px 0;
        }
    }
    .ball{
        width: 20px;
        height: 20px;
        background-color: #26A2FF;
        border-radius: 50%;
        position: absolute;
        top: 390px;
        left: 146px;
        z-index: 99;
    }
</style>
