import { View, Text, Image, Swiper, SwiperItem, Input, Picker } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.less'

export default function MyPage () {

  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View className='root'>

      <Image
        className='bg-image'
        src='http://pic.buzhizhe.cn/o_1h8uemvj21dbj181jerr1tthg3oa.png'
        scaleToFill='aspectFit'
      />
    </View>
  )
}
