<template>
  <div class="signin">
    <div class="inputs">
      <h3>Cartoon</h3>
      <el-form ref="form" :model="form" label-width="0px" :rules="rules">
        <el-form-item label prop="username">
          <el-input v-model="form.username" placeholder="请输用户名"></el-input>
        </el-form-item>
        <el-form-item label prop="password">
          <el-input placeholder="请输入密码" v-model="form.password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="info" round @click="signin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
        type: 0
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    // 登录处理
    signin() {
      //提示按钮
      this.$confirm("确认登录吗?时候确认密码", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$api.signin(this.form).then(value => {
            if (value.data.token) {
              //把token储存进请求头
              localStorage.setItem("token", value.data.token);
              this.$message({
                message: "登陆成功哦!",
                type: "success"
              });
              //跳转页面
              this.$router.push({ path: "/" });
            } else {
              this.$message({
                message: "登陆失败!",
                type: "success"
              });
            }
          });
        })
        .catch(error => {
          this.$message({
            message: "请确认哦",
            type: "warning"
          });
        });
    }
  }
};
</script>

<style scoped>
.signin {
  position: relative;
  overflow: hidden;
  height: 100%;
  display: flex; /* Flex布局(弹性布局) */
  justify-content: center; /* 盒子内居中对其 */
  align-items: center;
  background-position: -20% 10%;
  background-size: contain;
  background: url(../assets/denglu.jpg) no-repeat;
}
.inputs {
  width: 310px;
  padding: 30px;
  z-index: 3;
  /* margin-right: -40%; */
  position: relative;
  background: rgba(50, 50, 50, 0.5);
}
.el-form-item {
  margin-bottom: 25px !important;
}
h3 {
  text-align: center;
  color: #ebedef;
  margin-top: 0px;
  margin-bottom: 5px;
  font-size: 22px;
}
form {
  margin-top: 25px;
}
.el-form-item {
  margin-bottom: 15px;
}
button {
  width: 120px;
  margin-left: 85px;
  font-weight: 600;
  border: none;
  border-radius: 0;
  background-color: #34495e;
}
</style>