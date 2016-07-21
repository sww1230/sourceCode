import React from 'react'
import {
  Link
} from 'react-router'
import Select from '../../Components/select'
import DatePicker from '../../Components/date-picker'
import Button from '../../Components/button'
import Input from '../../Components/input'

import Row from '../../Components/row'
import Col from '../../Components/col'
import Tabs from '../../Components/tabs'

import Radio from '../../Components/radio'

import Table from '../../Components/table'

import reqwest from 'reqwest'
import Icon from '../../Components/icon'
import Modal from '../../Components/modal'



const RadioGroup = Radio.Group;


const TabPane = Tabs.TabPane;

const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;


class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valueRadio: 'sort_report_time',

      data: [],
      pagination: {},
      loading: false,
      selectedRowKeys: [], // 这里配置默认勾选列
      selectedRows: [],

      ModalText: '对话框的内容', //modal对话框
      visible: false,
      footer: false,
    }
  }

  query() {
    this.getallotlistPOST.page = 1;
    this.fetch({}, true);
  }

  showModal(title) { //modal对话框
    this.setState({
      visible: true,
      title: title
    });
  }

  handleCancel() { //modal对话框
    this.setState({
      visible: false,
      ModalText: ''
    });
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

  //表格
  fetch(params = {}, pageInit) {


    const pagination = this.state.pagination;

    // this.getallotlistPOST.offset = (pagination.current - 1) * this.getallotlistPOST.limit;
    if (!pageInit) {
      this.getallotlistPOST.page = pagination.current ? pagination.current : 1;
    } else {
      pagination.current = 1;
    }

    this.updateTodo(this.getallotlistPOST);
    // console.log(this.getallotlistPOST);


    const {
      ajaxData,
      ajaxSucceed,
      ajaxFailed
    } = this.props.store;

    ajaxData({
      url: 'getallotlist',
      method: 'post',
      succeed: ajaxSucceed,
      failed: ajaxFailed,
      body: JSON.stringify(this.getallotlistPOST),
      beforeCallback: () => {
        this.setState({
          loading: true,
          selectedRowKeys: []
        });
      },
      afterCallback: () => {
        this.setState({
          loading: false,
          data: this.getallotlist.rows,
          pagination: this.state.pagination,
        });
        this.noJurisdiction(this.getallotlist);
      }
    })

    //ajax请求成功后更改 getallotlist
    //请求getallotlist接口
    //参数getallotlistPOST
  }

  //表格
  start() {
      //批量分配的参数请空 重新设置
      this.batchassignapiPOST = {
        autoid: '',
        u_id: '',
        comment: '',
        u_name: ''
      }
      this.updateTodo(this.batchassignapiPOST);


      //全部用户
      var optionsUserRows = [];

      this.getmember.map((item, key) => {
        var con = item.id + "_" + item.name;
        optionsUserRows.push(<Option key={key} value={con}>{item.name}</Option>);
      });


      //获取选中行的ID
      var html = [],
        isContinue = true;
      this.state.selectedRows.map((item, key) => {
        // if(item.city_name)
        if (key != this.state.selectedRows.length - 1 && isContinue) {
          isContinue = item.city_id == this.state.selectedRows[key + 1].city_id;
        }
        html.push(
          <div key={key+'_key'}>
            <div key={key} style={{marginBottom:'-10px',marginLeft:'5px'}}><label style={{width:'75%'}}><h5><strong>{item.sku_name}</strong></h5></label>       <span style={{color:'#999'}}>城市：{item.city_name}</span></div>
            <div style={{height:'1px', width:'100%',marginTop:'10px',marginBottom:'10px',borderBottom: '1px dashed rgb(204, 204, 204)'}}></div>
          </div>
        );
      });

      if (!isContinue) {
        this.setState({
          footer: [<Button key="back" type="ghost" size="large" onClick={this.handleCancel.bind(this)}>返 回</Button>],
          visible: true,
          title: "批量分配",
          ModalText: '请选择同一城市下的数据分配！'
        });
        return false;
      }



      //关联供应商gl 分配fp 设为无效wx
      this.setState({
        footer: false,
        visible: true,
        submitType: 'batchassign',
        title: "批量分配",
        ModalText: <div>  
                {html}
                <div className="box boxH mT10"><label className="text-right" style={{width:'80px'}}>执行责任人： </label>
                    <Select showSearch
                        style={{width:'75%'}}
                        placeholder="请选择执行人"
                        optionFilterProp="children"
                        notFoundContent="无法找到"
                        onSelect={
                            this.updateData.bind(this,'batchassignapiPOST',(e)=>{
                                this.batchassignapiPOST.u_name =e.split('_')[1];
                                this.batchassignapiPOST.u_id = e.split('_')[0];
                                this.batchassignapiPOST.autoid = this.state.selectedRowKeys.toString();
                            })
                        }
                    >
                    {optionsUserRows}
                    </Select>
                </div>
                <div className="box boxH mT10">
                    <label className="text-right" style={{width:'80px'}}>备注： </label>
                    <div className="flex1">
                      <Input type="textarea" style={{width:'90%'}} placeholder="输入备注" onBlur={
                          this.updateData.bind(this,'batchassignapiPOST',(e)=>{
                              this.batchassignapiPOST.comment = e.target.value;
                          })
                      }/>
                    </div>
                </div>
            </div>
      });
    }
    //表格
  onSelectChange(selectedRowKeys, selectedRows) {
    this.setState({
      selectedRowKeys,
      selectedRows
    });
  }


  componentDidMount() {
    this.fetch();
  }
  componentWillMount() {
    this.updateTodo = this.props.store.updateTodo;
    this.getallotlistPOST = this.props.store.data.FetchData[0]['getallotlistPOST'];

    this.assignapiPOST = this.props.store.data.FetchData[0]['assignapiPOST']; //分配
    this.invalidapiPOST = this.props.store.data.FetchData[0]['invalidapiPOST']; //设为无效
    this.batchassignapiPOST = this.props.store.data.FetchData[0]['batchassignapiPOST']; //批量分配


    this.getmemberPOST = this.props.store.data.FetchData[0]['getmemberPOST'];



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
      url: 'getclass1',
      method: 'post',
      succeed: ajaxSucceed,
      failed: ajaxFailed
    })

    ajaxData({
      url: 'getmember',
      method: 'post',
      succeed: ajaxSucceed,
      failed: ajaxFailed,
      body: JSON.stringify(this.getmemberPOST)
    })

    //请求getcity接口
    //参数{"search":"all"}

    //请求getclass1接口
    //参数{"search":"all"}

    this.locationQuery = this.props.location.query;
    this.getallotlistPOST.report_t1 = this.locationQuery.report_t1 ? this.locationQuery.report_t1 : '';
    this.getallotlistPOST.report_t2 = this.locationQuery.report_t2 ? this.locationQuery.report_t2 : '';
    this.getallotlistPOST.city_id = this.locationQuery.city_id ? this.locationQuery.city_id : '';
    this.getallotlistPOST.category1 = this.locationQuery.category1 ? this.locationQuery.category1 : '';

  }
  onChange(value, dateString) {
    this.getallotlistPOST.report_t1 = dateString[0];
    this.getallotlistPOST.report_t2 = dateString[1];
    this.updateTodo(this.getallotlistPOST);
  }

  //select框改变post参数值的方法
  handleChange(key, value) {
    this.getallotlistPOST[key] = value;
    this.updateTodo(this.getallotlistPOST);
  }

  updateData(key, callback, e) {
    callback(e);
    this.updateTodo(this[key]);
  }

  //无权限
  noJurisdiction(data) {
    if (data.ret && data.ret == '403') {
      alert(data.msg);
    } else if (data.data && typeof data.data == 'string') {
      alert(data.data);
    }
  }

  //input框改变post参数值的方法
  handleInputChange(e) {
    this.getallotlistPOST.sku_name = e.target.value;
    this.updateTodo(this.getallotlistPOST);
  }
  tabCallback(key) {
    // console.log(key);
    // this.setState({
    //   tabState: key
    // });

    this.getallotlistPOST.sort_key = 'sort_report_time';
    this.getallotlistPOST.limit = 10;
    this.getallotlistPOST.status = key;

    // this.updateTodo(this.getallotlistPOST);
    // console.log(this.getallotlistPOST)
    //请求getallotlist接口
    //参数getallotlistPOST
    // this.fetch();
    this.query()
  }
  onRadioChange(e) {
    this.setState({
      valueRadio: e.target.value,
    });
    this.getallotlistPOST.sort_key = e.target.value;
    this.updateTodo(this.getallotlistPOST);

    this.fetch();

  }
  handleOk(submitType) { //modal对话框
    const {
      ajaxData,
      ajaxSucceed,
      ajaxFailed
    } = this.props.store;
    if (submitType == 'invalid') {
      //发起请求参数 invalidapiPOST
      //返回 notimportapi
      ajaxData({
        url: 'invalidapi',
        method: 'post',
        succeed: ajaxSucceed,
        failed: ajaxFailed,
        body: JSON.stringify(this.invalidapiPOST)
      })
    } else if (submitType == 'assign') {
      //发起请求参数 assignapiPOST
      //返回 importapi
      ajaxData({
        url: 'assignapi',
        method: 'post',
        succeed: ajaxSucceed,
        failed: ajaxFailed,
        body: JSON.stringify(this.assignapiPOST)
      })
    } else if (submitType == 'batchassign') {
      ajaxData({
        url: 'batchassignapi',
        method: 'post',
        succeed: ajaxSucceed,
        failed: ajaxFailed,
        body: JSON.stringify(this.batchassignapiPOST)
      })
    } else {
      this.setState({
        ModalText: '对话框将在两秒后关闭',
        confirmLoading: true,
      });
      setTimeout(() => {
        this.setState({
          visible: false,
          confirmLoading: false,
        });
      }, 2000);
    }

    this.setState({
      visible: false,
      ModalText: ''
    });

    const that = this;
    setTimeout(function() {
      ajaxData({
        url: 'getallotlist',
        method: 'post',
        succeed: ajaxSucceed,
        failed: ajaxFailed,
        body: JSON.stringify(that.getallotlistPOST),
        beforeCallback: function() {
          that.setState({
            loading: true,
            selectedRowKeys: []
          });
        },
        afterCallback: () => {
          that.setState({
            loading: false,
            data: that.getallotlist.rows,
            pagination: that.state.pagination,
          });
          that.noJurisdiction(that.getallotlist);
        }
      })
    }, 500);

  }

  supplier(record, editor, paramsKey, id) {
    var suppliers = [];
    if (record.status == 3 && record.supplier && record.supplier.length) {
      record.supplier.map((row, key) => {
        suppliers.push(<div key={key} className="box boxV mT10 p10 pL20 pR20"  style={{borderRadius:'10px',border:'1px solid gainsboro',backgroundColor:'#f9f9f9'}}>
                  <div className="box boxH">
                      <div className="text-right" style={{width:'80px',lineHeight:'30px'}}>供应商：</div>
                      <div className="flex1 pL10" style={{lineHeight:'30px'}}>{row.s_name}</div>
                  </div>
                  <div className="box boxH">
                      <div className="text-right" style={{width:'80px',lineHeight:'30px'}}>电话：</div>
                      <div className="flex1 pL10" style={{lineHeight:'30px'}}>{row.s_phone}</div>
                  </div>
                  <div className="box boxH">
                      <div className="text-right" style={{width:'80px',lineHeight:'30px'}}>引入时间：</div>
                      <div className="flex1 pL10" style={{lineHeight:'30px'}}>{timestampformat(row.c_t)}</div>
                  </div>
                  <div className="box boxH">
                      <div className="text-right" style={{width:'80px',lineHeight:'30px'}}>备注：</div>
                      <div className="flex1 pL10" style={{lineHeight:'30px'}}>{row.comment}</div>
                  </div>
              </div>);
      });
    }
    return suppliers;
  }

  view(mode, record) {
    var html = '';
    if (mode == 'ck') {
      var str = '';

      switch (record.status) {
        case 1:
          str = '待分配';
          break;
        case 2:
          str = '待引入';
          break;
        case 3:
          str = '已引入';
          break;
        case 4:
          str = '暂不引入';
          break;
        case 9:
          str = '已设为无效';
          break;
      }

      var pics = [];
      if (record.pics && record.pics.length) {
        record.pics.map((row, key) => {
          pics.push(<div key={key} className="custom-image" style={{marginRight:'5px',marginBottom:'5px'}}>
                <img alt="example" style={{width:'92px',height:'100px'}} src={row} />
            </div>);
        });
      }


      html = <div>
                    <div className='box boxH'>
                        <h3 className='flex1' style={{marginTop:0}}><strong>{record.sku_name}</strong></h3>
                        <div style={{marginTop:'20px'}}><Button type='primary'>{str}</Button></div>
                    </div>
                    
                    <strong><label style={{width:'200px'}}>一级分类：{record.category1_name}</label>       城市：{record.city_name}</strong>
                    <div className='box boxH' style={{color:'#999'}}>
                          <span style={{width:'200px'}}>零售价：{record.sale_price!=null?record.sale_price/100:''}</span>
                          <span>规格：{record.specification}</span>
                    </div> 
                    
                    {pics.length != 0 && <div>
                      <div style={{height:'1px', width:'100%',marginTop:'10px',marginBottom:'10px',borderBottom: '1px dashed rgb(204, 204, 204)'}}></div>
                      <div  className='box boxH'>{pics}</div>
                    </div>}

                    <div style={{height:'1px', width:'100%',marginTop:'10px',marginBottom:'10px',borderBottom: '1px dashed rgb(204, 204, 204)'}}></div>
                    <p><label style={{width:'200px'}}>提交部门：{record.report.u_name}</label>       
                        <span style={{color:'#999'}}>提交日期：{record.report.c_t!=null?timestampformat(record.report.c_t):''}</span>
                    </p>
                    <div className='box boxH' style={{color:'#999'}}>          
                          <span>提交部门备注：{record.report.comment}</span>
                    </div>


                    {record.status != 1 && <div><div style={{height:'1px', width:'100%',marginTop:'10px',marginBottom:'10px',borderBottom: '1px dashed rgb(204, 204, 204)'}}></div>
                    <p><label style={{width:'200px'}}>分配人：{record.allot.u_name}</label>       
                        <span style={{color:'#999'}}>分配日期：{record.allot.c_t!=null?timestampformat(record.allot.c_t):''}</span>
                    </p>
                    <div className='box boxH' style={{color:'#999'}}>          
                          <span>分配备注：{record.allot.comment}</span>
                    </div> 

                    {record.status != 9 && <div><div style={{height:'1px', width:'100%',marginTop:'10px',marginBottom:'10px',borderBottom: '1px dashed rgb(204, 204, 204)'}}></div>
                    <p><label style={{width:'200px'}}>执行人：{record.operation.u_name}</label>       
                        <span style={{color:'#999'}}>执行日期：{record.operation.c_t!=null?timestampformat(record.operation.c_t):''}</span>
                    </p>
                    <div className='box boxH' style={{color:'#999'}}>          
                          <span>执行备注：{record.operation.comment}</span>
                    </div></div>}</div>}
                </div>


      this.setState({
        footer: [<Button key="back" type="ghost" size="large" onClick={this.handleCancel.bind(this)}>返 回</Button>],
        visible: true,
        title: "引入新品详情",
        ModalText: html
      });
    } else if (mode == 'fp') {

      //清空分配参数 重新设置
      this.assignapiPOST = {
        autoid: '',
        u_id: '',
        comment: '',
        u_name: ''
      }
      this.updateTodo(this.assignapiPOST);

      //全部用户
      var optionsUserRows = [];

      this.getmember.map((item, key) => {
        var con = item.id + "_" + item.name;
        optionsUserRows.push(<Option key={key} value={con}>{item.name}</Option>);
      });

      this.setState({
        footer: false,
        visible: true,
        submitType: 'assign',
        title: "分配新品",
        ModalText: <div>
                <div className='box boxH'>
                    <h3 className='flex1' style={{marginTop:0}}><strong>{record.sku_name}</strong></h3>
                </div>
                <strong><label style={{width:'200px'}}>一级分类：{record.category1_name}</label>       城市：{record.city_name}</strong>
                <div className="box boxH mT10"><label className="text-right" style={{width:'80px'}}>执行责任人： </label>
                    <Select showSearch
                        style={{width:'75%'}}
                        placeholder="请选择执行人"
                        optionFilterProp="children"
                        notFoundContent="无法找到"
                        onSelect={
                            this.updateData.bind(this,'assignapiPOST',(e)=>{
                                this.assignapiPOST.u_name =e.split('_')[1];
                                this.assignapiPOST.u_id = e.split('_')[0];
                                this.assignapiPOST.autoid = record.autoid;
                            })
                        }
                    >
                    {optionsUserRows}
                    </Select>
                </div>
                <div className="box boxH mT10">
                    <label className="text-right" style={{width:'80px'}}>备注： </label>
                    <div className="flex1">
                      <Input type="textarea" style={{width:'90%'}} placeholder="输入备注" onBlur={
                          this.updateData.bind(this,'assignapiPOST',(e)=>{
                              this.assignapiPOST.comment = e.target.value;
                          })
                      }/>
                    </div>
                </div>
            </div>
      });
    } else if (mode == 'gl') {

      //关联供应商
      var suppliers = this.supplier(record);
      suppliers.length && this.setState({
        footer: [<Button key="back" type="ghost" size="large" onClick={this.handleCancel.bind(this)}>返 回</Button>],
        title: '供应商资料',
        visible: true,
        ModalText: <div>
          <div className="box boxH" style={{padding:'5px'}}>
              <div className="flex1">商品名称：{record.sku_name}</div>
              <div>城市：{record.city_name}</div>
          </div>
          {suppliers}
        </div>
      });
    } else if (mode == 'wx') {

      //清空设为无效参数 重新设置
      this.invalidapiPOST = {
        autoid: '',
        comment: ''
      }
      this.updateTodo(this.invalidapiPOST);

      //关联供应商gl 分配fp 设为无效wx
      this.setState({
        footer: false,
        visible: true,
        submitType: 'invalid',
        title: "新品设为无效",
        ModalText: <div>
                      <div className='box boxH'>
                          <h3 className='flex1' style={{marginTop:0}}><strong>{record.sku_name}</strong></h3>
                      </div>
                      <strong><label style={{width:'200px'}}>一级分类：{record.category1_name}</label>       城市：{record.city_name}</strong>
                      
                      <div className="box boxH mT10">
                          <div className="flex1">
                            <Input style={{width:'90%'}} placeholder="请输入无效原因" onBlur={
                                this.updateData.bind(this, 'invalidapiPOST', (e) => {
                                    this.invalidapiPOST.comment = e.target.value;
                                    this.invalidapiPOST.autoid  = record.autoid;
                                })
                            }/>
                          </div>
                      </div>
                  </div>
      });
    }
  }



  render() {


    this.getcity = this.props.store.data.FetchData[0]['getcity'];
    this.getclass1 = this.props.store.data.FetchData[0]['getclass1'];

    this.getallotlist = this.props.store.data.FetchData[0]['getallotlist'];
    this.getmember = this.props.store.data.FetchData[0]['getmember'];


    //全部分类
    let optionsClassRows = [];
    this.getclass1.map((item, key) => {
      optionsClassRows.push(<Option key={key} value={item.id}>{item.name}</Option>);
    });

    //全部城市
    let optionsRows = [];
    this.getcity.map((item, key) => {
      optionsRows.push(<Option key={key} value={item.id}>{item.name}</Option>);
    });

    let state1 = "待分配(" + this.getallotlist.lb_report + ")";
    let state2 = "待引入(" + this.getallotlist.lb_allot + ")";
    let state3 = "已引入(" + this.getallotlist.lb_opera + ")";
    let state4 = "暂不引入(" + this.getallotlist.lb_refuse + ")";
    let state9 = "已设为无效(" + this.getallotlist.lb_disable + ")";


    //表格列表
    const columns1 = [{
      title: '商品名称',
      dataIndex: 'sku_name',
      width: '10%',
      className: 'f14'
    }, {
      title: '一级分类',
      dataIndex: 'category1_name',
      className: 'f14',
      width: '8%',
    }, {
      title: '城市',
      dataIndex: 'city_name',
      className: 'f14',
      width: '6%',
    }, {
      title: '提交部门',
      dataIndex: 'report.u_name',
      className: 'f14',
      width: '10%',
    }, {
      title: '提交日期',
      dataIndex: 'report.c_t',
      className: 'f14',
      width: '10%',
      render: (text) => (
        timestampformat(text)
      )
    }, {
      title: '提交部门备注',
      dataIndex: 'report.comment',
      className: 'f14',
      width: '20%',
    }, {
      title: '详情',
      className: 'f14',
      width: '10%',
      key: 'view',
      render: (text, record) => (
        <Button  className="btn-info"    size="small" onClick={this.view.bind(this,'ck',record)} ><span style={{fontSize:'12px'}}>查看 <Icon type="picture" /></span></Button>
      )
    }, {
      title: '操作',
      key: 'operation',
      className: 'f14',
      render: (text, record) => (
        <span>
          <Button type="primary" className="mR10"  size="small" onClick={this.view.bind(this,'fp',record)} ><span style={{fontSize:'12px'}}>分配</span></Button>
          <Button  className="btn-danger" size="small"  onClick={this.view.bind(this,'wx',record)} ><span style={{fontSize:'12px'}}>设为无效</span></Button>
        </span>
      ),
    }];

    //表格列表
    const columns2 = [{
      title: '商品名称',
      dataIndex: 'sku_name',
      className: 'f14',
      width: '10%',
    }, {
      title: '一级分类',
      dataIndex: 'category1_name',
      className: 'f14',
      width: '10%',
    }, {
      title: '城市',
      dataIndex: 'city_name',
      className: 'f14',
      width: '10%',
    }, {
      title: '提交部门',
      dataIndex: 'report.u_name',
      className: 'f14',
      width: '10%',
    }, {
      title: '分配人',
      dataIndex: 'allot.u_name',
      className: 'f14',
      width: '10%',
    }, {
      title: '分配人备注',
      dataIndex: 'allot.comment',
      className: 'f14',
      width: '10%',
    }, {
      title: '执行人',
      dataIndex: 'operation.u_name',
      className: 'f14',
      width: '10%',
    }, {
      title: '操作',
      className: 'f14',
      width: '10%',
      key: 'view',
      render: (text, record) => (
        <Button  className="btn-info" size="small" onClick={this.view.bind(this,'ck',record)} ><span style={{fontSize:'12px'}}>查看 <Icon type="picture" /></span></Button>
      )
    }];

    //表格列表
    const columns3 = [{
      title: '商品名称',
      dataIndex: 'sku_name',
      className: 'f14',
      width: '10%',
    }, {
      title: '一级分类',
      dataIndex: 'category1_name',
      className: 'f14',
      width: '10%',
    }, {
      title: '城市',
      dataIndex: 'city_name',
      className: 'f14',
      width: '10%',
    }, {
      title: '提交部门',
      dataIndex: 'report.u_name',
      className: 'f14',
      width: '10%',
    }, {
      title: '分配人',
      dataIndex: 'allot.u_name',
      className: 'f14',
      width: '10%',
    }, {
      title: '执行人',
      dataIndex: 'operation.u_name',
      className: 'f14',
      width: '10%',
    }, {
      title: '执行日期',
      dataIndex: 'operation.c_t',
      className: 'f14',
      width: '10%',
      render: (text) => (
        timestampformat(text)
      )
    }, {
      title: '关联供应商',
      className: 'f14',
      width: '10%',
      dataIndex: 'supplier.s_name',

      render: (text, record) => {
        let str = '';
        if (record.supplier && record.supplier.length) {
          record.supplier.map((item, key) => {
            str += item.s_name + ','
          });
          str = str.substring(0, str.length - 1)
        }
        return (
          <a onClick={this.view.bind(this,'gl',record)} >{str}</a>
        )
      }

    }, {
      title: '操作',
      className: 'f14',
      width: '10%',
      key: 'view',
      render: (text, record) => (
        <Button  className="btn-info" size="small"   onClick={this.view.bind(this,'ck',record)} ><span style={{fontSize:'12px'}}>查看 <Icon type="picture" /></span></Button>
      )
    }];

    //表格列表
    const columns4 = [{
      title: '商品名称',
      dataIndex: 'sku_name',
      className: 'f14',
      width: '10%',
    }, {
      title: '一级分类',
      dataIndex: 'category1_name',
      className: 'f14',
      width: '10%',
    }, {
      title: '城市',
      dataIndex: 'city_name',
      className: 'f14',
      width: '10%',
    }, {
      title: '提交部门',
      dataIndex: 'report.u_name',
      className: 'f14',
      width: '10%',
    }, {
      title: '分配人',
      dataIndex: 'allot.u_name',
      className: 'f14',
      width: '10%',
    }, {
      title: '执行人',
      dataIndex: 'operation.u_name',
      className: 'f14',
      width: '10%',
    }, {
      title: '暂不引入',
      dataIndex: 'operation.comment',
      className: 'f14',
      width: '10%',
    }, {
      title: '执行日期',
      dataIndex: 'operation.c_t',
      className: 'f14',
      width: '10%',
      render: (text) => (
        timestampformat(text)
      )
    }, {
      title: '操作',
      className: 'f14',
      width: '10%',
      key: 'view',
      render: (text, record) => (
        <Button  className="btn-info"  size="small" onClick={this.view.bind(this,'ck',record)} ><span style={{fontSize:'12px'}}>查看 <Icon type="picture" /></span></Button>
      )
    }];

    //表格列表
    const columns9 = [{
      title: '商品名称',
      dataIndex: 'sku_name',
      className: 'f14',
      width: '10%',
    }, {
      title: '一级分类',
      dataIndex: 'category1_name',
      className: 'f14',
      width: '10%',
    }, {
      title: '城市',
      dataIndex: 'city_name',
      className: 'f14',
      width: '10%',
    }, {
      title: '提交部门',
      dataIndex: 'report.u_name',
      className: 'f14',
      width: '10%',
    }, {
      title: '分配人',
      dataIndex: 'allot.u_name',
      className: 'f14',
      width: '10%',
    }, {
      title: '设为无效原因',
      dataIndex: 'allot.comment',
      className: 'f14',
      width: '10%',
    }, {
      title: '操作日期',
      dataIndex: 'allot.c_t',
      className: 'f14',
      width: '10%',
      render: (text) => (
        timestampformat(text)
      )
    }, {
      title: '操作',
      className: 'f14',
      width: '10%',
      key: 'view',
      render: (text, record) => (
        <Button  className="btn-info" size="small" onClick={this.view.bind(this,'ck',record)}  ><span style={{fontSize:'12px'}}>查看 <Icon type="picture" /></span></Button>
      )
    }];

    const {
      loading,
      selectedRowKeys
    } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange.bind(this),
    };
    const hasSelected = selectedRowKeys.length > 0;

    const t = this;
    const pagination = {
      total: this.getallotlist.total,
      showSizeChanger: true,
      onShowSizeChange(current, pageSize) {
        t.getallotlistPOST.limit = pageSize;
        t.updateTodo(t.getallotlistPOST);
      },
      onChange(current) {},
    };



    return (
      <div id="List" style={{padding:'0 15px'}}>
          <div style={{backgroundColor:'#f3f3f3',padding:'15px'}}>
              <Row gutter={16}>
                  <Col span='5'>
                    {this.locationQuery.category1 ? <Select showSearch
                        style={{width:'100%'}}
                        placeholder="选择分类"
                        defaultValue={Number(this.locationQuery.category1)}
                        optionFilterProp="children"
                        notFoundContent="无法找到"
                        onChange={this.handleChange.bind(this,'category1')}
                    >
                        <Option value=''>全部分类</Option>
                        {optionsClassRows}
                    </Select>: <Select showSearch
                        style={{width:'100%'}}
                        placeholder="选择分类"
                        optionFilterProp="children"
                        notFoundContent="无法找到"
                        onChange={this.handleChange.bind(this,'category1')}
                    >
                        <Option value=''>全部分类</Option>
                        {optionsClassRows}
                    </Select>}
                  </Col>
                  <Col span='5'>
                    {this.locationQuery.city_id ? <Select showSearch
                        style={{width:'100%'}}
                        placeholder="选择城市"
                        defaultValue={Number(this.locationQuery.city_id)}
                        optionFilterProp="children"
                        notFoundContent="无法找到"
                        onChange={this.handleChange.bind(this,'city_id')}
                    >
                        <Option value=''>全部城市</Option>
                        {optionsRows}
                    </Select> : <Select showSearch
                        style={{width:'100%'}}
                        placeholder="选择城市"
                        optionFilterProp="children"
                        notFoundContent="无法找到"
                        onChange={this.handleChange.bind(this,'city_id')}
                    >
                        <Option value=''>全部城市</Option>
                        {optionsRows}
                    </Select>}
                  </Col>
                  <Col span='5'>
                    {this.locationQuery.report_t1 
                      ? <RangePicker style={{width:'100%' }} defaultValue={[this.locationQuery.report_t1,this.locationQuery.report_t2]} onChange={this.onChange.bind(this)} />
                      : <RangePicker style={{width:'100%' }} onChange={this.onChange.bind(this)} />
                    }
                  </Col>
                  <Col span='5'>
                    <Input style={{width:'100%'}}  placeholder="输入商品名称" onBlur={this.handleInputChange.bind(this)}/>
                  </Col>
                  <Col span='2'>
                    <Button style={{width:'100%'}} type="primary" onClick={this.query.bind(this)}><span style={{fontSize:'12px'}}>查 询</span></Button>
                  </Col>
              </Row>
          </div>

          <p className="mT20">提交新品：{this.getallotlist.lb_all}</p>


          <Tabs className="mT10" defaultActiveKey={this.getallotlistPOST.status} onChange={this.tabCallback.bind(this)}>
                <TabPane tab={state1} key="1"></TabPane>
                <TabPane tab={state2} key="2"></TabPane>
                <TabPane tab={state3} key="3"></TabPane>
                <TabPane tab={state4} key="4"></TabPane>
                <TabPane tab={state9} key="9"></TabPane>
          </Tabs>


          {this.getallotlistPOST.status == 2 && <RadioGroup  style={{ marginBottom: 10}}  onChange={this.onRadioChange.bind(this)} value={this.state.valueRadio}>
            <Radio key="a" value='sort_report_time'>按提交日期排序</Radio>
            <Radio key="b" value='sort_allot_time'>按分配日期排序</Radio>
          </RadioGroup>}

          {(this.getallotlistPOST.status == 3 || this.getallotlistPOST.status == 4) && <RadioGroup style={{ marginBottom: 10}} onChange={this.onRadioChange.bind(this)} value={this.state.valueRadio}>
            <Radio key="a" value='sort_report_time'>按提交日期排序</Radio>
            <Radio key="b" value='sort_allot_time'>按分配日期排序</Radio>
            <Radio key="c" value='sort_operation_time'>按执行日期排序</Radio>
          </RadioGroup>}


          {this.getallotlistPOST.status == 1  && <div style={{ marginBottom: 16}}>
            <Button type="primary" onClick={this.start.bind(this)}
              disabled={!hasSelected}  loading={loading}
            ><span style={{fontSize:'12px'}}>批量分配</span></Button>
            <span style={{ marginLeft: 8 }}>{hasSelected ? `选择了 ${selectedRowKeys.length} 个对象` : ''}</span>
          </div>}


          {this.getallotlistPOST.status == 1 && <Table columns={columns1}
            rowKey={record => record['autoid']}
            dataSource={this.state.data}
            rowSelection={rowSelection}
            loading={this.state.loading}
            onChange={this.handleTableChange.bind(this)}
            pagination={pagination}
            rowClassName={()=>'f14'}
            bordered
          />}

          {this.getallotlistPOST.status == 2 && <Table columns={columns2}
            rowKey={record => record['autoid']}
            dataSource={this.state.data}
            loading={this.state.loading}
            onChange={this.handleTableChange.bind(this)}
            pagination={pagination}
            rowClassName={()=>'f14'}
            bordered
          />}

          {this.getallotlistPOST.status == 3 && <Table columns={columns3}
            rowKey={record => record['autoid']}
            dataSource={this.state.data}
            loading={this.state.loading}
            onChange={this.handleTableChange.bind(this)}
            pagination={pagination}
            rowClassName={()=>'f14'}
            bordered
          />}

          {this.getallotlistPOST.status == 4 && <Table columns={columns4}
            rowKey={record => record['autoid']}
            dataSource={this.state.data}
            loading={this.state.loading}
            onChange={this.handleTableChange.bind(this)}
            rowClassName={()=>'f14'}
            pagination={pagination}
            bordered
          />}

          {this.getallotlistPOST.status == 9 && <Table columns={columns9}
            rowKey={record => record['autoid']}
            dataSource={this.state.data}
            loading={this.state.loading}
            onChange={this.handleTableChange.bind(this)}
            rowClassName={()=>'f14'}
            pagination={pagination}
            bordered
          />}


              <Modal title={this.state.title}
                    visible={this.state.visible}

                    onCancel={this.handleCancel.bind(this)}
                    footer={this.state.footer ? this.state.footer : [<Button key="back" type="ghost" size="large" onClick={this.handleCancel.bind(this)}>返 回</Button>,<Button key="submit" type="primary" size="large" loading={this.state.confirmLoading} onClick={this.handleOk.bind(this,this.state.submitType)}>提 交</Button>]}
              >
                  <div>{this.state.ModalText}</div>
              </Modal>

      </div>
    );
  }
}

module.exports = List