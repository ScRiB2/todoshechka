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
import {getError, getUser} from "../store/selectors";
import {PrivateRoute} from "../components/PrivateRoute";
import TodoList from "./TodoList/TodoList";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBundary";
import Users from "./Users/Users";
import {Whistle} from "../components/Whistle/Whistle";
//@ts-ignore
import {NotificationContainer} from 'react-notifications';
import LoaderWithError from "../components/LoaderWithError/LoaderWithError";

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
                    <LoaderWithError showLoader={this.state.showLoader} error={this.state.error}>
                        <>
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
                                                       <Route component={() => <Whistle errorNumber={403}
                                                                                        errorText='Sorry, page not found'/>}/>
                                                   </Switch>;
                                               } else {
                                                   return <Redirect to="/login"/>;
                                               }
                                           }}/>
                                </Switch>
                                <NotificationContainer/>
                            </Container>
                        </>
                    </LoaderWithError>
                }
            </>
        )
    }
}


export default connector(App);