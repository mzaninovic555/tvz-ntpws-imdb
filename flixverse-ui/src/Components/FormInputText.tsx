import {InputText} from 'primereact/inputtext';
import {FieldError, UseFormRegister} from 'react-hook-form';

export type FormInputTextProps = {
  name: string,
  type: string,
  placeholder: string,
  label: string,
  required?: boolean,
  disabled?: boolean,
  register?: UseFormRegister<any>,
  errors?: FieldError
}

const FormInputText = (props: FormInputTextProps) => {
  return (
    <div className='flex flex-column'>
      <label htmlFor={props.name} className='align-self-start block text-500 font-semibold mb-1'>{props.label}</label>
      <InputText className='mb-2' type={props.type} placeholder={props.placeholder}
        required={props.required} disabled={props.disabled} {...props.register?.(props.name)} />
      {props?.errors &&
        <small id={props.name + '-error'} className='p-error block mb-3 align-self-start font-semibold'>
          {props?.errors?.message}
        </small>}
    </div>
  );
};

export default FormInputText;
