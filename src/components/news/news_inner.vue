<template>
    <div class="news_inner_container">
        <h1>{{newsMain.title}}</h1>
        <p class="news_inner_time">
            <span>发表时间 {{newsMain.add_time | dataFormat}}</span>
            <span>点击{{newsMain.click}}次</span>
            <hr>
        </p>
        <div class="news_body" v-html="newsMain.content">
            
        </div>
        <comment-box :id="this.id"></comment-box>
    </div>
</template>
<script>
import comment from '../subcomponents/commont.vue'

export default {
    created(){
        this.getNewsMain()
    },
    data() {
        return {
            id:this.$route.params.id, //路由传来的id
            newsMain:{}
        }
    },
    methods:{
         getNewsMain(){
            this.$http.get('api/getnew/'+this.id).then(result=>{
                    if(result.body.status === 0){
                        this.newsMain = result.body.message[0]
                    }else{
                        Toast('获取新闻失败')
                    }
                }
            )
        }
    },
    components:{
        "comment-box":comment //记得加双引号
    }
}
</script>
<style lang="scss">
    .news_inner_container{
        padding: 0 5px;
        h1{
            font-size: 16px;
            width: 100%;
            text-align: center;
            padding: 15px 0;
            
        }
        .news_inner_time{
            width: 100%;
            display: flex;
            justify-content: space-between;
            span{
                color: #226aff;
            }
        }
        .news_body{
            img{
                width: 100%;
            }
        }

    }

</style>

