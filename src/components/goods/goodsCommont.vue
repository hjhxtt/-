<template>
    <div>
        <comments :id="this.$route.params.id"></comments>
    </div>
</template>
<script>
import comments from '../subcomponents/commont.vue'
export default {
    components:{
        comments
    }
}
</script>
<style lang="scss" scoped>

</style>
