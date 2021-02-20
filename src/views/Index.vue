<template>
  <div>
    <h1>后台首页</h1>
    <v-chart class="box" :options="t1data" />
    <v-chart class="box" :options="t2data" />
    <v-chart class="box" :options="t3data" />
    <v-chart class="box" :options="t4data" />
  </div>
</template>
<script>
import ECharts from "vue-echarts";
// import "echarts/lib/chart/pie";
// import "echarts/lib/component/polar";
import * as echarts from "echarts";
export default {
  data() {
    return {
      t1data: {},
      t2data: {},
      t3data: {},
      t4data: {},
    };
  },
  created() {
    this.t1data = {
      title: {
        text: "",
        subtext: "纯属虚构",
        left: "center",
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "vertical",
        left: "left",
      },
      series: [
        {
          name: "访问来源",
          type: "pie",
          radius: "50%",
          data: [
            { value: 1048, name: "搜索引擎" },
            { value: 735, name: "直接访问" },
            { value: 580, name: "邮件营销" },
            { value: 484, name: "联盟广告" },
            { value: 300, name: "视频广告" },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };
    this.t2data = {
      title: {
        text: "",
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"],
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "邮件营销",
          type: "line",
          stack: "总量",
          data: [120, 132, 101, 134, 90, 230, 210],
        },
        {
          name: "联盟广告",
          type: "line",
          stack: "总量",
          data: [220, 182, 191, 234, 290, 330, 310],
        },
        {
          name: "视频广告",
          type: "line",
          stack: "总量",
          data: [150, 232, 201, 154, 190, 330, 410],
        },
        {
          name: "直接访问",
          type: "line",
          stack: "总量",
          data: [320, 332, 301, 334, 390, 330, 320],
        },
        {
          name: "搜索引擎",
          type: "line",
          stack: "总量",
          data: [820, 932, 901, 934, 1290, 1330, 1320],
        },
      ],
    };
    this.t3data = {
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: "bar",
          showBackground: true,
          backgroundStyle: {
            color: "rgba(220, 220, 220, 0.8)",
          },
        },
      ],
    };

    this.t4data = {
      tooltip: {
        formatter: "{a} <br/>{b} : {c}%",
      },
      toolbox: {
        feature: {
          restore: {},
          saveAsImage: {},
        },
      },
      series: [
        {
          name: "业务指标",
          type: "gauge",
          detail: { formatter: "{value}%" },
          data: [{ value: 50, name: "" }],
        },
      ],
    };
    setInterval(()=> {
      this.t4data.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
    }, 2000);
  },
  methods: {},
  components: {
    "v-chart": ECharts,
  },
};
</script>
<style scoped>
h1 {
  margin-bottom: 10px;
  color: #fff;
  text-shadow: 0 0 3px #000;
}
.box {
  width: 500px;
  height: 300px;
  display: inline-block;
  background-color: #fff;
  box-shadow: 0 0 5px #fff;
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>