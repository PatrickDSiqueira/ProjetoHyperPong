import {useEffect, useState} from "react";

export function useFilterEvents(listening: number) {

    const [usedFilter, setUsedFilter] = useState<string[]>(['0', '1']);

    const updateFilter = () => setUsedFilter(getArrayFilterFromLocalStorage());

    useEffect(updateFilter, [listening]);

    return usedFilter;
}

function getArrayFilterFromLocalStorage(): string[] {

    const storedData = localStorage.getItem('filter_events');

    if (storedData) {

        return JSON.parse(storedData);
    }

    return ['0', '1']
}

export function saveOrDeleteFilter(value: string) {

    const usedFilter = getArrayFilterFromLocalStorage();

    let newFilter = usedFilter.includes(value)
        ? usedFilter.filter(item => item !== value)
        : [...usedFilter, value]

    localStorage.setItem('filter_events', JSON.stringify(newFilter));
}