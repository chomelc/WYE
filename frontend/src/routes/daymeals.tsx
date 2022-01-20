import BottomMenu from "../components/BottomMenu";
import DayMealsPanel from "../components/DayMealsPanel";
import HeaderBar from "../components/HeaderBar";

export default function DayMeals() {
    return (<div> <HeaderBar settings={true}/><DayMealsPanel /><BottomMenu /></div>);
}