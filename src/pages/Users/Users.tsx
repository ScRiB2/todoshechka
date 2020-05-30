import * as React from "react";
import {API} from "../../API/index";
import {Loader} from "../../components/Loader/Loader";
import {UserData} from "../../store/auth/types";
import * as css from './Users.css'

interface User extends UserData {
    login: string
}

interface IState {
    users: User[]
    showLoader: boolean
}

export default class Users extends React.Component<any, IState> {
    state: IState = {
        users: null,
        showLoader: true
    };

    componentDidMount(): void {
        API.getUsers()
            .then(res => {
                this.setState({showLoader: false, users: res.data})
            })
    }

    renderTbody = () => {
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
            this.state.showLoader
                ? <Loader/>
                : <div>
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
        )
    }
}