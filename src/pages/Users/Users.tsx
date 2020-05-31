import * as React from "react";
import {API} from "../../API/index";
import {UserData} from "../../store/auth/types";
import * as css from './Users.css'
import {APIErrorHandler, ResultStatusType} from "../../API/utils";
import LoaderWithError from "../../components/LoaderWithError/LoaderWithError";

interface User extends UserData {
    login: string
}

interface IState {
    users: User[]
    showLoader: boolean
    error: string
}

export default class Users extends React.Component<any, IState> {
    state: IState = {
        users: [],
        showLoader: false,
        error: null
    };

    componentDidMount(): void {
        this.toggleShowLoader();
        API.getUsers()
            .then(res => {
                const result = APIErrorHandler(res);
                if (!result) return;
                this.toggleShowLoader();
                if (result.status == ResultStatusType.SUCCESS) {
                    this.setState({users: result.data})
                } else this.setState({error: result.message})
            })
    }

    toggleShowLoader = (isShow?: boolean) => this.setState(prevState => ({showLoader: isShow ? isShow : !prevState.showLoader}));

    renderTbody = () => {
        if (this.state.users.length == 0)
            return (
                <tr className={css.user}>
                    <td colSpan={5}>Not found...</td>
                </tr>
            );
        return this.state.users.map((user, index) => (
            <tr key={'tr' + index} className={css.user}>
                <th scope="row">{index + 1}</th>
                <td>{user.login}</td>
                <td>{user.name}</td>
                <td>{user.role}</td>
            </tr>
        ))
    };

    render() {
        return (
            <LoaderWithError showLoader={this.state.showLoader} error={this.state.error}>
                <div>
                    <h1 className={css.h1}>List of User</h1>
                    <table className='table'>
                        <thead>
                        <tr className={css.user} style={{color: 'white'}}>
                            <th scope="col">#</th>
                            <th scope="col">Login</th>
                            <th scope="col">Username</th>
                            <th scope="col">Role</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.renderTbody()}
                        </tbody>
                    </table>
                </div>
            </LoaderWithError>
        )
    }
}