<template>
  <div id="topbar-wrap" :class="{topCollapsed: isCollapse}">
    <el-row type="flex" justify="space-between">
      <el-col :span="5">
        <i class="el-icon-d-arrow-left" @click="toggleSiderBar"></i>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import store from '../vuex/xuyao.js' //vuex模板传值
export default {
  data(){
    return{
      // isCollapse:this.$store.state.isCollapse
    }
  },
  store,
  computed:{
    isCollapse(){
       return this.$store.state.isCollapse
    }
  },
  methods:{
    toggleSiderBar() {
      this.$store.commit("toggleSiderBar");
    }
  }
}
</script>

<style scoped>
#topbar-wrap {
  overflow: hidden;
  border-bottom: 1px solid #efefef;
  background: #fff;
  color: #353d47;
  padding: 0 15px;
  z-index: 4;
  box-sizing: border-box;
}
 i {
    font-size: 20px;
    line-height: 60px;
    transition: all 0.5s;
  }
  i:hover {
      cursor: pointer;
    }
.row-right > div {
  text-align: center;
}
</style>