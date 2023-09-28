<template>
  <div class="app-container">
    <el-row>
      <el-col :span="4" :offset="6"><span>媒体音量</span></el-col>
      <el-col :span="6" :offset="0">
        <el-slider v-model="value1"></el-slider>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="4" :offset="6"><span>闹钟音量</span></el-col>
      <el-col :span="6" :offset="0">
        <el-slider v-model="value1"></el-slider>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="4" :offset="6"><span>报时音量</span></el-col>
      <el-col :span="6" :offset="0">
        <el-slider v-model="value1"></el-slider>
      </el-col>
    </el-row>

  </div>
</template>

<script></script>

<style lang="scss">
.app-container {
  span {
    line-height: 38px;
  }
  > div {
    height: 38px;
  }
}
</style>
