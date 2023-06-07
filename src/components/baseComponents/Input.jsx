import React from "react";
import { TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { muiColorsTheme as colors } from "./ColorsTheme";

/**
 *
 * @param {
 *      title : *desc => string values. *content = eg.("Email")  default: true
 *      name : *desc => string values. *content = eg.("email")  default: true
 *      color: *desc => hex values. *content = eg.("#fff") default:primary
 *      id: *des => numeric value. *content = eg(8)
 *      type: desc => string value. *content = eg.("password")
 *       value: desc => value of input. *content = eg.("value")
 *      placeholder: desc => string value. *content = eg.("placeholder")
 *      small: desc => boolean value *content = eg(true)
 *      fullWidth: desc => input takes container full with. *content = none
 *      icon: *desc => react component. *content = eg.(<FaHome/>)
 *      iconStart, iconEnd: *desc => position of icon *content=none
 *      disabled : *desc => boolean value. *content = enum({true,false})   default :false
*      required : *desc => boolean value. *content = enum({true,false})   default :false 
*      style : *desc =>  additional styles *content = eg.({display:"flex"})
 *      handleChange: function
 *  }
 * @returns Input
 */

const Input = ({
  title,
  name,
  color,
  id,
  type,
  placeholder,
  disabled,
  value,
  icon,
  iconStart,
  iconEnd,
  handleChange,
  style,
  small,
  required
}) => {
  return (
    <TextField
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
            borderWidth:"1px"
          },
          
        },

       
      }}
      id={id}
      type={type ? type : "text"}
      InputProps={{
        style:{borderRadius:"6px",height:50, ...style},
        startAdornment: (
         icon &&(
          <InputAdornment position="start">
          {icon && !iconEnd && icon}
        </InputAdornment>
         )
        ),

        endAdornment: (
          icon && (
            <InputAdornment position="end">
            {icon && iconEnd && !iconStart && icon}
          </InputAdornment>
          )
        ),
      }}
      InputLabelProps={{
        style:{top:"-2px", fontSize:"15px"}
      }}
      name={name}
      margin="dense"
      label={title}
      variant={"outlined"}
      disabled={disabled ? true : false}
      required={required ? true : false}
      size={small ? "small":"medium"}
      value={value}
      placeholder={placeholder && placeholder}
      onChange={handleChange}
      fullWidth
    />
  );
};

export default Input;
