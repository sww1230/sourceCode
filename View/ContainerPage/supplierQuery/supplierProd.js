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
import Checkbox from '../../Components/checkbox'

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

import Table from '../../Components/table'

import Icon from '../../Components/icon'
import Modal from '../../Components/modal'

import Tooltip from '../../Components/tooltip'


const TabPane = Tabs.TabPane;

const Option = Select.Option;


class SupplierProd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      only_display_high: Number(this.props.location.query.only_display_high),
      order_by: '',
      pagination: {},
      loading: false,
    }
  }
  componentDidMount() {
    this.fetch();
  }
  componentWillMount() {
    this.updateTodo = this.props.store.updateTodo;
    this.querySKUPriceBySupplierPOST = this.props.store.data.FetchData[0]['querySKUPriceBySupplierPOST'];

    //重新切换到详情页，重置某些参数
    this.querySKUPriceBySupplierPOST.sku_id = '';
    this.querySKUPriceBySupplierPOST.sku = '';


    //得到url中的参数
    this.locationQuery = this.props.location.query;
    for (let i in this.locationQuery) {
      this.querySKUPriceBySupplierPOST[i] = this.locationQuery[i]
    }
    this.updateTodo(this.querySKUPriceBySupplierPOST)
  }

  //仅显示平均报价高于市场报价 复选框
  onCheckboxChange(e) {
    this.setState({
      only_display_high: e.target.checked
    });

    if (e.target.checked) {
      this.querySKUPriceBySupplierPOST.only_display_high = '1';
    } else {
      this.querySKUPriceBySupplierPOST.only_display_high = '0';
    }
    this.query();
    // this.updateTodo(this.querySKUPriceBySupplierPOST);

    // this.fetch();

  }

  onSortRadioChange(e) {

    this.setState({
      order_by: e.target.value
    });

    this.querySKUPriceBySupplierPOST.order_by = e.target.value;
    // this.updateTodo(this.querySKUPriceBySupplierPOST);
    // this.fetch();
    this.query();

  }

  //input框改变post参数值的方法
  handleInputChange(e) {
    this.querySKUPriceBySupplierPOST.sku = e.target.value;
    this.updateTodo(this.querySKUPriceBySupplierPOST);
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

  query() {
    this.querySKUPriceBySupplierPOST.page = 1;
    this.fetch({}, true);
  }

  //表格
  fetch(params = {}, pageInit) {

    const pagination = this.state.pagination;

    if (!pageInit) {
      this.querySKUPriceBySupplierPOST.page = pagination.current ? pagination.current : 1;
    } else {
      pagination.current = 1;
    }

    // this.querySKUPriceBySupplierPOST.page = pagination.current ? pagination.current : 1;
    this.updateTodo(this.querySKUPriceBySupplierPOST);

    //ajax请求成功后更改 querySKUPriceBySupplier
    //请求querySKUPriceBySupplier接口
    //参数querySKUPriceBySupplierPOST

    const {
      ajaxData,
      ajaxSucceed,
      ajaxFailed
    } = this.props.store;

    ajaxData({
      url: 'querySKUPriceBySupplier',
      method: 'post',
      succeed: ajaxSucceed,
      failed: ajaxFailed,
      body: JSON.stringify(this.querySKUPriceBySupplierPOST),
      beforeCallback: () => {
        this.setState({
          loading: true
        });
      },
      afterCallback: () => {},
      finalCallback: () => {
        this.setState({
          loading: false,
          //data: this.querySKUPriceBySupplier.data ? this.querySKUPriceBySupplier.data.rows : [],
        });

      }
    })


  }



  render() {

    this.querySKUPriceBySupplier = this.props.store.data.FetchData[0]['querySKUPriceBySupplier'];



    //表格列表
    //SIID 商品名称 等级／品牌／规格 计量单位 最新最低报价 和市调价格比例 和上次报价比例 操作
    const columns = [{
      title: 'SSID',
      dataIndex: 'sku',
      width: '10%',
      className: 'text-center'
    }, {
      title: '商品名称',
      dataIndex: 'sku_name',
      className: 'text-center',
    }, {
      title: '等级／品牌／规格',
      className: 'text-center',
      width: '18%',
      render: (text, item) => (
        <span>{`${item.sku_level}/${item.sku_brand}/${item.sku_stad}`}</span>
      )
    }, {
      title: '计量单位',
      dataIndex: 'sku_unit',
      className: 'text-center',
      width: '10%',
    }, {
      title: '昨日最低报价',
      dataIndex: 'price',
      className: 'text-center',
      width: '10%',
    }, {
      title: '和市调价格比例',
      dataIndex: 'sur_ratio',
      className: 'text-center',
      width: '12%',
      render: (text, record) => {
        let readable_persent = (text > 0) ? <span className="marked-red">高{text}%</span> : `低${-text}%`;
        return (
          <span>
               {readable_persent}/{record.sur_price}
            </span>
        );
      }
    }, {
      title: '和上次报价比例',
      dataIndex: 'last_ratio',
      className: 'text-center',
      width: '12%',
      render: (text, record) => {
        let readable_persent = (text > 0) ? <span className="marked-red">高{text}%</span> : `低${-text}%`;
        return (
          <span>
               {readable_persent}/{record.last_price}
            </span>
        )
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
      className: 'text-center',
      render: (text, record) => {
        //TODO: 通过url传这一大批参数，太2了！！
        const query = {
          city_id: record.city,
          class1: record.class1,
          sku_id: record.sku,
          sku_name: record.sku_name,
          sku_level: record.sku_level,
          sku_brand: record.sku_brand,
          sku_stad: record.sku_stad,
          sku_unit: record.sku_unit,
          sur_price: record.sur_price,
        };
        return <Link to={{ pathname: '/prodDetails', query: query }} ><Button  className="btn-info" size="small"  ><span style={{fontSize:'12px'}}>报价对比</span></Button></Link>
      }
    }];


    const t = this;
    const pagination = {
      total: this.querySKUPriceBySupplier.data.total,
      showSizeChanger: true,
      pageSize: this.querySKUPriceBySupplierPOST.per_page,
      onShowSizeChange(current, pageSize) {
        t.querySKUPriceBySupplierPOST.per_page = pageSize;
        t.updateTodo(t.querySKUPriceBySupplierPOST);
      },
      onChange(current) {},
    };

    return (
      <div id="SupplierProd" style={{padding:'0 15px'}}>
          <div className="box boxH subpage-header">
              <div className="subpage-title">{this.querySKUPriceBySupplier.data.supplier_name}</div> 
              <div className="info-card">
                  编码:{this.querySKUPriceBySupplier.data.supplier_no}  <span className="break">|</span>
                  联系人:{this.querySKUPriceBySupplier.data.contact_person}  <span className="break">|</span>
                  电话: {this.querySKUPriceBySupplier.data.contact_phone}
              </div>
          </div>

          <div style={{margin:'30px 0 50px'}}>
              <Row gutter={16}>
                  <Col span='5'>
                    <Input style={{width:'100%'}}  placeholder="输入商品名称" onBlur={this.handleInputChange.bind(this)}/>
                  </Col>
                  <Col span='2'>
                    <Button style={{width:'100%'}} type="primary" onClick={this.query.bind(this)}>查 询</Button>
                  </Col>
              </Row>
          </div>

          <Row gutter={16} className="mT20">
              <Col span={4}>
                共{this.querySKUPriceBySupplier.data.total || 0}个商品 {/*，其中{this.state.}件报价异常*/}
              </Col>
              <Col span={10}>
                <Checkbox checked={this.state.only_display_high} onChange={this.onCheckboxChange.bind(this)}>仅显示高于市调价格</Checkbox>
              </Col>

              <Col span={10} >
                <RadioGroup onChange={this.onSortRadioChange.bind(this)} value={this.state.order_by}>
                  <Radio key="1" value={'price'}>按最低报价高低排序</Radio>
                  <Radio key="2" value={'sur_ratio'}>按报价与市调比例排序</Radio>
                </RadioGroup>
              </Col>
          </Row>
         

          <Table columns={columns} className="mT10"
            rowKey={record => record['sku']}
            dataSource={this.querySKUPriceBySupplier.data.rows /*this.state.data*/}
            loading={this.state.loading}
            onChange={this.handleTableChange.bind(this)}
            pagination={pagination}
            rowClassName={()=>'f14'}
            bordered
          />


      </div>
    );
  }
}

module.exports = SupplierProd