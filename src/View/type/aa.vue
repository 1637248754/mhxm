<template>
  <div>
    <div class="container">
      <el-form
        style="width:60%;"
        :model="form"
        status-icon
        :rules="rules"
        ref="form"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="描述" prop="desc">
          <el-input type="textarea" maxlength="50" show-word-limit v-model="form.desc"></el-input>
        </el-form-item>

        <el-form-item label="添加图片" prop="file" ref="uploadElement">
          <el-upload
            action="#"
            multiple
            v-model="form.file"
            ref="upload"
            list-type="picture-card"
            :auto-upload="false"
            :on-preview="showImg"
            :on-remove="remove"
            :on-change="onChange"
            class="upload-demo"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>

        <el-form-item style="margin-top: 50px;">
          <el-button type="primary" @click="onSubmit('form')">立即添加</el-button>
          <el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "userInfo",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      formData: "",
      form: {
        desc: "",
        file: ""
      },
      rules: {
        file: [{ required: true, message: "请上传图片", trigger: "change" }]
      }
    };
  },
  methods: {
    //添加信息
    onSubmit(form) {
      let that = this;
      this.$refs[form].validate(valid => {
        if (valid) {
          let formData = new FormData();
          for (var key in that.form) {
            formData.append(key, that.form[key]);
            console.log(formData.get(key));
          }
          that.formData = formData;
          // this.addForm();
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },
    //重置信息
    resetForm(form) {
      this.$refs[form].resetFields();
      this.form.file = "";
      this.$refs.upload.clearFiles();
    },
    //添加
    addForm() {
      this.$axios({})
        .then(res => {
          console.log(res.data.status);
          if (res.data.status == "200") {
            this.$message({
              message: "添加成功",
              type: "success"
            });
            this.$router.push({
              path: "/"
            });
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //删除图片
    remove(file) {
      // console.log(file);
      for (let i = 0; i < this.form.file.length; i++) {
        if (file === this.form.file[i]) {
          this.form.file.splice(i, 1);
        }
      }
    },
    //变化设置图片
    onChange(file, fileList) {
      // console.log(file, fileList);
      this.form.file = fileList;
      console.log(this.form);
    },
    //浏览图片
    showImg(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
};
</script>
