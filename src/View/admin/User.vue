<template>
  <div class="user">
    <el-form :inline="true" ref="array" :model="array" label-width="60px">
      <el-form-item label="用户名">
        <el-input v-model="array.username"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="array.phone"></el-input>
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="userLists()" circle>搜索</el-button>
      <el-button type="info" icon="el-icon-edit" @click="modify(form)" circle>添加</el-button>
    </el-form>
    <el-table v-loading="loading" :data="tableData" height="500px" border style="width: 100%">
      <el-table-column prop="id" label="id"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="phone" label="手机"></el-table-column>
      <el-table-column prop="state" label="状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.state"
            @change="states(scope.row)"
            active-color="#13ce66"
            :active-value="true"
            :inactive-value="false"
            inactive-color="#ff4949"
          />
        </template>
      </el-table-column>
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
          <el-form-item label="用户名">
            <el-col :span="12">
              <el-input v-model="form.username"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="密码">
            <el-col :span="12">
              <el-input v-model="form.password" type="password"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="手机号">
            <el-col :span="12">
              <el-input v-model="form.phone"></el-input>
            </el-col>
          </el-form-item>
        </el-form>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="states(form)">确 定</el-button>
      </div>
    </el-dialog>
    <el-pagination
      background
      layout="prev, pager, next"
      @current-change="userLists"
      :total="totals"
    ></el-pagination>
  </div>
</template>

<style scoped>
.el-pagination {
  text-align: center;
}
</style>

<script>
export default {
  name: "user",
  data() {
    return {
      tableData: [],
      list: [],
      array: {
        p: 1,
        total: 10,
        username: "",
        phone: ""
      },
      loading: false, //接口加载成功时不显示加载
      dialogFormVisible: false,
      form: {
        id: null,
        username: null,
        password:null,
        phone: null,
        state: null
      },
      totals: 1
    };
  },
  methods: {
    //删除
    operation(rows) {
      rows.row["is_delete"] = 1;
      this.$confirm("此操作将删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          var datas = this.$api.userListAddto(rows.row).then(value => {
            if (value.info.ok) {
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

    //修改
    states(rows) {
      rows.state = rows.state ? '0' : '1';
      // return false;
      var datas = this.$api.userListAddto(rows).then(value => {
        if (value.info.ok) {
          this.$message({
            message: value.info.message,
            type: "success"
          });
          //更新数据
          this.userLists();
        } else {
          this.$message({
            message: value.info.message,
            type: "error"
          });
        }
      });
      this.dialogFormVisible = false;
    },

    //修改
    modify(row) {
      //让表单出来
      this.dialogFormVisible = true;
      //赋值给form
      this.form = row;
    },

    //组件全局数据
    userLists(pager) {
      if (!pager == "") {
        this.array.p = pager;
      }
      this.$api
        .userList(this.array)
        .then(value => {
          this.loading = false;
          value.data.data.forEach(function(v, k) {
            if (v.state == 0) {
              value.data.data[k].state = true;
            } else {
              value.data.data[k].state = false;
            }
          });
          this.tableData = value.data.data;
          this.totals = value.data.total;
          // console.log(this.totals);
        })
        .catch(() => {
          this.$message({
            message: "网络加载失败!",
            type: "error"
          });
          this.loading = true;
        });
    }
  },
  mounted() {
    this.userLists();
  }
};
</script>