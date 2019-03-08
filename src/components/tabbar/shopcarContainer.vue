<template>
    <div class="shopCar-container">
        <!-- 购物车上部 -->
        <div class="mui-card"  v-for="(item , i) in goodsList" :key="item.id">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<mt-switch 
                        v-model="$store.getters.getGoodsSelected[item.id]"
                        @change="selectedChange(item.id,$store.getters.getGoodsSelected[item.id])"></mt-switch>
                        <img :src="item.thumb_path" alt="">
                        <div class="infoBox">
                            <h3>{{item.title}}</h3>
                            <div class="sub_price">
                                <span>￥{{item.sell_price}}</span>
                                <numadd :initcount="$store.getters.getGoodsCount[item,id]" :goodsid="item.id"></numadd>
                                <a href="#" @click.prevent="remove(item.id, i)">删除</a>
                            </div>
                        </div>
					</div>
				</div>
			</div>
            <!-- 模板数据 -->
            <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<mt-switch></mt-switch>
                        <img src="http://img5.gomein.net.cn/image/prodimg/productDesc/descImg/201503/desc1226/1122290268/1_02.jpg" alt="">
                        <div class="infoBox">
                            <h3>苹果手机（模板数据）</h3>
                            <div class="sub_price">
                                <span>￥4399</span>
                                <numadd></numadd>
                                <a href="#">删除</a>
                            </div>
                        </div>
					</div>
				</div>
			</div>
            <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<mt-switch></mt-switch>
                        <img src="http://img5.gomein.net.cn/image/prodimg/productDesc/descImg/201503/desc1226/1122290268/1_02.jpg" alt="">
                        <div class="infoBox">
                            <h3>苹果手机（模板数据）</h3>
                            <div class="sub_price">
                                <span>￥4399</span>
                                <numadd></numadd>
                                <a href="#">删除</a>
                            </div>
                        </div>
					</div>
				</div>
			</div>
            <!-- 结算部分 -->
            <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner jiesuan">
						<div class="left">
              <p>总计（不含运费）</p>
              <p>已勾选商品 <span class="red">{{ $store.getters.getGoodsCountAndAmount.count}}</span> 件， 总价 <span class="red">￥{{ $store.getters.getGoodsCountAndAmount.amount }}</span></p>
            </div>
             <mt-button type="danger">去结算</mt-button>
					</div>
				</div>
			</div>
    </div>
</template>

<script>
import {Toast} from 'mint-ui'
import numadd from '../subcomponents/shopCar_num.vue'
export default {
    data(){
        return {
            goodsList:[]
        }
    },
    created() {
        this.getGoods()
    },
    methods: {
        getGoods(){
            var goodsId = []
            var cargoods = this.$store.state.carItem
            cargoods.forEach(item => goodsId.push(item.id));
            if(goodsId.length <= 0){

                return 
            }
            console.log(goodsId);
            
            this.$http.get('api/goods/getshopcarlist/'+goodsId.join(",")).then(result=>{
                if(result.body.status === 0){
                    this.goodsList = result.body.message
                    console.log(1);
                    
                }else{
                    Toast("对不起后台数据，未启用，错误信息为"+result.body.message)
                    
                }
            })
        },
        remove(id,index){
            this.goodsList.splice(index,1);
            this.$store.commit('removeFormCar',id)
        },
        selectedChange(id,val){
            this.$store.commit('updateGoodsSelected',{id,selected:val})
        }
    },
    components:{
        numadd
    }
}
</script>

<style lang="less" scoped>
    .shopCar-container{
        background: #ddd;
        overflow: hidden;
        .mui-card-content-inner{
            display: flex;
            img{
                width: 60px;
                height: 60px;
            }
            
            .infoBox{
                h3{
                    font-size: 13px;
                }
                .mui-numbox{
                    height: 30px;
                }
                .sub_price{
                    span{
                        font-weight: 700;
                        color: red;
                    }
                }
            }
        }
        .jiesuan {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .red {
        color: red;
        font-weight: bold;
        font-size: 16px;
        }
    }
    }
</style>

