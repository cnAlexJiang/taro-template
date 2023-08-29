import { View, Text, Image, Swiper, SwiperItem, Input, Picker } from '@tarojs/components'
import { useLoad, getCurrentInstance } from '@tarojs/taro'
import { useState, useEffect } from 'react'
import './index.less'

export default function MyPage () {
  const [project, setProject] = useState('')
  const [date, setDate] = useState('')

  useLoad(() => {
    console.log('Page loaded.',)
    const { router } = getCurrentInstance();
    setProject(router.params.project)
    setDate(router.params.date)

  })

  if(project === '金基璟樾府'){
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
          className='middle-image'
          src='http://pic.buzhizhe.cn/o_1h8uglj3e1h3q7n1sdodfolfla.png'
          scaleToFill='aspectFit'
        />
        <Image
          className='gonxi-image'
          src='http://pic.buzhizhe.cn/o_1h8ugsuca1dkq1i8kd4a13hu1jtua.png'
          scaleToFill='aspectFit'
        />
        <Text className='yuyue-text'>预约时间: {date}</Text>
        <Image
          className='jyf-image'
          src='http://pic.buzhizhe.cn/o_1h8uijpkt1ai3f2u1lja1qvo1ajma.png'
          scaleToFill='aspectFit'
        />
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


  if(project === '雅玥'){
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
          className='middle-image'
          src='http://pic.buzhizhe.cn/o_1h8uglj3e1h3q7n1sdodfolfla.png'
          scaleToFill='aspectFit'
        />
        <Image
          className='gonxi-image'
          src='http://pic.buzhizhe.cn/o_1h8ugsuca1dkq1i8kd4a13hu1jtua.png'
          scaleToFill='aspectFit'
        />
        <Text className='yuyue-text'>预约时间: {date}</Text>
        <Image
          className='yy-image'
          src='http://pic.buzhizhe.cn/o_1h8uiggs0dpdhda1fkbqje1t3da.png'
          scaleToFill='aspectFit'
        />
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

  if(project === '新睿樾府'){
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
          className='middle-image'
          src='http://pic.buzhizhe.cn/o_1h8uglj3e1h3q7n1sdodfolfla.png'
          scaleToFill='aspectFit'
        />
        <Image
          className='gonxi-image'
          src='http://pic.buzhizhe.cn/o_1h8ugsuca1dkq1i8kd4a13hu1jtua.png'
          scaleToFill='aspectFit'
        />
        <Text className='yuyue-text'>预约时间: {date}</Text>
        <Image
          className='xryf-image'
          src='http://pic.buzhizhe.cn/o_1h8uh4125jsl1k8kchb1qcl644a.png'
          scaleToFill='aspectFit'
        />
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

  return (
    <View className='root'>
      <Text className='yuyue-text'>楼盘不在活动范围内</Text>
    </View>
  )

}
