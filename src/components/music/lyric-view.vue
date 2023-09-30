<!-- <template>
  <div class="lyrics-container">
    <div class="lyric-line" v-for="(line, index) in lyricLines" :key="index" :class="{ active: index === currentLine }">
      {{ line.txt }}
    </div>
  </div>
</template>

<script>
import Lyric from "lyric-parser";
export default {
  name: "lyricView",
  data() {
    return {
      lyric: null,
      lyricLines: [],
      currentLine: 0,
    };
  },
  methods: {
    setLyric(lyric) {
      this.lyric = new Lyric(lyric, this.handleLyric);
    },
    handleLyric({ lineNum }) {
      this.currentLine = lineNum;
      this.lyricLines = this.lyric.lines.slice(Math.max(lineNum - 5, 0), lineNum + 6);
    },
    handleMusicTimeUpdate(currentTime) {
      // 更新当前播放时间
      this.currentTime = currentTime;
      // 歌词解析器根据当前播放时间进行滚动显示
      this.lyric.seek(currentTime * 1000);
    },
  },
};
</script>

<style lang="scss">

.lyrics-container {
  height: 200px; /* 歌词容器的高度 */
  overflow: hidden;
  position: relative;
  line-height: 24px; /* 歌词行高度 */
}

.lyric-line {
  text-align: center;
  transition: 1.0s scale; /* 添加过渡效果 */
}

.lyric-line.active {
  font-weight: bold; /* 激活状态的歌词加粗显示 */
  color: rgb(4, 4, 130);
}
</style>
</style> -->

<template>
  <div class="lyrics-container">
    <div v-for="(line, index) in lyric.lines" :key="index" :class="{ active: index === currentLine }" class="lyric-line">
      {{ line.txt }}
    </div>
  </div>
</template>

<script>
import Lyric from 'lyric-parser'
export default {
  name: 'LyricView',
  data() {
    return {
      lyric: null,
      lyricLines: [],
      currentLine: 0
    }
  },
  methods: {
    setLyric(lyric) {
      this.lyric = new Lyric(lyric, this.handleLyric)
    },
    handleLyric({ lineNum }) {
      this.currentLine = lineNum
      this.lyricLines = this.lyric.lines.slice(Math.max(lineNum - 5, 0), lineNum + 6)
    },
    handleMusicTimeUpdate(currentTime) {
      // 更新当前播放时间
      this.currentTime = currentTime
      // 歌词解析器根据当前播放时间进行滚动显示
      this.lyric.seek(currentTime * 1000)
    }
  }
}
</script>

<style lang="scss">

.lyrics-container {
  height: 200px; /* 歌词容器的高度 */
  overflow: auto;
  position: relative;
  line-height: 24px; /* 歌词行高度 */
}

.lyric-line {
  text-align: center;
  transition: 1.0s scale; /* 添加过渡效果 */
}

.lyric-line.active {
  font-weight: bold; /* 激活状态的歌词加粗显示 */
  color: rgb(4, 4, 130);
}
</style>

