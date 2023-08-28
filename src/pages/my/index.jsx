import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.less'

export default function MyPage() {

  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View className='index'>
      <Text>我的</Text>
    </View>
  )
}