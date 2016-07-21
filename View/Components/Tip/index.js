import React from 'react'
import {
  Link
} from 'react-router'
require('./index.css')

// var tipOption = {
//     content: '人员分配：可能是由于上传的图片受理不成功，或者是能量的聚集，巴拉巴拉剩下的我就是员分配：可能是由于上传的图片受理不成功，或者是能量的聚集，巴拉巴拉剩下的我就是员分配：可能是由于上传的图片受理不成功，或者是能量的聚集，巴拉巴拉剩下的我就是员分配：可能是由于上传的图片受理不成功，或者是能量的聚集，巴拉巴拉剩下的我就是员分配：可能是由于上传的图片受理不成功，或者是能量的聚集，巴拉巴拉剩下的我就是胡说霸道了。',
//     width: 500,
//     left:20,
// }
// <Tip params={tipOption}/>

class Tip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // params:{
      //      content:'人员分配：可能是由于上传的图片受理不成功，或者是能量的聚集，巴拉巴拉剩下的我就是员分配：可能是由于上传的图片受理不成功，或者是能量的聚集，巴拉巴拉剩下的我就是员分配：可能是由于上传的图片受理不成功，或者是能量的聚集，巴拉巴拉剩下的我就是员分配：可能是由于上传的图片受理不成功，或者是能量的聚集，巴拉巴拉剩下的我就是员分配：可能是由于上传的图片受理不成功，或者是能量的聚集，巴拉巴拉剩下的我就是胡说霸道了。',
      //      width:220,
      //      left:-102
      // }
    }
  }
  render() {
    var params = this.props.params;
    if (!params.left) {
      params.left = 0;
    }
    return (
      <span id="tip">
                <img src="./Images/icon_mark.png" />
                <div className="tips" style={{width:params.width,left:'-'+(params.width/2-8+params.left)+'px'}}>
                    <div style={{paddingTop:'8px'}}>{params.content}</div>
                    <i className="icon" style={{left:(params.width/2-8+params.left)+'px'}}>
                        <img src="./Images/tips_arrow.png" />
                    </i>
                </div>
            </span>
    )
  }
}

module.exports = Tip