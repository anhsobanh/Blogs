import CreateModal from '@/component/create.modal';
import EditModal from '@/component/update.modal';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { mutate } from 'swr';
import { toast } from 'react-toastify';

interface IProps {
    blogs: IBlog[]
}

function TableTb(props: IProps) {
    const { blogs } = props;

    const [blog, setBlog] = useState<IBlog | null>(null)
    const [show, setShow] = useState<boolean>(false)
    const [showEdit, setShowEdit] = useState<boolean>(false)
    const handleDeleleBlogs = (id: number) => {
        if (confirm(`M muốn xóa bài id = ${id}`)) {
            fetch(`http://localhost:8000/blogs/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json, text/html; */*',
                    'Content-Type': 'application/json'
                },
            }).then(res => res.json())
                .then(res => {
                    if (res) {
                        toast.success('Xóa thành công');
                        mutate('http://localhost:8000/blogs')
                    }
                })
        }
    }

    return (
        <>
            <div className='mb-3'
                style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3>Table Blogs</h3>
                <Button variant="secondary" onClick={() => setShow(true)} >Add</Button>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {blogs.map(item => {
                        return (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.title}</td>
                                <td>{item.author}</td>
                                <td>
                                    <Link className='btn btn-primary' href={`/blogs/${item.id}`}>View</Link>
                                    <Button variant="warning" className='mx-3' onClick={() => {
                                        setBlog(item)
                                        setShowEdit(true)
                                    }}>Edit</Button>
                                    <Button variant="danger" onClick={() => handleDeleleBlogs(item.id)}>Delete</Button>

                                </td>
                            </tr>
                        )
                    })}

                </tbody>
            </Table>

            <CreateModal show={show} setShow={setShow} />
            <EditModal showEdit={showEdit} setShowEdit={setShowEdit} blog={blog} setBlog={setBlog} />

        </>
    );

}

export default TableTb;