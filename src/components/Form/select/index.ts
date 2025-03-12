const styleSelect = {
    control: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused ? '#f7f7f7' : 'transparent',
        borderColor: state.isFocused ? '#a5a5a5' : '#e5e5e5',
        borderWidth: '1px',
        borderRadius: '8px',
        fontSize: '16px',
        boxShadow: 'none',
        '&:hover': { borderColor: '#a5a5a5' }
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? '#2f6bff' : 'white',
        color: state.isSelected ? 'white' : '#111928',
        padding: '6px 8px',
        fontSize: '16px',
        cursor: 'pointer',
        '&:hover': { backgroundColor: '#EAF0FF' }
    })
}
