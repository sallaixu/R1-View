<template>
  <div class="dashboard-container">
    <div class="dashboard-text">R1 监控台</div>
    <el-divider content-position="center">为了无法计算的价值</el-divider>
    <el-row>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                  <el-row class="charts" >
              <el-col>
                <div id="memeryChartId" :class="className" style="height: 300px;width: 100%" />
              </el-col>
              <el-col>
                <div id="diskChartId" :class="className" style="height: 300px;width: 100%" />
              </el-col>
            </el-row>
                </el-col>
<!-- 系统信息 -->
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="flex-center">
      <el-card>
        <div slot="header" class="info-header">
          系统信息
        </div>
        <el-descriptions :column="1">
          <el-descriptions-item label="运行负载">{{ sysInfo.loadAvg || '' }}</el-descriptions-item>
        <el-descriptions-item label="ip地址">{{ sysInfo.wifi.ipAddr || '' }}</el-descriptions-item>
          <el-descriptions-item label="wifi名称">{{ sysInfo.wifi.ssid || '' }}</el-descriptions-item>
          <el-descriptions-item label="MAC地址">{{ sysInfo.wifi.macAddr || '' }}</el-descriptions-item>
          <el-descriptions-item label="蓝牙名称">{{ sysInfo.blueTooth.name || '' }}</el-descriptions-item>
          <el-descriptions-item label="蓝牙状态">{{ sysInfo.blueTooth.state || '' }}</el-descriptions-item>
          <el-descriptions-item label="当前音量">{{ sysInfo.volume.mediaVol || '' }}</el-descriptions-item>
          <el-descriptions-item label="最小">{{ sysInfo.volume.meidaMin }}</el-descriptions-item>
          <el-descriptions-item label="最大">{{ sysInfo.volume.mediaMax || '' }}</el-descriptions-item>
        </el-descriptions>
      </el-card>
    </el-col>
    </el-row>

  

    <!-- <el-row style="display: flex;justify-content: center;">
      <el-col :xs="24" :sm="20" :md="12" :lg="14" :xl="16" style="display: flex;justify-content: center;">
        <el-table :data="songList" style="width: 100%;">
          <el-table-column type="index" label="序号" min-width="20%"></el-table-column>
          <el-table-column prop="artist" label="歌手" min-width="25%"></el-table-column>
          <el-table-column prop="title" label="歌曲名称" min-width="35%"></el-table-column>
          <el-table-column prop="duration" label="时长" min-width="20%"></el-table-column>
        </el-table>
        <el-empty description="描述文字"></el-empty>
      </el-col>
    </el-row>
    <el-row style="display: flex;justify-content: center;">
      <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="8" style="display: flex;justify-content: center;">
        <el-button @click="musicController('PLAY_PRE')" icon="el-icon-caret-left" name="pre" circle
          size="medium"></el-button>
        <el-button @click="musicController('PAUSE')" icon="el-icon-video-pause" name="pause" circle
          size="medium"></el-button>
        <el-button @click="musicController('RESUME')" icon="el-icon-video-play" name="play" circle
          size="medium"></el-button>
        <el-button @click="musicController('PLAY_NEXT')" icon="el-icon-caret-right" name="next" circle
          size="medium"></el-button>
      </el-col>
    </el-row>

    <el-row>
      <el-col :xs="24" :sm="8" :md="4" :lg="4" :xl="4">
        <label>音乐源</label>
        <el-select @change="musicSourceChange(musicSourceType)" v-model="musicSourceType" placeholder="请选择">
          <el-option v-for="item in musicSourceOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :xs="24" :sm="8" :md="4" :lg="4" :xl="4">
        <label>发音人</label>
        <el-select @change="ttsChange(tts)" v-model="tts" placeholder="请选择">
          <el-option v-for="item in ttsOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-col>
    </el-row> -->
  </div>
</template>

<script>
import {
  getSystemInfo, getMusicItems, musicController as musicRequest,
  musicSourceRequest, ttsChangeReqeust
} from '@/api/sysInfo'
var echarts = require('echarts')
// import resize from './mixins/resize'
var timer = null;
export default {
  name: 'Dashboard',
  // mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    disk: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '500px'
    },
    height: {
      type: String,
      default: '500px'
    }
  },
  data() {
    return {
      sysInfo: {
        disk: {
          available: 100,
          total: 100
        },
        // loadAvg:"",
        memory: {
          available: 100,
          total: 100
        },
        wifi:{

        },
        volume:{
          
        },
        blueTooth:{

        },
        loadAvg:""
      },
      chart: null,
      diskChart: null,
      listLoading: true,
      songList: [],
      musicSourceOptions: [{
        value: 'NET_EASY',
        label: '网易云音乐'
      }, {
        value: 'BABY_MUSIC',
        label: '下歌宝音乐'
      }, {
        value: 'SLIDER_KZ',
        label: 'SLIDER_KZ'
      }],
      ttsOptions: [{
        value: 'CHILDREN',
        label: '小宝'
      }, {
        value: 'LZL',
        label: '玲玲'
      }, {
        value: 'MALE',
        label: '熊熊'
      }, {
        value: 'SWEET',
        label: '甜甜'
      }, {
        value: 'FEMALE',
        label: '娜娜'
      }],
      tts: '',
      musicSourceType: '',
      userInfo: {}
    }  //返回一个对象
  },
  methods: {
    getSysInfo: function () {
      // views/example/list
      // this.listLoading = true 
      getSystemInfo().then(response => {
        this.sysInfo = response.data
        this.listLoading = false
        console.log(this.sysInfo)
      })
    },
    musicSourceChange(type) {
      musicSourceRequest(type).then(response => {
        log.info(response);
      })
    },
    ttsChange(type) {
      ttsChangeReqeust(type).then(response => {
        log.info(response);
      })
    },
    initChart() {
      this.chart = echarts.init(document.getElementById('memeryChartId'))
      this.chart.setOption(
        {
          title: {
            text: '内存占用',
            subtext: '',
            left: 'center'
          },
          left: "20%",
          top: "20%",
          right: "20%",
          bottom: "30%",
          tooltip: {
            trigger: 'item'
          },
          color: [
            "#f1939c",
            "#2bae85"
          ],
          legend: {
            show: false,
            orient: 'vertical',
            left: 'left'
          },
          series: [
            {
              name: '内存情况',
              type: 'pie',
              radius: '70%',
              center: ['50%', '50%'],
              label: {
                rotate: 0,
                show: true,
                overflow: 'truncate',
                position: 'inside',
                alignTo: 'none',
                edgeDistance: '25%',
                bleedMargin: 10,
                distanceToLabelLine: 5,
                formatter: '{b}: {c}'
              },
              data: [
                { value: (parseFloat(this.sysInfo.memory.total) - parseFloat(this.sysInfo.memory.available)).toFixed(2), name: '已用内存' },
                { value: parseFloat(this.sysInfo.memory.available).toFixed(2), name: '可用内存' },
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            },
          ]
        }
      )
    },
    initDisk() {
      this.diskChart = echarts.init(document.getElementById('diskChartId'))
      this.diskChart.setOption(
        {
          title: {
            text: '存储情况',
            subtext: '',
            left: 'center'
          },
          tooltip: {
            trigger: 'item'
          },
          color: [
            "#f1939c",
            "#2bae85"
          ],
          legend: {
            show: false,
            orient: 'vertical',
            left: 'left'
          },
          series: [
            {
              name: '存储情况',
              type: 'pie',
              radius: '70%',
              label: {
                rotate: 0,
                show: true,
                overflow: 'truncate',
                position: 'inside',
                alignTo: 'none',
                edgeDistance: '25%',
                bleedMargin: 10,
                distanceToLabelLine: 5,
                formatter: '{b}: {c}'
              },
              data: [
                { value: (parseFloat(this.sysInfo.disk.total) - parseFloat(this.sysInfo.disk.available)).toFixed(2), name: '已用存储' },
                { value: parseFloat(this.sysInfo.disk.available).toFixed(2), name: '可用存储' },
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            },
          ]
        }
      )
    },
    musicController(type) {
      musicRequest(type).then(response => {
        log.info(response);
      })
    },
     sendRequest() {
       this.getSysInfo();
      setTimeout(this.sendRequest,5000);
    }
  },
  mounted() {
    //获取数据
    this.initChart();
    this.initDisk();
    this.getSysInfo();
    this.sendRequest();
  },

  beforeDestroy(){
    if(timer) {
      timer.stopTimer();
      log.info("销毁定时器");
    }
  },
  watch: {
    sysInfo(newValue, oldValue) {
      console.log(newValue, oldValue)
      this.initChart();
      this.initDisk();
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }

  &-text {
    font-size: 30px;
    line-height: 46px;
  }

}

.charts {
  // border: 2px solid rgb(113, 180, 238);
  // border-radius: 10px;
}

.info-header {
  background-color: #409eff;
  color: #fff;
  padding: 10px;
  font-size: 18px;
  border-bottom: 1px solid #ebeef5;
}

.flex-center{
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>
