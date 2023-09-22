import { View, Text, Image, Swiper, SwiperItem, Input, Picker } from '@tarojs/components'
import { useLoad, navigateTo, redirectTo, useShareAppMessage } from '@tarojs/taro'
import './index.less'
import { useState, useEffect } from 'react'



export default function Index () {
  const [current, setCurrent] = useState(0)


  useShareAppMessage((res) => {
    console.log('onShareAppMessage', res)
    return {
      title: "金基业主会所体验预约",
      path: "/pages/index/index",
      imageUrl: "http://pic.buzhizhe.cn/o_1h905jpu31kkds2e1ia3150r1bcqa.jpg",
    };
  })

  useLoad(() => {
    console.log('Page loaded.')
  })
  const clickHandler = () => {
    setCurrent(current + 1)
  }


  const jumpYuYue = async (addresss) => {
    redirectTo({
      url: '/pages/yuyue/index' + (addresss ? `?address=${addresss}` : ''),
    })
  }
  const onSwoperChange = (e) => {
    setCurrent(e.target.current)
  }
  const onTransition = (e) => {
    return false
  }
  const touchEndHandler = (e,b,c) => {
    const length = 4
    const show_index = current

    console.log('touchEndHandler', e,b,c)
    // if (endY > locationY) { //下拉，回到前一页
    //   if (index == 0) { //禁止从内容第一页回到首页
    //     _this.setData({
    //       show_index: index
    //     })
    //     return;
    //   }
    //   //下面是下拉事件的相关代码，这里就不添出来了。
    // }
    // else { //上拉，前往下一页
    //   if (index == (length + 1)) {  //禁止从尾页 前往 首页
    //     _this.setData({
    //       show_index: index
    //     })
    //     return;
    //   }
    //   //下面是上拉事件的相关代码，这里就不添出来了。
    // }
  }
  return (
    <View className='root'>
      <View className='container'>
        <Swiper
          onTouchMove={() => { return false }}
          onTouchEnd={touchEndHandler}
          current={current}
          className='swiper-root'
          indicatorColor='#999'
          indicatorActiveColor='#333'
          vertical
          // circular
          disableTouch={true}
          disableTouchmove
          onChange={onSwoperChange}
          indicatorDots={false}
          autoplay={false}>
          <SwiperItem>
            <View className='page-item' id='page1'>
              <Image
                className='show-image'
                src='http://pic.buzhizhe.cn/o_1h8t7lb9oaai1ljg1rqpgfs1duna.jpg'
                scaleToFill='aspectFit'
              />
              <Image
                onClick={clickHandler}
                className='arrow-image animate__flash'
                src='http://img.buzhizhe.cn/kingjee/vbXZRvL4KWQuxo7MQk9kJO4o3gRtSLAwQ58Z3KZM'
                scaleToFill='widthFix'
              />
            </View>
          </SwiperItem>

          <SwiperItem>
            <View className='page-item' id='page2'>
              <Image
                className='show-image'
                scaleToFill='widthFix'
                src='http://pic.buzhizhe.cn/o_1h95j2ioa11djlqf1lm4tg21p2aa.png'
              />
              <Image
                onClick={clickHandler}
                className='arrow-image animate__flash'
                src='http://img.buzhizhe.cn/kingjee/vbXZRvL4KWQuxo7MQk9kJO4o3gRtSLAwQ58Z3KZM'
                scaleToFill='widthFix'
              />
            </View>
          </SwiperItem>

          <SwiperItem>
            <View className='page-item' id='page3'>
              <Image
                className='show-image'
                scaleToFill='widthFix'
                src='http://pic.buzhizhe.cn/o_1h8thvf4v69o8lv1r4ssl81iffa.png'
              />
              <Image
                onClick={clickHandler}
                className='arrow-image animate__flash'
                src='http://img.buzhizhe.cn/kingjee/vbXZRvL4KWQuxo7MQk9kJO4o3gRtSLAwQ58Z3KZM'
                scaleToFill='widthFix'
              />
            </View>
          </SwiperItem>

          <SwiperItem>
            <View className='page-item yuyue' id='page4'>
              <Image
                className='background'
                scaleToFill='aspectFit'
                src='http://pic.buzhizhe.cn/o_1h8tnclkn10fq1h3j18oe52j1m5pa.png'
              />

              <Image
                className='content'
                src=' http://pic.buzhizhe.cn/o_1h8tp2iap4lhcp7qkq18rd14kda.png'
              />
              {/*  ['金基璟樾府', '新睿樾府', '雅玥'] */}

              <Image
                onClick={() => { jumpYuYue('金基璟樾府') }}
                className='top animate__pulse'
                src='http://pic.buzhizhe.cn/o_1h8u0vcphoad5dr1eto8l41gvle.png'
              />
              <Image
                onClick={() => { jumpYuYue('新睿樾府') }}
                className='middle animate__pulse'
                src='http://pic.buzhizhe.cn/o_1h8u135mrnivah4c211qv33ua.png'
              />
              <Image
                onClick={() => { jumpYuYue('雅玥') }}
                className='bottom animate__pulse'
                src='http://pic.buzhizhe.cn/o_1h8u128r314dp1uoppg712fdaasa.png'
              />
              <Image
                className='bottom-img'
                scaleToFill='aspectFit'
                src='http://pic.buzhizhe.cn/o_1h8u1mcd57n821o1g3a1ofl8ria.png'
              />
            </View>
          </SwiperItem>
        </Swiper>
      </View>
    </View>
  )
}
