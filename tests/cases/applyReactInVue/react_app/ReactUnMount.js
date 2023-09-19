import React, { useEffect } from 'react'
export default class A extends React.Component {
    componentWillUnmount() {
        const foundDom = document.querySelector(".aaa")
        const notFoundDom = document.querySelector(".bbb")
        if (foundDom && !notFoundDom) {
            document.body.appendChild(document.createTextNode("reactUnMountSuccess"))
        }
    }
    render() {
        document.body.appendChild(document.createTextNode("reactUnMountSuccess"))
        return (<div>
            <div className="aaa">unMountTest</div>
        </div>)
    }
}
