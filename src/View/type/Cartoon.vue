<template>
  <div class="cartoon">
    <el-form :inline="true" ref="array" :model="array" label-width="60px">
      <el-form-item label="名称">
        <el-input v-model="array.name"></el-input>
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="CartoonList()" circle>搜索</el-button>
      <el-button type="info" icon="el-icon-edit" @click="modify(form)" circle>添加</el-button>
    </el-form>
    <el-table :data="tableData" height="500px" border style="width: 100%">
      <el-table-column prop="id" label="id" width="180" align="center"></el-table-column>
      <el-table-column prop="name" label="名称" width="180" align="center"></el-table-column>
      <el-table-column prop="type_id" label="题材" width="180" align="center"></el-table-column>
      <el-table-column label="封面" width="180" align="center">
        <template slot-scope="scope">
          <img
            :src="require('../../assets/uploads/'+scope.row.picture)"
            min-width="100"
            height="100"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="content"
        label="介绍"
        width="180"
        :show-overflow-tooltip="true"
        align="center"
      ></el-table-column>
      <el-table-column prop="progress" label="进度" width="180" align="center"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="operation(scope)" type="primary" icon="el-icon-delete" size="small" />
          <el-button type="primary" @click="modify(scope.row)" size="small" icon="el-icon-edit" />
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="添加和修改" :visible.sync="dialogFormVisible">
      <div slot="footer" class="dialog-footer">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="名称">
            <el-col :span="15">
              <el-input v-model="form.name"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="题材">
            <el-col :span="6">
              <el-select v-model="form.type_id" placeholder="请选择">
                <el-option
                  v-for="item in themes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="添加图片" :prop="form.picture" ref="uploadElement">
            <el-col :span="5">
              <el-upload
                action
                v-model="form.file"
                :with-credentials="true"
                ref="upload"
                :auto-upload="true"
                :before-upload="showImg"
                class="upload-demo"
              >
                <img
                  v-if="form.picture"
                  :src="require('../../assets/uploads/'+form.picture)"
                  class="avatar"
                />
                <i v-else class="el-icon-plus"></i>
              </el-upload>
            </el-col>
          </el-form-item>
          <el-form-item>
              <el-input type="textarea" autosize :rows="8" placeholder="请输入漫画内容" v-model="form.content"></el-input>
          </el-form-item>
        </el-form>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="states(form)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "cartoon",
  data() {
    return {
      tableData: [],
      array: {
        p: 1,
        total: 10,
        name: null
      },
      form: {
        name: null,
        progress: null,
        picture: null,
        content: null,
        type_id:null
      },
      dialogFormVisible: false,
      options: [
        {
          value: "0",
          label: "连载"
        },
        {
          value: "1",
          label: "完结"
        }
      ],
      theme: {
        p: 1,
        total: 100
      },
      themes: [],
      imageUrl: ""
    };
  },
  methods: {
    //组件数据
    CartoonList() {
      this.$api.cartoonLIst(this.array).then(value => {
        this.tableData = value.data.data;
      });
    },
    //删除
    operation(rows) {
      var data = {
        is_delete: 1,
        id: rows.row.id,
        content:rows.row.content,
        name:rows.row.name
      };
      this.$confirm("此操作将删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var datas = this.$api.cartoonAuto(data).then(value => {
            if (value.info.ok) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.tableData.splice(rows.$index, 1);
            } else {
              this.$message({
                message: "删除失败",
                type: "error"
              });
            }
          });
        })
        .catch(() => {
          return "";
        });
    },
    modify(row) {
      //让表单出来
      this.dialogFormVisible = true;
      //添加修改页的题材
      this.$api.themeList().then(value => {
        this.themes = value.data;
      });
      this.form = row;
    },
    states(forms) {
      var form = this;
      this.themes.forEach(function(value, key) {
        if (value.label == form.form.type_id) {
          form.form.type_id = value.value;
        }
      });
      this.options.forEach(function(v, k) {
        if (v.label == form.form.progress) {
          form.form.progress = v.value;
        }
      });
      if (!this.imageUrl == "") {
        form.form.picture = this.imageUrl;
      }
      if(form.form.picture == null){
          this.$message({
            type: "success",
            message: "请添加图片"
          });
          return false
      }
      if(form.form.type_id == null){
         this.$message({
            type: "success",
            message: "请选择题材"
          });
          return false
      }
      // this.$refs.upload.submit();
      this.$api.cartoonAdd(form.form).then(value => {
        if (value.info.ok) {
          this.$message({
            type: "success",
            message: value.info.message
          });
          this.form = {}
        } else {
          this.$message({
            type: "error",
            message: value.info.message
          });
        }
      });
      this.CartoonList();
      this.dialogFormVisible = false;
    },
    showImg(file) {
      var formData = new FormData();
      formData.append("file", file);
      // formData.append("id", this.form.id);
      // formData.append("name", this.form.name);
      // formData.append("picture", this.form.picture);
      // formData.append("content", this.form.content);
      // formData.append("progress", this.form.progress);
      // formData.append("type_id", this.form.type_id);
      this.$api.image(formData).then(value => {
        if (value) {
          this.imageUrl = value.data;
        }
      });
    }
  },
  mounted() {
    this.CartoonList();
  }
};
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

