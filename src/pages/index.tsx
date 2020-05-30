import * as React from "react";
import Header from "../components/Header/Header";
import Background from "../components/Background/Background";
import Login from "./Login/Login";
import {Container} from "../components/BSComponents/Container";
import {Redirect, Route, Switch,} from "react-router-dom"
import {connect, ConnectedProps} from "react-redux";
import Main from "./Main/Main";
import {RootState} from "../store/index";
import {auth} from "../store/auth/actions";
import {Loader} from "../components/Loader/Loader";
import {getError, getUser} from "../store/selectors";
import {PrivateRoute} from "../components/PrivateRoute";
import TodoList from "./TodoList/TodoList";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBundary";
import * as css from "../components/ErrorBoundary/ErrorBoundary.css";
import Users from "./Users/Users";

interface IState {
    showLoader: boolean
    error: string
}

const mapState = (state: RootState) => ({
    user: getUser(state),
    error: getError(state)
});

const mapDispatch = {
    auth: () => auth()
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux;



class App extends React.Component<Props, IState> {

    state: IState = {
        showLoader: true,
        error: null
    };

    async componentDidMount() {
        const error: any = await this.props.auth();
        this.setState({showLoader: false, error});
    };

    render() {
        return (
            <>
                <Background/>
                {
                    this.state.showLoader
                        ? <Loader/>
                        : this.state.error
                        ? <>
                            <div style={{display: "flex", justifyContent: 'center'}}>
                                <svg height="250" viewBox="0 0 365.71733 365" width="250"
                                     xmlns="http://www.w3.org/2000/svg" style={{margin: '100px 0'}}>
                                    <g fill="#f44336">
                                        <path
                                            d="m356.339844 296.347656-286.613282-286.613281c-12.5-12.5-32.765624-12.5-45.246093 0l-15.105469 15.082031c-12.5 12.503906-12.5 32.769532 0 45.25l286.613281 286.613282c12.503907 12.5 32.769531 12.5 45.25 0l15.082031-15.082032c12.523438-12.480468 12.523438-32.75.019532-45.25zm0 0"/>
                                        <path
                                            d="m295.988281 9.734375-286.613281 286.613281c-12.5 12.5-12.5 32.769532 0 45.25l15.082031 15.082032c12.503907 12.5 32.769531 12.5 45.25 0l286.632813-286.59375c12.503906-12.5 12.503906-32.765626 0-45.246094l-15.082032-15.082032c-12.5-12.523437-32.765624-12.523437-45.269531-.023437zm0 0"/>
                                    </g>
                                </svg>
                            </div>
                            <div className={css.h1}>{this.state.error}</div>
                        </>
                        : <>
                            {
                                this.props.user
                                    ? <Header user={this.props.user}/>
                                    : null
                            }
                            <Container style={{minHeight: !this.props.user ? '100vh' : 'calc(100vh - 64px)'}}>

                                <Switch>
                                    {
                                        this.props.user
                                            ? <Redirect from='/login' to='/'/>
                                            : null
                                    }
                                    <Route path="/login" component={Login}/>
                                    <Route path="/"
                                           render={() => {
                                               if (this.props.user) {
                                                   return <Switch>
                                                       <Route path="/" exact
                                                              component={() =>
                                                                  <ErrorBoundary>
                                                                      <Main
                                                                          user={this.props.user}
                                                                      />
                                                                  </ErrorBoundary>}/>
                                                       <Route path="/todos"
                                                              component={() =>
                                                                  <ErrorBoundary>
                                                                      <TodoList/>
                                                                  </ErrorBoundary>}/>
                                                       <PrivateRoute path="/users" user={this.props.user}
                                                                     component={() =>
                                                                         <ErrorBoundary>
                                                                             <Users/>
                                                                         </ErrorBoundary>}/>
                                                   </Switch>;
                                               } else {
                                                   return <Redirect to="/login"/>;
                                               }
                                           }}/>
                                </Switch>
                            </Container>
                        </>
                }
            </>
        )
    }
}



export default connector(App);