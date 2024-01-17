import {
    Button,
    FormControl,
    Input,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    ToggleButton,
    ToggleButtonGroup,
} from '@mui/material';
import Joi from 'joi';
import { useState } from 'react';
import { submitURL } from '../lib/axios';
import { parseCookies } from 'nookies';

export const CustomInput = ({ value, setValue, label, type, disabled = false }) => {
    return (
        <FormControl className="w-full">
            <InputLabel className="">{label}</InputLabel>
            <OutlinedInput
                type={type === 'email' ? 'text' : type}
                label={label}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                disabled={disabled}
            />
        </FormControl>
    );
};

export const CustomSelect = ({ value, setValue, label, options, disabled = false }) => {
    const handleChange = (e) => {
        setValue(e.target.value);
    };

    return (
        <FormControl className="w-full">
            <InputLabel>{label}</InputLabel>
            <Select value={value} onChange={handleChange} disabled={disabled} label={label}>
                {options.map((option) => (
                    <MenuItem value={option.value} key={'option' + option.value}>
                        {option.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export const LoginToggle = ({ value, setValue, options, disabled = false }) => {
    function handleChange(e) {
        setValue(e.target.value);
    }

    return (
        <ToggleButtonGroup
            color="primary"
            value={value}
            exclusive
            onChange={handleChange}
            disabled={disabled}
            className="w-full"
        >
            {options.map((option) => {
                return (
                    <ToggleButton key={'option' + option} value={option}>
                        {option}
                    </ToggleButton>
                );
            })}
        </ToggleButtonGroup>
    );
};

export const AddURL = ({ select, setSelect, url, setURL, submitURL }) => {
    const options = ['management', 'tech', 'design', 'video'];

    function handleChange(e) {
        setSelect(e.target.value.toLowerCase());
    }

    return (
        <div className="flex flex-row gap-2 w-full">
            <FormControl>
                <Select
                    id="simple-select"
                    value={select}
                    onChange={handleChange}
                    className="bg-peach text-gray-dark rounded-md"
                    classes={{ icon: 'text-gray-dark' }}
                >
                    {options.map((option, index) => (
                        <MenuItem key={`domainoption${index}`} value={option}>
                            {option.toUpperCase()}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl className="grow">
                <OutlinedInput
                    value={url}
                    onChange={(e) => setURL(e.target.value)}
                    required
                    className="rounded-lg"
                    placeholder="Paste a link to your work"
                />
            </FormControl>
            <Button
                variant="contained"
                type="submit"
                classes={{
                    contained: 'rounded-lg bg-tech bg-opacity-90 hover:bg-opacity-100',
                }}
                onClick={submitURL}
            >
                ADD
            </Button>
        </div>
    );
};

export const DomainURL = ({ domain, value, setValue, handleSnackOpen }) => {
    const [editing, setEditing] = useState(false);

    function startEdit() {
        setEditing(true);
    }

    async function handleSubmit() {
        const { error } = Joi.string().uri().validate(value);
        if (error) {
            handleSnackOpen({
                message: 'Invalid URL, kindly include the link with http/https',
                variant: 'error',
            });
            return;
        }
        setEditing(false);
        const cookies = parseCookies();
        const res = await submitURL({ domain, cookies, value });
        if (res.code === 200) {
            handleSnackOpen({
                message: res.message,
                variant: 'success',
            });
        }
    }

    return (
        <div className="flex flex-row gap-2 w-full items-center">
            <h1
                className="uppercase text-sm sm:text-lg md:text-xl font-bold w-1/3 sm:w-1/4 md:w-1/5 text-right"
                style={{ color: `var(--${domain})` }}
            >
                {domain}
            </h1>

            {editing ? (
                <>
                    <FormControl className="grow" fullWidth>
                        <Input
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            required
                            className="rounded-lg"
                            type="url"
                        />
                    </FormControl>

                    <button
                        className="transition ease-linear py-2 px-4 rounded text-black font-semibold bg-peach hover:bg-transparent hover:text-peach border-2 border-peach"
                        onClick={(e) => {
                            handleSubmit(e);
                        }}
                    >
                        SUBMIT
                    </button>
                </>
            ) : (
                <>
                    {value ? (
                        <h1 className="w-full truncate text-center">
                            <a
                                href={value}
                                target="_blank"
                                className="text-peach underline font-semibold"
                                rel="noreferrer"
                            >
                                {value}
                            </a>
                        </h1>
                    ) : (
                        <h1 className="w-full font-semibold text-center">Add a Link to your work</h1>
                    )}

                    <button
                        className="transition ease-linear py-2 px-4 rounded text-black font-semibold bg-peach hover:bg-transparent hover:text-peach border-2 border-peach"
                        onClick={startEdit}
                    >
                        EDIT
                    </button>
                </>
            )}
        </div>
    );
};
