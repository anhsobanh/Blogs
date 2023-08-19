'use client'
import { useRouter } from "next/navigation"
import { Button } from "react-bootstrap"
import Card from 'react-bootstrap/Card';
import useSWR, { Fetcher } from 'swr'
const ViewDetailBlog = ({ params }: { params: { id: string } }) => {
    const router = useRouter()
    const handleBtn = () => {
        router.push('/blogs')
    }
    const fetcher: Fetcher<IBlog, string> = (url: string) => fetch(url).then((res) => res.json());

    const { data, error, isLoading } = useSWR(`http://localhost:8000/blogs/${params.id}`,
        fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    }
    );

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <>
            <Button className='my-3' onClick={() => handleBtn()}> Back</Button >
            <Card className="text-center">
                <Card.Header>Tiêu đề: {data?.title}</Card.Header>
                <Card.Body>
                    <Card.Text>
                        {data?.content}
                    </Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted"> Tác giả: {data?.author}</Card.Footer>
            </Card>
        </>
    )
}

export default ViewDetailBlog