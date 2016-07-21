import React from 'react'
import {
    Link
} from 'react-router'

// 使用
// var obj = {
//     tabList: ['基本信息', '合作信息', '资质信息'],
//     getIndex: (index) => {
//         alert(index); //得到索引
//     }
// }
// <Tab params={obj} />   

require('./index.css')

class Tab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: 0
        }
    }

    getIndex(index, callback) {
        this.setState({
            active: index
        });
        callback(index);
    }

    render() {

        var params = this.props.params,
            list = [],
            t = this;
        params.tabList.map(function(item, key) {
            list.push(<li key={key} style={{cursor:'pointer'}} onClick={()=>t.getIndex(key,params.getIndex)}>{item}{t.state.active == key && <span className="hove"></span>}</li>);
        });
        return (
            <div className="tabComponent">
                <ul>
                    {list}
                </ul>
            </div>
        )
    }
}

module.exports = Tab