import React from 'react';
import classNames from 'classnames/bind';


import styles from './App.css';
import general from './general.css';
import Form from './components/form/form';

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return ( 
            <div className={ classNames(styles.form__wrapper, general.displayf)}>
                <Form formID = "form__container"
                formClass = { classNames(styles.form__container, general.displayf) }
                formAction = "/api/sms-promotion"
                formMethod = "post">
                </Form> 
            </div>
        );
    }
}
