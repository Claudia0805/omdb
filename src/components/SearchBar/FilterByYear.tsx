import { Slider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updateSearchTerms } from '../../redux/actions/searchActions';
import { AppState } from '../../types/type';

export const FilterByYear = () => {
    const YEAR_END = new Date().getFullYear();
    const [range, setRange] = useState<[number, number]>([0, 0]);

    const searchTerms = useSelector((s: AppState) => s.searchTerms);

    useEffect(() => {
        const yearRange = searchTerms?.yearRange;
        if (yearRange != null) {
            setRange([yearRange.startYear, yearRange.endYear ?? YEAR_END]);
        }
    }, [YEAR_END, searchTerms]);

    const dispatch = useDispatch();
    const handleYearChange = (_: Event, value: number | Array<number>) => {
        if (Array.isArray(value) && value.length === 2) {
            const startYear = value[0];
            const endYear = value[1];
            setRange([startYear, endYear]);
            dispatch(
                updateSearchTerms({
                    ...searchTerms,
                    yearRange: { startYear, endYear },
                }),
            );
        }
    };

    return (
        <div className="search-year-container">
            <div className="search-year-label">YEAR</div>
            <div className="search-year-slider">
                <span className="search-year-mark-left">1888</span>
                <Slider
                    name="year"
                    value={range}
                    defaultValue={range}
                    min={1888}
                    max={YEAR_END}
                    valueLabelDisplay="auto"
                    onChange={handleYearChange}
                    getAriaLabel={(index) => (index === 0 ? 'Start' : 'End')}
                />
                <span className="search-year-mark-right">{YEAR_END}</span>
            </div>
        </div>
    );
};
