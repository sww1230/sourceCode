import React from 'react'


// {
//                 searchText: '搜1索',
//                 placeholder: '输1入产品ID及sid',
//                 defaultValue: 11111,
//                 id: 'keyword',
//                 name: 'keyword',
//                 width: 2,
//                 callback: function(data) {
//                     console.log(data)
//                 }
//             }

class FormSearch extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {}

    render() {
        var params = this.props.params;
        return (
            <div className="input-group">
                <input type="text" className="form-control" id={params.id} name={params.name} defaultValue={params.defaultValue} placeholder={params.placeholder} />
                <span className="input-group-btn">
                    <button className="btn btn-default" onClick={params.callback && params.callback} type="button">{params.searchText}</button>
                </span>
            </div>
        )
    }
}

module.exports = FormSearch