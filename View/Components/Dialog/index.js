import React from 'react'

require('./index.css')

// import Dialog from '../../../Components/Dialog'

// this.setState({
//             DialogCon: < Dialog params = {
//               {
//                 id: 'tip',
//                 title: '产品详情',
//                 width: '400',
//                 height: '300',
//                 button: [{
//                   text: '取消',
//                 }, {
//                   text: '确定',
//                   callback: function() {
//                     alert('223');
//                     this.setState({
//                       DialogCon: ''
//                     });
//                   }.bind(this)
//                 }],
//                 body: 'asfafdsfsdfd',
//                 html: '<div>fasdfsafd</div>',
//                 component: <OtherList />,
// 			closeCallback: function() {
// 				this.setState({
// 					DialogCon: ''
// 				});
// 			}.bind(this)
// 		}
// 	}
// 	/>})

class Dialog extends React.Component {

	constructor(props) {
		super(props);
		this.state = {}
	}

	componentDidMount() {
		if (this.props.params.html) {
			$('#html').html(this.props.params.html)
		}
	}

	closeDialog(callback) {
		// $('#'+id).remove();
		//改变数据
		callback();
	}

	render() {
		var params = this.props.params,
			butRows = [],
			bodyCss = {};
		var stylecss = {
			width: params.width + 'px',
			height: params.height + 'px',
			margin: '-' + params.height / 2 + 'px 0 0 -' + params.width / 2 + 'px'
		}
		var that = this;
		if (params.button && params.button.length) {
			var butW = (100 / params.button.length - 2) + '%';
			params.button.map(function(item, index) {
				butRows.push(<div key={index} onClick={()=>item.callback ? item.callback() : that.closeDialog(params.closeCallback)} style={{width:butW}}>{item.text}</div>);
			});
		} else {
			bodyCss.bottom = '20px'
		}

		var item = this.props.params;
		return (
			<div className="dialog" id={params.id}>
					<div className="opacity_bg" onClick={()=>this.closeDialog(params.closeCallback)}></div>
	                <div className="add_paper" style={stylecss}>
		                  <div className="padent">
			                    <div className="title">{params.title}</div><div onClick={()=>this.closeDialog(params.closeCallback)} id="close">X</div>
		                  </div>
		                  <div className="dialogbody" style={bodyCss}>
		                  		{params.body && <div style={{textAlign:'center',lineHeight:'50px'}}>{params.body}</div>}
		                  		{params.component && params.component}
		                  		<div id='html'></div>
		                  </div>
		                  {params.button && <div className="dialogFooter">
	                    		{butRows}
	                      </div>}
	                </div>
	            </div>



		)
	}
}

module.exports = Dialog

// 

//                 <div className="add_other">
//                   <div className="padent">
//                     <div className="title">添加其他证件</div>
//                     <div className="form_input"><input type="text" placeholder="请输入证件名称" name="other" /></div>
//                     <div className="serch_btn"><button type="reset" className="btn btn-reset left">重置</button><button type="submit"  className="btn btn-submit right">查询</button></div>
//                   </div>
//                 </div>



// <ul>
// 				                      <li><em>食品生产许可证</em></li>
// 				                      <li><em>餐饮服务许可证</em></li>
// 				                      <li><em>食品安全许可证(食品经营许可证)</em></li>
// 				                      <li><em>酒类流通备案</em></li>
// 				                      <li><em>工业产品许可证</em></li>
// 				                      <li><em>其他证件</em></li>
// 			                    </ul>