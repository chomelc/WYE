import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import DayMealsCard from "./DayMealsCard";

export default function DayMealsPanel() {
    const day: IDay[] = useSelector(
        (state: DayState) => state.day);

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
            {day.length > 0 && day?.map(d => {
                return (
                    <DayMealsCard d={d} />
                );
            }
            )}
        </Box>
    );
}