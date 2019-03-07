<template>
    <div class="cmt-body">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入内容（最多120字）" maxlength="120" v-model="msg"></textarea>
        <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
        <div class="cmt-all">
            <div class="cmt-eachBox" v-for="(item , index) in cmt_list" :key="index">
                <div class="cmt_title">
                    第{{index+1}}楼&nbsp;&nbsp;用户：{{item.user_name}}&nbsp;&nbsp;发表时间：{{item.add_time | dataFormat}}
                </div>
                <div class="cmt_main">
                    {{item.content==='undefined'?"该用户很懒，没有留下痕迹":item.content}}
                </div>
            </div>
        </div>
        <mt-button type="danger" size="large" @click="getMroecmt">加载更多</mt-button>
    </div>
</template>
<script>
import {Toast} from "mint-ui";
export default {
    data(){
        return {
            pageindex : 1,
            cmt_list:[],
            msg:""
        }
    },
    created(){
        this.getcmt()
    },
    methods:{
        getcmt(){
            this.$http.get(`api/getcomments/${this.id}?pageindex=${this.pageindex}`).then(function(result){
                if(result.body.status === 0){
                    this.cmt_list = this.cmt_list.concat(result.body.message)
                }else{
                    Toast('加载数据失败')
                }
            })
        },
        getMroecmt(){
            this.pageindex++;
            this.getcmt()
        },
        postComment(){

            if(this.msg.trim().length == 0){
               return Toast('评论内容不能为空')
            }
            // var com ={user_name:"匿名用户",add_time:new Date(),content:this.msg}
            // this.cmt_list.unshift(com)
            // this.msg = ""
            

            //由于服务器后台的接收评论数据端口没写，所以注释一下向服务器上传评论功能
            this.$http.post("api/postcomment/"+this.id,{content:this.msg.trim()}).then(function(result){
                if(result.body.status === 0){
                    var com ={user_name:"匿名用户",add_time:new Date(),content:this.msg}
                    this.cmt_list.unshift(com)
                    this.msg = ""
                    Toast('评论成功')
                }
             }
            )
        }
    },
    props:["id"]
}
</script>

<style lang="scss" scoped>
    .cmt-body{
        h3{
            font-size: 20px;
        }
        textarea{
            height: 150px;
            margin-bottom: 5px;
            font-size: 14px;
        }
        .cmt-all{
            padding: 5px 0;
            .cmt-eachBox{
                .cmt_title{
                    font-size: 13px;
                    background: #ccc;
                    height: 30px;
                    line-height: 30px;
                    text-indent: 1em;
                }
                .cmt_main{
                    font-size: 13px;
                    line-height: 30px;
                    text-indent: 2em;
                }
            }
        }
    }
</style>


