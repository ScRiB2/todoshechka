import * as React from "react";
import {API} from "../../API/index";
import * as css from "./TodoList.css";
import {TodoData, TodoReqData} from "../../store/auth/types";
import TodoModal from "./components/TodoModal";
import {RootState} from "../../store/index";
import {getUser} from "../../store/selectors";
import {connect, ConnectedProps} from "react-redux";
import {APIErrorHandler, ResultStatusType} from "../../API/utils";
import {NotificationManager} from 'react-notifications';
import LoaderWithError from "../../components/LoaderWithError/LoaderWithError";

interface IState {
    todos: TodoData[]
    isAppealToApi: boolean
    globalError: string
    error: string
    editModal: {
        show: boolean
        id: number
        title: string
        description: string
    }
    isDeleting: boolean
    showLoader: boolean
    showCreationModal: boolean
    showEditModal: boolean
}

const mapState = (state: RootState) => ({
    user: getUser(state)
});


const connector = connect(mapState);

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux;


class TodoList extends React.Component<Props, IState> {
    state: IState = {
        todos: [],
        isAppealToApi: false,
        globalError: null,
        error: null,
        editModal: {
            show: false,
            id: null,
            title: null,
            description: null
        },
        isDeleting: false,
        showLoader: false,
        showCreationModal: false,
        showEditModal: false
    };

    componentDidMount(): void {
        this.updateTodos()
    }

    toggleShowCreationModal = () => this.setState(prevState => ({
        showCreationModal: !prevState.showCreationModal,
        error: null
    }));

    toggleShowEditModal = () => this.setState(prevState => ({
        editModal: {
            ...prevState.editModal,
            show: !prevState.editModal.show
        }
    }));

    toggleIsAppealToApi = () => this.setState(prevState => ({isAppealToApi: !prevState.isAppealToApi}));
    toggleShowLoader = (isShow?: boolean) => this.setState(prevState => ({showLoader: isShow ? isShow : !prevState.showLoader}));

    updateTodos = () => {
        this.toggleShowLoader(true);
        return API.getTodos().then(res => {
            const result = APIErrorHandler(res);
            if (!result) return;
            this.toggleShowLoader(false);
            if (result.status == ResultStatusType.SUCCESS) {
                this.setState({todos: result.data})
            } else this.setState({globalError: result.message})
        });
    };

    deleteTodo = (id: number) => {
        this.toggleShowLoader();
        API.deleteTodo(id)
            .then(res => {
                const result = APIErrorHandler(res);
                if (!result) return;
                if (result.status == ResultStatusType.SUCCESS) {
                    this.updateTodos()
                } else {
                    this.toggleShowLoader();
                    NotificationManager.error(result.message)
                }
            })
    };


    editTodo = (id: number, title: string, description: string) => {
        this.setState({
            editModal: {
                show: true,
                id, title, description
            }
        })
    };

    onCreateTodo = (data: TodoReqData) => {
        this.toggleIsAppealToApi();
        API.postTodo(data)
            .then(res => {
                const result = APIErrorHandler(res);
                if (!result) return;
                this.toggleIsAppealToApi();
                if (result.status == ResultStatusType.SUCCESS) {
                    const todos = this.state.todos;
                    todos.push(result.data);
                    this.setState({todos});
                    this.toggleShowCreationModal()
                } else this.setState({error: result.message})
            })
    };

    onEditTodo = (data: TodoReqData) => {
        this.toggleIsAppealToApi();
        API.putTodo(this.state.editModal.id, data)
            .then(res => {
                const result = APIErrorHandler(res);
                if (!result) return;
                this.toggleIsAppealToApi();
                if (result.status == ResultStatusType.SUCCESS)
                    this.updateTodos()
                        .then(() => this.toggleShowEditModal());
                else this.setState({error: result.message})
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

    renderTbody = () => {
        if (this.state.todos.length == 0)
            return (
                <tr className={css.todo}>
                    <td colSpan={5}>Not found...</td>
                </tr>
            );
        return this.state.todos.map((todo, index) => (
            <tr key={'tr' + index} className={css.todo}>
                <th scope="row">{index + 1}</th>
                <td>{todo.title}</td>
                <td>{todo.description}</td>
                <td>{todo.createdBy}</td>
                <td>{
                    this.props.user.role == 'admin' || todo.createdBy == this.props.user.role
                        ? <>
                            <button type="button" className="btn btn-dark"
                                    onClick={() => this.editTodo(todo.id, todo.title, todo.description)}>
                                <i className="fa fa-pencil" aria-hidden="true"/>
                            </button>
                            <button type="button" className="btn btn-dark" onClick={() => this.deleteTodo(todo.id)}>
                                <i className="fa fa-trash-o" aria-hidden="true"/>
                            </button>
                        </>
                        : null
                }
                </td>
            </tr>
        ))
    };

    render() {
        return (
            <LoaderWithError showLoader={this.state.showLoader} error={this.state.globalError}>
                <>
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
                                onClick={this.toggleShowCreationModal}
                        >
                            Create new Todo
                        </button>
                    </div>
                    {
                        this.state.showCreationModal
                        && <TodoModal
                            header='Create Todo'
                            buttonName='Create'
                            isAppealToApi={this.state.isAppealToApi}
                            error={this.state.error}
                            toggleShowModal={this.toggleShowCreationModal}
                            validate={this.validateForm}
                            onSubmit={this.onCreateTodo}
                        />
                    }
                    {
                        this.state.editModal.show
                        && <TodoModal
                            header='Edit Todo'
                            buttonName='Save'
                            title={this.state.editModal.title}
                            description={this.state.editModal.description}
                            isAppealToApi={this.state.isAppealToApi}
                            error={this.state.error}
                            toggleShowModal={this.toggleShowEditModal}
                            validate={this.validateForm}
                            onSubmit={this.onEditTodo}
                        />
                    }
                </>
            </LoaderWithError>
        )
    }
}

export default connector(TodoList)