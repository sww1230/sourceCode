import React from 'react'
import {
  Link
} from 'react-router'

import Select from '../../Components/select'
import DatePicker from '../../Components/date-picker'
import Button from '../../Components/button'
import Card from '../../Components/card'



const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;

class City extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  componentDidMount() {}
  componentWillMount() {
    this.getreportcityPOST = this.props.store.data.FetchData[0]['getreportcityPOST'];
    this.updateTodo = this.props.store.updateTodo;

    //请求getclass1接口
    //参数{"search":"all"}


    //请求getreportcity接口
    //参数{}

    const {
      ajaxData,
      ajaxSucceed,
      ajaxFailed
    } = this.props.store;

    ajaxData({
      url: 'getclass1',
      method: 'post',
      succeed: ajaxSucceed,
      failed: ajaxFailed
    })

    ajaxData({
      url: 'getreportcity',
      method: 'post',
      succeed: ajaxSucceed,
      failed: ajaxFailed
    })



  }
  handleChange(value) {
    this.getreportcityPOST['category1'] = value;
    this.updateTodo(this.getreportcityPOST);
  }
  onChange(value, dateString) {
    this.getreportcityPOST.s_t = dateString[0];
    this.getreportcityPOST.e_t = dateString[1];
    this.updateTodo(this.getreportcityPOST);
  }
  query() {
    //请求getreportcity接口
    //参数getreportcityPOST
    const {
      ajaxData,
      ajaxSucceed,
      ajaxFailed
    } = this.props.store;

    ajaxData({
      url: 'getreportcity',
      method: 'post',
      succeed: ajaxSucceed,
      failed: ajaxFailed,
      body: JSON.stringify(this.getreportcityPOST)
    })
  }
  render() {
    this.getclass1 = this.props.store.data.FetchData[0]['getclass1'];
    this.getreportcity = this.props.store.data.FetchData[0]['getreportcity'];


    let rows = [];
    if (this.getreportcity.ret && this.getreportcity.data.length) {
      this.getreportcity.data.map((item, key) => {
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
                            <Link to={{ pathname: '/list', query: { city_id: item.id,report_t1: this.getreportcityPOST.s_t,report_t2: this.getreportcityPOST.e_t,category1:this.getreportcityPOST.category1} }} className="text-center" style={{color:'#777',paddingRight:'20px'}}>详情</Link>
                        </div>
                  </Card>);
      });
    }



    let optionsRows = [];
    this.getclass1.map((item, key) => {
      optionsRows.push(<Option key={key} value={item.id}>{item.name}</Option>);
    });


    return (
      <div id="City">
                <div style={{backgroundColor:'#f7f7f7',padding:'15px'}}>
                      <Select showSearch
                        style={{ width: 200,marginRight:'20px'}}
                        placeholder="选择分类"
                        optionFilterProp="children"
                        notFoundContent="无法找到"
                        onChange={this.handleChange.bind(this)}
                      >
                        <Option value=''>全部分类</Option>
                        {optionsRows}
                      </Select>

                      <RangePicker style={{ width: 184,marginRight:'20px' }} onChange={this.onChange.bind(this)} />

                      <Button type="primary" onClick={this.query.bind(this)}><span style={{fontSize:'12px'}} >查 询</span></Button>
                </div>
                <h3 className="text-center" style={{marginTop:'40px'}}>新品引入数据统计（全部品类）</h3>
                
                {rows}
            </div>
    );
  }
}

module.exports = City