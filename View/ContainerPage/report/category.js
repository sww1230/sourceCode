import React from 'react'
import {
  Link
} from 'react-router'

import Select from '../../Components/select'
import DatePicker from '../../Components/date-picker'
import Button from '../../Components/button'
import Card from '../../Components/card'
import ReactEcharts from 'echarts-for-react';



const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  componentDidMount() {}
  componentWillMount() {
    this.getreportclassPOST = this.props.store.data.FetchData[0]['getreportclassPOST'];
    this.updateTodo = this.props.store.updateTodo;

    //请求getcity接口
    //参数{"search":"all"}


    //请求getreportclass接口
    //参数{}


    //请求getecharst接口
    //参数{}

    const {
      ajaxData,
      ajaxSucceed,
      ajaxFailed
    } = this.props.store;

    ajaxData({
      url: 'getcity',
      method: 'post',
      succeed: ajaxSucceed,
      failed: ajaxFailed,
      body: '{"search":"all"}'
    })

    ajaxData({
      url: 'getreportclass',
      method: 'post',
      succeed: ajaxSucceed,
      failed: ajaxFailed
    })

    ajaxData({
      url: 'getecharst',
      method: 'post',
      succeed: ajaxSucceed,
      failed: ajaxFailed
    })



  }
  handleChange(value) {
    this.getreportclassPOST['city_id'] = value;
    this.updateTodo(this.getreportclassPOST);
  }
  onChange(value, dateString) {
    this.getreportclassPOST.s_t = dateString[0];
    this.getreportclassPOST.e_t = dateString[1];
    this.updateTodo(this.getreportclassPOST);
  }
  query() {
    //请求getreportclass接口
    //参数getreportclassPOST

    //请求getecharst接口
    //参数{}
    const {
      ajaxData,
      ajaxSucceed,
      ajaxFailed
    } = this.props.store;

    ajaxData({
      url: 'getreportclass',
      method: 'post',
      succeed: ajaxSucceed,
      failed: ajaxFailed,
      body: JSON.stringify(this.getreportclassPOST)
    })

    ajaxData({
      url: 'getecharst',
      method: 'post',
      succeed: ajaxSucceed,
      failed: ajaxFailed,
      body: JSON.stringify(this.getreportclassPOST)
    })

  }
  render() {
    this.getcity = this.props.store.data.FetchData[0]['getcity'];
    this.getreportclass = this.props.store.data.FetchData[0]['getreportclass'];

    this.getecharst = this.props.store.data.FetchData[0]['getecharst'];

    let rows = [];
    if (this.getreportclass.ret && this.getreportclass.data.length) {
      this.getreportclass.data.map((item, key) => {
        rows.push(<Card key={key} style={{marginTop:'20px'}} bodyStyle={{ backgroundColor:'white',padding:'20px'}}>
                        <p style={{fontSize:'16px'}}><strong style={{fontWeight:'bold',color:'#2db7f5'}}>|</strong> &nbsp;<strong>{item.name}</strong></p>
                        <div className="box boxH">
                            <span style={{color:'#777',paddingRight:'20px'}}>待分配：{item.status["1"]}</span>
                            <span style={{color:'#777',paddingRight:'20px'}}>待引入：{item.status["2"]}</span>
                            <span style={{color:'#777',paddingRight:'20px'}}>已引入：{item.status["3"]}</span>
                            <span style={{color:'#777',paddingRight:'20px'}}>暂不引入：{item.status["4"]}</span>
                            <span style={{color:'#777',paddingRight:'20px'}}>已置于无效：{item.status["9"]}</span>
                            <span style={{color:'#777',paddingRight:'20px'}}>提交新品：{item.status["98"]}</span>
                            <div className="flex1"></div>
                            <Link to={{ pathname: '/list', query: { city_id: this.getreportclassPOST.city_id,report_t1: this.getreportclassPOST.s_t,report_t2: this.getreportclassPOST.e_t,category1:item.id } }} className="text-center" style={{color:'#777',paddingRight:'20px'}}>详情</Link>
                        </div>
                  </Card>);
      });
    }



    let optionsRows = [];
    this.getcity.map((item, key) => {
      optionsRows.push(<Option key={key} value={item.id}>{item.name}</Option>);
    });



    return (
      <div id="Category">
                <div style={{backgroundColor:'#f7f7f7',padding:'15px'}}>
                      <Select showSearch
                        style={{ width: 200,marginRight:'20px'}}
                        placeholder="选择城市"
                        optionFilterProp="children"
                        notFoundContent="无法找到"
                        onChange={this.handleChange.bind(this)}
                      >
                        <Option value=''>全部城市</Option>
                        {optionsRows}
                      </Select>

                      <RangePicker style={{ width: 184,marginRight:'20px' }} onChange={this.onChange.bind(this)} />

                      <Button type="primary" onClick={this.query.bind(this)}>查 询</Button>
                </div>
                <h3 className="text-center" style={{marginTop:'40px'}}>新品引入数据统计（全部城市）</h3>
                <ReactEcharts
                        option={this.getecharst.data} 
                        style={{height: '300px',margin:'30px 0'}} 
                        theme={"theme_name"}/>
                {rows}
            </div>
    );
  }
}

module.exports = Category