import Select from '@mui/joy/Select';

// Select con slotProps
const withSlotProps = (WrappedComponent, slotProps) => {
    return (props) => <WrappedComponent {...props} slotProps={slotProps} requi/>;
};
const slotProps = {
    listbox: { sx: { width: '100%', }, },
};
const SelectProps = withSlotProps(Select, slotProps);


export { SelectProps };