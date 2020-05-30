import * as React from "react";
import {API} from "../../API/index";
import * as css from "./TodoList.css";
import {Loader} from "../../components/Loader/Loader";
import {Modal} from "../../components/Modal/Modal";
import {ErrorHandler} from "../../components/ErrorHandler/ErrorHandler";
// @ts-ignore
import {Field, Form} from "react-final-form";
import {siteKey} from "../../env/env";

interface Todo {
    id: number
    title: string
    description: string
    createdBy: string
}

interface IState {
    todos: Todo[]
    showLoader: boolean
    showModal: boolean
}

export default class TodoList extends React.Component<any, IState> {
    state: IState = {
        todos: null,
        showLoader: true,
        showModal: false
    };

    componentDidMount(): void {
        API.getTodos()
            .then(res => {
                this.setState({showLoader: false, todos: res.data})
            })
    }

    renderTbody = () => {
        return this.state.todos.map((todo, index) => (
            <tr key={'tr' + index} className={css.todo}>
                <th scope="row">{index + 1}</th>
                <td>{todo.title}</td>
                <td>{todo.description}</td>
                <td>{todo.createdBy}</td>
                <td>
                    <button type="button" className="btn btn-dark pull-right">E</button>
                    <button type="button" className="btn btn-dark pull-right">D</button>
                </td>
            </tr>
        ))
    };

    render() {
        return (
            this.state.showLoader
                ? <Loader/>
                : <>
                    <div>
                        <h1 className={css.h1}>Todo List</h1>
                        <table className='table'>
                            <thead>
                            <tr className={css.todo} style={{color: 'white'}}>
                                <th scope="col">#</th>
                                <th scope="col">Title</th>
                                <th scope="col">Description</th>
                                <th scope="col">Created by</th>
                                <th scope="col">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.renderTbody()}
                            </tbody>
                        </table>
                        <button type="button" className="btn btn-dark pull-right"
                                onClick={() => this.setState({showModal: true})}>Create new Todo
                        </button>
                    </div>
                    {
                        this.state.showModal
                        && <Modal
                            header='Create ToDo'
                            toggleShowModal={() => this.setState({showModal: false})}
                            body={(
                                <Form
                                    // onSubmit={this.onClick}
                                    // validate={this.validateForm}
                                    render={({handleSubmit}) => (
                                        <form id='loginForm' onSubmit={handleSubmit}>
                                            {
                                                this.props.authError
                                                    ? <ErrorHandler errorText={this.props.authError}/>
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
                                                        {meta.error && meta.touched && <div>
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
                                                        {meta.error && meta.touched && <div >
                                                            {meta.error}
                                                        </div>}
                                                    </div>
                                                )}
                                            </Field>
                                        </form>
                                    )}
                                />
                            )}
                            footer={(
                                <button type="submit"
                                        className="btn btn-primary pull-right mt-3"
                                >
                                    {'Sign in'}
                                </button>
                            )}
                        />}
                </>
        )
    }
}