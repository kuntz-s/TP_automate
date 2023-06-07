import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";

import InputAdornment from "@mui/material/InputAdornment";
import { muiColorsTheme as colors } from "./ColorsTheme";



export const AutoComplete = ({
  handleChange,
  dataList,
  color,
  value,
  style,
  label,
  placeholder,
  icon,
  iconStart,
  iconEnd,
}) => {

  const OPTIONS_LIMIT = 1000;
const defaultFilterOptions = createFilterOptions();

const filterOptions = (options, state) => {
  return defaultFilterOptions(options, state).slice(0, OPTIONS_LIMIT);
};

  return (
    <Autocomplete
    filterOptions={filterOptions}
    id="controlled-demo"
      options={dataList}
      value={value}
      onChange={(e, newInputValue) => {
        handleChange(newInputValue);
      }}
      clearOnBlur
      sx={{ width: "100%" }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label && label}
          placeholder={placeholder && placeholder}
          sx={{
            "& label.Mui-focused": {
              color: color ? color : colors.primary,
            },

            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                //border color default gray
              },
              "&:hover fieldset": {
                //border color when hovering
                borderColor: color ? color : colors.primary,
              },
              "&.Mui-focused fieldset": {
                borderColor: color ? color : colors.primary,
              },
            },
          }}
          InputProps={{
            ...params.InputProps,
            type: "search",
            style: { borderRadius: "6px", ...style },
            startAdornment: icon && (
              <InputAdornment position="start">
                {icon && !iconEnd && icon}
              </InputAdornment>
            ),

            endAdornment: icon && (
              <InputAdornment position="end">
                {icon && iconEnd && !iconStart && icon}
              </InputAdornment>
            ),
          }}
          size="medium"
        />
      )}
    />
  );
};

