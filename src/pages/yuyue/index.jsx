import { View, Text, Image, Swiper, SwiperItem, Input, Picker } from '@tarojs/components'
import Taro, { useLoad, request, getCurrentInstance } from '@tarojs/taro'
import './index.less'
import { useState, useEffect, version } from 'react'
import { dateList, timeList } from './data'
const projectList = ['望樾府', '璞悦和园', '嘉玥', '朗樾府', '涵樾府', '皓樾']
const renshuList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
let nextWorkLock = false

export default function MyPage () {
  const [address, setAddress] = useState('')
  useLoad(() => {
    const { router } = getCurrentInstance();
    setAddress(router.params.address)
    const openid = Taro.getStorageSync('openid')
    console.log('Page loaded.', openid, address)
    if (openid) {
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

  const svalidatePhoneNumber = (phoneNumber) => {
    // 定义支持的号段正则表达式
    let mobileRegex =
      /^(13[4-9]|14[7]|15[0-2,7-9]|17[2,8]|18[2-4,7-8]|19[8-9])\d{8}$/;
    let telecomRegex = /^(133|149|153|17[3,7]|18[0-1,9]|19[9])\d{8}$/;
    let unicomRegex = /^(13[0-2]|145|15[5-6]|166|17[5-6]|18[5-6]|196)\d{8}$/;

    // 使用正则表达式进行校验
    if (mobileRegex.test(phoneNumber)) {
      return true;
    } else if (telecomRegex.test(phoneNumber)) {
      return true;
    } else if (unicomRegex.test(phoneNumber)) {
      return true;
    } else {
      return false;
    }
  }

  const submitForm = async () => {
    const openid = Taro.getStorageSync('openid')
    const form = {
      openid,
      name,
      phone: phone + '',
      estate_project: project,
      address,
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
      appoint_number: '预约人数不能为空',
      address: '预约项目地址异常'
    }

    // console.log(222, form)
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
    if (!svalidatePhoneNumber(phone)) {
      Taro.showToast({
        title: '手机号格式不正确',
        icon: 'none',
        duration: 2000
      })
      return
    }

    if (nextWorkLock) {
      return
    }

    try {
      nextWorkLock = true
      const res = await request({
        url: 'https://wechat.buzhizhe.cn/kingjee2/api/addActRecord',
        method: 'POST',
        data: form
      })
      Taro.redirectTo({
        url: `/pages/success/index?project=${address}&date=${date}`
      })
    } catch (error) {
      console.error(error)
      Taro.showToast({
        title: '预约失败',
        icon: 'none',
        duration: 2000
      })
    } finally {
      nextWorkLock = false
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

          <Input type='text' className='form-name' value={name} onInput={(e) => {
            setName(e.target.value)
          }} />
          <Input type='number' className='form-phone' maxlength="11" value={phone} onInput={(e) => {
            setPhone(+e.target.value)
          }} />

          <View className='form-yezhu'>
            <Picker mode='selector' range={projectList} onChange={onProjectChange}>
              <View className='picker'>
                {project ? project : ''}
              </View>
            </Picker>
          </View>

          <Input type='text' className='form-donghao' value={fanghao} onInput={(e) => {
            setFanghao(e.target.value)
          }} />

          <View className='form-date'>
            <Picker mode="multiSelector" value={date} range={[dateList, timeList]} onChange={onDateChange}>
              <View class="picker">
                {date ? date : ''}
              </View>
            </Picker>
          </View>
          <View className='form-renshu'>
            <Picker mode='selector' range={renshuList} onChange={(e) => {
              setRenshu(renshuList[e.detail.value])
            }}>
              <View className='picker'>
                {renshu ? renshu : ''}
              </View>
            </Picker>
          </View>

          {/* <Input type='number' className='form-renshu' maxlength={2} value={renshu} onInput={(e) => {
            const v = +e.target.value
            if(isNaN(v)){
              setRenshu(1)
            } else if (v > 10) {
              setRenshu(10)
            } else {
              setRenshu(v)
            }
          }} /> */}
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
