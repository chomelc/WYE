import LoginPanel from "../components/LoginPanel";
import HeaderBar from "../components/HeaderBar";

export default function Root() {
    return (<div> <HeaderBar settings={false} backButton={false}/><LoginPanel /></div>);
}
