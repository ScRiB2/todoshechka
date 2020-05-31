import * as React from "react";
import * as css from "./Login.css"
import {Field, Form} from 'react-final-form'
import {login} from "../../store/auth/actions";
import {connect, ConnectedProps} from "react-redux";
import {UserAuthData} from "../../store/auth/types";
import {RootState} from "../../store/index";
import {siteKey} from "../../env/env";
import ReCAPTCHA from 'react-google-recaptcha'
import {MiniErrorHandler} from "../../components/MiniErrorHandler/MiniErrorHandler";
import {getError} from "../../store/selectors";
import i18next from "i18next";
import {i18Keys} from "../../i18n";


interface IState {
    isAppealToApi: boolean
    recaptchaValue: string
}


const mapState = (state: RootState) => ({
    authError: getError(state)
});


const mapDispatch = {
    login: (authData: UserAuthData) => login(authData)
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux;


class Login extends React.Component<Props, IState> {
    isUnmount = false;
    state: IState = {
        isAppealToApi: false,
        recaptchaValue: '1'
    };

    onClick = async (data: UserAuthData) => {
        if (this.state.recaptchaValue) {
            this.setState({isAppealToApi: true});
            await this.props.login(data);
            if (!this.isUnmount)
                this.setState({isAppealToApi: false})
        }
    };

    componentWillUnmount(): void {
        this.isUnmount = true
    }

    validateForm = (values: UserAuthData) => {
        const errors: UserAuthData = {} as UserAuthData;
        if (!values.login) {
            errors.login = i18next.t(i18Keys.required)
        }
        if (!values.password) {
            errors.password = i18next.t(i18Keys.required)
        }

        return errors
    };

    onChange = (value) => {
        this.setState({recaptchaValue: value})
    };

    render() {
        return (
            <div className={css["login-container"]}>
                <div className={[css.login, 'col-sm-6', 'col-lg-4', 'p-4'].join(' ')}>
                    <div className={css.title}>
                        {i18next.t(i18next.t(i18Keys.signIn))} Todoshechka
                    </div>
                    <Form
                        onSubmit={this.onClick}
                        validate={this.validateForm}
                        render={({handleSubmit}) => (
                            <form id='loginForm' onSubmit={handleSubmit}>
                                {
                                    this.props.authError
                                        ? <MiniErrorHandler errorText={this.props.authError}/>
                                        : null
                                }
                                <Field name="login">
                                    {({input, meta}) => (
                                        <div className="form-group">
                                            <label htmlFor="inputUsername">{i18next.t(i18Keys.login)}</label>
                                            <input type="text"
                                                   className={["form-control", meta.error && meta.touched && css["is-not-login"]].join(' ')}
                                                   id="inputUsername" {...input}
                                                   placeholder={i18next.t(i18Keys.enterLogin)} required/>
                                            {meta.error && meta.touched && <div className={css.invalid}>
                                                {meta.error}
                                            </div>}

                                        </div>
                                    )}
                                </Field>

                                <Field name="password">
                                    {({input, meta}) => (
                                        <div className="form-group">
                                            <label htmlFor="inputPassword">{i18next.t(i18Keys.password)}</label>
                                            <input type="password"
                                                   className={["form-control", meta.error && meta.touched && css["is-not-login"]].join(' ')}
                                                   id="inputPassword" {...input}
                                                   placeholder={i18next.t(i18Keys.password)} required/>
                                            {meta.error && meta.touched && <div className={css.invalid}>
                                                {meta.error}
                                            </div>}
                                        </div>
                                    )}
                                </Field>

                                <ReCAPTCHA
                                    sitekey={siteKey}
                                    onChange={this.onChange}
                                    hl='en'
                                />

                                <button type="submit" disabled={this.state.isAppealToApi}
                                        className="btn btn-primary pull-right mt-3"
                                >
                                    {!this.state.isAppealToApi ? i18next.t(i18Keys.signIn) : `${i18next.t(i18Keys.signIn)}...`}
                                </button>
                            </form>
                        )}
                    />
                </div>
            </div>
        )
    }
}


export default connector(Login);