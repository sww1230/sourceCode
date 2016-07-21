import React, {
  Component
} from 'react'
import ReactDOM from 'react-dom'
import {
  createStore,
  combineReducers,
  applyMiddleware
} from 'redux'
import {
  Provider
} from 'react-redux'
import {
  Router,
  Route,
  IndexLink,
  browserHistory,
  hashHistory,
  Link,
  IndexRoute
} from 'react-router'
import {
  syncHistoryWithStore,
  routerReducer
} from 'react-router-redux'
import store from '../Reducers'

//引入页面 ContainerPage文件目录下的文件
import NoMatch from '../ContainerPage/error'
import Index from '../ContainerPage'
import Home from '../ContainerPage/home'

import List from '../ContainerPage/list'
import Report from '../ContainerPage/report'
import Category from '../ContainerPage/report/category'
import City from '../ContainerPage/report/city'

import Operation from '../ContainerPage/operation'

import SupplierQuery from '../ContainerPage/supplierQuery'
import SupplierProd from '../ContainerPage/supplierQuery/supplierProd'
import ProdQuery from '../ContainerPage/prodQuery'
import ProdDetails from '../ContainerPage/prodQuery/prodDetails'


//开发人员在此引入自己负责的模块, 添加路由在IndexRoute下边追回
//李燚 



//许可



//继成



const history = syncHistoryWithStore(hashHistory, store)
const createHashHistory = require('history/lib/createHashHistory')


history.listen(function(location) {
  // console.log(location.pathname);
});

class RouterConfig extends React.Component {
  render() {
    var urlJson = localStorage.menuAuth ? JSON.parse(localStorage.menuAuth) : {};
    return (
      <Provider store={store}>
          <Router history={history}>
            <Route path="/"  component={Index}>
                  {urlJson['/'] && <IndexRoute  component={Home}/>}

                  {urlJson['/list'] && <Route path="/list"  component={List} />}
                  {urlJson['/report'] && <Route path="/report"  component={Report}>
                        <IndexRoute  component={Category}/>
                        <Route path="/city"  component={City} />
                  </Route>}
                  {urlJson['/operation'] && <Route path="/operation"  component={Operation} />}
                  
                  {urlJson['/supplierQuery'] && <Route path="/supplierQuery"  component={SupplierQuery} />}
                  {urlJson['/supplierQuery'] && <Route path="/supplierProd"  component={SupplierProd} />}

                  {urlJson['/prodQuery'] && <Route path="/prodQuery"  component={ProdQuery} />}
                  {urlJson['/prodQuery'] && <Route path="/prodDetails"  component={ProdDetails} />}



            </Route>
            <Route path="*" component={NoMatch}/>
          </Router>
        </Provider>
    )
  }
}

module.exports = RouterConfig