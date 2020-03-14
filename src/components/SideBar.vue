<template>
  <div class="SideBar" :class="{ collapsed: toggSiderBar }">
    <!-- 顶部图标 -->
    <h3 class="logo">
      <span class="rythm twist1">{{toggSiderBar ? 'VUE': 'AUTO VUE'}}</span>
    </h3>

    <el-menu
      background-color="#3f4d67"
      text-color="#fff"
      :default-active="$route.path"
      :collapse="toggSiderBar"
      :router="true"
    >
      <!-- 外壳 -->
      <template v-for="item in menc">
        <!-- 判断是否有下级 -->
        <el-submenu :index="item.url" :key="item.url" v-if="item.agent.length != 0">
          <template slot="title">
            <i :class="item.icon"></i>
            <span @click="add()">{{item.title}}</span>
          </template>

          <el-menu-item v-for="value in item.agent" :index="value.url" :key="value.uel">
            <i class="fa fa-long-arrow-right"></i>
            <span slot="title">{{value.title}}</span>
          </el-menu-item>
        </el-submenu>
        <!-- 如果没有下级就变成单级导航栏 -->
        <el-menu-item v-else :index="item.url" :key="item.url">
          <i :class="item.icon"></i>
          <span>{{item.title}}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import store from "../vuex/xuyao.js"; //vuex模板传值
export default {
  name: "SideBar",
  data() {
    return {
      menc: this.$store.state.guide
    };
  },
  store,
  computed: {
    toggSiderBar() {
      return this.$store.state.isCollapse;
    }
  },
  methods: {
    add() {
      // console.log(this.$store.state.guide)
      // console.log(this.$store.state.isCollapse)
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.SideBar {
  width: 180px;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 5;
  transition: all 0.3s; /**让css属性不会里面变化**/
  background: #3f4d67;
}
.el-menu {
  height: 100%;
  border-right: 0;
  box-shadow: 0px 15px 15px rgba(0, 0, 0, 0.6);
}
.SideBar.collapsed {
  width: 64px;
  transition: all 0.3s;
}
.logo {
  color: #fff;
  text-align: center;
  padding: 18px 0;
  margin: 0;
  height: 60px;
  box-sizing: border-box;
}
/* 美化左侧导航的留白 */
.el-submenu .el-menu-item {
  padding: 0 20px;
  min-width: 160px;
  padding-left: 26px !important;
}
i {
  padding-right: 10px;
}
.rythm.twist1 {
  display: block;
}
</style>
