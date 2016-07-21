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


class Operation extends React.Component {
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


        sku_allot: 'sku_name', //商品及分配人类型

        footer: false,

      }
    }


    supplier(record, editor, paramsKey, id) {
      let idNum = id;
      let addRemove = (type, key) => {
        if (type == 'add') {
          this.updateData(paramsKey, (e) => {
            this[paramsKey]['supplier'].push({
              c_t: '',
              comment: "",
              s_name: "",
              s_phone: ""
            });
          })
        } else if (type == 'remove') {
          this.updateData(paramsKey, (e) => {
            this[paramsKey]['supplier'].splice(key, 1);
          })
        }
        if (typeof idNum == 'number') {
          this.yrFun(idNum);
        } else {
          this.start();
        }
      };

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
      } else if (editor && paramsKey) {
        record.supplier.map((row, key) => {
          suppliers.push(<div  key={key} className="box boxV mT10 p10 pL20 pR20"  style={{borderRadius:'10px',border:'1px solid gainsboro',backgroundColor:'#f9f9f9'}}>
                  <div className="box boxH">
                      <div className="text-right" style={{width:'80px',lineHeight:'30px'}}>供应商：</div>
                      <div className="flex1 pL10">
                          <Input  placeholder="请输入供应商" onBlur={this.updateData.bind(this,paramsKey,(e)=>{
                              this[paramsKey]['supplier'][key].s_name = e.target.value;
                              this[paramsKey].autoid  = id.toString();
                            })}/>
                      </div>
                  </div>
                  <div className="box boxH">
                      <div className="text-right" style={{width:'80px',lineHeight:'30px'}}>电话：</div>
                      <div className="flex1 pL10 mT10">
                          <Input  placeholder="请输入电话" onBlur={this.updateData.bind(this,paramsKey,(e)=>{
                              this[paramsKey]['supplier'][key].s_phone = e.target.value;
                            })}/>
                      </div>
                  </div>
                  <div className="box boxH">
                      <div className="text-right" style={{width:'80px',lineHeight:'30px'}}>引入时间：</div>
                      <div className="flex1 pL10 mT10">
                          <DatePicker style={{width:'100%'}} onChange={((value, dateString)=>{
                            this.updateData(paramsKey,(e)=>{
                              this[paramsKey]['supplier'][key].c_t = dateString;
                            })
                          }).bind(this)} />
                      </div>
                  </div>
                  <div className="box boxH">
                      <div className="text-right" style={{width:'80px',lineHeight:'30px'}}>备注：</div>
                      <div className="flex1 pL10 mT10">
                          <Input type="textarea"  rows='5' onBlur={
                              this.updateData.bind(this, paramsKey, (e) => {
                                      this[paramsKey]['supplier'][key].comment = e.target.value;
                              })
                          } placeholder="备注"  />
                      </div>

                  </div>
                  {key != 0 && <div className="text-right mT10" onClick={addRemove.bind(this,'remove',key)} style={{color:'#2db7f5'}}><Icon type="minus-circle" style={{marginRight:'5px'}}/>删除</div>} 
              </div>);
        });

        suppliers.push( < div key = 'adbe'
          onClick = {
            addRemove.bind(this, 'add')
          }
          style = {
            {
              color: '#2db7f5',
              marginTop: '10px'
            }
          } > <Icon type="plus-circle" style={{marginRight:'5px'}}/>
          添加供应商 < /div>);
        }
        return suppliers;
      }
      yrFun(autoid) {
        let rows = this.supplier(this.importapiPOST, true, 'importapiPOST', autoid);
        this.setState({
          footer: false,
          title: '引入新品',
          submitType: 'yr',
          visible: true,
          ModalText: <div>
                {rows}
            </div>
        });
      }
      showModal(record, mode) { //modal对话框
        if (mode == 'ck') {
          //查看详情
          var pics = [],
            suppliers = [];
          if (record.pics && record.pics.length) {
            record.pics.map((row, key) => {
              pics.push(<div key={key} className="custom-image" style={{marginRight:'5px',marginBottom:'5px'}}>
                <img alt="example" style={{width:'92px',height:'100px'}} src={row} />
            </div>);
            });
          }

          suppliers = this.supplier(record);

          this.setState({
            footer: [<Button key="back" type="ghost" size="large" onClick={this.handleCancel.bind(this)}>返 回</Button>],
            title: '新品详情',
            visible: true,
            ModalText: <div>
                <div className='box boxH'>
                    <h3 className='flex1'><strong>{record.sku_name}</strong></h3>
                    <div style={{marginTop:'20px'}}><Button type='primary'>待分配</Button></div>
                </div>
                
                <strong><label style={{width:'200px'}}>一级分类：{record.category1_name}</label>       城市：{record.city_name}</strong>
                <div className='box boxH' style={{color:'#999'}}>
                      <span style={{width:'200px'}}>零售价：{record.sale_price!=null?record.sale_price/100:''}</span>
                      <span>规格：{record.specification}</span>
                </div> 
                
                {pics.length != 0 && <div><div style={{height:'1px', width:'100%',marginTop:'10px',marginBottom:'10px',borderBottom: '1px dashed rgb(204, 204, 204)'}}></div>
                
                <div className='box boxH boxW'>
                  {pics}
                </div>
                </div>}

                <div style={{height:'1px', width:'100%',marginTop:'10px',marginBottom:'10px',borderBottom: '1px dashed rgb(204, 204, 204)'}}></div>
                <p><label style={{width:'200px'}}>提交部门：{record.report.u_name}</label>       
                    <span style={{color:'#999'}}>提交日期：{record.report.c_t!=null?timestampformat(record.report.c_t):''}</span>
                </p>
                <div className='box boxH' style={{color:'#999'}}>          
                      <span>提交部门备注：{record.report.comment}</span>
                </div>
                <div style={{height:'1px', width:'100%',marginTop:'10px',marginBottom:'10px',borderBottom: '1px dashed rgb(204, 204, 204)'}}></div>
                <p><label style={{width:'200px'}}>分配人：{record.allot.u_name}</label>       
                    <span style={{color:'#999'}}>分配日期：{record.allot.c_t!=null?timestampformat(record.allot.c_t):''}</span>
                </p>
                <div className='box boxH' style={{color:'#999'}}>          
                      <span>分配备注：{record.allot.comment}</span>
                </div> 
                <div style={{height:'1px', width:'100%',marginTop:'10px',marginBottom:'10px',borderBottom: '1px dashed rgb(204, 204, 204)'}}></div>
                <p><label style={{width:'200px'}}>执行人：{record.operation.u_name}</label>       
                    <span style={{color:'#999'}}>执行日期：{record.operation.c_t!=null?timestampformat(record.operation.c_t):''}</span>
                </p>
                <div className='box boxH' style={{color:'#999'}}>          
                      <span>执行备注：{record.operation.comment}</span>
                </div> 
                <div>{suppliers}</div>
            </div>

          });
        } else if (mode == 'gl') {
          //关联供应商
          var suppliers = this.supplier(record);
          suppliers.length && this.setState({
            footer: [<Button key="back" type="ghost" size="large" onClick={this.handleCancel.bind(this)}>返 回</Button>],
            title: '供应商资料',
            visible: true,
            ModalText: <div>{suppliers}</div>
          });
        } else if (mode == 'yr') {
          this.importapiPOST = {
            autoid: '',
            supplier: [{
              s_name: '',
              s_phone: '',
              c_t: '',
              comment: ''
            }]
          }
          this.updateTodo(this.importapiPOST);
          //引入
          this.yrFun(record.autoid);
        } else if (mode == 'zbyr') {
          this.notimportapiPOST = {
            autoid: '',
            comment: ''
          }
          this.updateTodo(this.notimportapiPOST);
          //暂不引入
          this.setState({
            footer: false,
            title: '不配引入新品',
            visible: true,
            submitType: 'zbyr',
            ModalText: <div className="box boxV">
            <div className="box boxH">
                <div className="text-right" style={{width:80,lineHeight:'30px'}}>商品名称：</div>
                <div className="flex1" style={{lineHeight:'30px'}}>{record.sku_name}</div>
            </div>
            <div className="box boxH">
                <div className="text-right" style={{width:80,lineHeight:'30px'}}>城市：</div>
                <div className="flex1" style={{lineHeight:'30px'}}>{record.city_name}</div>
            </div>
            <div className="mT10">
              <Input  type="textarea" rows='5' onBlur={
                this.updateData.bind(this, 'notimportapiPOST', (e) => {
                  this.notimportapiPOST.comment = e.target.value;
                  this.notimportapiPOST.autoid  = record.autoid;
                })
              } placeholder="请输入不引入该新品的原因" />
            </div>
        </div>

          });
        }
      }
      handleOk(submitType) { //modal对话框

        const {
          ajaxData,
          ajaxSucceed,
          ajaxFailed
        } = this.props.store;
        if (submitType == 'zbyr') {

          ajaxData({
            url: 'notimportapi',
            method: 'post',
            succeed: ajaxSucceed,
            failed: ajaxFailed,
            body: JSON.stringify(this.notimportapiPOST)
          })

        } else if (submitType == 'yr') {
          //发起请求参数 importapiPOST
          //返回 importapi

          ajaxData({
            url: 'importapi',
            method: 'post',
            succeed: ajaxSucceed,
            failed: ajaxFailed,
            body: JSON.stringify(this.importapiPOST)
          })

        } else if (submitType == 'blyr') {


          this.setState({
            selectedRowKeys: [],
            selectedRows: [],
          });


          ajaxData({
            url: 'batchimportapi',
            method: 'post',
            succeed: ajaxSucceed,
            failed: ajaxFailed,
            body: JSON.stringify(this.batchimportapiPOST)
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

        // this.fetch();

        const that = this;
        setTimeout(function() {
          ajaxData({
            url: 'getintroducelist',
            method: 'post',
            succeed: ajaxSucceed,
            failed: ajaxFailed,
            body: JSON.stringify(that.getintroducelistPOST),
            beforeCallback: () => {
              that.setState({
                loading: true,
                selectedRowKeys: []
              });
            },
            afterCallback: () => {
              that.setState({
                loading: false,
                data: that.getintroducelist.rows,
                pagination: that.state.pagination,
              });
              that.noJurisdiction(that.getintroducelist);
            }
          })
        }, 500);

      }

      handleCancel() { //modal对话框
        this.setState({
          visible: false,
          ModalText: ''
        });
      }


      //无权限
      noJurisdiction(data) {
        if (data.ret && data.ret == '403') {
          alert(data.msg);
        } else if (data.data && typeof data.data == 'string') {
          alert(data.data);
        }
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
        this.getintroducelistPOST.page = 1;
        this.fetch({}, true);
      }

      //表格
      fetch(params = {}, pageInit) {

          const pagination = this.state.pagination;
          // if (pagination.current != undefined) {
          //   this.getintroducelistPOST.offset = (pagination.current - 1) * this.getintroducelistPOST.limit;
          //   this.updateTodo(this.getintroducelistPOST);
          // }

          if (!pageInit) {
            if (pagination.current != undefined) {
              this.getintroducelistPOST.offset = (pagination.current - 1) * this.getintroducelistPOST.limit;
            }
          } else {
            pagination.current = 1;
          }

          this.updateTodo(this.getintroducelistPOST);

          //ajax请求成功后更改 getintroducelist
          //请求getintroducelist接口
          //参数getintroducelistPOST
          const {
            ajaxData,
            ajaxSucceed,
            ajaxFailed
          } = this.props.store;

          ajaxData({
            url: 'getintroducelist',
            method: 'post',
            succeed: ajaxSucceed,
            failed: ajaxFailed,
            body: JSON.stringify(this.getintroducelistPOST),
            beforeCallback: () => {
              this.setState({
                loading: true,
                selectedRowKeys: []
              });
            },
            afterCallback: () => {
              this.setState({
                loading: false,
                data: this.getintroducelist.rows,
                pagination: this.state.pagination,
              });
              this.noJurisdiction(this.getintroducelist);
            }
          })

        }
        //表格
      start(update) {

          if (update) {
            this.batchimportapiPOST = {
              autoid: '',
              supplier: [{
                s_name: '',
                s_phone: '',
                c_t: '',
                comment: ''
              }]
            }
            this.updateTodo(this.batchimportapiPOST);
          }

          //获取选中行的数据 this.state.selectedRows this.state.selectedRows
          let list = [];
          if (this.state.selectedRows && this.state.selectedRows.length) {
            this.state.selectedRows.map((item, key) => {
              list.push(<div key={key} className="box boxH" style={{lineHeight:'25px'}}><div className="flex1"><b>{item.sku_name}</b></div><div style={{width:100}}>城市：{item.city_name}</div></div>);
            });
          }
          let rows = this.supplier(this.batchimportapiPOST, true, 'batchimportapiPOST', this.state.selectedRowKeys);

          this.setState({
            footer: false,
            title: '批量引入新品',
            submitType: 'blyr',
            visible: true,
            ModalText: <div>
                <Tabs defaultActiveKey="1">
                  <TabPane tab="供应商资料" key="1">{rows}</TabPane>
                  <TabPane tab="已选新品" key="2" >
                      <div style={{backgroundColor:'#5bc0de',color:'#fff',padding:'5px',marginBottom:'10px'}} className="text-center">已选中{this.state.selectedRowKeys.length}个新品</div>
                      {list}
                  </TabPane>
                </Tabs>
                
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

        this.getintroducelistPOST = this.props.store.data.FetchData[0]['getintroducelistPOST'];
        this.notimportapiPOST = this.props.store.data.FetchData[0]['notimportapiPOST'];
        this.importapiPOST = this.props.store.data.FetchData[0]['importapiPOST'];
        this.batchimportapiPOST = this.props.store.data.FetchData[0]['batchimportapiPOST'];

        //请求getcity接口
        //参数{"search":"all"}

        //请求getclass1接口
        //参数{"search":"all"}

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

      }

      onChangePicker(value, dateString) { //提交日期 类型
        this.getintroducelistPOST.report_t1 = "";
        this.getintroducelistPOST.report_t2 = "";
        this.getintroducelistPOST.allot_t1 = "";
        this.getintroducelistPOST.allot_t2 = "";
        this.getintroducelistPOST[this.getintroducelistPOST.time_type + '1'] = dateString[0];
        this.getintroducelistPOST[this.getintroducelistPOST.time_type + '2'] = dateString[1];
        this.updateTodo(this.getintroducelistPOST);
      }
      handleChange(key, value) {
        if (key == 'sku_allot') { //商品及分配人类型
          this.setState({
            sku_allot: value
          })
        } else {
          this.getintroducelistPOST[key] = value;
          this.updateTodo(this.getintroducelistPOST);
        }
      }

      updateData(key, callback, e) {
        callback(e);
        this.updateTodo(this[key]);
      }
      tabCallback(key) {
        this.getintroducelistPOST.status = key;
        // this.updateTodo(this.getintroducelistPOST);
        //请求getintroducelist接口
        //参数getintroducelistPOST
        // this.fetch();
        this.query();
      }
      onRadioChange(e) {
        this.setState({
          valueRadio: e.target.value,
        });
        this.getintroducelistPOST.sort_key = e.target.value;
        // this.updateTodo(this.getintroducelistPOST);
        // this.fetch();
        this.query();
      }

      view(mode, render) {
        this.showModal(render, mode);
      }

      render() {
        this.getcity = this.props.store.data.FetchData[0]['getcity'];
        this.getclass1 = this.props.store.data.FetchData[0]['getclass1'];

        this.getintroducelist = this.props.store.data.FetchData[0]['getintroducelist'];

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

        let state2 = "待引入(" + this.getintroducelist.lb_allot + ")";
        let state3 = "已引入(" + this.getintroducelist.lb_opera + ")";
        let state4 = "暂不引入(" + this.getintroducelist.lb_refuse + ")";


        //表格列表
        let columns2 = [{
          title: '商品名称',
          dataIndex: 'sku_name',
          width: '8%',
        }, {
          title: '一级分类',
          dataIndex: 'category1_name',
          width: '8%',
        }, {
          title: '城市',
          dataIndex: 'city_name',
          width: '5%',
        }, {
          title: '提交部门',
          dataIndex: 'report.u_name',
          width: '10%',
        }, {
          title: '分配人',
          dataIndex: 'allot.u_name',
          width: '10%',
        }, {
          title: '分配人备注',
          dataIndex: 'allot.comment',
          width: '10%',
        }, {
          title: '提交日期',
          dataIndex: 'report.c_t',
          width: '10%',
          render: (text) => (
            timestampformat(text)
          )
        }, {
          title: '详情',
          width: '10%',
          key: 'view',
          render: (text, record) => (
            <Button  className="btn-info" size="small" onClick={this.view.bind(this,'ck',record)} ><span style={{fontSize:'12px'}}>查看 <Icon type="picture" /></span></Button>
          )
        }, {
          title: '操作',
          key: 'operation',
          render: (text, record) => (
            <span>
          <Button type="primary" className="mR10" size="small" onClick={this.view.bind(this,'yr',record)} ><span style={{fontSize:'12px'}}>引入</span></Button>
          <Button  className="btn-danger" size="small" onClick={this.view.bind(this,'zbyr',record)} ><span style={{fontSize:'12px'}}>暂不引入</span></Button>
        </span>
          ),
        }];

        let columns3 = [{
          title: '商品名称',
          dataIndex: 'sku_name',
          width: '10%',
        }, {
          title: '一级分类',
          dataIndex: 'category1_name',
          width: '10%',
        }, {
          title: '城市',
          dataIndex: 'city_name',
          width: '10%',
        }, {
          title: '提交部门',
          dataIndex: 'report.u_name',
          width: '10%',
        }, {
          title: '分配人',
          dataIndex: 'allot.u_name',
          width: '10%',
        }, {
          title: '执行人',
          dataIndex: 'operation.u_name',
          width: '10%',
        }, {
          title: '执行日期',
          dataIndex: 'operation.c_t',
          width: '10%',
          render: (text) => (
            timestampformat(text)
          )
        }, {
          title: '关联供应商',
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
          title: '详情',
          width: '10%',
          key: 'view',
          render: (text, record) => (
            <Button  className="btn-info" size="small" onClick={this.view.bind(this,'ck',record)} ><span style={{fontSize:'12px'}}>查看 <Icon type="picture" /></span></Button>
          )
        }];

        let columns4 = [{
          title: '商品名称',
          dataIndex: 'sku_name',
          width: '10%',
        }, {
          title: '一级分类',
          dataIndex: 'category1_name',
          width: '10%',
        }, {
          title: '城市',
          dataIndex: 'city_name',
          width: '10%',
        }, {
          title: '提交部门',
          dataIndex: 'report.u_name',
          width: '10%',
        }, {
          title: '分配人',
          dataIndex: 'allot.u_name',
          width: '10%',
        }, {
          title: '执行人',
          dataIndex: 'operation.u_name',
          width: '10%',
        }, {
          title: '暂不引入',
          dataIndex: 'operation.comment',
          width: '10%',
        }, {
          title: '执行日期',
          dataIndex: 'operation.c_t',
          width: '10%',
          render: (text) => (
            timestampformat(text)
          )
        }, {
          title: '详情',
          width: '10%',
          key: 'view',
          render: (text, record) => (
            <Button  className="btn-info" size="small" onClick={this.view.bind(this,'ck',record)} ><span style={{fontSize:'12px'}}>查看 <Icon type="picture" /></span></Button>
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
          total: this.getintroducelist.total,
          showSizeChanger: true,
          onShowSizeChange(current, pageSize) {
            t.getintroducelistPOST.limit = pageSize;
            t.updateTodo(t.getintroducelistPOST);
          },
          onChange(current) {},
        };



        return (
          <div id="Operation"  style={{padding:'0 15px'}}>
          <div style={{backgroundColor:'#f7f7f7',padding:'15px'}}>
              <Row gutter={16}>
                  <Col span='3'>
                    <Select showSearch
                        style={{width:'100%'}}
                        placeholder="选择分类"
                        optionFilterProp="children"
                        notFoundContent="无法找到"
                        onChange={this.handleChange.bind(this,'category1')}
                    >
                        <Option value=''>全部分类</Option>
                        {optionsClassRows}
                    </Select>
                  </Col>
                  <Col span='3'>
                    <Select showSearch
                        style={{width:'100%'}}
                        placeholder="选择城市"
                        optionFilterProp="children"
                        notFoundContent="无法找到"
                        onChange = {
                          this.handleChange.bind(this, 'city_id')
                        } >
                        <Option value=''>全部城市</Option>
                        {optionsRows}
                    </Select>
                  </Col>
                  <Col span='8' >
                      <Row gutter={3} style={{backgroundColor:'white',borderRadius: '5px'}}>
                            <Col span='9'>
                                <Select defaultValue="report_t" style={{ width: '100%'}} onChange={this.handleChange.bind(this,'time_type')}>
                                  <Option value="report_t">提交日期</Option>
                                  <Option value="allot_t">分配日期</Option>
                                </Select>
                            </Col>
                            <Col span='15'>
                                  <RangePicker style={{width:'100%' }} onChange={this.onChangePicker.bind(this)} />
                            </Col>
                      </Row>
                  </Col>
                  <Col span='8' >
                    <Row  gutter={3} style={{backgroundColor:'white',borderRadius: '5px'}}>
                        <Col span='9'>
    <Select defaultValue="sku_name" onChange={this.handleChange.bind(this,'sku_allot')}>
                                <Option value="sku_name">商品</Option>
                                <Option value="allot_name">分配人</Option>
                              </Select>
                        </Col>
                        <Col span='15'>
                            <Input style={{width:'100%'}}   size="small"  placeholder="输入商品名称" onBlur={this.updateData.bind(this,'getintroducelistPOST',(e)=>{
                              this.getintroducelistPOST.allot_name = '';
                              this.getintroducelistPOST.sku_name = '';
                              this.getintroducelistPOST[this.state.sku_allot] = e.target.value;
                            })}/>
                        </Col>
                    </Row>
                  </Col>
                  <Col span='2'>
                    <Button style={{width:'100%'}} type="primary" onClick={this.query.bind(this)}><span style={{fontSize:'12px'}} >查 询</span></Button>
                  </Col>
              </Row>
          </div>

          <p className="mT20">提交新品：{this.getintroducelist.lb_all}</p>

          <Tabs className="mT10" defaultActiveKey={this.getintroducelistPOST.status} onChange={this.tabCallback.bind(this)}>
                <TabPane tab={state2} key="2"></TabPane>
                <TabPane tab={state3} key="3"></TabPane>
                <TabPane tab={state4} key="4"></TabPane>
          </Tabs>

          

          

          <div className="box boxH mB10">
              {this.getintroducelistPOST.status == 2 && <div >
                <Button type="primary" onClick={this.start.bind(this,true)}
                  disabled={!hasSelected} loading={loading}
                ><span style={{fontSize:'12px'}} >批量分配</span></Button>
                <span style={{ marginLeft: 8 }}>{hasSelected ? `选择了 ${selectedRowKeys.length} 个对象` : ''}</span>
              </div>}
              <div style={{marginTop:'8px',marginLeft:'20px'}}>
                <RadioGroup   onChange={this.onRadioChange.bind(this)} value={this.state.valueRadio}>
                  <Radio key="a" value='sort_report_time'>按提交日期排序</Radio>
                  <Radio key="b" value='sort_allot_time'>按分配日期排序</Radio>
                  {this.getintroducelistPOST.status == 4 && <Radio key="c" value='sort_operation_time'>按分配日期排序</Radio>}
                </RadioGroup>
              </div>
          </div>

         {this.getintroducelistPOST.status == 2 && <Table columns={columns2}
            rowKey={record => record['autoid']}
            dataSource={this.state.data}
            rowSelection={rowSelection}
            loading={this.state.loading}
            onChange={this.handleTableChange.bind(this)}
            pagination={pagination}
            bordered
          />}

          {this.getintroducelistPOST.status == 3 && <Table columns={columns3}
            rowKey={record => record['autoid']}
            dataSource={this.state.data}
            loading={this.state.loading}
            onChange={this.handleTableChange.bind(this)}
            pagination={pagination}
            bordered
          />}

          {this.getintroducelistPOST.status == 4 && <Table columns={columns4}
            rowKey={record => record['autoid']}
            dataSource={this.state.data}
            loading={this.state.loading}
            onChange={this.handleTableChange.bind(this)}
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

    module.exports = Operation