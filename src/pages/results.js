/* eslint-disable react-hooks/rules-of-hooks */
import { FormControl, InputLabel, OutlinedInput, ToggleButton, ToggleButtonGroup } from '@mui/material';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { allSelected } from '../components/resultsData';
import Exclaimation from '../../public/assets/exclaimation.svg';

export default function results() {
    const [search, setSearch] = useState('');
    const [domainSelected, setDomainSelected] = useState(['tech', 'management', 'design', 'video']);

    const handleDomainSelection = (event, newDomain) => {
        setDomainSelected(newDomain);
    };

    const customFilter = (arr) => {
        return arr
            .filter((e) => {
                return (
                    e.name.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
                    e.regNo.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
                    e.username.toLowerCase().indexOf(search.toLowerCase()) !== -1
                );
            })
            .filter((e) => {
                return domainSelected.includes(e.domains[0]);
            });
    };

    const sortByName = (arr) => {
        return arr.sort((a, b) => {
            let fa = a.name.toLowerCase(),
                fb = b.name.toLowerCase();

            if (fa < fb) {
                return -1;
            }
            if (fa > fb) {
                return 1;
            }
            return 0;
        });
    };

    useEffect(() => {
        // console.log(allSelected);
    }, []);

    return (
        <div className="flex flex-col w-full py-10 px-4 sm:px-14 md:px-28 lg:px-44 gap-8">
            <h1 className="text-5xl md:text-7xl font-bold">Results</h1>

            <div className="flex flex-col items-center gap-4 sticky top-0 bg-gray-dark pt-4 pb-2 z-50">
                <FormControl className="grow self-stretch">
                    <InputLabel className="">Name or Username or RegNo</InputLabel>
                    <OutlinedInput
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        required
                        className="rounded-lg"
                        placeholder="Type here..."
                        label="Name or Username or RegNo"
                    />
                </FormControl>
                <ToggleButtonGroup value={domainSelected} onChange={handleDomainSelection} aria-label="device">
                    <ToggleButton value="design" aria-label="design" size="small">
                        Design
                    </ToggleButton>
                    <ToggleButton value="management" aria-label="management" size="small">
                        Management
                    </ToggleButton>
                    <ToggleButton value="tech" aria-label="tech" size="small">
                        Tech
                    </ToggleButton>
                    <ToggleButton value="video" aria-label="video" size="small">
                        Video
                    </ToggleButton>
                </ToggleButtonGroup>
            </div>
            <h2 className="text-2xl font-bold">CORE</h2>
            {!customFilter(allSelected).length && (
                <div className="flex flex-col items-center gap-2">
                    <div className="text-7xl">
                        <Exclaimation />
                    </div>
                    <p className="text-center">
                        Not available. Check if you have entered the correct spelling or Registration Number.
                    </p>
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-2">
                {sortByName(customFilter(allSelected.filter((e) => e.status === 'core'))).map(UserCard)}
            </div>
            <h2 className="text-2xl font-bold">COMMITTEE</h2>
            <p className="-mt-7">
                We see potential in you and so we want to give you chance to be part of the CSI community so that you
                could learn and grow with us.
            </p>
            {!customFilter(allSelected).length && (
                <div className="flex flex-col items-center gap-2">
                    <div className="text-7xl">
                        <Exclaimation />
                    </div>
                    <p className="text-center">
                        Not available. Check if you have entered the correct spelling or Registration Number.
                    </p>
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-2">
                {sortByName(customFilter(allSelected.filter((e) => e.status === 'committee'))).map(UserCard)}
            </div>
        </div>
    );
}

const UserCard = (item, index) => {
    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    return (
        <div className="flex gap-4 items-center" key={index}>
            <div className="bg-peach rounded-md min-w-fit">
                <Image
                    src={`https://avatars.dicebear.com/api/croodles-neutral/${item.username}.svg`}
                    alt="avatar"
                    width={100}
                    height={100}
                />
            </div>
            <div className="grow max-w-full overflow-hidden">
                <h2 className="text-lg md:text-xl whitespace-nowrap text-ellipsis overflow-hidden max-w-full">
                    {item.name.toUpperCase()}
                </h2>
                <h3 className="text-sm md:text-base">{item.regNo}</h3>
                <h3 className="text-sm md:text-base">
                    {item.domains.map((domain, i) => {
                        return (
                            <span
                                key={i}
                                style={{
                                    color: `var(--${domain.toLowerCase()})`,
                                }}
                            >
                                {capitalize(domain.toLowerCase())}
                            </span>
                        );
                    })}
                </h3>
                {/* <h3 className="text-sm md:text-base">{capitalize(item.status.toLowerCase())}</h3> */}
            </div>
        </div>
    );
};
