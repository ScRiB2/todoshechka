import * as React from "react";
import * as css from "./Login.css"
// @ts-ignore
import {Field, Form} from 'react-final-form'
import {login} from "../../store/auth/actions";
import {connect, ConnectedProps} from "react-redux";
import {UserAuthData} from "../../store/auth/types";
import {RootState} from "../../store/index";
import {siteKey} from "../../env/env";
// @ts-ignore
import ReCAPTCHA from 'react-google-recaptcha'
import {MiniErrorHandler} from "../../components/MiniErrorHandler/MiniErrorHandler";
import {getError} from "../../store/selectors";


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
            errors.login = 'Required'
        }
        if (!values.password) {
            errors.password = 'Required'
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
                        Sign in Todoshechka
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
                                            <label htmlFor="inputUsername">Login</label>
                                            <input type="text"
                                                   className={["form-control", meta.error && meta.touched && css["is-not-login"]].join(' ')}
                                                   id="inputUsername" {...input}
                                                   placeholder="Enter username" required/>
                                            {meta.error && meta.touched && <div className={css.invalid}>
                                                {meta.error}
                                            </div>}

                                        </div>
                                    )}
                                </Field>

                                <Field name="password">
                                    {({input, meta}) => (
                                        <div className="form-group">
                                            <label htmlFor="inputPassword">Password</label>
                                            <input type="password"
                                                   className={["form-control", meta.error && meta.touched && css["is-not-login"]].join(' ')}
                                                   id="inputPassword" {...input}
                                                   placeholder="Password" required/>
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
                                    {!this.state.isAppealToApi ? 'Sign in' : 'Signing in...'}
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