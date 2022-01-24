import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { getCurrentDate } from "../modules/utils";
import MealsCard from "./MealsCard";

export default function HistoryPanel() {
    const date = getCurrentDate();

    const days: IDay[] = useSelector(
        (state: DaysState) => state.days)

    const isInThePast = (d) => {
        if (d < date)
            return true;
        return false;
    }

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 2, width: '100%' },
                p: 2
            }}
            noValidate
            autoComplete="off"
        >
            {days.length > 0 && days?.map(d => {
                // only display days from current day up until 7 days later
                // example : from monday to sunday
                if ((isInThePast(d.date))) {
                    return (
                        <MealsCard d={d} history={true} />
                    );
                }
            })}
        </Box>
    )
}