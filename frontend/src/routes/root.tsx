import BottomMenu from "../components/BottomMenu";
import MealsPanel from "../components/MealsPanel";
import HeaderBar from "../components/HeaderBar";

export default function Root() {
    return (<div> <HeaderBar settings={false}/><MealsPanel /><BottomMenu /></div>);
}
