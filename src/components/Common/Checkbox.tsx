import React, {useCallback} from 'react';
import './Checkbox.css';

interface CheckboxProps {
    children: any;
    checked?: boolean;
    disabled?: boolean;
    onChange?: (checked: boolean, disabled: boolean, currentId: number | undefined) => void;
    className?: string;
    testId?: string;
    currentId?: number
}

export function Checkbox({children, checked, disabled, onChange, className, testId, currentId}: CheckboxProps) {
    const handleChange = useCallback(() => {
        onChange && onChange(!checked, !disabled, currentId)
    }, [checked, disabled, currentId, onChange]);

    const renderLackAge = () => {
        return (
            <span className="checkbox__warning">Cannot be selected unless user's age is specified, because the game has age restriction.</span>
        );
    };

    const renderUnsuitableAge = () => {
        return (
            <span className="checkbox__warning">The person is not allowed to get the game due to age restriction.</span>
        );
    };

    // for tests
    const getTestId = () => {
        if((disabled && children.age === undefined) || (disabled && children.age === -1)) {
            return (testId + 'noAge');
        } else if ((disabled && typeof children.age === "number") || (disabled && children.age !== -1)) {
            return (testId + 'incorrectAge');
        } else {
            return testId;
        }
    }

    return (
        <div className={`checkbox ${disabled ? 'checkbox--disabled' : ''} ${className || ''}`}>
            <label className="checkbox__label">
                <input
                    className="checkbox__input"
                    type="checkbox"
                    checked={checked}
                    onChange={handleChange}
                    disabled={disabled}
                    data-testid={getTestId()}
                />
                <span className="checkbox__label-content" data-testid={`${testId}Label`}>
                    {children.name ? children.name : children}
                </span>
            </label>
            {(disabled && children.age === undefined) || (disabled && children.age === -1) ? renderLackAge() : null}
            {(disabled && typeof children.age === "number" && children.age !== -1) ? renderUnsuitableAge() : null}
        </div>
    );
}
