import React from 'react'
import {
  Link
} from 'react-router'

import Card from '../../Components/card'
import Row from '../../Components/row'
import Col from '../../Components/col'

import TableComponent from '../../Components/TableComponent'
import Button from '../../Components/button'

import ReactEcharts from 'echarts-for-react';


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  componentDidMount() {

  }
  componentWillMount() {
    // loadnewpro
    this.loadnewproPOST = this.props.store.data.FetchData[0]['loadnewproPOST'];



    let getNowFormatDate = (week) => {
      var date = new Date();
      if (week) {
        date = new Date(date.getTime() - 6 * 24 * 3600 * 1000);
      }
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    }

    this.loadnewproPOST.c_t = getNowFormatDate('week') + " - " + getNowFormatDate();

    const {
      ajaxData,
      ajaxSucceed,
      ajaxFailed
    } = this.props.store;

    ajaxData({
      url: 'loadnewpro',
      method: 'post',
      succeed: ajaxSucceed,
      failed: ajaxFailed,
      body: JSON.stringify(this.loadnewproPOST)
    })

    ajaxData({
      url: 'getNewProSubmissionCount',
      method: 'post',
      succeed: ajaxSucceed,
      failed: ajaxFailed
    })



  }

  render() {

    this.loadnewpro = this.props.store.data.FetchData[0]['loadnewpro'];
    this.getNewProSubmissionCount = this.props.store.data.FetchData[0]['getNewProSubmissionCount'];

    //echar 数据加载
    var charOptions = this.loadnewpro.myChart_option;
    var option = {
      st1: '待分配任务务数',
      st2: '新增引入任务数',
      st3: '已引入数',
      st4: '暂时不引入数',
      st9: '已设为无效'
    }
    var tableOption = {
      head: [{
        field: 'date_default',
        text: '日期'
      }],
      data: this.loadnewpro,
    }
    if (this.loadnewpro.rows[0]) {
      for (var key in this.loadnewpro.rows[0]) {
        if (key.indexOf('st') == 0) {
          tableOption.head.push({
            field: key,
            text: option[key]
          })
        }
      }
    }


    //工作概况 块
    let cards = [];
    if (this.getNewProSubmissionCount.ret == 1 && this.getNewProSubmissionCount.data && this.getNewProSubmissionCount.data.length) {
      this.getNewProSubmissionCount.data.map((item, key) => {
        let cardRows = [];
        if (item.rows && item.rows.length) {
          item.rows.map((con, index) => {
            let i = index + '_row'
            cardRows.push(<div key={i} className="flex1 text-center box boxV">
                                            <div className="flex1 text-center">{con.title}</div>
                                            <div className="flex1 text-center">{con.value}</div>
                                        </div>);
          });
        }
        let k = key + '_card';
        cards.push(<Card key={k} bodyStyle={{ backgroundColor:'white',padding:'0px'}} >
                                <p style={{borderBottom:'1px solid #d9d9d9',padding:'8px 15px',backgroundColor:'#f5f5f5'}}>{item.head}</p>
                                    <div className="box boxH p10">
                                        {cardRows}
                                    </div>
                                    
                            </Card>);
      });
    }



    return (
      <div id="Home" style={{padding:'0 15px'}}>

                <Card title="工作概况" style={{ width: '100%',backgroundColor:'#f5f5f5'}} bodyStyle={{ backgroundColor:'white',padding:'10px 20px'}}>
                    <Row gutter={16}>

                        <Col span='6' style={{margin:'10px 0'}}>
                            {cards}
                        </Col>

                    </Row>
                </Card>

                <Card title="工作明细" style={{ width: '100%',marginBottom:'15px',backgroundColor:'#f5f5f5',marginTop:'20px'}} bodyStyle={{ backgroundColor:'white',padding:'20px'}}>
                    <ReactEcharts
                        option={charOptions} 
                        style={{height: '300px',marginBottom:'10px'}} 
                        theme={"theme_name"}/>
                    <TableComponent params={tableOption} />
                </Card>

            </div>
    );
  }
}

module.exports = Home