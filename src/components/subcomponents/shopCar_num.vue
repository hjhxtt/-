<template>
    <div class="mui-numbox" data-numbox-min="1" data-numbox-max="">
					<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
					<input id="test" class="mui-input-numbox" type="number" :value="initcount"  @change="countChanged" ref="numBox">
					<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
	</div>
</template>
<script>
//初始化mui
// import mui from '../../lib/mui/js/mui.js'
// mui(".mui-numbox").numbox().setOption('step',1)
// export default {
//     mounted(){
//         mui(".mui-numbox").numbox()
//     }
// }
// import mui from '../../lib/mui/js/mui.js'
export default {
	data(){
		return {
			
		}
	},
	methods:{
		countChanged(){
  //值改变
    this.$store.commit('updateGoodsInfo',{
      id:this.goodsid,
      count:this.$refs.numBox.value
    })
		}
  },
  props:["initcount","goodsid"]
	// watch:{
	// 	max: function (newVal,oldVal) {
	// 		mui(".mui-numbox")
	// 		.numbox()
	// 		.setOption("max",newVal)

			
	// 	}
	// }
}
</script>
<style lang="scss" scoped>

</style>
