export default defineAppConfig({
  pages: [
    "pages/index/index",
    "pages/yuyue/index",
    "pages/success/index",
    "pages/my/index",

  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
  tabBar: {
    color: "#a9b7b7",
    selectedColor: "#11cd6e",
    borderStyle: "white",
    list: [
      {
        selectedIconPath: "images/i1s.png",
        iconPath: "images/i1.png",
        pagePath: "pages/index/index",
        text: "首页",
      },
      // {
      //   selectedIconPath: "images/i1s.png",
      //   iconPath: "images/i1.png",
      //   pagePath: "pages/yuyue/index",
      //   text: "预约",
      // },
      {
        selectedIconPath: "images/i2s.png",
        iconPath: "images/i2.png",
        pagePath: "pages/my/index",
        text: "我的",
      },
    ],
  },
});
