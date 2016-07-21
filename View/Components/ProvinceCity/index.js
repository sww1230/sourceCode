import React from 'react'
import {
  Link
} from 'react-router'

// 调用方式
// <CityList 
// store={this.props.store} 
// params={{
//   width: 100,
//   getDataCallback: function(data) {
//     console.log(data);
//   }}
// }/>

class CityList extends React.Component {

  componentDidMount() {
    this.updateTodo = this.props.store.updateTodo;
    this.ajaxData = this.props.store.ajaxData;
    this.ajaxSucceed = this.props.store.ajaxSucceed;
    this.ajaxFailed = this.props.store.ajaxFailed;

    //初始省份列表
    this.ajaxData({
      url: 'getprovince',
      method: 'post',
      body: '{"base_id":"0","shop_id":"' + localStorage.shop_id + '"}',
      succeed: this.ajaxSucceed,
      failed: this.ajaxFailed
    })
  }

  //改变省份 获取城市
  getCity() {
    var code = $('#province').val().split('_')[0];
    this.ajaxData({
      url: 'getinferior',
      method: 'post',
      body: '{"code":"' + code + '"}',
      succeed: this.ajaxSucceed,
      failed: this.ajaxFailed
    })
    this.getinferior.ret = 0;
    this.updateTodo(this.getinferior);
    this.getArea.ret = 0;
    this.updateTodo(this.getArea);
  }

  //改变城市 获取区域
  getChangeArea() {
    var code = $('#city').val().split('_')[0];
    this.ajaxData({
      url: 'getArea',
      method: 'post',
      body: '{"code":"' + code + '"}',
      succeed: this.ajaxSucceed,
      failed: this.ajaxFailed
    })
    this.getArea.ret = 0;
    this.updateTodo(this.getArea);
  }

  //获取选择结果 输出到调用的CALLBACK函数中
  getData() {
    var data = $('#province').val().split('_')[1] + '' + $('#city').val().split('_')[1] + '' + $('#area').val().split('_')[1];
    this.props.params.getDataCallback(data);
  }

  //遍历 option 
  eachOption(name) {
    var optionArr = [];
    if (this[name].ret && this[name].data.length) {
      this[name].data.map(function(item, key) {
        optionArr.push(<option key={key} value={item.code+'_'+item.name}>{item.name}</option>);
      });
    }
    return optionArr;
  }

  render() {
    this.getprovince = this.props.store.data.FetchData[0].getprovince;
    this.getinferior = this.props.store.data.FetchData[0].getinferior;
    this.getArea = this.props.store.data.FetchData[0].getArea;

    var params = this.props.params,
      provinceList = this.eachOption('getprovince'), //省
      cityList = this.eachOption('getinferior'), //市
      areaList = this.eachOption('getArea'); //区

    return (
      <span>
        <span style={{paddingRight:'10px',display:'inline-block'}}>
          <select className="form-control" onChange={this.getCity.bind(this)} id='province' style={{height:'27px',width:params.width}}>
              <option>省份</option>
              {provinceList}
          </select>
        </span>
        <span  style={{paddingRight:'10px',display:'inline-block'}}>
          <select className="form-control" onChange={this.getChangeArea.bind(this)}  style={{height:'27px',width:params.width}} id='city'>
              <option>城市</option>
              {cityList}
          </select>
        </span>
        <span  style={{paddingRight:'10px',display:'inline-block'}}>
          <select className="form-control" onChange={this.getData.bind(this)} style={{height:'27px',width:params.width}} id='area'>
              <option>区</option>
              {areaList}
          </select>
        </span>
      </span>
    )
  }
}

module.exports = CityList