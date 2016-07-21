import React from 'react'
import {
    Link
} from 'react-router'



// 例：
// var formConfig = {
//     getData: function(data) {
//         console.log(data)
//     },
//     data: [
//         [{
//             component: FormCheckbox,
//             data: {
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
//         }, {
//             component: FormCheckbox,
//             data: {
//                 type: 'radio',
//                 id: 'jj',
//                 name: 'wew',
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
//                 width: 4
//             }
//         }, {
//             component: FormSearch,
//             data: {
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
//         }],
//         [{
//             component: FormInput,
//             data: {
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
//         }, {
//             component: FormButton,
//             data: {
//                 text: '搜索',
//                 width: 2,
//                 callback: function(data) {
//                     console.log(data)
//                 }
//             }
//         }, {
//             component: FormSelect,
//             data: {
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
//         }]
//     ]
// };

// <Form params={formConfig}/>

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        var fieldArr = [];
        let formConfig = this.props.params,
            formGroup = [];
        formConfig.map(function(configRow, kk) {
            let col = [];
            configRow.map(function(configCol, ii) {
                let data = configCol.data,
                    labelClass = 'col-xs-' + data.labelW + ' control-label',
                    colW = 'col-xs-' + data.width,
                    key = kk + '_' + ii;
                if (data.id) {
                    if (data.type == 'radio' || data.type == 'checkBox') {
                        fieldArr.push(data.name + "-" + data.type + "-" + data.id);
                    } else {
                        fieldArr.push(data.id);
                    }
                }
                if (data.callback) {
                    var beforeFun = data.callback;
                    data.callback = function() {
                        var resultsJson = {}
                        fieldArr.map(function(item, key) {
                            if (item.split('-').length == 3) {
                                console.log(item.split('-')[1]);
                                if (item.split('-')[1] == 'radio') {
                                    resultsJson[item.split('-')[2]] = $('input[name="' + item.split('-')[0] + '"]:checked').val();
                                } else if (item.split('-')[1] == 'checkBox') {
                                    var val = ''
                                    $('input[name="' + item.split('-')[0] + '"]').each(function() {
                                        if ($(this).context.checked) {
                                            val += $(this).val() + ',';
                                        }
                                    })
                                    var arr = val.split(',');
                                    arr.length = arr.length - 1;
                                    resultsJson[item.split('-')[2]] = arr;
                                }
                            } else {
                                resultsJson[item] = $("#" + item).val();
                            }
                        });
                        beforeFun(resultsJson);
                    }
                }
                data.labelText && col.push(<label key={key} for="inputEmail3" className={labelClass}>{data.labelText}</label>)
                col.push(<div key={ii} className={colW}><configCol.component params={data} /></div>);
            });
            formGroup.push(<div key={kk} className="form-group">{col}</div>)
        });

        return (

            <div className="form-horizontal">
                    {formGroup}
            </div>

        )
    }
}
module.exports = Form