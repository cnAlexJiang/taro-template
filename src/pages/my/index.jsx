import { View, Text, Image, Swiper, SwiperItem, Input, Picker } from '@tarojs/components'
import Taro, { useLoad, useShareAppMessage } from '@tarojs/taro'
import './index.less'
import { useState } from 'react'
export default function MyPage () {

  const [list, setList] = useState([])

  const fetchList = async () => {
    try {
      const openid = Taro.getStorageSync('openid')
      const res = await Taro.request({
        url: 'https://wechat.buzhizhe.cn/kingjee2/api/getRecordByOpenid',
        method: 'POST',
        data: {
          openid
        }
      })
      setList(res.data.data)
    } catch (error) {
      console.error(error)
    }
  }
  useShareAppMessage((res) => {
    console.log('onShareAppMessage', res)
    return {
      title: "金基业主会所体验预约",
      path: "/pages/index/index",
      imageUrl: "http://pic.buzhizhe.cn/o_1h905jpu31kkds2e1ia3150r1bcqa.jpg",
    };
  })
  useLoad(() => {
    const openid = Taro.getStorageSync('openid')
    console.log('Page loaded.', openid)
    if (openid) {
      fetchList()
      return
    }
    wx.login({
      success: async function (res) {
        var code = res.code;
        if (code) {
          // console.log('获取用户登录凭证：' + code);
          try {
            // --------- 发送凭证 ------------------
            const res = await Taro.request({
              url: 'https://wechat.buzhizhe.cn/kingjee2/api/getOpenid',
              method: 'POST',
              data: {
                code
              }
            })
            console.log(res.data.data)
            Taro.setStorageSync('openid', res.data.data)
            await fetchList()
          } catch (error) {
            console.error(error)
          }
          // ------------------------------------
        } else {
          console.log('获取用户登录态失败：' + res.errMsg);
        }
      }
    });

  })

  return (
    <View className='root'>

      <Image
        className='bg-image'
        src='http://pic.buzhizhe.cn/o_1h8uemvj21dbj181jerr1tthg3oa.png'
        scaleToFill='aspectFit'
      />
      <Image
        className='logo-image'
        src='http://pic.buzhizhe.cn/o_1h8ugbi8p13m76ov1o65gcu1k6ha.png'
        scaleToFill='aspectFit'
      />
      <Image
        className='list-image'
        src='http://pic.buzhizhe.cn/o_1h8ul9unt1m3kvq01bmcaloiuha.png'
        scaleToFill='aspectFit'
      />

      <View className='list-content'>
        {list.map(item => (<View className='list-item'>
          <Text className='item-top'>预约项目: {item.address} </Text>
          <Text>预约时间: {item.appoint_date}</Text>
        </View>))}
      </View>
      <Image
        className='contact-image'
        src='http://pic.buzhizhe.cn/o_1h8uhbi9f191q1gpdaut3t59ca.png'
        scaleToFill='aspectFit'
      />
      <Image
        className='bottom-img'
        scaleToFill='aspectFit'
        src='http://pic.buzhizhe.cn/o_1h8u1mcd57n821o1g3a1ofl8ria.png'
      />
    </View>
  )
}
