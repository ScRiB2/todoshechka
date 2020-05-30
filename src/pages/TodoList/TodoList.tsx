import * as React from "react";
import {API} from "../../API/index";
import * as css from "./TodoList.css";
import {Loader} from "../../components/Loader/Loader";
import {Modal} from "../../components/Modal/Modal";
// @ts-ignore
import {Field, Form} from "react-final-form";
import {TodoData, TodoReqData} from "../../store/auth/types";
import {ErrorHandler} from "../../components/ErrorHandler/ErrorHandler";

interface IState {
    todos: TodoData[]
    isAppealToApi: boolean
    error: string
    showLoader: boolean
    showModal: boolean
}

export default class TodoList extends React.Component<any, IState> {
    state: IState = {
        todos: null,
        isAppealToApi: false,
        error: null,
        showLoader: true,
        showModal: false
    };

    componentDidMount(): void {
        this.updateTodos()
    }

    updateTodos = () => API.getTodos().then(res => {
        this.setState({showLoader: false, todos: res.data})
    });


    renderTbody = () => {
        return this.state.todos.map((todo, index) => (
            <tr key={'tr' + index} className={css.todo}>
                <th scope="row">{index + 1}</th>
                <td>{todo.title}</td>
                <td>{todo.description}</td>
                <td>{todo.createdBy}</td>
                <td>
                    <button type="button" className="btn btn-dark">E</button>
                    <button type="button" className="btn btn-dark">D</button>
                </td>
            </tr>
        ))
    };


    onCreateTodo = (data: TodoReqData) => {
        this.setState({isAppealToApi: true});
        API.postTodo(data)
            .then(res => {
                this.setState({isAppealToApi: false});
                if (res.status == 400) {
                    return this.setState({error: res.data.message})
                }
                this.updateTodos()
                    .then(() => this.setState({showModal: false}))
            })
    };

    validateForm = (values: TodoReqData) => {
        const errors: TodoReqData = {} as TodoReqData;
        if (!values.title) {
            errors.title = 'Required'
        }
        if (!values.description) {
            errors.description = 'Required'
        }

        return errors
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
                                onClick={() => this.setState({showModal: true})}
                        >
                            Create new Todo
                        </button>
                    </div>
                    {
                        this.state.showModal
                        && <Modal
                            header='Create ToDo'
                            toggleShowModal={() => this.setState({showModal: false})}
                            body={<Form
                                onSubmit={this.onCreateTodo}
                                validate={this.validateForm}
                                render={({handleSubmit}) => (
                                    <form id='todoForm' onSubmit={handleSubmit}>
                                        {
                                            this.state.error
                                                ? <ErrorHandler errorText={this.state.error}/>
                                                : null
                                        }
                                        <Field name="title">
                                            {({input, meta}) => (
                                                <div className="form-group">
                                                    <label htmlFor="inputTitle">Title</label>
                                                    <input type="text"
                                                           className={["form-control", meta.error && meta.touched && css["is-not-create"]].join(' ')}
                                                           id="inputTitle" {...input}
                                                           placeholder="Enter title" required/>
                                                    {meta.error && meta.touched &&
                                                    <div className={css.invalid}>
                                                        {meta.error}
                                                    </div>}

                                                </div>
                                            )}
                                        </Field>

                                        <Field name="description">
                                            {({input, meta}) => (
                                                <div className="form-group">
                                                    <label htmlFor="inputDescription">Description</label>
                                                    <input type="text"
                                                           className={["form-control", meta.error && meta.touched && css["is-not-create"]].join(' ')}
                                                           id="inputDescription" {...input}
                                                           placeholder="Description" required/>
                                                    {meta.error && meta.touched &&
                                                    <div className={css.invalid}>
                                                        {meta.error}
                                                    </div>}
                                                </div>
                                            )}
                                        </Field>
                                        <button type="submit" disabled={this.state.isAppealToApi}
                                                className="btn btn-primary pull-right mt-3"
                                        >
                                            {this.state.isAppealToApi ? 'Create...' : 'Create'}
                                        </button>
                                    </form>
                                )}
                            />
                            }
                        />}
                </>
        )
    }
}