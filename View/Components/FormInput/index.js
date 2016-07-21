import React from 'react'


// {
//                 type: 'email',
//                 placeholder: '1212121212@163.com',
//                 defaultValue: '22',
//                 id: 'inputEmail3',
//                 disabled: false,
//                 name: '21asas',
//                 labelText: '名称',
//                 labelW: 1,
//                 width: 2
//             }

class FormInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {}

  render() {
    var item = this.props.params;
    return (
      <input 
      				type={item.type ? item.type : 'text'} 
      				className="form-control" 
      				id={item.id ? item.id : ''} 
              name={item.name ? item.name : ''} 
      				defaultValue={item.defaultValue}
      				placeholder={item.placeholder}
      				disabled={item.disabled}
      		/>
    )
  }
}

module.exports = FormInput