import React from 'react'
import {
    Link
} from 'react-router'

// var tabBoxConfig = {
//     id: 'tabId',
//     tabClass: '', //tab默认样式
//     tabAction: '', //tab选中样式
//     tabBox: '', //内容区样式
//     tab: ['标签1', '标签2', '标签3', '标签4', '', '', '', ''],
//     data: [
//         <TabBox1 />,
//         <TabBox2 />,
//         <TabBox3 />,
//         <TabBox4 />
//     ]
// }
// <TabBox params={tabBoxConfig} />

class TabBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0
        }
    }

    componentWillMount() {
        var t = this;
        this.props.params.tab.some(function(it, k) {
            if (it) {
                t.setState({
                    index: k
                });
                return true;
            }
        });
    }

    changeBoxCon(event, index) {
        console.log(event)
        this.setState({
            index: index
        });
    }



    render() {
        var params = this.props.params,
            tabs = [],
            action = '',
            tempIndex = [];



        params.tab.map(function(item, key) {
            if (this.state.index == key) {
                action = 'tabAction';
                if (params.tabAction) {
                    action = params.tabAction;
                }
            } else {
                action = '';
            }
            if (item) {
                tempIndex.push(key);
                tabs.push(<div style={{cursor:'pointer'}} onClick={(event)=>this.changeBoxCon(event,key)} className={params.tabClass ? "flex1 "+params.tabClass +' '+action : 'flex1 tabClass '+action} key={key}>{item}</div>);
            } else {
                tabs.push(<div className='flex1' key={key}></div>);
            }
        }.bind(this));
        return (
            <div id={params.id}>
                <div style={{margin:'0px -5px'}}>
                    <div className="box boxH">
                        {tabs}
                    </div>
                    <div className={params.tabBox ? params.tabBox : 'tabBox'}>
                        {params.data[this.state.index-tempIndex[0]]}
                    </div>
                </div>
            </div>
        )
    }
}

module.exports = TabBox