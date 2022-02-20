import { HashRouter, useRoutes } from "react-router-dom";
import config from './config'
const Routes = () => {
    return useRoutes(config);
};
export default function() {
    return <HashRouter><Routes/></HashRouter>
}
