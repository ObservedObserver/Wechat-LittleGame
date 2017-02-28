//index.js
//获取应用实例
var app = getApp()
var util = require('../../utils/util.js');
var Pi=Page({
  data: {
    logs: [],
    vak:new Array(225),
    he:0,
    result:"",
  },
  count: 0,
  vec: [[1,0],[0,1],[1,1],[-1,1]],
  step: function(event)
  {
    var pos=event.currentTarget.dataset.pos;
    if(this.data.vak[pos]=="white"||this.data.vak[pos]=="black")return;
    this.count++;
    if(this.count%2)
    {
      this.data.vak[pos]="black";
    }
    else
    {
      this.data.vak[pos]="white";
    }
    this.setData({
      vak : this.data.vak
    })
    this.judge(pos);
  }
  ,
  judge: function(pos)
  {
    var color=this.data.vak[pos];
    var x0=parseInt(pos/15),y0=pos%15,x,y,round;
    for(var i=0;i<4;i++)
    {
      var five=0;
      round=0;
      for(x=x0,y=y0;round<5;x+=this.vec[i][0],y+=this.vec[i][1],round++)
      {
        if(this.data.vak[15*x+y]==color)
        {
          five++;
        }
        else
        {
          break;
        }
      }
      round=0;
      for(x=x0,y=y0;round<5;x-=this.vec[i][0],y-=this.vec[i][1],round++)
      {
        if(this.data.vak[15*x+y]==color)
        {
          five++;
        }
        else
        {
          break;
        }
      }
      var rstr=color+"win";
      if(five>=6)
      {
        this.setData({
          result : rstr
        });
        wx.showModal({
        title: color+'获胜',
        content: '再来一局',
        success: function(res) {
          if (res.confirm) {
         wx.navigateTo({
           url:"./index"
         });
          }
        }
        })
      }
    }
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(function (log) {
        return util.formatTime(new Date(log))
      })
    })
  }
})
