import {DayOfWeek} from "../../../../types/subscribe";
import {Discount} from "@mui/icons-material";
import React from "react";

export function useSubscribeFunctions() {
    const features = [
        {
            icon: <Discount sx={{ fontSize: 40, color: '#F29727' }}/>,
            title: "오늘의 특가 세일",
            description: "매일 엄선된 다양한 카테고리의 최저가 특가 정보"
        },
    ];
    const getDaysOfWeek = () => {
        return [
            { key: DayOfWeek.MONDAY, label: '월' },
            { key: DayOfWeek.TUESDAY, label: '화' },
            { key: DayOfWeek.WEDNESDAY, label: '수' },
            { key: DayOfWeek.THURSDAY, label: '목' },
            { key: DayOfWeek.FRIDAY, label: '금' }
        ]
    }

    return{
        features,
        getDaysOfWeek
    }
}