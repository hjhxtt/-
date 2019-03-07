<template>
  <div class="goods-list">
    <div class="goods-item" v-for="item in goodsList" :key="item.id" @click="goInfo(item.id)">
      <div class="img_box">
          <img src="item.img_url" alt="">
      </div>
      <h1 class="title">{{item.title}}</h1>
      <div class="info">
        <p class="price">
          <span class="now">￥{{item.sell_price}}</span>
          <span class="old">￥{{item.market_price}}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩{{item.stock_quantity}}件</span>
        </p>
      </div>
    </div>
    <mt-button type="danger" size="large" @click="getmoreGoods">加载更多</mt-button>
  </div>
  
</template>
<script>
import {Toast} from 'mint-ui'
export default {
      data(){
        return {
          goodsId:1,
          goodsList:[]
        }
      },
      created(){
        this.getGoods()
      },
      methods:{
        getGoods(){
          this.$http.get('api/getgoods?pageindex='+this.goodsId).then(result=>{
            if(result.body.status === 0){
                this.goodsList = this.goodsList.concat(result.body.message)
                console.log(this.goodsList);
                if(result.body.message.length == 0){
                    Toast('没有更多商品')
                }
            }else{
              Toast('获取商品数据失败')
            }
          })
        },
        getmoreGoods(){
          this.goodsId++
          this.getGoods()
        },
        goInfo(id){
          this.$router.push('/home/goodsInfo/'+id)
        }

      }

}
</script>
<style lang="scss" scoped>
.goods-list{
  display: flex;
  flex-wrap: wrap;
  padding: 7px;
  justify-content: space-between;

  .goods-item{
    width: 49%;
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #ccc;
    margin: 4px 0;
    padding: 2px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 293px;
    .img_box{
        min-height: 200px;
        img{
            width: 100%;
            }
    }
    
    .title{
      font-size: 14px;
    }

    .info{
      background-color: #eee;
      p{
        margin: 0;
        padding: 5px;
      }
      .price{
        .now{
          color: red;
          font-weight: bold;
          font-size: 16px;
        }
        .old{
          text-decoration: line-through;
          font-size: 12px;
          margin-left: 10px;
        }
      }
      .sell{
        display: flex;
        justify-content: space-between;
        font-size: 13px;
      }
    }
  }
}
</style>


