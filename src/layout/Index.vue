<template>
   <div class="index">
     <!-- 侧导航 -->
       <side></side>
       <div class="con-wrap" :class="{conCollapse: toggSiderBar}">
        <!-- 顶部导航 -->
        <top></top>
        <!-- 组件显示地方 -->
        <router-view class="page-component-wrap animated fadeIn"></router-view>
       </div>
  </div>
</template>

<script>
import SideBar from '@/components/SideBar';
import TopBar from '@/components/TopBar';
import store from '../vuex/xuyao.js' //vuex模板传值
export default {
  data(){
      return{
        isCollapse:false
     }
  },
  store,
  computed: {
    toggSiderBar() {
      return this.$store.state.isCollapse;
    }
  },
  components:{
    'side':SideBar,
    'top':TopBar
  }
}
</script>

<style>
 .con-wrap {
    padding-left: 180px;
    transition: all 0.3s;
 }
 .page-component-wrap {
    padding: 10px;
 }
 h3 {
    margin-top: 0;
    color: #324157;
  }
.con-wrap.conCollapse {
  padding-left: 64px;
  transition: all 0.3s;
}
</style>