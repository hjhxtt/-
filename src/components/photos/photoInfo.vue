<template>
    <div class="photoinfo-container">
        <h3>{{ picInfo.title }}</h3>
        <p class="subtitle">
        <span>发表时间：{{ picInfo.add_time | dataFormat }}</span>
        <span>点击：{{ picInfo.click }}次</span>
        </p>

        <hr>

        <!-- 缩略图区域 -->
        <div class="thumbs">
            <vue-preview :slides="slide1" @close="handleClose"></vue-preview>
        </div>
        
        <!-- 图片内容区域 -->
        <div class="content" v-html="picInfo.content"></div>

        <!-- 放置一个现成的 评论子组件 -->
        <cmt-box :id="id"></cmt-box>
    </div>
</template>
<script>
import  cmt from '../subcomponents/commont.vue'
export default {
    data(){
        return {
            id:this.$route.params.id,
            picInfo:{},
            slide1:[]
        }
    },
    created(){
        this.getImgInfo(),
        this.getAllPic()
    },
    methods:{
        getImgInfo(){
            this.$http.get('api/getimageInfo/'+this.id).then(result => {
                if(result.body.status === 0){
                    this.picInfo = result.body.message[0]
                }
            })
        },
        handleClose () {
        console.log('close event')
      },
        getAllPic(){
            this.$http.get('api/getthumimages/'+this.id).then(result=>{
                if(result.body.status === 0){
                    result.body.message.forEach(element => {
                        element.w = 600;
                        element.h = 400;
                    });
                    this.slide1 = result.body.message
                }
                
            })
        }
    },
    components:{
        "cmt-box":cmt
    }
}
</script>
<style lang="scss" scoped>
.photoinfo-container {
  padding: 3px;
  h3 {
    color: #26a2ff;
    font-size: 15px;
    text-align: center;
    margin: 15px 0;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }

  .content {
    font-size: 13px;
    line-height: 30px;
  }

  .thumbs{
    img{
      margin: 10px;
      box-shadow: 0 0 8px #999;
      border: 1px solid #ddd;
    }
    figure{
       border: 1px solid #ddd; 
    }
  }
}
</style>

