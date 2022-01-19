import BottomMenu from "../components/BottomMenu";
import MealsPanel from "../components/MealsPanel";
import HeaderBar from "../components/HeaderBar";

export default function Meals() {
    return (<div> <HeaderBar settings={true}/><MealsPanel /><BottomMenu /></div>);
}