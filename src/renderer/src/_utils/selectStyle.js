const customStyles = {
    control: (provided, state) => ({
        ...provided,
        borderRadius: state.isFocused ? '3px' : '0px',
        padding: '2px',
        borderColor: state.isFocused ? '#0ea5e9' : '#d1d5db',
    }),
};

export default customStyles