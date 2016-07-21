import React from 'react'
import {
  Link
} from 'react-router'

import Select from '../../Components/select'
import Button from '../../Components/button'
import Input from '../../Components/input'
import Cascader from '../../Components/cascader';

import Row from '../../Components/row'
import Col from '../../Components/col'
import Tabs from '../../Components/tabs'

import Radio from '../../Components/radio'
import Checkbox from '../../Components/checkbox'

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

import Table from '../../Components/table'

import Icon from '../../Components/icon'
import Modal from '../../Components/modal'



const TabPane = Tabs.TabPane;

const Option = Select.Option;


class SupplierQuery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      only_display_high: 0,
      order_by: '',
      pagination: {
        defaultCurrent: 1,
      },
      loading: false,
      cityId: '',
      class1: ''
    }
  }
  componentDidMount() {}
  componentWillMount() {

    this.updateTodo = this.props.store.updateTodo;
    this.queryQuoteBySupplierPOST = this.props.store.data.FetchData[0]['queryQuoteBySupplierPOST'];


    this.props.store.data.FetchData[0]['queryQuoteBySupplier'].data.rows = []

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
      body: '{"search":"all"}',
      afterCallback: () => {
        this.queryQuoteBySupplierPOST.city_id = this.getcity[0]['id']

        ajaxData({
          url: 'getclass',
          method: 'post',
          succeed: ajaxSucceed,
          failed: ajaxFailed,
          afterCallback: () => {
            this.queryQuoteBySupplierPOST.class1 = '0'
            this.fetch();
          }
        })

      }
    })


  }

  //仅显示平均报价高于市场报价 复选框
  onCheckboxChange(e) {
    this.setState({
      only_display_high: e.target.checked
    });

    if (e.target.checked) {
      this.queryQuoteBySupplierPOST.only_display_high = '1';
    } else {
      this.queryQuoteBySupplierPOST.only_display_high = '0';
    }
    this.changePage();
    this.fetch({}, true);

  }

  onSortRadioChange(e) {

    this.setState({
      order_by: e.target.value
    });

    this.queryQuoteBySupplierPOST.order_by = e.target.value;
    this.changePage();
    this.fetch({}, true);
  }

  //select框改变post参数值的方法
  handleChange(key, value) {
    this.queryQuoteBySupplierPOST[key] = value;
    this.updateTodo(this.queryQuoteBySupplierPOST);
  }

  query() {
    this.changePage();
    this.fetch({}, true);
  }

  changePage() {
    this.queryQuoteBySupplierPOST.page = 1;
  }

  //input框改变post参数值的方法
  handleInputChange(e) {
    this.queryQuoteBySupplierPOST.supplier = e.target.value;
    this.updateTodo(this.queryQuoteBySupplierPOST);
  }



  //表格翻页
  handleTableChange(pagination, filters, sorter) {
    const pager = this.state.pagination;
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    //获取对应页数据
    this.fetch({});
  }

  //表格
  fetch(params = {}, pageInit) {
    const pagination = this.state.pagination;

    if (!pageInit) {
      this.queryQuoteBySupplierPOST.page = pagination.current ? pagination.current : 1;
    } else {
      pagination.current = 1;
    }

    // this.queryQuoteBySupplierPOST.page = pagination.current ? pagination.current : 1;
    this.updateTodo(this.queryQuoteBySupplierPOST);

    //ajax请求成功后更改 queryQuoteBySupplier
    //请求queryQuoteBySupplier接口
    //参数queryQuoteBySupplierPOST
    const {
      ajaxData,
      ajaxSucceed,
      ajaxFailed
    } = this.props.store;

    ajaxData({
      url: 'queryQuoteBySupplier',
      method: 'post',
      succeed: ajaxSucceed,
      failed: ajaxFailed,
      body: JSON.stringify(this.queryQuoteBySupplierPOST),
      beforeCallback: () => {
        this.setState({
          loading: true,
        });
      },
      afterCallback: () => {
        this.setState({
          loading: false,
          //data: this.queryQuoteBySupplier.data ? this.queryQuoteBySupplier.data.rows : [],
        });
      }
    })

  }



  //TODO: 改render为pure function，转移数据操作逻辑，只取用，不改动（尤其是对this.state的改动）；
  render() {

    this.getcity = this.props.store.data.FetchData[0]['getcity'];



    const rdata = this.props.store.data.FetchData[0]['queryQuoteBySupplier'].data; //服务器返回的数据
    this.state.pagination = Object.assign(this.state.pagination, {
      total: rdata.total,
      pageSize: rdata.per_page,
    });

    //全部分类
    const categoryOptions = this.props.store.data.FetchData[0]['getclass'].map((item, key) => {
      return <Option key={key} value={item.id}>{item.name}</Option>;
    });

    //全部城市
    let optionsRows = [];
    this.getcity.map((item, key) => {
      optionsRows.push(<Option key={key} value={item.id}>{item.name}</Option>);
    });

    //表格列表
    //供应商ID 供应商 分类 商品数量 超过市调报价数量 平均和市调价格比例 操作
    const columns = [{
      title: '供应商编码',
      dataIndex: 'sup_no',
      width: '8%',
      className: 'text-center'
    }, {
      title: '供应商',
      dataIndex: 'sup_name',
      className: 'text-center',
      rowClassName: 'text-left',
      width: '10%',
    }, {
      title: '分类',
      dataIndex: 'clas_name',
      className: 'text-center',
      width: '12%',
    }, {
      title: '商品数量',
      dataIndex: 'sku_cont',
      className: 'text-center',
      width: '6%',
    }, {
      title: '超过市调报价数量',
      dataIndex: 'over_cont',
      className: 'text-center',
      width: '6%',
    }, {
      title: '超过市调价格商品占比',
      dataIndex: 'over_ratio',
      className: 'text-center',
      width: '10%',
      render: (text, record) => {
          return `${text}%`;
      }
    }, {
      title: '操作',
      className: 'text-center',
      width: '10%',
      key: 'view',
      render: (text, record) => (
        <Link to={{ pathname: '/supplierProd', query: { city_id: this.queryQuoteBySupplierPOST.city_id,quote_sup:record._id,sup_id:record.sup_id,only_display_high:this.queryQuoteBySupplierPOST.only_display_high} }} >
                <Button  className="btn-info"  size="small"   >
                    <span style={{fontSize:'12px'}}>查看商品</span>
                </Button>
            </Link>
      )
    }];


    return (
      <div id="SupplierQuery" style={{ padding:'0 15px'}}>
          <div style={{backgroundColor:'#f7f7f7',padding:'15px'}}>
              <Row gutter={16}>
                  <Col span='5'>
                        {this.queryQuoteBySupplierPOST.city_id != '' && <Select showSearch
                            style={{width:'100%'}}
                            placeholder="选择城市"
                            optionFilterProp="children"
                            notFoundContent="无法找到"
                            defaultValue={this.queryQuoteBySupplierPOST.city_id}
                            onChange={this.handleChange.bind(this,'city_id')}
                        >
                            {optionsRows}
                        </Select>}
                  </Col>
                  <Col span='5'>
                      <Select showSearch
                          style={{width:'100%'}}
                          placeholder="选择分类"
                          optionFilterProp="children"
                          notFoundContent="无法找到"
                          defaultValue='0'
                          onChange={this.handleChange.bind(this,'class1')}
                      >
                        <Option value='0'>全部分类</Option>
                        {categoryOptions}
                      </Select>
                  </Col>
                  
                  <Col span='5'>
                    <Input style={{width:'100%'}}  placeholder="请输入供应商名称" onBlur={this.handleInputChange.bind(this)}/>
                  </Col>
                  <Col span='2'>
                    <Button style={{width:'100%'}} type="primary" onClick={this.query.bind(this)}>查 询</Button>
                  </Col>
              </Row>
          </div>

          <Row gutter={16} style={ {marginBottom: '8px'} }>
              <Col span={4}>
                共{rdata.total || 0}个供应商
              </Col>
              <Col span={10}>
                <Checkbox onChange={this.onCheckboxChange.bind(this)}>仅显示平均报价高于市场报价</Checkbox>
              </Col>

              <Col span={10} >
                <RadioGroup onChange={this.onSortRadioChange.bind(this)} value={this.state.order_by}>
                  <Radio key="1" value={'sku_cont'}>按商品数量排序</Radio>
                  <Radio key="2" value={'over_cont'}>按超过市调报价数量排序</Radio>
                </RadioGroup>
              </Col>
          </Row>
         

          <Table columns={columns}
            rowKey={record => record['_id']}
            dataSource={rdata.rows /*this.state.data*/}
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

module.exports = SupplierQuery