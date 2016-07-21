import React from 'react'
import {
  Link
} from 'react-router'

//证书
class Certificate extends React.Component {



  render() {
    var params = this.props.params;
    return (
      <div className="row" style={{lineHeight: '30px',padding: '10px',borderTop:'1px solid #d8d8d8'}}>
                  <div className="col-xs-9">
                      {params.name}<br />
                      有效日期：{params.end_t}
                  </div>
                  <div className="col-xs-3">
                      <img src={params.thumb} params={params.pic} onClick={()=>this.props.slideCallback(params.pic)} />
                  </div>
            </div>
    )
  }
}


module.exports = Certificate