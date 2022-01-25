import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { getCurrentDate } from "../modules/utils";
import MealsCard from "./MealsCard";

export default function HistoryPanel() {
    const date = getCurrentDate();
    let noItemsToDisplay;

    const days: IDay[] = useSelector(
        (state: DaysState) => state.days)

    const isInThePast = (d: string) => {
        if (d < date)
            return true;
        return false;
    }

    const areInTheFuture = (days: IDay[]) => {
        for (const d of days) {
            if (d.date < date)
                return false;
        }
        return true;
    }

    if (days == undefined || days.length == 0 || areInTheFuture(days)) {
        noItemsToDisplay = <Typography
            align="center"
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}>
            Il n'y a pas encore d'historique à afficher :(
        </Typography>;
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
                if ((isInThePast(d.date))) {
                    return (
                        <MealsCard d={d} history={true} />
                    );
                }
            })}
            {noItemsToDisplay}
        </Box>
    )
}