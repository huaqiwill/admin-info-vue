<template>
  <div style="margin: 15px">
    <el-row :gutter="20">
      <el-col :span="6" v-for="item in cards" :key="item.title">
        <el-card class="box-card">
          <div slot="header" class="clearfix">{{ item.title }}</div>
          <div class="text item">
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="item.icon" style="width: 100px"></use>
            </svg>
            <span class="text">{{ item.data }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div id="myTimer" style="margin-left: 8px; font-weight: 550"></div>
    <div id="main" style="margin-left: 5px"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import api from "@/api";

export default {
  data() {
    return {
      cards: [
        { title: "用户数", data: 100, icon: "#iconpopulation" },
        { title: "总访问", data: 100, icon: "#iconvisit" },
        { title: "生物数", data: 100, icon: "#iconlend-record-pro" },
        { title: "国家数", data: 100, icon: "#iconbook-pro" },
        { title: "港口数", data: 100, icon: "#iconvisit" },
        { title: "港口发现生物数量", data: 100, icon: "#iconlend-record-pro" },
        { title: "港口检测生物数量", data: 100, icon: "#iconbook-pro" },
        { title: "国家发现有害生物数量", data: 100, icon: "#iconpopulation" }
      ],
      data: {},
    };
  },
  created() { },
  mounted() {
    this.circleTimer();
    this.loadData()
  },
  methods: {
    loadData() {
      api.dashboard().then(res => {
        this.cards[0].data = res.data.visitCount;
        this.cards[1].data = res.data.userCount;
        this.cards[2].data = res.data.biologyCount;
        this.cards[3].data = res.data.countryCount;
        this.cards[4].data = res.data.portCount;
        this.cards[5].data = res.data.portFindCount;
        this.cards[6].data = res.data.portCheckCount;
        this.cards[7].data = res.data.countryFindCount;
        this.initChart()
      })
    },
    initChart() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = echarts.init(document.getElementById("main"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: "统计",
        },
        tooltip: {
          trigger: "axis",
          // axisPointer: {
          //   type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          // }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: this.cards.map((item) => item.title),
          axisTick: {
            alignWithLabel: true,
          },
          axisLabel: {
            rotate: -30 // 旋转角度，单位为度
          },
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            type: "bar",
            label: { show: true },
            barWidth: "25%",
            data: [
              {
                value: this.cards[0].data,
                itemStyle: { color: "#5470c6" },
              },
              {
                value: this.cards[1].data,
                itemStyle: { color: "#91cc75" },
              },
              {
                value: this.cards[2].data,
                itemStyle: { color: "#fac858" },
              },
              {
                value: this.cards[3].data,
                itemStyle: { color: "#ee6666" },
              },
              {
                value: this.cards[4].data,
                itemStyle: { color: "#5470c7" },
              },
              {
                value: this.cards[5].data,
                itemStyle: { color: "#91cc78" },
              },
              {
                value: this.cards[6].data,
                itemStyle: { color: "#fac859" },
              },
              {
                value: this.cards[7].data,
                itemStyle: { color: "#ee6667" },
              },
            ],
          },
        ],
      });
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },
    circleTimer() {
      this.getTimer();
      setInterval(() => {
        this.getTimer();
      }, 1000);
    },
    getTimer() {
      if (document.getElementById("myTimer")) {
        var d = new Date();
        var t = d.toLocaleString();
        document.getElementById("myTimer").innerHTML = t;
      }
    },
  },
};
</script>

<style scoped>
.box-card {
  width: 100%;
  margin-bottom: 15px;
  padding: 0;
}

.clearfix {
  text-align: center;
  font-size: 16px;
}

.text {
  text-align: center;
  font-size: 24px;
  font-weight: 700;
}

#main {
  width: 100%;
  margin-top: 20px;
  height: 360px;
}

.icon {
  width: 40px;
  height: 40px;
  padding-top: 10px;
  padding-right: 10px;
}
</style>
