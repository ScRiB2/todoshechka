import * as React from "react";
import * as css from './Header.css'
import {UserData} from "../../store/auth/types";
import {logout} from "../../store/auth/actions";
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "../../store/index";
import {Link} from "react-router-dom";
import {NotificationManager} from 'react-notifications';

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

async function onClick(e, props: Props) {
    e.preventDefault();
    const error = await props.logout();
    if (error)
        NotificationManager.error(error)
}

const Header = (props: Props) => (
    <header className={css.header}>
        <div className={['container', css["header-container"]].join(' ')}>
            <div className={css.left}>
                <Link to='/' style={{textDecoration: 'none'}}>Todoshechka</Link>
            </div>

            <div className={css.right}>
                {
                    props.user.role == 'admin' && <div>
                        <Link to={'/users'} style={{textDecoration: 'none'}}>Users</Link>
                    </div>
                }
                <div className={css.username}>
                    <Link to='/todos' style={{textDecoration: 'none', color: '#facf5a'}}>{props.user.name}</Link>
                </div>
                <a href='/logout' style={{textDecoration: 'none'}}
                   onClick={(e) => onClick(e, props)}>Logout</a>
            </div>

        </div>
    </header>
);

export default connector(Header);