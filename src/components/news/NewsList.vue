<template>
    <div>
        <ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
					<router-link :to="`/home/newslist/news_inner/${item.id}`">
						<img class="mui-media-object mui-pull-left" src="../../images/shuijiao13.jpg">
						<div class="mui-media-body">
							<h3>{{item.title}}</h3>
							<p class="mui-ellipsis">
                                <span>发表时间 {{item.add_time | dataFormat()}}</span>
                                <span>点击次数：{{item.click}} 次</span>
                            </p>
						</div>
					</router-link>
				</li>
		</ul>
    </div>
</template>
<script>
import {Toast} from 'mint-ui'
export default {
    created(){
        this.getNewsList()
    },
    data(){
        return {
            newslist:[]
        }
    },
    methods:{
        getNewsList(){
            this.$http.get('api/getnewslist').then(result => {
                if(result.body.status === 0){
                    this.newslist = result.body.message
                    
                }else{
                    Toast('获取数据失败')
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
    .mui-table-view{
        li{
            h3{
                font-size:14px;
            }
            p{
                font-size: 12px;
                color: #226aff;
                display: flex;
                justify-content: space-between;
            }
        }
    }
</style>
