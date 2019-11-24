import React from 'react';

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
                    debounce = null;
                }, 300);
            };
        };

        getFormState = () => {
            return this.form.state;
        }

        render() {
            return <Cmp
                {...props}
                controlChangeHandlerFactory={this.controlChangeHandlerFactory}
                getFormState={this.getFormState}>
            </Cmp>
        }
    }
}