<template>
  <div class="userline">
    <div id="main" style="width: 100%;height:600px;"></div>
  </div>
</template>

<script>
export default {
  name: "userline",
  data() {
    return {
    };
  },
  methods: {
    //初始化
    initial(data) {
      // console.log(this.value1);
      var myChart = this.$echarts.init(document.getElementById("main"));
      var times = parseInt(new Date().getTime() / 1000);
      var datas = {
        start_time: times - 86400 * 7,
        end_time: times - 86400,
        type: data
      };
      //  console.log(datas);
      //  return false
      this.$api.Mapping(datas).then(value => {
        // console.log(value);
        var option = {
          title: {
            text: "用户活跃详情"
          },
          tooltip: {
            //提示坐标
            trigger: "axis",
            axisPointer: {
              type: "cross",
              label: {
                backgroundColor: "#B0C4DE"
              }
            }
          },
          legend: {
            data: ["注册"]
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: value.data.xAxis.data
          },
          yAxis: {
            type: "value"
          },
          series: [
            {
              name: "注册",
              type: "line",
              areaStyle: {
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "red" // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "blue" // 100% 处的颜色
                    }
                  ],
                  global: false // 缺省为 false
                }
              },
              data: value.data.series
            }
          ]
        };
        // 绘制图表
        myChart.setOption(option);
      });
    }
  },
  mounted() {
    this.initial(1);
  }
};
</script>

<style>
.we{
  text-align: center;
}
.block{
  text-align: center;
}
</style>