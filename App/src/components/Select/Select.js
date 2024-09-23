import React from 'react';
import PropTypes from 'prop-types';
import RNPickerSelect from 'react-native-picker-select';

const Select = ({ items }) => {
    return (
        <RNPickerSelect
            onValueChange={(value) => console.log(value)}
            items={[
                { label: 'Football', value: 'football' },
                { label: 'Baseball', value: 'baseball' },
                { label: 'Hockey', value: 'hockey' },
            ]}
            placeholder={{
                label: 'Select an item...',
                value: null,
                color: '#9EA0A4',
            }}
            style={{
                inputIOS: {
                    fontSize: 16,
                    paddingVertical: 12,
                    paddingHorizontal: 10,
                    borderWidth: 1,
                    borderColor: 'gray',
                    borderRadius: 4,
                    color: 'black',
                    paddingRight: 30, // to ensure the text is never behind the icon
                },
                inputAndroid: {
                    fontSize: 16,
                    paddingHorizontal: 10,
                    paddingVertical: 8,
                    borderWidth: 0.5,
                    borderColor: 'purple',
                    borderRadius: 8,
                    color: 'black',
                    paddingRight: 30, // to ensure the text is never behind the icon
                },
            }}
        />
    );
};

Select.propTypes = {
    items: PropTypes.array.isRequired,
};

export default Select;
