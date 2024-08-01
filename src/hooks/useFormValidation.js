import { useEffect, useState } from "react";

export function useFormValidation(validations){

    const [errors, setErrors] = useState({});
  
    const validateForm = (valuesToValidate) => {
      let valid = true;
      let newErrors = {};
  
      Object.keys(valuesToValidate).forEach((name) => {
        const value = valuesToValidate[name];
        let error = '';

        if (validations[name].required && !value) {
          valid = false;
          error = validations[name].required.message || 'Este campo es requerido';
        }
  
        if (validations[name]?.pattern && value) {
          const pattern = validations[name].pattern.value;
          if (!pattern.test(value)) {
            valid = false;
            error = validations[name].pattern.message || 'Invalid format';
          }
        }
  
        if (error) {
          newErrors[name] = error;
        }
      });
      
      setErrors(newErrors);
      console.log(newErrors)
      return valid;
    };
  
    const resetForm = () => {
      setErrors({});
    };

    return {errors, validateForm, resetForm};

}