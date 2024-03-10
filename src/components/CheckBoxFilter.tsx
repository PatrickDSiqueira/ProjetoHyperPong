import {Checkbox} from "primereact/checkbox";
import {TypeCompetitions} from "../types/types";
import React, {useState} from "react";
import {useFilterEvents, saveOrDeleteFilter} from "../hooks/useFilterEvents";

interface Props {
    value: string,
    setListeningFather: React.Dispatch<React.SetStateAction<number>>,
}

const CheckBoxFilter = ({value, setListeningFather}: Props) => {

    const [listening, setListening] = useState(0)
    const filterList = useFilterEvents(listening);

    const handleClickChange = (value: string) => {
        setListeningFather(listening + 1);
        saveOrDeleteFilter(value);
        setListening(listening + 1);
    }

    return <div style={{margin: 10}}>
        < Checkbox
            inputId={value}
            checked={filterList.includes(value)}
            value={value}
            onChange={(e) => handleClickChange(e.target.value)}
        />
        <label htmlFor={value}>{TypeCompetitions[parseInt(value)]}</label>
    </div>
}

export default CheckBoxFilter;
