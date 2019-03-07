<template>
    <div class="mui-numbox" data-numbox-min="1" :data-numbox-max="max">
					<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
					<input id="test" class="mui-input-numbox" type="number" value="1"  @change="countChanged" ref="numBox">
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
			
			var num = this.$refs.numBox.value
			this.$emit('getBuyNum',parseInt(num))
		}
	},
	props:['max'],
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
