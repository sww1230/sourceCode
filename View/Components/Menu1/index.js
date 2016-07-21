import React from 'react'
import {
    Link
} from 'react-router'


// var menuConfig1 = {
//                                 type: 'V',
//                                 style: {
//                                     border: 'white',
//                                     active: 'green',
//                                     navBg: 'purple',
//                                     menuBg: 'orange',
//                                     width: '100%'
//                                 },
//                                 id: 'menu1',
//                                 data: [{
//                                     text: '新鲜蔬菜',
//                                     submenu: [{
//                                         text: '叶菜类',
//                                         submenu: [{
//                                             text: '油麦菜',
//                                             url: '12'
//                                         }, {
//                                             text: '散菜花',
//                                             url: '22'
//                                         }, {
//                                             text: '油麦菜',
//                                             url: '12'
//                                         }, {
//                                             text: '散菜花',
//                                             url: '22'
//                                         }, {
//                                             text: '油麦菜',
//                                             url: '12',
//                                         }, {
//                                             text: '散菜花',
//                                             url: '22'
//                                         }]
//                                     }, {
//                                         text: '根茎类',
//                                         url: '22'
//                                     }, {
//                                         text: '叶菜类',
//                                         submenu: [{
//                                             text: '油麦菜',
//                                             url: '12'
//                                         }, {
//                                             text: '散菜花',
//                                             url: '22'
//                                         }, {
//                                             text: '油麦菜',
//                                             url: '12'
//                                         }, {
//                                             text: '散菜花',
//                                             url: '22'
//                                         }, {
//                                             text: '油麦菜',
//                                             url: '12'
//                                         }, {
//                                             text: '散菜花',
//                                             url: '22'
//                                         }]
//                                     }, {
//                                         text: '根茎类',
//                                         url: '22'
//                                     }]
//                                 }, {
//                                     text: '新鲜蔬菜12',
//                                     url: '22',
//                                     active: true
//                                 }, {
//                                     text: '23233',
//                                     url: '22'
//                                 }, {
//                                     text: '232343545',
//                                     url: '22'
//                                 }, {
//                                     text: '新鲜蔬菜',
//                                     submenu: [{
//                                         text: '叶菜类',
//                                         submenu: [{
//                                             text: '油麦菜',
//                                             url: '12'
//                                         }, {
//                                             text: '散菜花',
//                                             url: '22'
//                                         }, {
//                                             text: '油麦菜',
//                                             url: '12'
//                                         }, {
//                                             text: '散菜花',
//                                             url: '22'
//                                         }, {
//                                             text: '油麦菜',
//                                             url: '12'
//                                         }, {
//                                             text: '散菜花',
//                                             url: '22'
//                                         }]
//                                     }, {
//                                         text: '根茎类',
//                                         url: '22'
//                                     }]
//                                 }, {
//                                     text: '新鲜蔬菜',
//                                     submenu: [{
//                                         text: '叶菜类',
//                                         submenu: [{
//                                             text: '油麦菜',
//                                             url: '12'
//                                         }, {
//                                             text: '散菜花',
//                                             url: '22'
//                                         }, {
//                                             text: '油麦菜',
//                                             url: '12'
//                                         }, {
//                                             text: '散菜花',
//                                             url: '22'
//                                         }, {
//                                             text: '油麦菜',
//                                             url: '12'
//                                         }, {
//                                             text: '散菜花',
//                                             url: '22'
//                                         }]
//                                     }, {
//                                         text: '根茎类',
//                                         url: '22'
//                                     }]
//                                 }, ]
//                             };

//                             var menuConfig2 = {
//                                 type: 'H',
//                                 style: {
//                                     border: '#B1191A',
//                                     active: 'green',
//                                     navBg: 'purple',
//                                     menuBg: '#c81623',
//                                     width: '150px'
//                                 },
//                                 id: 'menu',
//                                 data: [{ //数据必须为3级
//                                     text: '新鲜蔬菜111',
//                                     submenu: [{
//                                         text: '叶菜类aaaa',
//                                         submenu: [{
//                                             text: '油麦菜bbb',
//                                             url: '12'
//                                         }, {
//                                             text: '散菜花ccc',
//                                             url: '22'
//                                         }, {
//                                             text: '油麦菜ddd',
//                                             url: '12'
//                                         }, {
//                                             text: '散菜花eee',
//                                             url: '22'
//                                         }, {
//                                             text: '油麦菜fff',
//                                             url: '12',
//                                         }, {
//                                             text: '散菜花111',
//                                             url: '22'
//                                         }]
//                                     }, {
//                                         text: '叶菜类111',
//                                         submenu: [{
//                                             text: '油麦菜111',
//                                             url: '12'
//                                         }, {
//                                             text: '散菜花111',
//                                             url: '22'
//                                         }, {
//                                             text: '油麦菜111',
//                                             url: '12'
//                                         }, {
//                                             text: '散菜花111',
//                                             url: '22'
//                                         }, {
//                                             text: '油麦菜111',
//                                             url: '12',
//                                         }, {
//                                             text: '散菜花111',
//                                             url: '22'
//                                         }]
//                                     }, {
//                                         text: '叶菜类111',
//                                         submenu: [{
//                                             text: '油麦菜111',
//                                             url: '12'
//                                         }, {
//                                             text: '散菜花111',
//                                             url: '22'
//                                         }, {
//                                             text: '油麦菜111',
//                                             url: '12'
//                                         }, {
//                                             text: '散菜花111',
//                                             url: '22'
//                                         }, {
//                                             text: '油麦菜111',
//                                             url: '12',
//                                         }, {
//                                             text: '散菜花111',
//                                             url: '22'
//                                         }]
//                                     }, {
//                                         text: '叶菜类111',
//                                         submenu: [{
//                                             text: '油麦菜111',
//                                             url: '12'
//                                         }, {
//                                             text: '散菜花111',
//                                             url: '22'
//                                         }, {
//                                             text: '油麦菜111',
//                                             url: '12'
//                                         }, {
//                                             text: '散菜花111',
//                                             url: '22'
//                                         }, {
//                                             text: '油麦菜111',
//                                             url: '12',
//                                         }, {
//                                             text: '散菜花111',
//                                             url: '22'
//                                         }]
//                                     }]
//                                 }, {
//                                     text: '新鲜蔬菜222',
//                                     submenu: [{
//                                         text: '叶菜类222',
//                                         submenu: [{
//                                             text: '油麦菜222',
//                                             url: '12'
//                                         }, {
//                                             text: '散菜花222',
//                                             url: '22'
//                                         }, {
//                                             text: '油麦菜222',
//                                             url: '12'
//                                         }, {
//                                             text: '散菜花222',
//                                             url: '22'
//                                         }, {
//                                             text: '油麦菜222',
//                                             url: '12',
//                                         }, {
//                                             text: '散菜花222',
//                                             url: '22'
//                                         }]
//                                     }]
//                                 }, {
//                                     text: '新鲜蔬菜333',
//                                     submenu: [{
//                                         text: '叶菜类333',
//                                         submenu: [{
//                                             text: '油麦菜333',
//                                             url: '12'
//                                         }, {
//                                             text: '散菜花333',
//                                             url: '22'
//                                         }, {
//                                             text: '油麦菜333',
//                                             url: '12'
//                                         }, {
//                                             text: '散菜花333',
//                                             url: '22'
//                                         }, {
//                                             text: '油麦菜333',
//                                             url: '12',
//                                         }, {
//                                             text: '散菜花333',
//                                             url: '22'
//                                         }]
//                                     }]
//                                 }, {
//                                     text: '新鲜蔬菜444',
//                                     submenu: [{
//                                         text: '叶菜类444',
//                                         submenu: [{
//                                             text: '油麦菜444',
//                                             url: '12'
//                                         }, {
//                                             text: '散菜花444',
//                                             url: '22'
//                                         }, {
//                                             text: '油麦菜444',
//                                             url: '12'
//                                         }, {
//                                             text: '散菜花444',
//                                             url: '22'
//                                         }, {
//                                             text: '油麦菜444',
//                                             url: '12',
//                                         }, {
//                                             text: '散菜花444',
//                                             url: '22'
//                                         }]
//                                     }]
//                                 }, {
//                                     text: '新鲜蔬菜555',
//                                     submenu: [{
//                                         text: '叶菜类555',
//                                         submenu: [{
//                                             text: '油麦菜555',
//                                             url: '12'
//                                         }, {
//                                             text: '散菜花555',
//                                             url: '22'
//                                         }, {
//                                             text: '油麦菜555',
//                                             url: '12'
//                                         }, {
//                                             text: '散菜花555',
//                                             url: '22'
//                                         }, {
//                                             text: '油麦菜555',
//                                             url: '12',
//                                         }, {
//                                             text: '散菜花555',
//                                             url: '22'
//                                         }]
//                                     }]
//                                 }, {
//                                     text: '新鲜蔬菜666',
//                                     submenu: [{
//                                         text: '叶菜类666',
//                                         submenu: [{
//                                             text: '油麦菜666',
//                                             url: '12'
//                                         }, {
//                                             text: '散菜花666',
//                                             url: '22'
//                                         }, {
//                                             text: '油麦菜666',
//                                             url: '12'
//                                         }, {
//                                             text: '散菜花666',
//                                             url: '22'
//                                         }, {
//                                             text: '油麦菜666',
//                                             url: '12',
//                                         }, {
//                                             text: '散菜花666',
//                                             url: '22'
//                                         }]
//                                     }]
//                                 }, {
//                                     text: '新鲜蔬菜777',
//                                     submenu: [{
//                                         text: '叶菜类777',
//                                         submenu: [{
//                                             text: '油麦菜777',
//                                             url: '12'
//                                         }, {
//                                             text: '散菜花777',
//                                             url: '22'
//                                         }, {
//                                             text: '油麦菜777',
//                                             url: '12'
//                                         }, {
//                                             text: '散菜花777',
//                                             url: '22'
//                                         }, {
//                                             text: '油麦菜777',
//                                             url: '12',
//                                         }, {
//                                             text: '散菜花777',
//                                             url: '22'
//                                         }]
//                                     }]
//                                 }, {
//                                     text: '新鲜蔬菜888',
//                                     submenu: [{
//                                         text: '叶菜类888',
//                                         submenu: [{
//                                             text: '油麦菜888',
//                                             url: '12'
//                                         }, {
//                                             text: '散菜花888',
//                                             url: '22'
//                                         }, {
//                                             text: '油麦菜888',
//                                             url: '12'
//                                         }, {
//                                             text: '散菜花888',
//                                             url: '22'
//                                         }, {
//                                             text: '油麦菜888',
//                                             url: '12',
//                                         }, {
//                                             text: '散菜花888',
//                                             url: '22'
//                                         }]
//                                     }]
//                                 }, {
//                                     text: '新鲜蔬菜888',
//                                     submenu: [{
//                                         text: '叶菜类888',
//                                         submenu: [{
//                                             text: '油麦菜888',
//                                             url: '12'
//                                         }, {
//                                             text: '散菜花888',
//                                             url: '22'
//                                         }, {
//                                             text: '油麦菜888',
//                                             url: '12'
//                                         }, {
//                                             text: '散菜花888',
//                                             url: '22'
//                                         }, {
//                                             text: '油麦菜888',
//                                             url: '12',
//                                         }, {
//                                             text: '散菜花888',
//                                             url: '22'
//                                         }]
//                                     }]
//                                 }, {
//                                     text: '新鲜蔬菜888',
//                                     submenu: [{
//                                         text: '叶菜类888',
//                                         submenu: [{
//                                             text: '油麦菜888',
//                                             url: '12'
//                                         }, {
//                                             text: '散菜花888',
//                                             url: '22'
//                                         }, {
//                                             text: '油麦菜888',
//                                             url: '12'
//                                         }, {
//                                             text: '散菜花888',
//                                             url: '22'
//                                         }, {
//                                             text: '油麦菜888',
//                                             url: '12',
//                                         }, {
//                                             text: '散菜花888',
//                                             url: '22'
//                                         }]
//                                     }]
//                                 }]
//                             };

// <Menu params={menuConfig1}/>
// <Menu params={menuConfig2}/>

class Menu extends React.Component {
        constructor(props) {
            super(props);
            this.state = {}
        }

        showHide(event, id) {
            var dom = $('#' + id).parents('.one_submenu').siblings('.one_submenu');
            dom.find('.two_submenu').slideUp();
            dom.find('div').css({
                'backgroundColor': 'inherit'
            }).find('.arrow').removeClass('arrowAdd');

            if ($('#' + id).is(':visible')) {
                $('#' + id).slideUp();
                $('#' + id).prev().css({
                    'backgroundColor': 'inherit'
                }).find('.arrow').removeClass('arrowAdd');
            } else {
                $('#' + id).slideDown();
                $('#' + id).prev().css({
                    'backgroundColor': this.props.params.style.navBg
                }).find('.arrow').addClass('arrowAdd');

            }
            event.stopPropagation();
        }

        renderMenuV(data, num) {

            var rows = [];
            var t = this;
            data.map(function(item, key) {
                    if (item.url) {
                        var act = {
                            borderBottom: '1px solid ' + t.props.params.style.border
                        };
                        if (item.active) { //默认选中的状态
                            act.backgroundColor = t.props.params.style.active;
                        }
                        rows.push( < a target = "_black"
                            style = {
                                act
                            }
                            href = {
                                item.url
                            }
                            onClick = {
                                (event) => {
                                    var dom = $(event.currentTarget);
                                    var len = dom.parents('.one_submenu').length;
                                    if (len) {
                                        if (len == 1) {
                                            dom.siblings('.one_submenu').find('.two_submenu').slideUp();
                                        }
                                    } else {
                                        $('.two_submenu').slideUp();
                                    }


                                    dom.siblings().find('div').css({
                                        'backgroundColor': 'inherit'
                                    }).find('.arrow').removeClass('arrowAdd')

                                    $('#' + t.props.params.id).find('a').css({
                                        'backgroundColor': 'inherit'
                                    });

                                    dom.css({
                                        'backgroundColor': t.props.params.style.active
                                    });
                                    event.stopPropagation();
                                }
                            }
                            key = {
                                key
                            } > {
                                item.text
                            } < /a>);
                        }
                        else {
                            if (item.submenu) {
                                var arr = t.renderMenuV(item.submenu, key);
                                var num_index = num + '_' + key;
                                if (item.active) { //默认选中的状态
                                    rows.push(<div className='one_submenu' style={{display:'block'}} onClick={(event)=>{t.showHide(event,num_index)}}  key={key}>
                                              <div className='navSlecte' style = {{borderBottom: '1px solid ' + t.props.params.style.border,'backgroundColor': t.props.params.style.navBg}}>{item.text}<span className='arrow arrowAdd'>&gt;</span></div>
                                              <div id = {num_index}  style={{display:'block'}}  className = "two_submenu">{arr}</div></div>);
                                } else {
                                    rows.push(<div className='one_submenu' onClick={(event)=>{t.showHide(event,num_index)}}  key={key}>
                                              <div className='navSlecte' style = {{borderBottom: '1px solid ' + t.props.params.style.border}}>{item.text}<span className='arrow'>&gt;</span></div>
                                              <div id = {num_index} className = "two_submenu">{arr}</div></div>);
                                }
                            }
                        }
                    });
                return rows;
            }



            renderMenuH(data) {
                var rows = [],
                    t = this;
                data.map(function(item, key) {
                    var arr = [];
                    if (item.submenu) {
                        item.submenu.map(function(it, k) {
                            var indexNum = k + '_' + key;
                            arr.push(<div key={indexNum} style={{borderBottom: '1px solid #ccc',marginTop:'20px',marginBottom:'5px',color:t.props.params.style.menuBg}}>{it.text}</div>);

                            it.submenu.map(function(obj, i) {
                                var tempNum = i + '_' + key + '_' + k;
                                arr.push(<a key={tempNum} href={obj.url} target = "_black">{obj.text}</a>);
                            });

                        });
                    }

                    rows.push(<div  key={key} style={{borderLeft: '1px solid ' + t.props.params.style.border,borderBottom: '1px solid ' + t.props.params.style.border,backgroundColor:t.props.params.style.menuBg}} className='navSlecteH' >
                        <p>{item.text} <i className='arrowH'>&gt;</i></p>
                        <div style={{left:t.props.params.style.width,zIndex:'-1',marginLeft:'-1px',width:'350px',border: '1px solid ' + t.props.params.style.border}}>
                            {arr}
                        </div>
                    </div>);
                });
                return rows;
            }

            render() {
                if (this.props.params.type == 'V') {
                    var rows = this.renderMenuV(this.props.params.data);
                    return (
                        <div id={this.props.params.id} style={{width:this.props.params.style.width,backgroundColor:this.props.params.style.menuBg,color:'#fff'}} className="menuV">
                            {rows}
                        </div>
                    )
                } else if (this.props.params.type == 'H') {
                    var rows = this.renderMenuH(this.props.params.data);
                    return (
                        <div id={this.props.params.id} style={{borderTop: '1px solid ' + this.props.params.style.border,zIndex:'100',width:this.props.params.style.width,position:'relative',color:'#fff'}} className="menuH">
                            {rows}
                        </div>
                    )
                }
            }

        }

        module.exports = Menu