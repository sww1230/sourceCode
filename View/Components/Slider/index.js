import React from 'react'
import {
  Link
} from 'react-router'

// import Slider from '../../../Components/Slider'
// <Slider  params :{
//            "height" :"150px",                                                //幻灯片图片高度
//            "width"  :"300px",                                                //幻灯片图片宽度
//            "interval":"2000",                                                //幻灯片切换时间 例2000:2s
//            "images" :[
//               {
//                    title:"pic1",                                               //图片名
//                    active:"y",                                                 //是否选中第一张展示    y:是 , n:否
//                    url  :"./images/banner_01.jpg"                              //图片路径    
//               },
//               {
//                    title:"pic2",                                                               //图片名
//                    active:"n",                                                                 //是否选中第一张展示  y:是 , n:否
//                    url  :"http://pic.pp3.cn/uploads//20120702gj/bzimages_20120702_img05.jpg"   //图片路径   
//               },
//               {
//                    title:"pic3",                                                               //图片名
//                    active:"n",                                                                 //是否选中第一张展示  y:是 , n:否
//                    url  :"http://img1.3lian.com/2015/a2/249/d/223.jpg"                         //图片路径   
//               }  
//            ]
//        }/>

class Slider extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      params: {
        "height": "300px", //幻灯片图片高度
        "width": "100%", //幻灯片图片宽度
        "interval": "5000", //幻灯片切换时间 例2000:2s
        "images": [{
          title: "pic1", //图片名
          active: "y", //是否选中第一张展示    y:是 , n:否
          url: "./images/banner_01.jpg" //图片路径    
        }, {
          title: "pic2", //图片名
          active: "n", //是否选中第一张展示  y:是 , n:否
          url: "http://pic.pp3.cn/uploads//20120702gj/bzimages_20120702_img05.jpg" //图片路径   
        }, {
          title: "pic3", //图片名
          active: "n", //是否选中第一张展示  y:是 , n:否
          url: "http://img1.3lian.com/2015/a2/249/d/223.jpg" //图片路径   
        }]
      }
    }
  }

  componentDidMount() {

  }

  render() {
    var data = this.props.params,
      pics = [];

    if (data.images && data.images.length) {
      data.images.map(function(item, key) {
        if (item.active && item.active == 'y') {
          //第一张图片加选中效果
          pics.push(
            <div className="item active" key={key}>
                      <img src={item.url} style={{height:data.height,width:data.width}} />
                      <div className="carousel-caption">
                      </div>
                    </div>

          )
        } else {
          pics.push(
            <div className="item" key={key}>
                    <img src={item.url} style={{height:data.height,width:data.width}} />
                    <div className="carousel-caption">
                    </div>
                  </div>
          )
        }

      })
    }

    var hrefID = '#' + data.id;

    return (
      <div id={data.id} className="carousel slide" data-ride="carousel" data-interval={data.interval} style={{width:data.width}}>
                
                <div className="carousel-inner" role="listbox">
                    {pics}
                  
                </div>

                <a className="left carousel-control" href={hrefID} role="button" data-slide="prev">
                  <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                  <span className="sr-only">Previous</span>
                </a>
                <a className="right carousel-control" href={hrefID} role="button" data-slide="next">
                  <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                  <span className="sr-only">Next</span>
                </a>
            </div>
    )
  }
}

module.exports = Slider