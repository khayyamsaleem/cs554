import React from "react"
import Editor from "../components/Editor"
import NavBar from "../components/Navbar"

export default class MDEditor extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            code: "[//]: # (Enter some Markdown here!)"
        }
    }

    updateCode(code){
        this.setState({ code })
    }

    render() {
        return (
            <>
            <NavBar 
                code={this.state.code}
            />
            <Editor
                code={this.state.code}
                updateCode={this.updateCode.bind(this)}
            />
            </>
        )
    }
}
