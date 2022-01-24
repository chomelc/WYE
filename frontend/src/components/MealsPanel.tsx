import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import MealsCard from "./MealsCard";

export default function MealsPanel() {
    let counter: number = 0;
    const current = new Date();
    var month = ("0" + (current.getMonth() + 1)).slice(-2);
    var day = ("0" + current.getDate()).slice(-2);
    const date = `${day}-${month}-${current.getFullYear()}`;

    const days: IDay[] = useSelector(
        (state: DaysState) => state.days)

    const isInTheFuture = (d) => {
        if (d >= date)
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
                if ((isInTheFuture(d.date)) && counter < 7) {
                    counter++;
                    return (
                        <MealsCard d={d} />
                    );
                }
            })}
        </Box>
    )
}