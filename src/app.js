
import { useLaunch, useDidShow } from '@tarojs/taro'
import './app.less'



function App({ children }) {
  useDidShow(() => {
    const backgroundAudioManager = wx.getBackgroundAudioManager()
    backgroundAudioManager.title = '梅花'
    backgroundAudioManager.epname = '梅花'
    backgroundAudioManager.singer = '许荣'
    backgroundAudioManager.coverImgUrl = 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000'
    // 设置了 src 之后会自动播放
    backgroundAudioManager.src = 'http://pic.buzhizhe.cn/o_1h90541osk54eap117g1va8rdqa.mp3'
  })
  useLaunch(() => {
    console.log('App launched.')
  })

  // children 是将要会渲染的页面
  return children
}

export default App
