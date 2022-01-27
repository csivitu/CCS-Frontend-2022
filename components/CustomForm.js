import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

export const CustomInput = ({
  value,
  setValue,
  label,
  type,
  disabled = false,
}) => {
  return (
    <FormControl className="w-full">
      <InputLabel className="">{label}</InputLabel>
      <OutlinedInput
        type={type}
        label={label}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
        disabled={disabled}
      />
    </FormControl>
  );
};

export const CustomSelect = ({
  value,
  setValue,
  label,
  options,
  disabled = false,
}) => {
  function handleChange(e) {
    setValue(e.target.value);
  }
  return (
    <FormControl className="w-full">
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        onChange={handleChange}
        disabled={disabled}
        label={label}
        required
      >
        <MenuItem value="">None</MenuItem>
        {options.map((option) => (
          <MenuItem value={option.value} key={"option" + option.value}>
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
          <ToggleButton key={"option" + option} value={option}>
            {option}
          </ToggleButton>
        );
      })}
    </ToggleButtonGroup>
  );
};
