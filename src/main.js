import Vue from 'vue'
import VueI18n from 'vue-i18n'
import router from './router'

import App from './App.vue'

import zh_CN from './locales/zh-CN'
import ja_JP from './locales/ja-JP'
import en_US from './locales/en-US'

import $ from 'jquery'
global.jQuery = global.$ = $;

import 'bootstrap'
import GlobalConst from './globalconst'

import VoiceList from './voices.json'


//提取标签到语言文件
let addZh_CN = { voice: {}, voicecategory: {} };
let addja_JP = { voice: {}, voicecategory: {} };
let adden_US = { voice: {}, voicecategory: {} };

for (let voiceCategoryList of VoiceList.voices){
  if(voiceCategoryList.categoryDescription !== undefined){
    if(voiceCategoryList.categoryDescription['zh-CN'] !== undefined){
      addZh_CN.voicecategory[voiceCategoryList.categoryName] = voiceCategoryList.categoryDescription['zh-CN'];
    }
    if(voiceCategoryList.categoryDescription['ja-JP'] !== undefined){
      addja_JP.voicecategory[voiceCategoryList.categoryName] = voiceCategoryList.categoryDescription['ja-JP'];
    }
    if(voiceCategoryList.categoryDescription['en-US'] !== undefined){
      adden_US.voicecategory[voiceCategoryList.categoryName] = voiceCategoryList.categoryDescription['en-US'];
    }
  }
  for (let voiceItem of voiceCategoryList.voiceList){
    if(voiceItem.description !== undefined){
      if(voiceItem.description['zh-CN'] !== undefined){
        addZh_CN.voice[voiceItem.name] = voiceItem.description['zh-CN'];
      }
      if(voiceItem.description['ja-JP'] !== undefined){
        addja_JP.voice[voiceItem.name] = voiceItem.description['ja-JP'];
      }
      if(voiceItem.description['en-US'] !== undefined){
        adden_US.voice[voiceItem.name] = voiceItem.description['en-US'];
      }
    }
  }
}

let emzh_CN = Object.assign(zh_CN, addZh_CN);
let emja_JP = Object.assign(ja_JP, addja_JP);
let emen_US = Object.assign(en_US, adden_US);

Vue.config.productionTip = false

Vue.use(VueI18n)
Vue.use(GlobalConst);

const messages = {
  'zh-CN': emzh_CN,
  'ja-JP': emja_JP,
  'en-US': emen_US
}

let locale = 'zh-CN';
if(/ja/i.test(navigator.language)){
  locale = 'ja-JP';
}else if(/en/i.test(navigator.language)){
  locale = 'en-US'
}

const i18n = new VueI18n({
  locale,
  messages
})


new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')