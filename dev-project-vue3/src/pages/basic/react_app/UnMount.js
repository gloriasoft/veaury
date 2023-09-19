import React, { useEffect } from 'react'
 

const myReactComponent = class A extends React.Component {
    componentWillUnmount() {
        console.log(1111, document.querySelector(".aaa"))   
        console.log(2222, document.querySelector(".bbb"))   
    }
    render() {
        return (<div>
            <div className="aaa">unMountTest</div>
        </div>)
    }
}

export default myReactComponent