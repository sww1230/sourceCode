import React from 'react'
require('./index.css')

class DropDown extends React.Component {
	constructor(props){ 
	      super(props);
	      this.state = {
              province: [
                  {
                      "id": "1",
                      "name": "北京市",       //名称
                      "code": "110000"       //编码
                  },
                  {
                      "id": "20",
                      "name": "天津市",
                      "code": "120000"
                  },
                  {
                      "id": "39",
                      "name": "河北省",
                      "code": "130000"
                  }
              ], //省份
              city: [
                  {
                      "id": "1732",
                      "code": "410702",
                      "name": "红旗区",
                      "post_code": "453000",
                      "phone_prefix": "0373"
                  },
                  {
                      "id": "1733",
                      "code": "410703",
                      "name": "卫滨区",
                      "post_code": "453000",
                      "phone_prefix": "0373"
                  },
                  {
                      "id": "1734",
                      "code": "410704",
                      "name": "凤泉区",
                      "post_code": "453000",
                      "phone_prefix": "0373"
                  }
              ], //城市
              area:[
                  {
                      "id": "1732",
                      "code": "410702",
                      "name": "红旗区",
                      "post_code": "453000",
                      "phone_prefix": "0373"
                  },
                  {
                      "id": "1733",
                      "code": "410703",
                      "name": "卫滨区",
                      "post_code": "453000",
                      "phone_prefix": "0373"
                  },
                  {
                      "id": "1734",
                      "code": "410704",
                      "name": "凤泉区",
                      "post_code": "453000",
                      "phone_prefix": "0373"
                  }
              ] //区域
	      }
    }

    componentWillMount() {
        this.data = this.props.initData;
    }

    componentDidMount() {
        //渲染列表的初始状态
        $("[name='province']").find("option[text=" + this.data.province + "]").attr("selected",true);
        $("[name='city']").find("option[text=" + this.data.city_name + "]").attr("selected",true);
    }

    /**
     * 更新显示城市
     */
    updateCity(){
        var province_code = $("[name='province']").val();
        //更新选中的省份code
        this.data.province_code = province_code;
        this.data.province = $("[name='province'] option:selected").text();
        // 通过ajax获取对应的城市列表
        this.state.city = [];
        this.setState({city: []});
        //更新选中的城市信息
        this.setData();
    }

    setData(){
        //更新选中的城市code
        this.data.city_code = $("[name='city']").val();
        this.data.city_name = $("[name='city'] option:selected").text();
    }

    render() {
        var province_list = [];
        var city_list = [];
        var area_list = [];
        this.state.province.map((item, index) => {
            province_list.push(
                <option key={index} value={item.code}>{item.name}</option>
            );
        });
        this.state.city.map((item, index) => {
            city_list.push(
                <option key={index} value={item.code}>{item.name}</option>
            );
        });
        this.state.area.map((item, index) => {
            area_list.push(
                <option key={index} value={item.code}>{item.name}</option>
            );
        });

        return(
        <div className="city_list">
            <select name="province" onChange={this.updateCity.bind(this)}>
                {province_list}
            </select>
            <select name="city" onChange={this.setData.bind(this)}>
                {city_list}
            </select>
            <select name="area" style={{display:"none"}}>
                {area_list}
            </select>
        </div>);
    }
}

module.exports =  DropDown

