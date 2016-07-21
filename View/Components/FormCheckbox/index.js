import React from 'react'


// {
//                 type: 'checkBox',
//                 id: 'xxx',
//                 name: 'iiii',
//                 disabled: false,
//                 options: [{
//                     defaultValue: 1,
//                     text: 'a',
//                     defaultChecked: false,
//                 }, {
//                     defaultValue: 2,
//                     text: 'b',
//                     defaultChecked: false,
//                 }],

//                 labelText: '名称',
//                 labelW: 1,
//                 width: 2
//             }

class FormCheckbox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {}

    render() {
        var item = this.props.params;
        var rows = [];
        item.options.map(function(con, key) {
            rows.push(<label key={key}><input type={item.type ? item.type : 'checkbox'}
                name={item.name ? item.name : ''}
                disabled={item.disabled}
                defaultValue={con.defaultValue}
                defaultChecked={con.defaultChecked}
                />&nbsp;&nbsp;{con.text}&nbsp;&nbsp;&nbsp;</label>);
        });
        return (
            <div className="checkbox" id={item.id ? item.id : ''} >
            
              {rows}</div>

        )
    }
}

module.exports = FormCheckbox