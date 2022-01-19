import BottomMenu from "../components/BottomMenu";
import HistoryPanel from "../components/HistoryPanel"
import HeaderBar from "../components/HeaderBar";

export default function History() {
    return (<div> <HeaderBar settings={true}/><HistoryPanel /><BottomMenu /></div>);
}