import React from 'react'

import {
  connect
} from 'react-redux';
import {
  bindActionCreators
} from 'redux';
import * as CounterActions from '../Action';
import {
  Link,
  IndexLink
} from 'react-router'

import Menu from '../Components/menu';
import Icon from '../Components/icon';

import tipper from '../Reducers/tipper.js'
import Modal from '../Components/modal'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const navArr = [

  [{
    text: '首页',
    url: '/'
  }],
  [{
    text: '首页',
    url: '/'
  }, {
    text: '新品引入',
    url: '/list'
  }, {
    text: '分配寻品任务'
  }],
  [{
    text: '首页',
    url: '/'
  }, {
    text: '新品引入',
    url: '/operation'
  }, {
    text: '执行寻品任务'
  }],
  [{
    text: '首页',
    url: '/'
  }, {
    text: '新品引入',
    url: '/report',
    subpage: '/city',
  }, {
    text: '寻品报表分析'
  }],
  [{
    text: '首页',
    url: '/'
  }, {
    text: '报价管理',
    url: '/prodQuery',
    subpage: '/prodDetails',
  }, {
    text: '商品查询'
  }],
  [{
    text: '首页',
    url: '/'
  }, {
    text: '报价管理',
    url: '/supplierQuery',
    subpage: '/supplierProd',
  }, {
    text: '供应商查询'
  }]
];


class Index extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};

    //根据pathname获取当前选中的菜单项
    //遍历navArr，找出匹配的那一项，就是current
    const pathname = props.location.pathname;
    let c = navArr.findIndex((item, i) => {

      //直接匹配「首页」后面的一项url
      if (!item[1]) return false;

      if (item[1].url.indexOf(pathname) === 0 || (item[1].subpage && item[1].subpage.indexOf(pathname) === 0)) {
        //如果与url相符，或者与subpage相符，那就是这一条啦
        return true;
      }
    });

    this.state.current = (c < 0 ? 1 : c + 1);
  }

  handleClick(e) {
    this.setState({
      current: e.key,
    });
  }

  componentDidMount() {

      //接口返回错误信息的展示形式
      tipper.setHandler('ServerError', (msg) => {
          Modal.error({
            title: '错误信息',
            content: msg
          });
      });
  
  }

  componentWillMount() {
    if (this.props) {
      const {
        ajaxData,
        ajaxSucceed,
        ajaxFailed
      } = this.props;

      ajaxData({
        url: 'isLogin',
        method: 'post',
        succeed: ajaxSucceed,
        failed: ajaxFailed
      })
    }

  }

  render() {
    if (!this.props) {
      return (
        <div></div>
      )
    }
    this.isLogin = this.props.data.FetchData[0]['isLogin'];
    if (this.isLogin.ret == 1) {
      if (typeof this.isLogin.data == 'string') {
        return (
          <div className="box boxH boxC" >
              <h2 style={{lineHeight:'300px'}}>{this.isLogin.data}</h2>
            </div>
        )
      } else if (this.isLogin.data.login_url) {
        location.href = this.isLogin.data.login_url;
        return (
          <div></div>
        )
      } else {

        let menuAuth = {

          '/': false, //首页

          "/list": false, //分配寻品任务
          "/operation": false, //执行寻品任务
          "/report": false, //寻品报表分析

          "/prodQuery": false, //商品查询
          "/supplierQuery": false, //供应商查询
        }



        this.isLogin.data.auth.map((item) => {
          if (item == '/site/index') {
            menuAuth['/'] = true;
          } else if (item == '/grope/list') {
            menuAuth['/list'] = true;
          } else if (item == '/grope/operation') {
            menuAuth['/operation'] = true;
          } else if (item == '/grope/report') {
            menuAuth['/report'] = true;
          } else if (item == '/quote/supply') {
            menuAuth['/supplierQuery'] = true;
          } else if (item == '/quote/sku') {
            menuAuth['/prodQuery'] = true;
          }
        })

        localStorage.menuAuth = JSON.stringify(menuAuth);



        const rows = [],
          t = this;


        navArr[this.state.current - 1].map((item, key) => {
          var keyV = 'nav' + key;
          item.url ? rows.push( < li onClick = {
              () => {
                !key && t.setState({
                  current: '1'
                });
              }
            }
            key = {
              keyV
            } > <Link to={item.url}>{item.text}</Link> < /li>) : rows.push(<li className="active" key={keyV}>{item.text}</li > )
        })



        return (
          <div className="box boxH wrap">
            <div className="menuBg">
                <div className="title" style={{fontSize:'18px'}}>采购人员管理系统</div>

                <Menu onClick={this.handleClick.bind(this)}
                  style={{ background:'none',borderRight:'none',color:'white',fontSize:'16px' }}
                  defaultSelectedKeys={[ String(this.state.current) ]}
                  defaultOpenKeys={['sub2','sub3']}
                  mode="inline"
                >
                  {menuAuth['/'] ? <Menu.Item className="custom_menu_topitem" key="1"><span><Icon type="home" /><span><Link to="/" style={{display:'inline-block',width:'80%'}}>首页</Link></span></span></Menu.Item> : <span></span>}
                  {(menuAuth['/list'] || menuAuth['/operation'] || menuAuth['/report']) && <SubMenu className="custom_submenu" key="sub2" title={<span><Icon type="appstore" /><span>新品引入</span></span>}>
                    {menuAuth['/list'] ? <Menu.Item className="custom_submenu_item" key="2"><Link to="/list">分配寻品任务</Link></Menu.Item> : <span></span>}
                    {menuAuth['/operation'] ? <Menu.Item className="custom_submenu_item" key="3"><Link to="/operation">执行寻品任务</Link></Menu.Item> : <span></span>}
                    {menuAuth['/report'] ? <Menu.Item className="custom_submenu_item" key="4"><Link to="/report">寻品报表分析</Link></Menu.Item> : <span></span>}
                  </SubMenu>}
                  {(menuAuth['/prodQuery'] || menuAuth['/supplierQuery']) && <SubMenu className="custom_submenu" key="sub3" title={<span><Icon type="bar-chart" /><span>报价管理</span></span>}>
                    {menuAuth['/prodQuery'] ? <Menu.Item className="custom_submenu_item" key="5"><Link to="/prodQuery">商品查询</Link></Menu.Item> : <span></span>}
                    {menuAuth['/supplierQuery'] ? <Menu.Item className="custom_submenu_item" key="6"><Link to="/supplierQuery">供应商查询</Link></Menu.Item> : <span></span>}
                  </SubMenu>}
                </Menu>

            </div>
            
            <div className="flex1 box boxV" style={ {'backgroundColor': '#EBECF1'} }>
                <div className="topBar text-right">
                    您好，{this.isLogin.data.user_info.user_name}（{this.isLogin.data.user_info.role_name}）<a href={this.isLogin.data.logout_url}>退出</a>
                </div>
                <ol className="breadcrumb" style={ {background: 'none', padding: '14px 20px', margin: 0 } }> {rows}
                </ol>
                <div className="flex1 main" style={ {margin: '0 20px 20px', paddingTop:'10px',background: 'white'} }>
                    {React.cloneElement(this.props.children,{store:this.props})}
                </div>
                <div className="footer text-center">云杉美菜 @ 采购决策系统</div>
            </div>

      </div>
        )
      }


    } else {
      return (<div></div>)
    }
  }
}


const mapStateToProps = state => ({
  data: state
});
const mapDispatchToProps = dispatch => bindActionCreators(CounterActions, dispatch)

module.exports = connect(mapStateToProps, mapDispatchToProps)(Index);
