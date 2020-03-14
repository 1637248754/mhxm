<template>
  <div class="Theme">
    <el-form :inline="true" ref="array" :model="array" label-width="60px">
      <el-form-item label="名称">
        <el-input v-model="array.typename"></el-input>
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="typeLists()" circle>搜索</el-button>
      <el-button type="info" icon="el-icon-edit" @click="modify(form)" circle>添加</el-button>
    </el-form>

    <el-table :data="tableData" height="500px" border style="width: 100%">
      <el-table-column prop="id" label="id" width="180" align="center"></el-table-column>
      <el-table-column prop="typename" label="名称" width="180" align="center"></el-table-column>
      <el-table-column prop="state" label="状态" align="center">
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
    <el-pagination
      background
      layout="prev, pager, next"
      @current-change="typeLists"
      :total="totals"
    ></el-pagination>
    <el-dialog title="添加和修改" :visible.sync="dialogFormVisible">
      <div slot="footer" class="dialog-footer">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="名称">
            <el-col :span="15">
              <el-input v-model="form.typename"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="区分">
            <el-col :span="6">
              <el-select v-model="form.grade" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
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
  name: "Theme",
  data() {
    return {
      tableData: [],
      totals: 1,
      options: [
        {
          value: "0",
          label: "题材"
        },
        {
          value: "1",
          label: "地区"
        }
      ],
      array: {
        p: 1,
        total: 10,
        typename: null,
        grade: null
      },
      form: {
        //增删改数据
        id: null,
        typename: null,
        grade: null,
        state: "0"
      },
      dialogFormVisible: false
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
          var datas = this.$api.themeListAuto(rows.row).then(value => {
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
    //组件数据
    typeLists(pager, grade) {
      if (!pager == "") {
        this.array.p = pager;
      }
      if (!grade == "") {
        this.array.grade = grade;
      } else {
        this.array.grade = null;
      }
      this.$api.theme(this.array).then(value => {
        value.data.data.forEach(function(v, k) {
          if (v.state == 0) {
            value.data.data[k].state = true;
          } else {
            value.data.data[k].state = false;
          }
        });
        this.tableData = value.data.data;
        this.totals = value.data.total;
      });
    },
    //修改
    states(rows) {
      rows.state = rows.state ? "0" : "1";
      console.log(rows.state);
      var datas = this.$api.themeListAuto(rows).then(value => {
        if (value.info.ok) {
          this.$message({
            message: value.info.message,
            type: "success"
          });
          //更新数据
          this.typeLists();
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
    }
  },
  mounted() {
    this.typeLists();
  }
};
</script>

<style>
.el-pagination {
  text-align: center;
}
</style>
