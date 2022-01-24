import BottomMenu from "../components/BottomMenu";
import GroceryListPanel from "../components/GroceryListPanel";
import HeaderBar from "../components/HeaderBar";

export default function Groceries() {
    return (<div> <HeaderBar settings={true} backButton={false}/><GroceryListPanel /><BottomMenu /></div>);
}