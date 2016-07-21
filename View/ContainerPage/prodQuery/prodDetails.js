import React from 'react'
import {
  Link
} from 'react-router'

import Radio from '../../Components/radio'

import Table from '../../Components/table'
import Checkbox from '../../Components/checkbox'
import Button from '../../Components/button'
import Tip from '../../Components/Tip'
import Icon from '../../Components/icon'


class ProdDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      pagination: {},
      loading: false,
    }
  }
  componentDidMount() {
    this.fetch();
  }
  componentWillMount() {
    this.updateTodo = this.props.store.updateTodo;

    //得到url中的参数
    this.locationQuery = this.props.location.query;

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
  fetch(params = {}) {
    this.setState({
      loading: true
    });

    const pagination = this.state.pagination;

    this.getskudetailPOST.city_id = this.locationQuery.city_id
    this.getskudetailPOST.sku_id = this.locationQuery.sku_id
    this.getskudetailPOST.class1 = this.locationQuery.class1

    this.updateTodo(this.getskudetailPOST);

    //ajax请求成功后更改 getallotlist
    //请求getallotlist接口
    //参数getskudetailPOST

    const {
      ajaxData,
      ajaxSucceed,
      ajaxFailed
    } = this.props.store;

    ajaxData({
      url: 'getskudetail',
      method: 'post',
      succeed: ajaxSucceed,
      failed: ajaxFailed,
      body: JSON.stringify(this.getskudetailPOST),
      beforeCallback: () => {
        this.setState({
          loading: true
        });
      },
      afterCallback: () => {
        this.setState({
          data: this.getskudetail.data ? this.getskudetail.data.rows : [],
          pagination: this.state.pagination,
        });
      },
      finalCallback: () => {
        this.setState({
          loading: false,
        });
      }
    })



  }



  render() {

    this.getskudetailPOST = this.props.store.data.FetchData[0]['getskudetailPOST']; //一定要改
    this.getskudetail = this.props.store.data.FetchData[0]['getskudetail']; //一定要改

    // if (!this.getskudetail.ret) {
    //   alert(this.getskudetail.msg);
    //   return (<div>{this.getskudetail.msg}</div>)
    // }
    //表格列表
    const columns = [{
      title: '供应商名称',
      dataIndex: 'supplier_name',
      width: '10%',
      className: 'f14'
    }, {
      title: '供应商编码',
      dataIndex: 'supplier_no',
      className: 'f14',
      width: '8%',
    }, {
      title: '联系人',
      dataIndex: 'contact_person',
      className: 'f14',
      width: '6%',
    }, {
      title: '联系电话',
      dataIndex: 'contact_phone',
      className: 'f14',
      width: '10%',
    }];


    // this.getskudetail.data.rows && this.getskudetail.data.rows.map((value, k) => {
    //   this.getskudetail.data.rows[k].quote_period && this.getskudetail.data.rows[k].quote_period.map((item, key) => {
    //     let prices = {
    //       title: item.title,
    //       className: 'f14',
    //       width: '10%',
    //       render: (text, render) => {
    //         let content = ''
    //         if (item.is_lowest == 1) {
    //           content = < label style = {
    //             {
    //               fontFamily: '.PingFangSC-Regular',
    //               fontSize: '8px',
    //               color: '#ffffff',
    //               fontWeight: 'normal',
    //               letterSpacing: '0px',
    //               textAlign: 'left',
    //               background: '#4acb81',
    //               width: '30px',
    //               height: '15px'
    //             }
    //           } > 最低 < /label>
    //         }
    //         if (item.is_repeatedly == 1) {
    //           let str = '';
    //           str = item.change_price.map((v, i) => (
    //             <p key={i}>于{timestampformat(v.time)}修改价格为{v.price}</p>
    //           ))
    //           content = <span>
    //                   {content}&nbsp;
    //                           <Tooltip placement="rightTop" title={str}>
    //                               <span style={{color:'red'}}><Icon type="question-circle-o"></Icon></span>
    //                           </Tooltip>
    //                   </span>
    //         }
    //         return <div>{item.price}&nbsp;{content}</div>
    //       }
    //     }
    //     columns.push(prices);
    //   })
    // })

    this.getskudetail.data.titles && this.getskudetail.data.titles.map((item, key) => {
      let val = '',
        name = '';
      for (let k in item) {
        name = item[k]
        val = k;
      }
      let prices = {
        title: name,
        dataIndex: val,
        className: 'f14',
        width: '10%',
        render: (text, render) => {
          if (render.quote_periods.length) {
            var con = '';
            var result = render.quote_periods.some((it, i) => {
              if (it.quote_time == val) {
                con = it;
                return true;
              } else {
                return false;
              }
            });
            if (result) {

              let content = ''
              if (con.is_lowest == 1) {
                content = < label style = {
                  {
                    fontFamily: '.PingFangSC-Regular',
                    fontSize: '8px',
                    color: '#ffffff',
                    fontWeight: 'normal',
                    letterSpacing: '0px',
                    textAlign: 'left',
                    background: '#4acb81',
                    width: '30px',
                    height: '15px'
                  }
                } > 最低 < /label>
              }
              if (con.is_repeatedly == 1) {
                let str = '';
                str = con.change_price.map((v, i) => (
                  <p style={{fontSize:'10px',lineHeight:'10px'}} key={i}>于{timestampformat(v.c_t)}修改价格为{v.price}</p>
                ))
                content = <span>
                                        {content}<Tip params={{content: str,
                                          width: 220,
                                          left: 40}}/>
                                  </span>
              }
              return <div>{con.price}&nbsp;{content}</div>

            } else {
              return <div></div>
            }
          } else {
            return <div></div>
          };

        }
      }
      columns.push(prices);
    })

    return (
      <div id="ProdDetails" style={{padding:'0 15px',marginBottom:'100px'}}>
      
          <div className="box boxH">
              <div style={{fontWeight: 500,fontSize:'24px'}}>{this.locationQuery.sku_name}</div> 
              <div className="flex1" style={{marginLeft:'10px', lineHeight:'34px', border:'1px solid #d8d8d8'}}>
                &nbsp;SIID:{this.locationQuery.sku_id}  <span style={{color:'#e9e9e9',padding:'0 20px'}}>|</span>  
                &nbsp;等级:{this.locationQuery.sku_level} <span style={{color:'#e9e9e9',padding:'0 20px'}}>|</span> 
                &nbsp;品牌:{this.locationQuery.sku_brand} <span style={{color:'#e9e9e9',padding:'0 20px'}}>|</span> 
                &nbsp;规格:{this.locationQuery.sku_stad} <span style={{color:'#e9e9e9',padding:'0 20px'}}>|</span>
                &nbsp;计量单位：{this.locationQuery.sku_unit} <span style={{color:'#e9e9e9',padding:'0 20px'}}>|</span> 
                &nbsp;最新市调价格:{this.locationQuery.sur_price} 
              </div>
              <div style={{width:'100px'}}></div>
          </div>
          <div className="box boxH" style={{marginTop:'15px'}}>
              共{this.getskudetail.data.rows && this.getskudetail.data.rows.length}个供应商  
          </div>
          <Table columns={columns} className="mT20"
            rowKey={record => record['supplier_id']}
            dataSource={this.state.data}
            loading={this.state.loading}
            onChange={this.handleTableChange.bind(this)}
            pagination={false}
            rowClassName={()=>'f14'}
            bordered
          />

      </div>
    );
  }
}

module.exports = ProdDetails