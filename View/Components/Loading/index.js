import React from 'react'
import {
	Link
} from 'react-router'

// 调用方式
// <Loading size='300'/>

class Loading extends React.Component {

	render() {
		var size = this.props.size;
		return (
			<div style={{width:'100%',height:size + 'px',position:'absolute',top:0,left:0,right:0,bottom:0}}>
          <img src='./Images/loading.gif' style={{position: 'absolute',left:'50%',marginLeft:'-'+size/2 + 'px',width:size + 'px',height:size + 'px'}} />
      </div>
		)
	}
}

module.exports = Loading