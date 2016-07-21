import React from 'react'

// 使用：
// var params = {
//     title: {
//         text: '联系信息',
//         bright: true
//     },
//     description: '从业人员证明（本市人员经营的须提交户籍证明，含户口簿和身份证，以及离退休等各类无业人员的有关证明；',
//     component: Form
// }
// <FormBox params={params} />

var styles = {
    tip: {
        color: '#9b9b9b'
    },
    section: {
        border: '1px solid #d8d8d8',
        padding: '25px'
    },
    title: {
        fontWeight: 'normal'
    },
    brightTitle: {
        background: 'url(../../../../../Images/icon_l.png) no-repeat left 4px ',
        fontSize: '24px',
        letterSpacing: '0px',
        paddingLeft: '18px'
    }
}

class FormBox extends React.Component {
    render() {
        var params = this.props.params;
        return (
            <div className='section' style={styles.section} >
                    {params.title.bright ? <div style={styles.brightTitle}>{params.title.text}</div> : <h3 style={styles.title}>{params.title.text}</h3>}
                    {params.description && <p style={styles.tip}>{params.description}</p>}
                    {params.component}                    
            </div>
        )
    }
}

module.exports = FormBox