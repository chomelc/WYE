import BottomMenu from "../components/BottomMenu";
import ProfilePanel from "../components/ProfilePanel"
import HeaderBar from "../components/HeaderBar";

export default function Profile() {
    return (<div> <HeaderBar settings={true} backButton={false}/><ProfilePanel /><BottomMenu /></div>);
}