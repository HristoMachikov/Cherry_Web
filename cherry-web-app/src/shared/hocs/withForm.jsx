import React from 'react';
//workshop 04
const runControlValidation = (value, validations) => {
    return validations.validate(value, { abortEarly: false });
};

export const getValidationsRunnerForSchema = schema => form => {
    if (!schema) { return Promise.resolve(); }
    return schema.validate(form, { abortEarly: false })
        .then(() => form).catch(err => {
            const errors = err.inner.reduce((acc, { path, message }) => {
                acc[path] = (acc[path] || []).concat(message);
                return acc;
            }, {});
            return Promise.reject(errors);
        });
}

const getControlChangeHandler = (validations, setErrors, setValue) => {
    let debounce;
    return e => {
        const newValue = e.target.value;
        if (debounce) { clearTimeout(debounce); debounce = null; }
        debounce = setTimeout(() => {
            setValue(newValue);

            runControlValidation(newValue, validations)
                .then(() => {
                    setErrors(undefined);
                })
                .catch(err => {
                    setErrors(err.errors);
                });
            debounce = null;
        }, 200);
    };
};

export const useFormControl = (defaultValue, validations) => {
    const [value, setValue] = React.useState(defaultValue);
    const [errors, setErrors] = React.useState(undefined);

    const changeHandler = React.useCallback(
        getControlChangeHandler(
            validations,
            setValue, setErrors),
        [
            validations,
            setValue, setErrors]
    );

    return React.useMemo(() => ({
        value,
        setValue,
        errors,
        setErrors,
        changeHandler
    }), [value, setValue, errors, setErrors, changeHandler]);
};
//

export default function withForm(Cmp, initialState, schema) {
    return class extends React.Component {
        state = {
            form: initialState,
            errors: null
        };

        controlChangeHandlerFactory = name => {

            let debounce;
            return event => {
                const newValue = event.target.value;
                if (debounce) {
                    clearTimeout(debounce);
                    debounce = null;
                }
                debounce = setTimeout(() => {
                    this.setState(({ form }) => {
                        return { form: { ...form, [name]: newValue } }
                    });

                    // this.runControlValidation(name)
                    //     .then(() => {
                    //         this.setState(({ errors: { [name]: current, ...others } = {} }) =>
                    //             ({ errors: Object.keys(others).length === 0 ? undefined : others })
                    //         );
                    //     })
                    //     .catch(err => {
                    //         this.setState(({ errors }) => ({ errors: { ...errors, [name]: err.errors } }));
                    //     });

                    debounce = null;
                }, 200);
            };
        };

        controlOnChangeHandlerFactory = () => {

            let debounce;
            return event => {
                const { name, value } = event.target;
                if (debounce) {
                    clearTimeout(debounce);
                    debounce = null;
                }
                debounce = setTimeout(() => {
                    this.setState(({ form }) => {
                        return { form: { ...form, [name]: value, 'currentName': name } }
                    });
                    debounce = null;
                }, 200);
            };
        };

        getFormState = () => {
            return this.state.form;
        };

        getFormErrorState = () => {
            return this.state.errors;
        };

        runControlValidation = name => {
            if (!schema) { return Promise.resolve(); }
            const currentValue = this.state.form[name];
            return schema && schema.fields[name].validate(currentValue, { abortEarly: false });
        };


        runValidations = () => {
            if (!schema) { return Promise.resolve() };
            return schema && schema.validate(this.state.form, { abortEarly: false }).then(() => {
                this.setState({ errors: undefined });
                return this.state.form;
            }).catch(err => {
                const errors = err.inner.reduce((acc, { path, message }) => {
                    acc[path] = (acc[path] || []).concat(message);
                    return acc;
                }, {})
                this.setState({
                    errors
                })
            });
        }

        render() {
            return <Cmp
                {...this.props}
                controlOnChangeHandlerFactory={this.controlOnChangeHandlerFactory}
                controlChangeHandlerFactory={this.controlChangeHandlerFactory}
                getFormState={this.getFormState}
                runValidations={this.runValidations}
                getFormErrorState={this.getFormErrorState}>
            </Cmp>
        }
    }
}