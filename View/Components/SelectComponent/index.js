import React from 'react'
import {
  Link
} from 'react-router'

class SelectComponent extends React.Component {
  render() {
    var params = this.props.params,
      option = [];
    params.options.map(function(item, key) {
      option.push(<option key={key} value={item.id}>{item.name}</option>);
    });
    return (
      <select onChange={this.props.selectCallback} className="storeType" id={params.id} style={{backgroundColor:'white',height:'35px',width:params.width,marginRight:'10px',border:'1px solid #E8E8E8'}}  >
                  <option value="">请选择</option>
                  {option}
            </select>
    )
  }
}

module.exports = SelectComponent