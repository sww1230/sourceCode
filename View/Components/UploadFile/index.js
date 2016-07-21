import React from 'react'
import {
  Link
} from 'react-router'

// import UploadFile from '../../../Components/UploadFile'
// <UploadFile params={{url:'/webapi/public/uploadpic',key:'biz'}}  callback={this.getPic.bind(this)}/>

class UploadFile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadImgSrc: ''
    }
  }
  componentDidMount() {
    var that = this;
    var dom = this.props.params.key;
    var callback = this.props.callback;
    $("#" + dom).load(function() {
      var data = $(window.frames[dom].document.body).find('pre').html();

      //若iframe携带返回数据，则显示在feedback中
      if (data != null) {
        data = JSON.parse(data);
        if (data.ret == 1) {
          that.setState({
            uploadImgSrc: 'http://192.168.1.6:8091/' + data.data.fid
          });
          callback(dom, data.data.fid);
        } else {
          alert(data.msg)
        }
      } else {
        alert('上传图片不成功！')
      }
    });
  }

  changeUploadFile() {
    $('#' + this.formId).submit();
  }

  render() {
    var uploadCss = {
      borderRadius: '2px',
      width: '126px',
      height: '150px',
      cursor: 'pointer',
      marginTop: '-50px',
      position: 'absolute',
      bottom: 0,
      zIndex: 100,
    }
    var uploadFrom = {
      background: '#f2f2f2',
      width: '126px',
      height: '126px',
      overflow: 'hidden',
      display: 'block',
      position: 'relative',
      border: '1px dashed #9b9b9b',
    }
    var uploadP = {
      position: 'absolute',
      bottom: 0,
      left: 0,
      top: 0,
      right: 0,
      color: '#727272',
      textAlign: 'center',
      lineHeight: '126px',
      padding: 0,
      margin: 0
    }
    var uploadImg = {
      width: '126px',
      height: '126px',
      position: 'absolute',
      bottom: 0,
      left: 0,
      top: 0,
      right: 0,
    }

    var params = this.props.params;
    this.formId = params.key + '_form';
    return (
      <div>
            <form id={this.formId} style={uploadFrom} method="post" action={params.url} target={params.key} encType="multipart/form-data" >
                 <input type="file" name="upload_file" onChange={this.changeUploadFile.bind(this)} id="upload_file" style={uploadCss} /> 
                 <p style={uploadP}>上传图片</p>
                 {this.state.uploadImgSrc && <img id="uploadImg" style={uploadImg} src={this.state.uploadImgSrc} />}
           </form> 
           <iframe id={params.key}  style={{display:'none',width:0,height:0}} name={params.key}></iframe> 
       </div>
    )
  }
}

module.exports = UploadFile