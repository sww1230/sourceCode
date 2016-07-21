import React from 'react'


// {
//                 id: 'selectId',
//                 defaultValue: 22,
//                 name: 'wwwww',
//                 disabled: false,
//                 options: [{
//                     value: '11',
//                     text: 'adaf'
//                 }, {
//                     value: '22',
//                     text: 'hjgfhj'
//                 }, {
//                     value: '33',
//                     text: 'xcvxc'
//                 }, {
//                     value: '444',
//                     text: '6767ds'
//                 }],
//                 labelText: '名称',
//                 labelW: 2,
//                 width: 4
//             }

class FormSelect extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {}

    render() {
        var item = this.props.params,
            option = [];
        option.push(<option key='none' value=''>请选择</option>);
        item.options.map(function(item, index) {
            option.push(<option key={index} value={item.value}>{item.text}</option>);
        });
        return (
            <select className="form-control" 
      			id={item.id ? item.id : ''} 
      			name={item.name ? item.name : ''} 
      			defaultValue={item.defaultValue} 
      			disabled={item.disabled}>
				  {option}
			</select>
        )
    }
}

module.exports = FormSelect