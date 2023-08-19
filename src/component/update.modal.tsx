'use client'
import { use, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { mutate } from 'swr';

interface Props {
    setShowEdit: (value: boolean) => void;
    showEdit: boolean;
    blog: IBlog | null;
    setBlog: (value: IBlog | null) => void;
}

function EditModal(props: Props) {
    const [title, setTitle] = useState<string>('')
    const [author, setAuthor] = useState<string>('')
    const [content, setContent] = useState<string>('')

    const { showEdit, setShowEdit, blog, setBlog } = props;

    const [id, setId] = useState<number>(0)

    useEffect(() => {
        if (blog && blog.id) {
            setId(blog.id)
            setTitle(blog.title)
            setAuthor(blog.author)
            setContent(blog.content)
        }
    }, [blog])


    const handleSubmit = () => {
        if (!title) {
            toast.warning('Thiếu title')
            return;
        }
        if (!author) {
            toast.warning('Thiếu author')
            return;
        }
        if (!content) {
            toast.warning('Thiếu content')
            return;
        }
        fetch(`http://localhost:8000/blogs/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, author, content })
        }).then(res => res.json())
            .then(res => {
                if (res) {
                    toast.warning('Update thành công')
                    handleClose()
                    mutate('http://localhost:8000/blogs')
                }

            });

        // toast.success('Tạo thành công')
        // console.log('check', title, author, content)
    }
    const handleClose = () => {
        setTitle('')
        setAuthor('')
        setContent('')
        setBlog(null)
        setShowEdit(false)
    }

    return (
        <>
            <Modal
                show={showEdit}
                onHide={() => handleClose()}
                backdrop="static"
                keyboard={false}
                size='lg'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" >
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="email" placeholder='....'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)} />

                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Author</Form.Label>
                            <Form.Control type="email" placeholder='...'
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Content</Form.Label>
                            <Form.Control as="textarea" rows={3}
                                value={content}
                                onChange={(e) => setContent(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleClose()}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmit()} >Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default EditModal;