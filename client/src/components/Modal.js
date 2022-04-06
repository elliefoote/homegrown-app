import React from 'react';
import {Link} from 'react-router-dom';
import { Modal } from 'react-bootstrap';

function SubmitModal(props) {
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.modalInfo.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="d-flex justify-content-end">
            <button className="btn btn-secondary me-2" onClick={props.onHide}>{props.modalInfo.closetext}</button>
            <Link to={props.modalInfo.backpath} className="btn btn-primary">{props.modalInfo.backtext}</Link>
            </div>
        </Modal.Body>
      </Modal>
    );
  }

export default SubmitModal;