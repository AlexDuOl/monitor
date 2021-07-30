import React, {Component} from 'react'

class BaseComponent extends Component {
    onChangeValue = (event, data) => {
        if (data) {
            switch (data.type) {
                case "checkbox":
                    this.setState({[data.name]: data.checked})
                    return
                default:
                    this.setState({[data.name]: data.value})
            }
        } else {
            switch (event.target.type) {
                case "checkbox":
                    this.setState({[event.target.name]: event.target.checked})
                    return
                default:
                    this.setState({[event.target.name]: event.target.value})
            }
        }
    }
}

export default BaseComponent
