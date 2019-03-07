<template>
    <div class="goodsBody">
        <h3>{{goodsinfo.title}}</h3>
        <div class="goods_info" v-html="goodsinfo.content">

        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            id:this.$route.params.id,
            goodsinfo:{}
        }
    },
    created(){
        this.getGoodsDetail()
    },
    methods:{
        getGoodsDetail(){
            this.$http.get('api/goods/getdesc/'+this.id).then(result=>{
                if(result.body.status === 0){
                    this.goodsinfo = result.body.message[0]
                }
            })
        }
    }
}
</script>
<style lang="scss">
    .goodsBody{
        padding: 0 5px;
        h3{
            font-size: 16px;
            text-align: center;
            padding: 10px ;
            line-height: 26px;
        }
        .goods_info{
            img{
                width: 100% ;
                display: block;
            }
        }
    }
</style>
