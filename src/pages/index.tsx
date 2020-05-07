import * as React from "react";
import Header from "../components/Header/Header";
import Background from "../components/Background/Background";
import Login from "./Login/Login";
import {Container} from "../components/BSComponents/Container";
import {Redirect, Route, Switch,} from "react-router-dom"
import {connect, ConnectedProps} from "react-redux";
import Main from "./Main/Main";
import {RootState} from "../store/index";


const mapState = (state: RootState) => ({
    user: state.auth.user
});


const connector = connect(mapState);

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux;


class App extends React.Component<Props> {

    // componentDidMount = () => {
    //     this.props.getProfileFetch()
    // }

    render() {
        return (
            <>
                <Background/>
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
                                           <Route path="/" component={() => <Main user={this.props.user}/>}/>
                                       </Switch>;
                                   } else {
                                       return <Redirect to="/login"/>;
                                   }
                               }}/>
                    </Switch>
                </Container>
            </>
        )
    }
}


export default connector(App);