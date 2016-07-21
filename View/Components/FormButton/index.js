import React from 'react'

// {
//                 text: '搜索',
//                 width: 2,
//                 callback: function(data) {
//                     console.log(data)
//                 }
//             }

class FormButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {}

    render() {
        var item = this.props.params;
        return (
            <button type="button" onClick={item.callback && item.callback} className="btn btn-success">{item.text}</button>
        )
    }
}

module.exports = FormButton