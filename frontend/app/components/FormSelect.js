'use client';

import Select from 'react-select';

const selectStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: '48px',
    borderRadius: '0.5rem',
    borderWidth: '2px',
    borderColor: state.selectProps.hasError
      ? '#ef4444'
      : state.isFocused
        ? '#667467'
        : '#A0BF9F',
    backgroundColor: '#f2f4f4',
    boxShadow: state.isFocused ? '0 0 0 2px rgba(102, 116, 103, 0.25)' : 'none',
    '&:hover': {
      borderColor: state.selectProps.hasError ? '#ef4444' : '#667467',
    },
  }),
  valueContainer: (base) => ({
    ...base,
    padding: '2px 12px',
  }),
  placeholder: (base) => ({
    ...base,
    color: '#667467',
    fontSize: '0.95rem',
  }),
  singleValue: (base) => ({
    ...base,
    color: '#353F34',
    fontSize: '0.95rem',
  }),
  input: (base) => ({
    ...base,
    color: '#353F34',
  }),
  menu: (base) => ({
    ...base,
    borderRadius: '0.5rem',
    overflow: 'hidden',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.12)',
    zIndex: 50,
  }),
  menuList: (base) => ({
    ...base,
    maxHeight: '220px',
    padding: '4px',
  }),
  option: (base, state) => ({
    ...base,
    borderRadius: '0.375rem',
    fontSize: '0.95rem',
    color: '#353F34',
    backgroundColor: state.isSelected
      ? '#A0BF9F'
      : state.isFocused
        ? '#C1D9C1'
        : 'white',
    cursor: 'pointer',
  }),
  indicatorSeparator: () => ({ display: 'none' }),
  dropdownIndicator: (base, state) => ({
    ...base,
    color: '#667467',
    transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : undefined,
    transition: 'transform 0.2s ease',
    '&:hover': { color: '#353F34' },
  }),
  noOptionsMessage: (base) => ({
    ...base,
    color: '#667467',
    fontSize: '0.9rem',
  }),
  loadingMessage: (base) => ({
    ...base,
    color: '#667467',
    fontSize: '0.9rem',
  }),
};

export default function FormSelect({
  label,
  options,
  value,
  onChange,
  onBlur,
  placeholder,
  isDisabled = false,
  isLoading = false,
  error,
  touched,
  noOptionsMessage = 'Sin opciones',
}) {
  const selectedOption =
    options.find((option) => option.value === value) || null;
  const hasError = touched && error;

  return (
    <div>
      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
        {label}
      </label>
      <Select
        instanceId={label}
        options={options}
        value={selectedOption}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        isDisabled={isDisabled}
        isLoading={isLoading}
        isSearchable
        isClearable={!isDisabled}
        noOptionsMessage={() => noOptionsMessage}
        loadingMessage={() => 'Cargando...'}
        styles={selectStyles}
        hasError={hasError}
        classNamePrefix="form-select"
      />
      <div className="min-h-[20px] mt-1">
        {hasError && (
          <span className="text-red-500 text-sm">{error}</span>
        )}
      </div>
    </div>
  );
}
