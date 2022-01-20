import { useParams } from "react-router-dom";

export default function DayMealsPanel() {
    const {date} = useParams();
    return (<div>Day Meals ({date})</div>);
}