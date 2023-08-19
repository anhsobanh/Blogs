'use client'
import { useRouter } from "next/navigation"
import { Button } from "react-bootstrap"
export default function Facebook() {

    const router = useRouter()
    const handleBtn = () => {
        router.push('/')
    }
    return (
        <div>
            facebook nè
            <div>
                <Button variant="primary">Lanh</Button>
                <button onClick={() => handleBtn()}>back home</button>
            </div>
        </div>
    )
}