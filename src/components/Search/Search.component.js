import React from "react";

import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import "./Search.styles.scss";

export const Search = ({
  handleSearch,
  filterByYear,
  filterByMake,
  filterByType,
  year,
  make,
  type,
  allMakes,
  allTypes,
}) => {
  const yearsArray = [];
  const createArrayofYears = () => {
    for (let i = 1995; i < 2022; i++) {
      yearsArray.unshift(i.toString());
    }
  };
  createArrayofYears();
  return (
    <div className='search'>
      <Input
        id='input-with-icon-adornment'
        placeholder='Search by Make or Model'
        className='search__input'
        onChange={(e) => handleSearch(e)}
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
            onChange={(e) => filterByYear(e)}>
            {yearsArray.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id='select-make-label' className='filter__select-label'>
            Make
          </InputLabel>
          <Select
            className='filter__select'
            labelId='select-make-label'
            id='select-make'
            value={make}
            label='Make'
            onChange={(e) => filterByMake(e)}>
            {allMakes.length > 0 &&
              allMakes.map((make) => (
                <MenuItem key={make.Make_ID} value={make.Make_Name}>
                  {make.Make_Name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id='select-type-label' className='filter__select-label'>
            Type
          </InputLabel>
          <Select
            className='filter__select'
            labelId='select-type-label'
            id='select-type'
            value={type}
            label='Type'
            onChange={(e) => filterByType(e)}>
            {allTypes.length > 0 &&
              allTypes.map((type) => (
                <MenuItem key={type.VehicleTypeId} value={type.VehicleTypeName}>
                  {type.VehicleTypeName}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
};
