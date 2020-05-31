import * as React from "react";
import * as css from './Header.css'
import {UserData} from "../../store/auth/types";
import {logout} from "../../store/auth/actions";
import {connect, ConnectedProps} from "react-redux";
import {Link} from "react-router-dom";
import {NotificationManager} from 'react-notifications';
import i18next from "i18next";
import {i18Keys} from "../../i18n";

interface IProps {
    user: UserData
    update: any
}


const mapDispatch = {
    logout: () => logout()
};

const connector = connect(null, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & IProps

async function onClick(e, props: Props) {
    e.preventDefault();
    const error = await props.logout();
    if (error)
        NotificationManager.error(error)
}

const onChangeLanguage = async (e: React.ChangeEvent<HTMLSelectElement>, update) => {
    const target = e.currentTarget;
    await i18next.changeLanguage(target.options[target.selectedIndex].value);
    update()
};

const Header = (props: Props) => (
    <header className={css.header}>
        <div className={['container', css["header-container"]].join(' ')}>
            <div className={css.left}>
                <Link to='/' style={{textDecoration: 'none'}}>Todoshechka</Link>
            </div>
            <div>
                <select defaultValue={i18next.language} className="custom-select" style={{marginRight: 10}}
                        onChange={(e) => onChangeLanguage(e, props.update)}>
                    <option value="en">English</option>
                    <option value="ru-RU">Русский</option>
                </select>
            </div>
            <div className={css.right}>
                {
                    props.user.role == 'admin' && <div>
                        <Link to={'/users'} style={{textDecoration: 'none'}}>{i18next.t(i18Keys.users)}</Link>
                    </div>
                }
                <div className={css.username}>
                    <Link to='/todos' style={{textDecoration: 'none', color: '#facf5a'}}>{props.user.name}</Link>
                </div>
                <a href='/logout' style={{textDecoration: 'none'}}
                   onClick={(e) => onClick(e, props)}>{i18next.t(i18Keys.logout)}</a>
            </div>

        </div>
    </header>
);

export default connector(Header);