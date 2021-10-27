import React, { useState } from "react";

import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import "./Search.styles.scss";

export const Search = () => {
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [type, setType] = useState("");

  const handleChange = (event) => {
    setYear(event.target.value);
  };

  return (
    <div className='search'>
      <Input
        id='input-with-icon-adornment'
        placeholder='Search by Make or Model'
        className='search__input'
        // disableUnderline
        startAdornment={
          <InputAdornment position='start'>
            <SearchIcon className='search__icon' />
          </InputAdornment>
        }
      />
      <div className='filter'>
        <FormControl>
          <InputLabel id='select-year-label' className='filter__select-label'>
            Year
          </InputLabel>
          <Select
            className='filter__select'
            labelId='select-year-label'
            id='select-year'
            value={year}
            label='Year'
            onChange={handleChange}>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id='select-make-label' className='filter__select-label'>
            Make
          </InputLabel>
          <Select
            className='filter__select'
            labelId='select-make-label'
            id='select-year'
            value={make}
            label='Make'
            onChange={handleChange}>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id='select-type-label' className='filter__select-label'>
            Type
          </InputLabel>
          <Select
            className='filter__select'
            labelId='select-type-label'
            id='select-year'
            value={type}
            label='Type'
            onChange={handleChange}>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
};
