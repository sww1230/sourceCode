import React from 'react'

class Class1 extends React.Component {
	constructor(props){ 
	      super(props);
	      this.state = {
              class1_list : this.props.class1_list
	      }
    }

    componentWillMount() {
        // 所有的一级分类
        //this.class1_list = this.props.class1_list;
        // 被选择的一级分类
        //this.selected_class1 = this.props.selectedCategory;
    }

    componentDidMount() {

    }

    /**
     * 收集一级分类
     * @param id
     * @param name
     */
    onClickHandle(id,name){
        if(document.getElementById(id).checked){
            if(!this.props.selectedCategory[id]){
                var obj = {};
                obj.id = id;
                obj.name = name;
                this.props.selectedCategory[id] = obj;
            }
            this.updateClass1CheckedStatus(id, "checked");
        } else {
            delete this.props.selectedCategory[id];
            this.updateClass1CheckedStatus(id, "");
        }
    }

    updateClass1CheckedStatus(id, status){
        this.props.class1_list.map(function(item, key){
            if(item.id == id){
                item.checked = status;
            }
        });
        this.setState({class1_list: this.props.class1_list });
    }

    render() {
        var class1_pop = [];
        var that = this;
        this.state.class1_list.map(function(item,key){
            class1_pop.push(<span key={key} style={{display: 'inline-block', width: '100px'}}><input readOnly="readonly" defaultChecked={item.checked} id={item.id}  onClick={that.onClickHandle.bind(that,item.id,item.name)} type="checkbox" name="class1"/>{item.name}</span>);
        });
        return <div>{class1_pop}</div>;
    }
}

module.exports =  Class1

