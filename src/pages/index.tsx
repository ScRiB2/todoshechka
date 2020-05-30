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
import Users from "./Users/Users";
import TodoList from "./TodoList/TodoList";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBundary";

interface IState {
    showLoader: boolean
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
        showLoader: true
    };

    async componentDidMount() {
        await this.props.auth();
        this.setState({showLoader: false});
    };

    render() {
        return (
            <>
                <Background/>
                {
                    this.state.showLoader
                        ? <Loader/>
                        : <>
                            {
                                this.props.user
                                    ? <Header user={this.props.user}/>
                                    : null
                            }
                            <Container style={{minHeight: !this.props.user ? '100vh' : 'calc(100vh - 64px)'}}>
                                <ErrorBoundary>
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
                                                                  component={() => <Main user={this.props.user}/>}/>
                                                           <Route path="/todos" exact component={TodoList}/>
                                                           <PrivateRoute path="/users" user={this.props.user}
                                                                         component={Users}/>
                                                       </Switch>;
                                                   } else {
                                                       return <Redirect to="/login"/>;
                                                   }
                                               }}/>
                                    </Switch>
                                </ErrorBoundary>
                            </Container>
                        </>
                }
            </>
        )
    }
}


export default connector(App);