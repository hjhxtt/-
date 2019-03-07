<template>
    <div>
        <mt-swipe :auto="4000">
            <mt-swipe-item  v-for="item in lunbolist" :key="item.img">
                <img :src="item.img" alt=""   :class="{fullwidth:isfull}" >
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>
<script>
    import {Toast} from 'mint-ui'
    export default{
        props:["lunbolist","isfull"]
    }
</script>
<style lang="scss" scoped>
    .mint-swipe{
        height: 200px;
        .mint-swipe-item{
            text-align: center;
            &:nth-child(1){
                background: red;
            }
            &:nth-child(2){
                background: blue;
            }
            &:nth-child(3){
                background: #ccc;
            }
            img{
                height:100%;
            }
        }
    }
    .fullwidth{
        width: 100%;
    }
</style>

