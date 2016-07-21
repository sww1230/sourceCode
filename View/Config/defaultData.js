import Immutable from 'immutable'
localStorage.displayNum = 1;
const DefaultData = Immutable.List([{



    //---参与的开发人员姓名，请注意书写规范，格式如下---//

    //开发人员姓名：xxx
    //前端pOST、get...数据


    //公共
    getclass: [{
        "id": 1,
        "name": "新鲜蔬菜"
    }, {
        "id": 2,
        "name": "时令水果"
    }, {
        "id": 3,
        "name": "禽蛋肉类"
    }, {
        "id": 4,
        "name": "水产冻货"
    }, {
        "id": 5,
        "name": "调料其他"
    }, {
        "id": 6,
        "name": "米面粮油"
    }, {
        "id": 7,
        "name": "酒水饮料"
    }, {
        "id": 8,
        "name": "餐厨用品"
    }],
    getclass1: [{
        "id": 1,
        "name": "新鲜蔬菜"
    }],
    getcity: [{
        "id": 1,
        "name": "北京"
    }],



    getmemberPOST: {
        "role": "采购员|采购主管"
    },
    getmember: [{
        "id": "31067",
        "name": "liubo05",
        "email": "liubo05@meicai.cn",
        "status": "1",
        "sale_code": "213",
        "phone": "18611834667",
        "role": "100",
        "city_id": "1",
        "own_city": "1,2",
        "last_chpwd_time": "1464853841",
        "c_t": "2016-03-25 12:38:16",
        "u_t": "2016-06-02 15:50:41",
        "system_key": "pdms",
        "warehouse": [
            1,
            2,
            29,
            3
        ]
    }, {
        "id": "31081",
        "name": "黄超",
        "email": "huangchao02@meicai.cn",
        "status": "1",
        "sale_code": "111111",
        "phone": "13716731314",
        "role": "100",
        "city_id": "1",
        "own_city": "1,3,4,7,11",
        "last_chpwd_time": "1462867926",
        "c_t": "2016-03-28 19:32:07",
        "u_t": "2016-05-10 16:12:06",
        "system_key": "pdms",
        "warehouse": [
            1,
            2,
            29,
            39,
            42,
            44,
            45,
            47,
            48,
            51,
            4,
            5,
            50,
            8,
            12
        ]
    }],

    //全部多级分类
    getcategorylist: {
        "ret": 1,
        "data": [
            // {
            //     "value": "1",
            //     "label": "新鲜蔬菜",
            //     "children": [{
            //         "value": "1",
            //         "label": "叶菜类",
            //         "code": "1101",
            //         "class1_id": "1",
            //         "children": [{
            //             "value": "0",
            //             "label": "全部",
            //         }, {
            //             "value": "1",
            //             "label": "青菜类",
            //             "code": "110101",
            //             "class2_id": "1"
            //         }, {
            //             "value": "2",
            //             "label": "野菜类",
            //             "code": "110102",
            //             "class2_id": "1"
            //         }, {
            //             "value": "3",
            //             "label": "结球类",
            //             "code": "110103",
            //             "class2_id": "1"
            //         }]
            //     }]
            // }
        ]
    },

    //首页
    loadnewproPOST: {
        c_t: "",
        limit: 7,
        offset: 0,
        order: "asc",
        report_t1: "",
        report_t2: ""
    },
    loadnewpro: {
        "myChart_option": {
            "tooltip": {
                "trigger": "axis",
                "axisPointer": {
                    "type": "shadow"
                }
            },
            "legend": {
                "data": [
                    "待分配任务数",
                    "新增引入任务数",
                    "已引入数",
                    "暂时不引入数",
                    "已设为无效"
                ]
            },
            "grid": {
                "left": "3%",
                "right": "4%",
                "bottom": "3%",
                "containLabel": true
            },
            "xAxis": [{
                "type": "category",
                "data": [
                    "06/25",
                    "06/26",
                    "06/27",
                    "06/28",
                    "06/29",
                    "06/30",
                    "07/01"
                ]
            }],
            "yAxis": [{
                "type": "value"
            }],
            "series": [{
                "name": "新增引入任务数",
                "type": "bar",
                "data": [
                    0,
                    0,
                    0,
                    0,
                    0,
                    16,
                    0
                ]
            }, {
                "name": "已引入数",
                "type": "bar",
                "data": [
                    0,
                    0,
                    0,
                    0,
                    0,
                    3,
                    0
                ],
                "stack": "group1"
            }, {
                "name": "暂时不引入数",
                "type": "bar",
                "data": [
                    0,
                    0,
                    0,
                    0,
                    0,
                    1,
                    0
                ],
                "stack": "group1"
            }]
        },
        // total: 4,
        "page": 1, // 当前页面
        "page_per": 10, // 每页条数
        "page_total": 1, // 累计页面
        "page_num": 5, // 累计数量

        rows: [{
            date_default: "2016-06-25",
            date_short: "06/25",
            st1: 12,
            st2: 0,
            st3: 23,
            st4: 0,
            st9: 0
        }, {
            date_default: "2016-06-25",
            date_short: "06/25",
            st1: 45,
            st2: 0,
            st3: 0,
            st4: 0,
            st9: 67
        }, {
            date_default: "2016-06-25",
            date_short: "06/25",
            st1: 0,
            st2: 89,
            st3: 0,
            st4: 110,
            st9: 0
        }, {
            date_default: "2016-06-25",
            date_short: "06/25",
            st1: 0,
            st2: 0,
            st3: 116,
            st4: 0,
            st9: 86
        }, {
            date_default: "2016-06-25",
            date_short: "06/25",
            st1: 45,
            st2: 0,
            st3: 0,
            st4: 0,
            st9: 67
        }]
    },
    //分配寻品任务
    getallotlistPOST: {
        "sort_key": "sort_report_time",
        "sku_name": "",
        "status": 1,
        "order": "asc",
        "limit": 10,
        "offset": 0,
        "report_t1": "",
        "report_t2": "",
        category1: "",
        city_id: ""
    },
    getallotlist: {
        "lb_all": 2,
        "lb_report": 2,
        "lb_allot": 0,
        "lb_opera": 0,
        "lb_refuse": 0,
        "lb_disable": 0,
        "rows": [{
            "_id": "57739a79f324a9de328b7187",
            "autoid": 76272,
            "sku_name": "芝麻",
            "category1": 6,
            "sale_price": 0,
            "specification": "",
            "report": {
                "comment": "",
                "u_id": 2336017,
                "u_name": "娟娟点心店",
                "c_t": 1467180393
            },
            "city_id": 20,
            "pics": "",
            "sku_id": 0,
            "sale_unit": "",
            "status": 3,
            "c_t": 1467193977,
            "u_t": 1467286497,
            "allot": {
                "u_id": 10746,
                "u_name": "liangxuetan",
                "c_t": 1467286497,
                "comment": "他"
            },
            "operation": {
                "u_id": 31081,
                "u_name": "黄超"
            },
            "city_name": "上海",
            "category1_name": "米面粮油",
            "supplier": [{
                c_t: 1467561600,
                comment: "123",
                s_name: "a1",
                s_phone: "123"
            }, {
                c_t: 1467561600,
                comment: "123",
                s_name: "a2",
                s_phone: "123"
            }, {
                c_t: 1467561600,
                comment: "123",
                s_name: "a3",
                s_phone: "123"
            }]
        }, {
            "_id": "232kjlh323",
            "autoid": 73582,
            "sku_name": "鲜芦笋",
            "category1": 1,
            "sale_price": 0,
            "specification": "",
            "report": {
                comment: "现我们进价11元1斤。",
                "u_id": 1960662,
                "u_name": "河南面馆",
                "c_t": 1466533179
            },
            "city_id": 2,
            "pics": "",
            "sku_id": 0,
            "sale_unit": "",
            "status": 1,
            "c_t": 1467193975,
            "u_t": 1467193975,
            "city_name": "上海",
            "category1_name": "新鲜蔬菜",
            "allot": {
                "u_id": 31081,
                "u_name": "黄超",
                "c_t": 1467278920,
                "comment": "1111"
            },
            "supplier": [{
                c_t: 1467561600,
                comment: "123",
                s_name: "a1",
                s_phone: "123"
            }, {
                c_t: 1467561600,
                comment: "123",
                s_name: "a2",
                s_phone: "123"
            }, {
                c_t: 1467561600,
                comment: "123",
                s_name: "a3",
                s_phone: "123"
            }]
        }, {
            "_id": "57739a77f3addds24a9de328b70c8",
            "autoid": 73817,
            "sku_name": "花王菜",
            "category1": 1,
            "sale_price": 0,
            "specification": "",
            "report": {
                comment: "现我们进价11元1斤。",
                "u_id": 572735,
                "u_name": "海味阁",
                "c_t": 1466595227
            },
            "city_id": 2,
            "pics": "",
            "sku_id": 0,
            "sale_unit": "",
            "status": 1,
            "c_t": 1467193975,
            "u_t": 1467193975,
            "city_name": "上海",
            "category1_name": "新鲜蔬菜",
            "allot": {
                "u_id": 310821,
                "u_name": "黄超",
                "c_t": 1467278920,
                "comment": "1111"
            },
            "supplier": [{
                c_t: 1467561600,
                comment: "123",
                s_name: "a1",
                s_phone: "123"
            }, {
                c_t: 1467561600,
                comment: "123",
                s_name: "a2",
                s_phone: "123"
            }, {
                c_t: 1467561600,
                comment: "123",
                s_name: "a3",
                s_phone: "123"
            }]
        }, {
            "_id": "57739a77f324a9dasfdfa0228b717f",
            "autoid": 73583,
            "sku_name": "鲜芦笋",
            "category1": 1,
            "sale_price": 0,
            "specification": "",
            "report": {
                comment: "现我们进价11元1斤。",
                "u_id": 1960662,
                "u_name": "河南面馆",
                "c_t": 1466533179
            },
            "city_id": 2,
            "pics": "",
            "sku_id": 0,
            "sale_unit": "",
            "status": 1,
            "c_t": 1467193975,
            "u_t": 1467193975,
            "city_name": "上海",
            "category1_name": "新鲜蔬菜",
            "allot": {
                "u_id": 31081,
                "u_name": "黄超",
                "c_t": 1467278920,
                "comment": "1111"
            },
            "supplier": [{
                c_t: 1467561600,
                comment: "123",
                s_name: "a1",
                s_phone: "123"
            }, {
                c_t: 1467561600,
                comment: "123",
                s_name: "a2",
                s_phone: "123"
            }, {
                c_t: 1467561600,
                comment: "123",
                s_name: "a3",
                s_phone: "123"
            }]
        }],
        "total": 0
    },
    //分配
    assignapiPOST: {
        autoid: '',
        u_id: '',
        comment: '',
        u_name: ''
    },
    assignapi: {
        "ret": 1,
        "data": "分配成功"
    },
    //批量分配
    batchassignapiPOST: {
        autoid: '',
        u_id: '',
        comment: '',
        u_name: ''
    },
    batchassignapi: {
        "ret": 1,
        "data": "分配成功"
    },
    //设为无效
    invalidapiPOST: {
        autoid: '',
        comment: ''
    },
    invalidapi: {
        "ret": 1,
        "data": "更新成功"
    },
    //执行寻品列表
    getintroducelistPOST: {
        "sort_key": "sort_allot_time",
        "time_type": "report_t",
        "report_t1": "",
        "report_t2": "",
        "allot_t1": "",
        "allot_t2": "",
        "sku_name": "",
        "allot_name": "",
        "status": 2,
        "role": "allot",
        "order": "asc",
        "limit": 10,
        "offset": 0
    },
    getintroducelist: {
        "lb_all": 4,
        "lb_report": 0,
        "lb_allot": 4,
        "lb_opera": 0,
        "lb_refuse": 0,
        "lb_disable": 0,
        "rows": [{
            _id: "57739a5cf324a9d0228b684a",
            allot: {
                u_id: 10746,
                u_name: "liangxuetan",
                c_t: 1467616804,
                comment: "devtest"
            },
            c_t: 1467616804,
            comment: "devtest",
            u_id: 10746,
            u_name: "liangxuetan",
            autoid: 112111,
            c_t: 1467193948,
            category1: 2,
            category1_name: "时令水果",
            city_id: 1,
            city_name: "北京",
            operation: {
                u_id: 31207,
                u_name: "商文武",
                c_t: 1467616919,
                comment: "12121"
            },
            c_t: 1467616919,
            comment: "12121",
            u_id: 31207,
            u_name: "商文武",
            pics: ["https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png", "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png", "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png", "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png", "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png", "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png", "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png", "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png", "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"],
            report: {
                comment: "小溪辛苦啦",
                u_id: 1632642,
                u_name: "小北鲸饺子",
                c_t: 1457625093
            },
            c_t: 1457625093,
            comment: "小溪辛苦啦",
            u_id: 1632642,
            u_name: "小北鲸饺子",
            sale_price: 0,
            sale_unit: "",
            sku_id: 0,
            sku_name: "小溪辛苦",
            specification: "",
            status: 3,
            u_t: 1467616919,
            "supplier": [{
                c_t: 1467561600,
                comment: "123",
                s_name: "a1",
                s_phone: "123"
            }, {
                c_t: 1467561600,
                comment: "123",
                s_name: "a2",
                s_phone: "123"
            }, {
                c_t: 1467561600,
                comment: "123",
                s_name: "a3",
                s_phone: "123"
            }]
        }, {
            "_id": "57739a79f棒棒324a9d9228b7223",
            "autoid": 3333,
            "sku_name": "盖菜",
            "category1": 1,
            "sale_price": 0,
            "specification": "",
            "report": {
                comment: "现我们进价11元1斤。",
                "u_id": 453257,
                "u_name": "煲仔小子muscle",
                "c_t": 1467183890
            },
            "city_id": 1,
            "pics": "",
            "sku_id": 0,
            "sale_unit": "",
            "status": 2,
            "c_t": 1467193977,
            "u_t": 1467278920,
            "allot": {
                "u_id": 31081,
                "u_name": "黄超",
                "c_t": 1467278920,
                "comment": "1111"
            },
            "operation": {
                "u_id": 10746,
                comment: "123",
                "c_t": 1467193977,
                "u_name": "liangxuetan"
            },
            "city_name": "北京",
            "category1_name": "新鲜蔬菜",
            "supplier": [{
                c_t: 1467561600,
                comment: "123",
                s_name: "a1",
                s_phone: "123"
            }, {
                c_t: 1467561600,
                comment: "123",
                s_name: "a2",
                s_phone: "123"
            }, {
                c_t: 1467561600,
                comment: "123",
                s_name: "a3",
                s_phone: "123"
            }]
        }, {
            "_id": "12121257739a78f324a9d9228b7212",
            "autoid": 67876876,
            "sku_name": "户子",
            "category1": 1,
            "sale_price": 0,
            "specification": "",
            "report": {
                comment: "现我们进价11元1斤。",
                "u_id": 2385127,
                "u_name": "江南品味",
                "c_t": 1467035931
            },
            "city_id": 1,
            "pics": "",
            "sku_id": 0,
            "sale_unit": "",
            "status": 2,
            "c_t": 1467193976,
            "u_t": 1467278920,
            "allot": {
                "u_id": 31081,
                "u_name": "黄超",
                "c_t": 1467278920,
                "comment": "1111"
            },
            "operation": {
                "u_id": 10746,
                comment: "123",
                "c_t": 1467193977,
                "u_name": "liangxuetan"
            },
            "city_name": "北京",
            "category1_name": "新鲜蔬菜",
            "supplier": [{
                c_t: 1467561600,
                comment: "123",
                s_name: "a1",
                s_phone: "123"
            }, {
                c_t: 1467561600,
                comment: "123",
                s_name: "a2",
                s_phone: "123"
            }, {
                c_t: 1467561600,
                comment: "123",
                s_name: "a3",
                s_phone: "123"
            }]
        }, {
            "_id": "577312129a78f324a9d9228b7210",
            "autoid": 345676543,
            "sku_name": "水芹",
            "category1": 1,
            "sale_price": 0,
            "specification": "",
            "report": {
                comment: "现我们进价11元1斤。",
                "u_id": 2385127,
                "u_name": "江南品味",
                "c_t": 1467035887
            },
            "city_id": 1,
            "pics": "",
            "sku_id": 0,
            "sale_unit": "",
            "status": 2,
            "c_t": 1467193976,
            "u_t": 1467278920,
            "allot": {
                "u_id": 31081,
                "u_name": "黄超",
                "c_t": 1467278920,
                "comment": "1111"
            },
            "operation": {
                "u_id": 10746,
                comment: "123",
                "c_t": 1467193977,
                "u_name": "liangxuetan"
            },
            "city_name": "北京",
            "category1_name": "新鲜蔬菜",
            "supplier": [{
                c_t: 1467561600,
                comment: "123",
                s_name: "a1",
                s_phone: "123"
            }, {
                c_t: 1467561600,
                comment: "123",
                s_name: "a2",
                s_phone: "123"
            }, {
                c_t: 1467561600,
                comment: "123",
                s_name: "a3",
                s_phone: "123"
            }]
        }, {
            "_id": "5771239a78f324a9de328b7140",
            "autoid": 2321789,
            "sku_name": "盖菜",
            "category1": 1,
            "sale_price": 200,
            "specification": "新鲜",
            "report": {
                comment: "现我们进价11元1斤。",
                "u_id": 2459992,
                "u_name": "二贵酸汤鱼，连锁(高碑店)",
                "c_t": 1466994001
            },
            "city_id": 1,
            "pics": "",
            "sku_id": 0,
            "sale_unit": "",
            "status": 2,
            "c_t": 1467193976,
            "u_t": 1467278920,
            "allot": {
                "u_id": 31081,
                "u_name": "黄超",
                "c_t": 1467278920,
                "comment": "1111"
            },
            "operation": {
                "u_id": 10746,
                comment: "123",
                "c_t": 1467193977,
                "u_name": "liangxuetan"
            },
            "city_name": "北京",
            "category1_name": "新鲜蔬菜",
            "supplier": [{
                c_t: 1467561600,
                comment: "123",
                s_name: "a1",
                s_phone: "123"
            }, {
                c_t: 1467561600,
                comment: "123",
                s_name: "a2",
                s_phone: "123"
            }, {
                c_t: 1467561600,
                comment: "123",
                s_name: "a3",
                s_phone: "123"
            }]
        }, {
            "_id": "57739a78f324a912de328b7140",
            "autoid": 86786754,
            "sku_name": "盖菜",
            "category1": 1,
            "sale_price": 200,
            "specification": "新鲜",
            "report": {
                comment: "现我们进价11元1斤。",
                "u_id": 2459992,
                "u_name": "二贵酸汤鱼，连锁(高碑店)",
                "c_t": 1466994001
            },
            "city_id": 1,
            "pics": "",
            "sku_id": 0,
            "sale_unit": "",
            "status": 2,
            "c_t": 1467193976,
            "u_t": 1467278920,
            "allot": {
                "u_id": 31081,
                "u_name": "黄超",
                "c_t": 1467278920,
                "comment": "1111"
            },
            "operation": {
                "u_id": 10746,
                comment: "123",
                "c_t": 1467193977,
                "u_name": "liangxuetan"
            },
            "city_name": "北京",
            "category1_name": "新鲜蔬菜",
            "supplier": [{
                c_t: 1467561600,
                comment: "123",
                s_name: "a1",
                s_phone: "123"
            }, {
                c_t: 1467561600,
                comment: "123",
                s_name: "a2",
                s_phone: "123"
            }, {
                c_t: 1467561600,
                comment: "123",
                s_name: "a3",
                s_phone: "123"
            }]
        }, {
            "_id": "57739a78f324a9de328b714120",
            "autoid": 1234567,
            "sku_name": "盖菜",
            "category1": 1,
            "sale_price": 200,
            "specification": "新鲜",
            "report": {
                comment: "现我们进价11元1斤。",
                "u_id": 2459992,
                "u_name": "二贵酸汤鱼，连锁(高碑店)",
                "c_t": 1466994001
            },
            "city_id": 1,
            "pics": "",
            "sku_id": 0,
            "sale_unit": "",
            "status": 2,
            "c_t": 1467193976,
            "u_t": 1467278920,
            "allot": {
                "u_id": 31081,
                "u_name": "黄超",
                "c_t": 1467278920,
                "comment": "1111"
            },
            "operation": {
                "u_id": 10746,
                comment: "123",
                "c_t": 1467193977,
                "u_name": "liangxuetan"
            },
            "city_name": "北京",
            "category1_name": "新鲜蔬菜",
            "supplier": [{
                c_t: 1467561600,
                comment: "123",
                s_name: "a1",
                s_phone: "123"
            }, {
                c_t: 1467561600,
                comment: "123",
                s_name: "a2",
                s_phone: "123"
            }, {
                c_t: 1467561600,
                comment: "123",
                s_name: "a3",
                s_phone: "123"
            }]
        }],
        "total": 0
    },
    importapiPOST: {
        autoid: '',
        supplier: [{
            s_name: '',
            s_phone: '',
            c_t: '',
            comment: ''
        }]
    },
    importapi: {
        "ret": 1,
        "data": "引入成功"
    },
    batchimportapiPOST: {
        autoid: [],
        supplier: [{
            s_name: '',
            s_phone: '',
            c_t: '',
            comment: ''
        }]
    },
    batchimportapi: {
        "ret": 1,
        "data": "引入成功"
    },
    notimportapiPOST: {
        autoid: '',
        comment: ''
    },
    notimportapi: {
        "ret": 1,
        "data": "操作成功"
    },

    //寻品报表分析
    getecharstPOST: {
        city_id: 1,
        s_t: '2016-07-01',
        e_t: '2016-07-01'
    },
    getecharst: {
        "ret": 1,
        "data": {
            "tooltip": {
                "trigger": "axis"
            },
            "calculable": "true",
            "xAxis": [{
                "type": "category",
                "data": [
                    "新鲜蔬菜",
                    "时令水果",
                    "禽蛋肉类",
                    "水产冻货",
                    "调料其他",
                    "米面粮油",
                    "酒水饮料",
                    "餐厨用品",
                    "其他分类",
                    "限时秒杀",
                    "大宗特卖",
                    "X月特惠"
                ]
            }],
            "yAxis": [{
                "type": "value"
            }],
            "series": [{
                "name": "提交新品",
                "type": "bar",
                "data": [
                    563,
                    204,
                    575,
                    613,
                    1040,
                    653,
                    221,
                    257,
                    321,
                    13,
                    1,
                    0
                ],
                "barWidth": 30
            }]
        }
    },
    getreportclassPOST: {
        city_id: '',
        s_t: '',
        e_t: ''
    },
    getreportclass: {
        "ret": 1,
        "data": [{
            "name": "新鲜蔬菜",
            "id": 1,
            "count": 563,
            "status": {
                "1": 523,
                "2": 36,
                "3": 3,
                "4": 1,
                "9": 0,
                "98": 563
            }
        }, {
            "name": "时令水果",
            "id": 2,
            "count": 204,
            "status": {
                "1": 204,
                "2": 0,
                "3": 0,
                "4": 0,
                "9": 0,
                "98": 204
            }
        }, {
            "name": "禽蛋肉类",
            "id": 3,
            "count": 575,
            "status": {
                "1": 575,
                "2": 0,
                "3": 0,
                "4": 0,
                "9": 0,
                "98": 575
            }
        }, {
            "name": "水产冻货",
            "id": 4,
            "count": 613,
            "status": {
                "1": 613,
                "2": 0,
                "3": 0,
                "4": 0,
                "9": 0,
                "98": 613
            }
        }, {
            "name": "调料其他",
            "id": 5,
            "count": 1040,
            "status": {
                "1": 1040,
                "2": 0,
                "3": 0,
                "4": 0,
                "9": 0,
                "98": 1040
            }
        }, {
            "name": "米面粮油",
            "id": 6,
            "count": 653,
            "status": {
                "1": 650,
                "2": 3,
                "3": 0,
                "4": 0,
                "9": 0,
                "98": 653
            }
        }, {
            "name": "酒水饮料",
            "id": 7,
            "count": 221,
            "status": {
                "1": 220,
                "2": 0,
                "3": 0,
                "4": 0,
                "9": 1,
                "98": 221
            }
        }, {
            "name": "餐厨用品",
            "id": 8,
            "count": 257,
            "status": {
                "1": 257,
                "2": 0,
                "3": 0,
                "4": 0,
                "9": 0,
                "98": 257
            }
        }, {
            "name": "其他分类",
            "id": -1,
            "count": 321,
            "status": {
                "1": 320,
                "2": 0,
                "3": 0,
                "4": 0,
                "9": 1,
                "98": 321
            }
        }, {
            "name": "限时秒杀",
            "id": -998,
            "count": 13,
            "status": {
                "1": 13,
                "2": 0,
                "3": 0,
                "4": 0,
                "9": 0,
                "98": 13
            }
        }, {
            "name": "大宗特卖",
            "id": -999,
            "count": 1,
            "status": {
                "1": 1,
                "2": 0,
                "3": 0,
                "4": 0,
                "9": 0,
                "98": 1
            }
        }, {
            "id": 16,
            "name": "X月特惠",
            "count": 0,
            "status": {
                "1": 0,
                "2": 0,
                "3": 0,
                "4": 0,
                "98": 0
            }
        }]
    },
    getreportcityPOST: {
        category1: 1,
        s_t: '2016-07-01',
        e_t: '2016-07-01'
    },
    getreportcity: {
        "ret": 1,
        "data": [{
            "name": "北京",
            "id": 1,
            "count": 3075,
            "status": {
                "1": 3032,
                "2": 38,
                "3": 3,
                "4": 1,
                "9": 1,
                "98": 3075
            }
        }, {
            "name": "上海",
            "id": 2,
            "count": 1386,
            "status": {
                "1": 1384,
                "2": 1,
                "3": 0,
                "4": 0,
                "9": 1,
                "98": 1386
            }
        }]
    },
    //按照SKU维度查询
    queryquotebyskuPOST: {
        "city_id": "", //城市id
        "class1": "", //一级分类
        "class2": "", //如果选择全部可以传0
        "class3": "", //如果选择全部可以传0
        "sku": "", //sku名称的模糊查询或skuid
        "only_display_high": "0", //如果没有选择可以传0,勾选传1
        "order_by": "", //排序方式1.按商品数量排序price   2.按超过市调价格排序sur_ratio
        "per_page": 20, //每页显示的数量
        "page": '' //页码,从1开始
    },

    queryquotebysku: {
        "ret": 1,
        "data": {
            "rows": [
                /*
              {
                "_id": 1, //自增主键
                "sku": 12385, //sku id
                "sku_name": "土豆", //sku 名称
                "sku_level": "优质优质优质优质", //sku 等级
                "sku_brand": "美菜优质优质优质优质", //sku 品牌
                "sku_stad": "斤优质优质优质优质", //sku 规格
                "sku_unit": "斤", //sku 计价单位
                "price": 2.12, //最低报价
                "price_time": 1467561600, //最低报价时间（即哪一天的最低报价）
                "sur_price": 2.56, //市调价格
                "sur_time": 1467561600, //市调时间
                "sur_ratio": 14.2, //和市调价格比例:((price-sur_price) / sur_price) * 100 
                "last_price": 2.09, //上次报价（上个报价周期的最低报价）
                "last_ratio": 13.2, //和上次报价比例:((price-last_price)/last_price) * 100
                "city": 1, //城市编号
                "c_t": 1467624648 //创建时间
            }, {
                "_id": 2, //自增主键
                "sku": 12386, //sku id
                "sku_name": "土豆", //sku 名称
                "sku_level": "优质", //sku 等级
                "sku_brand": "美菜", //sku 品牌
                "sku_stad": "斤", //sku 规格
                "sku_unit": "斤", //sku 计价单位
                "price": 2.12, //最低报价
                "price_time": 1467561600, //最低报价时间（即哪一天的最低报价）
                "sur_price": 2.56, //市调价格
                "sur_time": 1467561600, //市调时间
                "sur_ratio": 14.2, //和市调价格比例:((price-sur_price) / sur_price) * 100 
                "last_price": 2.09, //上次报价（上个报价周期的最低报价）
                "last_ratio": 13.2, //和上次报价比例:((price-last_price)/last_price) * 100
                "city": 1, //城市编号
                "c_t": 1467624648 //创建时间
            },   "c_t": 1467624648 //创建时间
           */
            ],
            "per_page": 20,
            "page": 1,
            "total": 0,
            "total_pages": 3
        }
    },
    //查看商品详情
    getskudetailPOST: {
        "city_id": 1, //城市id
        "sku_id": 1318, //sku id
        "class1": 1 //一级分类
    },
    getskudetail: {
        "ret": 1,
        "data": [{
            "supplier_id": 1, //供应商id
            "supplier_name": "散户", //供应商名称
            　　　　　　"supplier_no": "MC00001", //供应商编码
            "contact_person": "齐尚岗", //联系人
            "contact_phone": "13839670988", //联系电话
            "quote_period": [{ //各报价周期的价格，现在是取6个报价周期，按日期顺序排列
                "quote_time": 1467692053, //报价时间
                "title": "6.22报价", //标题
                "price": 2.8, //当前报价周期有效报价价格
                "is_lowest": 1, //是不是最低价格，是1不是0
                "is_repeatedly": 1, //当前报价周期是不是有多次报价是1不是0
                "change_price": [{ //如果是多次报价，报价时间和价格
                    "time": 1467692053,
                    "price": 2.66
                }, { //如果是多次报价，报价时间和价格
                    "time": 1467692053,
                    "price": 2.66
                }, { //如果是多次报价，报价时间和价格
                    "time": 1467692053,
                    "price": 2.66
                }, { //如果是多次报价，报价时间和价格
                    "time": 1467692053,
                    "price": 2.66
                }, { //如果是多次报价，报价时间和价格
                    "time": 1467692053,
                    "price": 2.66
                }, { //如果是多次报价，报价时间和价格
                    "time": 1467692053,
                    "price": 2.66
                }, { //如果是多次报价，报价时间和价格
                    "time": 1467692053,
                    "price": 2.66
                }, { //如果是多次报价，报价时间和价格
                    "time": 1467692053,
                    "price": 2.66
                }, { //如果是多次报价，报价时间和价格
                    "time": 1467692053,
                    "price": 2.66
                }, { //如果是多次报价，报价时间和价格
                    "time": 1467692053,
                    "price": 2.66
                }, { //如果是多次报价，报价时间和价格
                    "time": 1467692053,
                    "price": 2.66
                }, { //如果是多次报价，报价时间和价格
                    "time": 1467692053,
                    "price": 2.66
                }, { //如果是多次报价，报价时间和价格
                    "time": 1467692053,
                    "price": 2.66
                }, { //如果是多次报价，报价时间和价格
                    "time": 1467692053,
                    "price": 2.66
                }, { //如果是多次报价，报价时间和价格
                    "time": 1467692053,
                    "price": 2.66
                }, { //如果是多次报价，报价时间和价格
                    "time": 1467692053,
                    "price": 2.66
                }, { //如果是多次报价，报价时间和价格
                    "time": 1467692053,
                    "price": 2.66
                }, { //如果是多次报价，报价时间和价格
                    "time": 1467692053,
                    "price": 2.66
                }, { //如果是多次报价，报价时间和价格
                    "time": 1467692053,
                    "price": 2.66
                }, { //如果是多次报价，报价时间和价格
                    "time": 1467692053,
                    "price": 2.66
                }, { //如果是多次报价，报价时间和价格
                    "time": 1467692053,
                    "price": 2.66
                }, { //如果是多次报价，报价时间和价格
                    "time": 1467692053,
                    "price": 2.66
                }, { //如果是多次报价，报价时间和价格
                    "time": 1467692053,
                    "price": 2.66
                }, { //如果是多次报价，报价时间和价格
                    "time": 1467692053,
                    "price": 2.66
                }, { //如果是多次报价，报价时间和价格
                    "time": 1467692053,
                    "price": 2.66
                }]
            }],
        }, {
            "supplier_id": 3, //供应商id
            "supplier_name": "散户", //供应商名称
            　　　　　　"supplier_no": "MC00001", //供应商编码
            "contact_person": "齐尚岗", //联系人
            "contact_phone": "13839670988", //联系电话
            "quote_period": [{ //各报价周期的价格，现在是取6个报价周期，按日期顺序排列
                "quote_time": 1467692053, //报价时间
                "title": "6.22报价", //标题
                "price": 2.8, //当前报价周期有效报价价格
                "is_lowest": 0, //是不是最低价格，是1不是0
                "is_repeatedly": 1, //当前报价周期是不是有多次报价是1不是0
                "change_price": [{ //如果是多次报价，报价时间和价格
                    "time": 1467692053,
                    "price": 2.66
                }]
            }],
        }, {
            "supplier_id": 4, //供应商id
            "supplier_name": "散户", //供应商名称
            　　　　　　"supplier_no": "MC00001", //供应商编码
            "contact_person": "齐尚岗", //联系人
            "contact_phone": "13839670988", //联系电话
            "quote_period": [{ //各报价周期的价格，现在是取6个报价周期，按日期顺序排列
                "quote_time": 1467692053, //报价时间
                "title": "6.22报价", //标题
                "price": 2.8, //当前报价周期有效报价价格
                "is_lowest": 0, //是不是最低价格，是1不是0
                "is_repeatedly": 0, //当前报价周期是不是有多次报价是1不是0
                "change_price": [{ //如果是多次报价，报价时间和价格
                    "time": 1467692053,
                    "price": 2.66
                }]
            }],
        }]
    },



    //是否登陆
    isLogin: {
        "ret": 1,
        "data": {
            // "login_url": "http://sso.test.yunshanmeicai.com/index.php/user/login?system_key=pdms",
            logout_url: '',
            "auth": [ //当前登录角色拥有的权限url
                '/site/index', //首页

                "/grope/list", //分配寻品任务
                '/grope/operation',
                '/grope/report',

                '/quote/supply',
                '/quote/sku'
            ],
            user_info: {
                user_name: '',
                role_name: ''
            }
        }
    },


    getNewProSubmissionCount: {
        ret: 1,
        data: [{
            head: "新品引入",
            rows: [{
                title: '待分配',
                value: 7740
            }, {
                title: '累计已引入',
                value: 23
            }]
        }]
    },



    //开发人员姓名：xxx
    //前端pOST、get...数据

    queryQuoteBySupplierPOST: {
        'city_id': '', //城市id
        "class1": '', //一级分类必须选择
        "supplier": "", //供应商名称的模糊查询或供应商id
        "only_display_high": "0", //如果没有选择可以传0,勾选传1
        "order_by": "", //排序方式1.按商品数量排序sku_cont2.按超过市调价格排序over_cont
        "per_page": 20, //每页显示的数量
        "page": 1 //页码,从1开始
    },
    queryQuoteBySupplier: {
        "ret": 1,
        "data": {
            "rows": [
                /*
                {
                "_id": 1, //自增主键
                "sup_id": 255, //供应商id
                "sup_name": "齐尚岗", //供应商名称
                "clas_id": [1000, 1001], //供应商供应分类id
                "clas_name": "新鲜蔬菜，时令水果", //供应商供应分类名称
                "sku_cont": 15, //供应商供应商sku数量
                "over_cont": 12, //超过市调价格数量
                "over_ratio": 80, //超过市调价格商品占比
                "city": 1, //城市编号
                "c_t": 1467624648 //创建时间
            }, {
                "_id": 2, //自增主键
                "sup_id": 255, //供应商id
                "sup_name": "齐尚岗", //供应商名称
                "clas_id": [1000, 1001], //供应商供应分类id
                "clas_name": "新鲜蔬菜，时令水果", //供应商供应分类名称
                "sku_cont": 15, //供应商供应商sku数量
                "over_cont": 12, //超过市调价格数量
                "over_ratio": 80, //超过市调价格商品占比
                "city": 1, //城市编号
                "c_t": 1467624648 //创建时间
            }*/
            ],
            "per_page": 20,
            "page": 1,
            "total": 0,
            "total_pages": 3
        }
    },


    querySKUPriceBySupplierPOST: {
        "city_id": '', //城市id
        "quote_sup": '', //按供应商维度的进价报表id
        "sup_id": '', //供应商id
        "sku": "", //供应商名称的模糊查询或供应商id
        "only_display_high": "0", //如果没有选择可以传0,勾选传1
        "order_by": "", //排序方式1.按商品数量排序price   2.按超过市调价格排序sur_ratio
        "per_page": 20, //每页显示的数量
        "page": 1 //页码,从1开始
    },

    querySKUPriceBySupplier: {
        "ret": 1,
        "data": {
            "supplier_name": "齐尚岗", //供应商名称
            "supplier_id": "255", //供应商id
            "contact_person": "齐尚岗", //联系人
            "contact_phone": "13839670988", //联系电话
            "rows": [
                /*
                {
                "_id": 123123213, //主键（自动生成）
                "quote_sup": 2, //按供应商维度的进价报表id
                "sup_id": 255, //供应商id
                "sku": 12381, //sku id
                "sku_name": "香菜", //sku 名称
                "sku_level": "优质", //sku 等级
                "sku_brand": "美菜", //sku 品牌
                "sku_stad": "斤", //sku 规格
                "sku_unit": "斤", //计价单位
                "price": 2.09, //最低报价
                "price_time": 1467561600, //最低报价时间（即哪一天的最低价）
                "sur_price": 2.2, //市调价格
                "sur_time": 1467561600, //市调时间
                "sur_ratio": 21.5, //和市调价格比例:((price-sur_price) / sur_price) * 100 
                "last_price": 1.89, //上次报价（上个报价周期的最低报价）
                "last_ratio": -23.1, //和上次报价比例:((price-last_price)/last_price) * 100
                "city": 1, //城市编号
                "c_t": 1467624648 //创建时间
            }, {
                "_id": 12312321783, //主键（自动生成）
                "quote_sup": 2, //按供应商维度的进价报表id
                "sup_id": 255, //供应商id
                "sku": 12382, //sku id
                "sku_name": "香菜", //sku 名称
                "sku_level": "优质", //sku 等级
                "sku_brand": "美菜", //sku 品牌
                "sku_stad": "斤", //sku 规格
                "sku_unit": "斤", //计价单位
                "price": 2.09, //最低报价
                "price_time": 1467561600, //最低报价时间（即哪一天的最低价）
                "sur_price": 2.2, //市调价格
                "sur_time": 1467561600, //市调时间
                "sur_ratio": 21.5, //和市调价格比例:((price-sur_price) / sur_price) * 100 
                "last_price": 1.89, //上次报价（上个报价周期的最低报价）
                "last_ratio": -23.1, //和上次报价比例:((price-last_price)/last_price) * 100
                "city": 1, //城市编号
                "c_t": 1467624648 //创建时间
            }
           */
            ],
            "per_page": 20,
            "page": 1,
            "total": 0,
            "total_pages": 3
        }
    },



}]);

module.exports = DefaultData