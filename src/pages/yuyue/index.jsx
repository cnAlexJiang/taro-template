import { View, Text, Image, Swiper, SwiperItem, Input, Picker } from '@tarojs/components'
import Taro, { useLoad, request } from '@tarojs/taro'
import './index.less'
import { useState, useEffect } from 'react'
import { dateList, timeList } from './data'
const projectList = ['金基璟樾府', '新睿樾府', '雅玥']

export default function MyPage () {
  useLoad(() => {
    const openid =  Taro.getStorageSync('openid')
    console.log('Page loaded.', openid)
    if(openid){
      return
    }
    wx.login({
      success: async function (res) {
        var code = res.code;
        if (code) {
          console.log('获取用户登录凭证：' + code);
          try {
            // --------- 发送凭证 ------------------
            const res = await request({
              url: 'https://wechat.buzhizhe.cn/kingjee2/api/getOpenid',
              method: 'POST',
              data: {
                code
              }
            })
            console.log(res.data.data)
            Taro.setStorageSync('openid', res.data.data)
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
  const [project, setProject] = useState('')
  const [date, setDate] = useState('')
  const [name, setName] = useState('')
  const [fanghao, setFanghao] = useState('')
  const [phone, setPhone] = useState('')
  const [renshu, setRenshu] = useState('')

  const onProjectChange = (e) => {
    setProject(projectList[e.detail.value])
  }

  const onDateChange = e => {
    const value = e.target.value
    setDate(`${dateList[value[0]]} ${timeList[value[1]]}`)
  }

  const submitForm = async () => {

    const openid =  Taro.getStorageSync('openid')

    const form = {
      openid,
      name,
      phone: phone + '',
      estate_project: project,
      room_number: fanghao,
      appoint_date: date,
      appoint_number: renshu
    }
    const map = {
      name: '姓名不能为空',
      phone: '手机号不能为空',
      estate_project: '项目业主不能为空',
      room_number: '房号不能为空',
      appoint_date: '预约时间不能为空',
      appoint_number: '预约人数不能为空'
    }
    // const temp = {
    //   "appoint_date": "09-01 上午",
    //   "appoint_number": 12,
    //   "estate_project": "金基璟樾府",
    //   "name": "aa",
    //   "openid": "oyvOJ69iMVuOf6nYxQQISfOL3dGk",
    //   "phone": '12',
    //   "room_number": "12"
    // }
    console.log(222 ,form)
    // 校验form 不能为空
    for (const key in form) {
      if (!form[key]) {
        Taro.showToast({
          title: map[key],
          icon: 'none',
          duration: 2000
        })
        return
      }
    }


    try {
      const res = await request({
        url: 'https://wechat.buzhizhe.cn/kingjee2/api/addActRecord',
        method: 'POST',
        data:form
      })
      console.log(222, res)
      Taro.redirectTo({
        url: `/pages/success/index?project=${project}&date=${date}`
      })
    } catch (error) {
      console.error(error)
      Taro.showToast({
        title: '预约失败',
        icon: 'none',
        duration: 2000
      })
    }


  }
  return (
    <View className='root'>
      <View className=' form-page'>
        <Image
          className='background'
          scaleToFill='aspectFit'
          src='http://pic.buzhizhe.cn/o_1h8u5s5uoai51m411bmp97g1r8sa.png'
        />
        <Image
          className='top-img'
          scaleToFill='aspectFit'
          src='http://pic.buzhizhe.cn/o_1h8u1sui593q186jd9j1ekr1pd4a.png'
        />

        <Image
          className='bottom-img'
          scaleToFill='aspectFit'
          src='http://pic.buzhizhe.cn/o_1h8u1mcd57n821o1g3a1ofl8ria.png'
        />

        <View className='form-content'>
          <Image
            className='form-img'
            scaleToFill='aspectFit'
            src='http://pic.buzhizhe.cn/o_1h8u3ee734c41mr4fpjbqh1rp9a.png'
          />

          <Input type='text' className='form-name' focus value={name} onInput={(e) => {
            setName(e.target.value)
          }} />
          <Input type='number' className='form-phone' focus maxlength="11" value={phone} onInput={(e) => {
            console.log(11, e.target.value)
            setPhone(+e.target.value)
          }} />

          <View className='form-yezhu'>
            <Picker mode='selector' range={projectList} onChange={onProjectChange}>
              <View className='picker'>
                {project ? project : ''}
              </View>
            </Picker>
          </View>

          <Input type='text' className='form-donghao' value={fanghao} focus onInput={(e) => {
            setFanghao(e.target.value)
          }} />

          <View className='form-date'>
            <Picker mode="multiSelector" value={date} range={[dateList, timeList]} onChange={onDateChange}>
              <View class="picker">
                {date ? date : ''}
              </View>
            </Picker>
          </View>
          <Input type='number' className='form-renshu' focus value={renshu} onInput={(e) => {
            setRenshu(+e.target.value)
          }} />
        </View>


        <Image
          className='yuyue-button'
          scaleToFill='aspectFit'
          onClick={submitForm}
          src='http://pic.buzhizhe.cn/o_1h8u485migrq1e75k4a1sr916aea.png'
        />
        <Image
          className='contact-me'
          scaleToFill='aspectFit'
          src='http://pic.buzhizhe.cn/o_1h8u8h0hn1oeq11oj10qj1ii8199ua.png'
        />
      </View>
    </View>
  )
}
