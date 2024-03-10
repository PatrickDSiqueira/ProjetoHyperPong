import {useEffect, useState} from "react";

export function useFilterEvents(listening: number) {

    const [usedFilter, setUsedFilter] = useState<string[]>(['0', '1']);

    const updateFilter = () => setUsedFilter(getArrayFilterFromLocalStorage());

    useEffect(updateFilter, [listening]);

    return usedFilter;
}

function getArrayFilterFromLocalStorage(): string[] {

    const storageItem = localStorage.getItem('filter_events');

    if(!storageItem){

        return ['0', '1'];
    }

        return JSON.parse(storageItem);
}

export function saveOrDeleteFilter(value: string) {

    const usedFilter = getArrayFilterFromLocalStorage();

    let newFilter = usedFilter.includes(value)
        ? usedFilter.filter(item => item !== value)
        : [...usedFilter, value]

    localStorage.setItem('filter_events', JSON.stringify(newFilter));
}