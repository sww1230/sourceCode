import React from 'react'
import {
  Link
} from 'react-router'

import Select from '../../Components/select'
import Button from '../../Components/button'
import Input from '../../Components/input'

import Row from '../../Components/row'
import Col from '../../Components/col'
import Tabs from '../../Components/tabs'

import Radio from '../../Components/radio'

import Table from '../../Components/table'

import Icon from '../../Components/icon'
import Modal from '../../Components/modal'
import Cascader from '../../Components/cascader'
import Checkbox from '../../Components/checkbox'


const RadioGroup = Radio.Group;


const TabPane = Tabs.TabPane;

const Option = Select.Option;


class ProdQuery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      pagination: {},
      loading: false,

      value: '',
      defautCityValue: ''
    }
  }
  componentDidMount() {

  }
  componentWillMount() {
    this.updateTodo = this.props.store.updateTodo;
    this.queryquotebyskuPOST = this.props.store.data.FetchData[0]['queryquotebyskuPOST']; //一定要改
    this.queryquotebyskuPOST.class1 = '';
    this.queryquotebyskuPOST.class2 = '';
    this.queryquotebyskuPOST.class3 = '';

    const {
      ajaxData,
      ajaxSucceed,
      ajaxFailed
    } = this.props.store;

    //请求getcity接口
    ajaxData({
      url: 'getcity',
      method: 'post',
      succeed: ajaxSucceed,
      failed: ajaxFailed,
      body: '{"search":"all"}',
      afterCallback: () => {
        this.queryquotebyskuPOST.city_id = this.getcity[0]['id'];
        ajaxData({
          url: 'getcategorylist',
          method: 'post',
          succeed: ajaxSucceed,
          failed: ajaxFailed,
          afterCallback: () => {
            this.getcategorylist.map((item, key) => {
              if (key == 0) {
                this.queryquotebyskuPOST.class1 = item.value;
                if (item.children) {
                  item.children.map((i, k) => {
                    if (k == 0) {
                      this.queryquotebyskuPOST.class2 = i.value;
                    }
                  });
                }
              }
            });
            this.fetch();
          }
        })
      }
    })

  }

  //select框改变post参数值的方法
  handleChange(key, value) {
    this.queryquotebyskuPOST[key] = value;
    this.updateTodo(this.queryquotebyskuPOST);
  }

  //input框改变post参数值的方法
  handleInputChange(e) {
    this.queryquotebyskuPOST.sku = e.target.value;
    this.updateTodo(this.queryquotebyskuPOST);
  }
  handleRadioChange(e) {
    this.queryquotebyskuPOST.order_by = e.target.value;
    // this.updateTodo(this.queryquotebyskuPOST);
    this.changePage();

    this.setState({
      value: e.target.value,
    });

    this.fetch({}, true);
  }
  handleCheckboxChange(e) {
    if (e.target.checked) {
      this.queryquotebyskuPOST.only_display_high = e.target.value;
    } else {
      this.queryquotebyskuPOST.only_display_high = '0';
    }
    // this.updateTodo(this.queryquotebyskuPOST);

    this.changePage();

    this.fetch({}, true);
  }
  handleCascaderChange(value) {
      value.map((item, key) => {
        if (key == 0) {
          this.queryquotebyskuPOST.class1 = item;
        }
        if (key == 1) {
          this.queryquotebyskuPOST.class2 = item;
        }
        if (key == 2) {
          this.queryquotebyskuPOST.class3 = item;
        }
      });
      this.updateTodo(this.queryquotebyskuPOST);
    }
    //查询按钮

  query() {
    this.changePage();
    this.fetch({}, true);
  }

  //表格
  handleTableChange(pagination, filters, sorter) {
    const pager = this.state.pagination;
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.fetch({});
  }

  changePage() {
    this.queryquotebyskuPOST.page = 1;
  }

  //表格
  fetch(params = {}, pageInit) {

    const pagination = this.state.pagination;
    if (!pageInit) {
      this.queryquotebyskuPOST.page = pagination.current ? pagination.current : 1;
    } else {
      pagination.current = 1;
    }
    this.queryquotebyskuPOST.per_page = 20;
    //城市
    this.queryquotebyskuPOST.city_id = this.queryquotebyskuPOST.city_id ? this.queryquotebyskuPOST.city_id : this.state.defautCityValue;

    this.updateTodo(this.queryquotebyskuPOST);

    //ajax请求成功后更改 getallotlist
    //请求getallotlist接口
    //参数queryquotebyskuPOST

    const {
      ajaxData,
      ajaxSucceed,
      ajaxFailed
    } = this.props.store;

    ajaxData({
      url: 'queryquotebysku',
      method: 'post',
      succeed: ajaxSucceed,
      failed: ajaxFailed,
      body: JSON.stringify(this.queryquotebyskuPOST),
      beforeCallback: () => {
        this.setState({
          loading: true
        });
      },
      afterCallback: () => {
        this.setState({
          loading: false,
          //data: this.queryquotebysku.data ? this.queryquotebysku.data.rows : [],
        });
      }
    })

  }



  render() {
    this.getcity = this.props.store.data.FetchData[0]['getcity'];
    this.getcategorylist = this.props.store.data.FetchData[0]['getcategorylist'].data;
    this.queryquotebysku = this.props.store.data.FetchData[0]['queryquotebysku']; //一定要改

    // if (this.queryquotebyskuPOST.class1 == '' && this.queryquotebyskuPOST.class2 == '') {
    //   return <div></div>
    // }

    //修正分页状态
    this.state.pagination = Object.assign(this.state.pagination, {
      total: this.queryquotebysku.data.total,
      pageSize: this.queryquotebysku.data.per_page,
    });

    //全部分类
    //全部城市
    let optionsRows = [];

    this.getcity.map((item, key) => {
      if (key == 0) {
        this.state.defautCityValue = item.id;
      }
      optionsRows.push(<Option key={key} value={item.id}>{item.name}</Option>);
    });


    // this.state.defaultCategotyValue = [];


    // this.queryquotebyskuPOST.class1 = this.queryquotebyskuPOST.class1 ? this.queryquotebyskuPOST.class1 : this.state.defaultCategotyValue[0];
    // this.queryquotebyskuPOST.class2 = this.queryquotebyskuPOST.class2 ? this.queryquotebyskuPOST.class2 : this.state.defaultCategotyValue[1];

    //表格列表
    const columns = [{
      title: 'SIID',
      dataIndex: 'sku',
      width: '10%',
      className: 'f14'
    }, {
      title: '商品名称',
      dataIndex: 'sku_name',
      width: '10%',
      className: 'f14'
    }, {
      title: '等级/品牌/规格',
      dataIndex: 'category1_name',
      className: 'f14',
      width: '15%',
      render: (text, row, index) => (
        row.sku_level + "/" + row.sku_brand + "/" + row.sku_stad
      )
    }, {
      title: '计量单位',
      dataIndex: 'sku_unit',
      className: 'f14',
      width: '6%',
    }, {
      title: '昨日最低报价',
      dataIndex: 'price',
      className: 'f14',
      width: '8%',
    }, {
      title: '和市调价格比例',
      dataIndex: 'sur_ratio',
      className: 'f14',
      width: '10%',
      render: (text, record) => {
        if (text > 0) {
          return <span style={{color:'red'}}>高{text}%/{record.sur_price}</span>
        } else {
          return '低' + (-text) + '%/' + record.sur_price
        }
      }
    }, {
      title: '和上次报价比例',
      dataIndex: 'last_ratio',
      className: 'f14',
      width: '10%',
      render: (text, record) => {
        if (text > 0) {
          return <span style={{color:'red'}}>高{text}%/{record.last_price}</span>
        } else {
          return '低' + (-text) + '%/' + record.last_price;
        }
      }
    }, {
      title: '市调时间',
      dataIndex: 'sur_time',
      className: 'f14',
      width: '10%',
      render: (text) => (
        timestampformat(text)
      )
    }, {
      title: '操作',
      className: 'f12',
      width: '10%',
      key: 'view',
      render: (text, record) => ( < Link to = {
          {
            pathname: '/prodDetails',
            query: {
              city_id: record.city,
              sku_id: record.sku,
              class1: record.class1,
              sku_name: record.sku_name,
              sku_level: record.sku_level,
              sku_brand: record.sku_brand,
              sku_stad: record.sku_stad,
              sur_price: record.sur_price,
              sku_unit: record.sku_unit
            }
          }
        } >
        <Button  className="btn-info" size="small"  ><span style={{fontSize:'12px'}}>详 情</span></Button> < /Link>
      )
    }];

    return (
      <div id="ProdQuery" style={{padding:'0 15px'}}>
          <div style={{backgroundColor:'#f7f7f7',padding:'15px'}}>
              <Row gutter={16}>
                  <Col span='5'>
                        <Select showSearch
                            style={{width:'100%'}}
                            placeholder="选择城市"
                            optionFilterProp="children"
                            notFoundContent="无法找到"
                            defaultValue={this.queryquotebyskuPOST.city_id}
                            onChange={this.handleChange.bind(this,'city_id')}
                        >
                            {optionsRows}
                        </Select>
                  </Col>
                  <Col span='8'>
                     <Cascader options={this.getcategorylist} allowClear={false} onChange={this.handleCascaderChange.bind(this)} placeholder="全部分类" defaultValue={[this.queryquotebyskuPOST.class1,this.queryquotebyskuPOST.class2]}/>
                  </Col>
                  
                  <Col span='5'>
                    <Input placeholder="输入商品名称或ID" onBlur={this.handleInputChange.bind(this)}/>
                  </Col>
                  <Col span='2'>
                    <Button type="primary" onClick={this.query.bind(this)}>查 询</Button>
                  </Col>
              </Row>
          </div>

          <div className="box boxH" style={{marginTop:'15px'}}>
              共{this.queryquotebysku.data.total || 0}件供应商
              <span style={{marginLeft:'25px',width:'50%'}}><Checkbox value="1" onChange={this.handleCheckboxChange.bind(this)}>仅显示高于市调价格</Checkbox></span>
              <span style={{marginTop:'3px'}}>
                  <RadioGroup onChange={this.handleRadioChange.bind(this)} value={this.state.value}>
                    <Radio key="a" value={'price'}>按昨日最低报价高低排序</Radio>
                    <Radio key="b" value={'sur_ratio'}>按报价与市调比例排序</Radio>
                  </RadioGroup>

              </span>
          </div>

          <Table columns={columns} className="mT20"
            rowKey={record => record['_id']}
            dataSource={this.queryquotebysku.data.rows}
            loading={this.state.loading}
            onChange={this.handleTableChange.bind(this)}
            pagination={this.state.pagination}
            rowClassName={()=>'f14'}
            bordered
          />


      </div>
    );
  }
}

module.exports = ProdQuery