import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import '../styles/forum-post-modal.css'
import replyIcon from '../icons/reply.png';

const ForumPostModal = ({profileInfo, forumID, threadID, forumName, forReply}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit= async(e) => {
    e.preventDefault();
    const formData= new FormData(e.target);
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
    console.log(profileInfo.id);
    console.log(threadID);
    if (forReply){
      await axios.post(
        `http://localhost:8888/forums/${forumID}/${threadID}/reply`,
        {
          body:formJson.body,
          user:profileInfo.id
        });
        await axios.get("http://localhost:8888/forums");
        window.location.reload();
        handleClose();
    } else {
      await axios.post(
        `http://localhost:8888/forums/${forumName}`,
        {
          subject: formJson.subject,
          forumID: forumID,
          body:formJson.body,
          user:profileInfo.id
        });
      await axios.get("http://localhost:8888/forums");
      window.location.reload();
      handleClose();
    }
  };
  if (!forReply){
    return (
      <div className='posting-modal'>
        <div className='btn-container'>
        <Button onClick={handleShow}>
          Add post
        </Button>
        </div>
        <Modal className="post" variant="dark" show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>what's on your mind?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form id="addPost" onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="subject">
                <Form.Label>subject</Form.Label>
                <Form.Control
                  placeholder="subject"
                  name="subject"
                  autoFocus
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="thread"
              >
                <Form.Label>body</Form.Label>
                <Form.Control as="textarea" placeholder="body" name="body" rows={3} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleClose}>
              close
            </Button>
            <Button type="submit" form="addPost">
              post
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  } else {
    return (
      <>
        <img onClick={handleShow} src={replyIcon}></img>
  
        <Modal variant="dark" className="post" show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>reply</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form id="addPost" onSubmit={handleSubmit}>
              <Form.Group
                className="mb-3"
                controlId="thread"
              >
                <Form.Label>body</Form.Label>
                <Form.Control as="textarea" placeholder="body" name="body" rows={3} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleClose}>
              close
            </Button>
            <Button type="submit" form="addPost">
              post
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

}

export default ForumPostModal;