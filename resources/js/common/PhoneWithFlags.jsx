import { forwardRef, useEffect, useRef } from 'react';
import 'react-phone-number-input/style.css'
import PhoneInput, {isValidPhoneNumber} from 'react-phone-number-input'

export default forwardRef(function PhoneWithFlags({ className = '', value = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <PhoneInput
            {...props}
            className={
                className
            }
            ref={input}
            error={value ? (isValidPhoneNumber(value) ? undefined : 'Invalid phone number') : 'Phone number required'}
        />
    );
});
