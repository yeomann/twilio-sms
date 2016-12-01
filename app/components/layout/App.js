import React from 'react';
import classNames from 'classnames/bind';
import styles from './App.css';
import common from '../common/global.css';
import Form from '../forms/form';

export default class App extends React.Component {
    render() {
        return ( 
            <div className={ classNames(styles.form__wrapper, common.displayf)}>
                <Form formID = "form__container"
                formClass = { classNames(styles.form__container, common.displayf) }
                formAction = "/api/sms-promotion"
                formMethod = "post">
                </Form> 
            </div>
        );
    }
}
