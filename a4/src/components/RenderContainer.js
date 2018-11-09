import React from "react"
import ReactMarkdown from "react-markdown"
import "../styles/github_md.scss"

export default class RenderContainer extends React.Component {
    constructor(props) {
        super()
        this.state = {
            code: props.code
        }
    }

    render() {
        return (
            <div className="renderContainer">
                <ReactMarkdown source={this.props.code} />
            </div>
        )
    }
}
