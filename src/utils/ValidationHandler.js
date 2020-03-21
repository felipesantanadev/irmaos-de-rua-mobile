import * as Yup from 'yup';

const ValidationHandler = async (formRef, schema, data, successCallback, errorCallback) => {
    formRef.current.setErrors({}); // Clear all previous errors
        try {
            await schema.validate(data, {
                abortEarly: false
            });

            if(successCallback){
                successCallback();
            }
        }
        catch(err){
            const validationErrors = {};
            if(err instanceof Yup.ValidationError){
                err.inner.forEach(error => {
                    validationErrors[error.path] = error.message;
                });

                formRef.current.setErrors(validationErrors);
            }

            if(errorCallback){
                errorCallback(err);
            }
        }
}

export default ValidationHandler;