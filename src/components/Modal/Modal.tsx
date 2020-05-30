import * as React from "react";

interface IProps {
    header: string
    body?: JSX.Element
    footer?: JSX.Element
    toggleShowModal: any
}

export const Modal = (props: IProps) => (
    <>
        <div className="modal fade show" tabIndex={-1}
             style={{display: 'block', paddingRight: 17}}>
            <div className="modal-dialog modal-dialog-centered" style={{zIndex: 2000}}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{props.header}</h5>
                        <button type="button" style={{outline: 'none'}} className="close"
                                onClick={props.toggleShowModal}>
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {props.body}
                    </div>
                    {
                        props.footer &&
                        <div className="modal-footer">
                            {props.footer}
                        </div>
                    }
                </div>
            </div>
            <div className="modal-backdrop fade show" onClick={props.toggleShowModal}/>
        </div>
    </>
)