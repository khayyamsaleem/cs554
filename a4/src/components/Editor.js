import React from "react"
import MonacoEditor from "react-monaco-editor"

export default class Editor extends React.Component {
    editorDidMount() {
        console.log('editorDidMount')
    }

    componentWillUnmount(){
        console.log('componentWillUnmount')
    }

    render() {
        const code = this.props.code;
        const options = { selectOnLineNumbers: true }
        const requireConfig = {
            url: 'node_modules/monaco-editor/min/vs/loader.js',
            paths: {
                vs: 'node_modules/monaco-editor/min/vs'
            }
        };
        return (
            <MonacoEditor
                width="800"
                height="900"
                language="markdown"
                value={code}
                options={options}
                onChange={code => this.props.updateCode(code)}
                editorDidMount={this.editorDidMount}
                name="editor"
                requireConfig={requireConfig}
            />
        )
    }
}