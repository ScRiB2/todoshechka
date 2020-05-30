import * as React from "react";
import {API} from "../../API/index";
import * as css from "./TodoList.css";
import {Loader} from "../../components/Loader/Loader";
// @ts-ignore
import {TodoData, TodoReqData} from "../../store/auth/types";
import TodoModal from "./components/TodoModal";
import {RootState} from "../../store/index";
import {getUser} from "../../store/selectors";
import {connect, ConnectedProps} from "react-redux";

interface IState {
    todos: TodoData[]
    isAppealToApi: boolean
    error: string
    editModal: {
        show: boolean
        id: number
        title: string
        description: string
    }
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
        todos: null,
        isAppealToApi: false,
        error: null,
        editModal: {
            show: false,
            id: null,
            title: null,
            description: null
        },
        showLoader: true,
        showCreationModal: false,
        showEditModal: false
    };

    componentDidMount(): void {
        this.updateTodos()
    }

    updateTodos = () => {
        this.setState({showLoader: true});
        return API.getTodos().then(res => {
            this.setState({showLoader: false, todos: res.data})
        });
    };

    deleteTodo = (id: number) => {
        API.deleteTodo(id)
            .then(res => {
                if (res.status == 204)
                    this.updateTodos()
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

    renderTbody = () => {
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
                            < button type="button" className="btn btn-dark" onClick={() => this.deleteTodo(todo.id)}>
                                <i className="fa fa-trash-o" aria-hidden="true"/>
                            </button>
                        </>
                        : null
                }
                </td>
            </tr>
        ))
    };

    checkTodo = (res: any) => {
        this.setState({isAppealToApi: false});
        if (res.status == 400) {
            this.setState({error: res.data.message});
            return false
        }
        if (res.status == 500) {
            this.setState({error: res.statusText});
            return false
        }
        this.setState({error: null});
        return true
    };

    onCreateTodo = (data: TodoReqData) => {
        this.setState({isAppealToApi: true});
        API.postTodo(data)
            .then(res => {
                const flag = this.checkTodo(res);
                if (flag)
                this.updateTodos()
                    .then(() => this.toggleShowCreationModal())
            })
    };

    onEditTodo = (data: TodoReqData) => {
        this.setState({isAppealToApi: true});
        API.putTodo(this.state.editModal.id, data)
            .then(res => {
                const flag = this.checkTodo(res);
                if (flag)
                this.updateTodos()
                    .then(() => this.toggleShowEditModal())
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

    toggleShowCreationModal = () => this.setState(prevState => ({showCreationModal: !prevState.showCreationModal}));
    toggleShowEditModal = () => this.setState(prevState => ({
        editModal: {
            ...prevState.editModal,
            show: !prevState.editModal.show
        }
    }));


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
        )
    }
}

export default connector(TodoList)