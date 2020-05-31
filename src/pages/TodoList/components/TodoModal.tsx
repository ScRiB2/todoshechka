// @ts-ignore
import {Field, Form} from "react-final-form";
import {MiniErrorHandler} from "../../../components/MiniErrorHandler/MiniErrorHandler";
import * as css from "../TodoList.css";
import {Modal} from "../../../components/Modal/Modal";
import * as React from "react";
import {TodoReqData} from "../../../store/auth/types";

interface IProps {
    header: string
    buttonName: string
    title?: string
    description?: string
    isAppealToApi: boolean
    error: string
    validate: (values: TodoReqData) => TodoReqData
    onSubmit: (data: TodoReqData) => void
    toggleShowModal: () => void
}


export const TodoModal = (props: IProps) => (
    <Modal
        header={props.header}
        toggleShowModal={props.toggleShowModal}
        body={<Form
            onSubmit={props.onSubmit}
            initialValues={{
                title: props.title,
                description: props.description
            }}
            validate={props.validate}
            render={({handleSubmit}) => (
                <form id='todoForm' onSubmit={handleSubmit}>
                    {
                        props.error
                            ? <MiniErrorHandler errorText={props.error}/>
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
                    <button type="submit" disabled={props.isAppealToApi}
                            className="btn btn-primary pull-right mt-3"
                    >
                        {props.isAppealToApi ? `${props.buttonName}...` : props.buttonName}
                    </button>
                </form>
            )}
        />
        }
    />
);

export default TodoModal;