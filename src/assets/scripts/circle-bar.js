/**
 * 环形进度条
 *
 * @author luoyc
 * @date 2017/8/31
 */
export default {
  draw(id,percent,sR) {
    if (percent < 0 || percent > 100) {
      return
    }
    if (sR < Math.PI/2 || sR >= 3/2 * Math.PI) {
      return
    }

    let canvas = document.querySelector(id);
    // 避免内存泄漏
    if(!canvas) {
      return false;
    }
    let cxt = canvas.getContext('2d');
    let _multiple = 2;
    let cWidth = canvas.width;
    let cHeight = canvas.height;
    let arcXPos = cWidth/_multiple;
    let arcYPos = cHeight/_multiple;
    let arcLineW = 15*_multiple;
    let baseColor = '#d3d3d3';
    let coverColor = '#ffffff';
    let pointColor = '#ffc600';
    let PI = Math.PI
    sR = sR || 2/3 * PI // 默认圆弧的起始点弧度为π的2/3

    let finalRadian = sR + ((PI + (PI - sR) * 2) * percent / 100) // 白圈的终点弧度
    let step = (PI + (PI - sR) * 2)/100 // 一个1%对应的弧度大小
    let text = 0 // 显示的数字
    let timer = setInterval(() => {
      cxt.clearRect(0, 0, cWidth, cHeight);
      let endRadian =  sR + text * step;
      let _endRadian = sR + (PI + (PI - sR) * 2);
      // 画灰色圆弧
      this.drawCanvas(id, arcXPos, arcYPos, 60*_multiple, sR, _endRadian, baseColor, arcLineW,1.6,3.6,'butt')
      // 画白色圆弧
      this.drawCanvas(id, arcXPos, arcYPos, 60*_multiple, sR, endRadian, coverColor, arcLineW,1.6,3.6,'butt')

      // 刻度图标
      let angle = 2*Math.PI - endRadian // 转换成逆时针方向的弧度（三角函数中的）
      let xPos = Math.cos(angle) * 45 + cWidth/1.8 // 圆心的x坐标
      let yPos = -Math.sin(angle) * 40 + cHeight/1.55 // 圆心的y坐标
      this.drawCanvas(id,xPos, yPos, 8, 0, 2*PI, pointColor, 0.4,1.5,1.5,'butt',pointColor)
      // let img = new Image()
      // img.src = '/static/images/devices/point.png'
      // cxt.drawImage(img,xPos,yPos,16,16)

      // 文字
      cxt.fillStyle = coverColor
      cxt.font = `${36*_multiple}px PT Sans`;
      let textWidth = cxt.measureText(text).width
      cxt.fillText(text, arcXPos - textWidth/2 - 5*_multiple, arcYPos + 5*_multiple)
      cxt.font = `${11*_multiple}px PT Sans`
      cxt.fontWeight = 'lighter'
      cxt.fillText('%',arcXPos - textWidth/2 + 60*_multiple, arcYPos + 5*_multiple)
      cxt.font = `${11*_multiple}px PT Sans`
      cxt.fontWeight = 'lighter'
      if(percent === 0) {
        cxt.fillText('净化率',arcXPos - textWidth/2, arcYPos + 25*_multiple)
      } else if(percent < 100 && percent > 9) {
        cxt.fillText('净化率',arcXPos - textWidth/2 + 16, arcYPos + 25*_multiple)
      } else {
        cxt.fillText('净化率',arcXPos - textWidth/2 + 26, arcYPos + 25*_multiple)
      }


      text++
      cxt.fillText('0',arcXPos/2,cHeight)
      cxt.fillText('100',cWidth/1.5,cHeight)

      if (endRadian.toFixed(2) >= finalRadian.toFixed(2)) {
        clearInterval(timer);
      }
    }, 5)

  },
  drawCanvas(id,x,y,r,sRadian,eRadian,color,lineWidth,lineStart,lineEnd,lineCap,pointColor = 'transparent') {
    let canvas = document.querySelector(id);
    if(!canvas) {
      return false;
    }
    let cxt = canvas.getContext('2d');
    cxt.beginPath()
    cxt.setLineDash([lineStart,lineEnd])
    cxt.lineCap = lineCap
    cxt.strokeStyle = color
    cxt.fillStyle = pointColor
    cxt.lineWidth = lineWidth
    cxt.arc(x, y, r, sRadian, eRadian, false)
    cxt.fill()
    cxt.stroke()
  }
}
