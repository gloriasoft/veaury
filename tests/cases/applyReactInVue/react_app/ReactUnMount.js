import React, { useEffect } from 'react'
export default class A extends React.Component {
    componentWillUnmount() {
        const foundDom = document.querySelector(".aaa")
        const notFoundDom = document.querySelector(".bbb")
        if (foundDom && !notFoundDom) {
            document.body.appendChild(document.createTextNode("test-result-1"))
        }

        const foundIdDom = document.getElementById("unmountId")
        const notFoundIdDom = document.getElementById("unmountId-notexists")
        if (foundIdDom && !notFoundIdDom) {
            document.body.appendChild(document.createTextNode("test-result-2"))
        }
    }
    render() {
        return (<div>
            <div className="aaa">unMountTest</div>
            <div id="unmountId">unMountTest</div>
        </div>)
    }
}
