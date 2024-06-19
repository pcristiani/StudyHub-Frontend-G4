import Select from '@mui/joy/Select';

// Select con slotProps
const withSlotProps = (WrappedComponent, slotProps) => {
    return (props) => <WrappedComponent {...props} slotProps={slotProps} />;
};
const slotProps = {
    listbox: { sx: { width: '100%', }, },
};
const SelectProps = withSlotProps(Select, slotProps);


export { SelectProps };