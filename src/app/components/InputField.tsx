import { FieldError } from "react-hook-form";

type inputFieldProps = {
    label : string;
    type? : string;
    register : any;
    name : string;
    defaultValue? : string;
    error? : FieldError;
    inputProps : React.InputHTMLAttributes<HTMLInputElement>;
}

const InputField = ({
    label, 
    type = 'text',
    register,
    name, 
    defaultValue, 
    error,
    inputProps
}: inputFieldProps ) =>{
    return(
        <div></div>
    )
}