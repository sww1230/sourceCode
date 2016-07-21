import React from 'react'
class City extends React.Component {
    onClickHandle(item) {
        // var city = this.props.city_list;
        if (item["checked"]) {
            item["checked"] = '';
        } else {
            item["checked"] = 'checked';
        }
    }
    render() {
        var city_pop = [];
        var t = this;
        this.props.city_list.map(function(item, key) {
            city_pop.push(<span key={key} style={{display: 'inline-block', width: '100px'}}><input readOnly="readonly" defaultChecked={item.checked} id={item.id}  onClick={()=>t.onClickHandle(item)} type="checkbox" name="city"/>{item.name}</span>);
        });
        return <div>{city_pop}</div>;
    }
}
module.exports = City