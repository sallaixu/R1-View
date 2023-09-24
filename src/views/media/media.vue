<template>
    <div class="dashboard-container">
        <el-row class="flex-center margin-top-20px">
            <el-col :xs="10" :sm="8" :md="6" :lg="4" :xl="4" class="flex-center">
                <img class="img-header"
                    src="https://p2.music.126.net/6TNYBV2rezZLiwsGYBgmPw==/123145302311773.jpg?param=130y130" />
            </el-col>
        </el-row>
        <el-row class="flex-center margin-top-20px">
            <el-col :xs="10" :sm="8" :md="6" :lg="4" :xl="4" class="flex-center">
                <div class="musicInfo">
                    <label>歌手:周杰伦</label>
                    <br />
                    <label>歌曲:青花瓷</label>
                </div>
            </el-col>
        </el-row>
        <!-- 播放进度 -->
        <el-row class="flex-center">
            <el-col :xs="20" :sm="18" :md="12" :lg="12" :xl="12">
                <span class="demonstration">播放进度</span>
                <span style="display: inline;">{{ music_process }}</span>
                <el-slider v-model="music_process"></el-slider>
            </el-col>
        </el-row>
        <!-- 播放控制 -->
        <el-row class="flex-center">
            <el-col :xs="20" :sm="18" :md="12" :lg="12" :xl="12" class="flex-center">
                <el-button class="music_operator" type="primary" icon="el-icon-arrow-left" circle></el-button>
                <el-button class="music_operator" style="height: 70px;width: 70px;font-size: 40px;" type="primary"
                    size="medium" icon="el-icon-video-play
" circle></el-button>
                <el-button class="music_operator" type="primary" icon="el-icon-arrow-right" circle></el-button>
            </el-col>
            <el-col style="width: 30px;">
                <el-button @click="showDialog" style="margin-left: -20px;" type="warning" icon="el-icon-s-unfold"
                    circle></el-button>
            </el-col>
        </el-row>
        <el-dialog :visible="dialogVisible" :center="true" :modal="false" :close-on-click-modal="false"
        width="90%" modal="true" title="播放列表" center="true"
            @close="closeDialog">
            <el-row style="display: flex;justify-content: center; height: 350px;">
                <el-col 
                    style="display: flex;justify-content: center;flex-direction: column; ">
                    <el-table :data="songList" style="width: 100%; overflow: auto;"  empty-text=" " stripe=true>
                        <el-table-column type="index" label="序号" min-width="20%"></el-table-column>
                        <el-table-column prop="artist" label="歌手" min-width="25%"></el-table-column>
                        <el-table-column prop="title" label="歌曲名称" min-width="35%"></el-table-column>
                        <el-table-column prop="duration" label="时长" min-width="20%"></el-table-column>
                    </el-table>
                    <el-empty v-if="songList.length === 0" description="快去点歌吧~"></el-empty>
                </el-col>
            </el-row>
        </el-dialog>
        <global-loading ref="myloading"></global-loading>
    </div>
</template>
  
<script>
import {getMusicItems, musicController as musicRequest,
  musicSourceRequest
} from '@/api/sysInfo'
// import GlobalLoading from '../../components/loading/loading-1.vue'
export default {
    // components:[
    // GlobalLoading
    // ],
    data() {
        return {
            currentSong: {
                title: 'Title',
                artist: 'Artist',
                cover: 'Cover.jpg',
            },
            playlist: [
                { title: 'Song 1', artist: 'Artist 1', cover: 'Cover 1.jpg' },
                { title: 'Song 2', artist: 'Artist 2', cover: 'Cover 2.jpg' },
                // Add more songs...
            ],
            progress: 0,
            showPlaylist: false,
            music_process: 45,
            dialogVisible: false,
            songList: [],
        };
    },
    methods: {
        showDialog() {
            console.log(this.$refs);
            this.$refs.myloading.show("1234e");
            this.getMusicList(()=>{
                this.$refs.myloading.hide();
                this.dialogVisible = true;
            });
        },
        closeDialog() {
            this.dialogVisible = false;
        },
        playPause() {
            if (this.currentSong) {
                if (this.currentSong.isPlaying) {
                    this.currentSong.pause();
                } else {
                    this.currentSong.play();
                }
            }
        },
        prevSong() {
            if (this.currentSong && this.playlist.length > 0) {
                this.currentSong = this.playlist[0]; // Set the current song as the first song in the playlist
                this.currentSong.play(); // Play the current song
            }
        },
        nextSong() {
            if (this.currentSong && this.playlist.length > 0) {
                let index = this.playlist.indexOf(this.currentSong); // Get the current song's index in the playlist
                if (index < this.playlist.length - 1) { // If there's a next song in the playlist...
                    this.currentSong = this.playlist[index + 1]; // Set the current song as the next song in the playlist
                    this.currentSong.play(); // Play the current song
                } else { // If there's no next song in the playlist...
                    this.$message({ message: 'No next song in the playlist.', type: 'info' }); // Display a message informing there's no next song in the playlist
                }
            } else { // If there's no current song...
                this.$message({ message: 'No current song.', type: 'info' }); // Display a message informing there's no current song
            }
        },
        getMusicList(call) {
            getMusicItems().then(response => {
            // this.sysInfo = response.data
            this.songList = response.data
            call();
            })
        }
    },
    mounted() {
        getMusicItems().then(response => {
        // this.sysInfo = response.data
        this.songList = response.data
      })
    }
};
</script>
  
<style scoped lang="scss">
.music-player-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f5f5f5;
    padding: 20px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    overflow: hidden;
    position: relative;
    background-color: #fff;
    transition: background-color 0.3s ease;
}

.player-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.song-info {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.song-info img {
    max-width: 100px;
    max-height: 100px;
    object-fit: contain;
}

.playlist {
    display: flex;
    flex-direction: column;
    max-height: 300px;
    overflow-y: auto;
    background-color: #fff;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.playlist .el-card {
    margin-bottom: 10px;
}

.img-header {
    border-radius: 50%;
    width: 100%;
    box-shadow: 5px 8px 20px #504f4f;
    animation: rotate 5s linear infinite;
    /* 旋转时间、速度和无限循环 */
}

/* 定义一个旋转动画 */
@keyframes rotate {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

.musicInfo {
    label {
        display: inline-block;
        padding: 5px;
        letter-spacing: 4px;
    }
}

.music_operator {
    height: 50px;
    width: 50px;
    display: inline-block;
    margin: 20px;
}</style>