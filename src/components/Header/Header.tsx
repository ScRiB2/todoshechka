import * as React from "react";
import * as css from './Header.css'
import {UserData} from "../../store/auth/types";
import {logout} from "../../store/auth/actions";
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "../../store/index";
import {Link, Redirect} from "react-router-dom";

interface IProps {
    user: UserData
}

const mapState = (state: RootState, ownProps: IProps) => ({
    user: ownProps.user
});

const mapDispatch = {
    logout: () => logout()
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux

function onClick(e, props: Props) {
    e.preventDefault();
    props.logout();
}

const Header = (props: Props) => (
    <header className={css.header}>
        <div className={['container', css["header-container"]].join(' ')}>
            <div className={css.left}>
                <Link to='/todos' style={{textDecoration: 'none'}}>Todo List</Link>
            </div>


            <div className={css.right}>
                {
                    props.user.role == 'admin' && <div>
                        <Link to={'/users'} style={{textDecoration: 'none'}}>Users</Link>
                    </div>
                }
                <div className={css.username}>
                    {props.user.name}
                </div>
                <a href='/logout' style={{textDecoration: 'none'}}
                   onClick={(e) => onClick(e, props)}>Logout</a>
            </div>
        </div>
    </header>
);

export default connector(Header);