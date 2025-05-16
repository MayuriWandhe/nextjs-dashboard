import { FieldError } from "react-hook-form";

type inputFieldProps = {
    label : string;
    type? : string;
    register : any;
    name : string;
    defaultValue? : string;
    error? : FieldError;
    inputProps? : React.InputHTMLAttributes<HTMLInputElement>;
    hidden? : boolean
}

const InputField = ({
    label, 
    type = 'text',
    register,
    name, 
    defaultValue, 
    error,
    inputProps,
    hidden
}: inputFieldProps ) =>{
    return(
        <div className={hidden ? "hidden" : "flex flex-col gap-2 w-full md:w-1/4"}>
            <label className="text-xs text-gray-400 flex text-start">{label}</label>
            <input type="text" {...register(name)} className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm" {...inputProps} defaultValue={defaultValue}/>
                {error?.message && <p className="text-xs text-red-400">{error?.message.toString()}</p> }    
        </div>
    )
}


export default InputField;