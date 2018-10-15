import React from "react"
import MonacoEditor from "react-monaco-editor"

export default class Editor extends React.Component {

    render() {
        window.addEventListener('resize', this.handleResize)
        const code = this.props.code;
        const options = { selectOnLineNumbers: true, automaticLayout: true }
        const requireConfig = {
            url: 'node_modules/monaco-editor/min/vs/loader.js',
            paths: {
                vs: 'node_modules/monaco-editor/min/vs'
            }
        };
        return (
            <MonacoEditor
                language="markdown"
                ref="monaco"
                value={code}
                height="1000"
                automaticLayout={true}
                options={options}
                onChange={code => this.props.updateCode(code)}
                name="editor"
                requireConfig={requireConfig}
            />
        )
    }
}