import { useField } from 'formik';
import { createContext, useContext, useMemo } from 'react';
import styled from 'styled-components';

const StyledSwitch = styled.div`
    display: flex;
    margin-bottom: 12px;
`;

const StyledSwitchOption = styled.div`
    padding: 6px 12px;
    border: 1px solid black;

    &.selected {
        background-color: #78a6f0;
    }
`;

const SwitchContext = createContext(null);

export const Switch = ({ name, label, children }) => {
    const [, { value }, { setValue}] = useField(name);

    return (
        <SwitchContext.Provider value={{ switchValue: value, setSwitchValue: setValue}}>
            <label>{label}</label>
            <StyledSwitch>
                {children}
            </StyledSwitch>
        </SwitchContext.Provider>
    )
}

export const SwitchOption = ({ value, children }) => {
    const swatchParent = useContext(SwitchContext);
    if (!swatchParent) return <div>Cannot use switchOption outside of switch</div>

    const { switchValue, setSwitchValue } = swatchParent;

    return (
        <StyledSwitchOption
            onClick={() => setSwitchValue(value)}
            className={value === switchValue ? 'selected' : ''}
        >
            {children}
        </StyledSwitchOption>
    )
}

export const ShowValue = ({ name, label }) => {
    const [{ value }] = useField(name);

    return (
        <div>{value}</div>
    )
}

export const IncrementButton = ({ name }) => {
    const [,{ value}, { setValue }] = useField(name);

    return (
        <button onClick={() => setValue(value + 1)}>{`Increment ${name}`}</button>
    )
}


export const ConditionalSection = ({ fieldName, conditionType, conditionValue, children }) => {
    const [,{ value }] = useField(fieldName);

    const conditionResult = useMemo(() => {
        if (conditionType === 'NOT_EQUAL') return value != conditionValue
        if (conditionType === 'EQUAL') return value == conditionValue
    }, [value, conditionType, conditionValue]);
    
    return conditionResult ? children : null;
}