import React from 'react'
import { markdown } from "markdown"
import "../styles/navbar.scss"

const convert = markdown.toHTML

export default class NavBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fileName: "",
            code: props.code
        }
    }

    onFileNameChange(e) {
        const fileName = e.target.value
        this.setState({ fileName })
    }

    downloadFile(fmt){
        if (!this.state.fileName){
            alert("Must enter a file name before downloading!")
            return
        }
        const raw = fmt === "md" ? this.props.code : convert(this.props.code)

        const blobURL = URL.createObjectURL(new Blob([raw]))
        const dl = `${this.state.fileName.replace(/ /g, "_")}.${fmt}`

        let link = document.createElement("a")
        link.href = blobURL
        link.download = dl
        link.click()
    }

    render() {
        return (
            <div className="navbar">
                <input
                    className="filename"
                    placeholder="Enter a title..."
                    value={this.state.fileName}
                    onChange={e => this.onFileNameChange(e)}
                />
                <div className="buttons">
                    <button onClick={() => this.downloadFile("md")}>
                        Download Source File
                    </button>
                    <button onClick={() => this.downloadFile("html")}>
                        Download Output
                    </button>
                </div>
            </div>
        )
    }
}

