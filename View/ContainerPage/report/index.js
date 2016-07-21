import React from 'react'
import {
  Link
} from 'react-router'


import Button from '../../Components/button'
import Icon from '../../Components/icon'

const ButtonGroup = Button.Group;


class Report extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 1
    }
  }
  componentDidMount() {}
  componentWillMount() {}
  changeIndex(index) {
    this.setState({
      index: index
    })
  }
  render() {
    return (
      <div id="Report">

                <div style={{height:'36px',marginTop:'40px',borderTop:'1px solid #d9d9d9',position: 'relative',}}>
                    <div className="btn-group" role="group" style={{top:'-16px',left:'50%',marginLeft:'-67px'}}>
                      <button type="button" className={this.state.index == 1 ? 'btn btn-danger':"btn btn-default"} ><Link to="/report" onClick={()=>{this.changeIndex(1)}}  style={this.state.index == 1 ? {color:'#fff'} :{color:'#666'}}>按品类</Link></button>
                      <button type="button" className={this.state.index == 2 ? 'btn btn-danger':"btn btn-default"} ><Link to="/city" onClick={()=>{this.changeIndex(2)}}  style={this.state.index == 2 ? {color:'#fff'} :{color:'#666'}}>按城市</Link></button>
                    </div>
                </div>

                <div className="p20">
                    {React.cloneElement(this.props.children,{store:this.props.store})}
                </div>


            </div>
    );
  }
}

module.exports = Report