import type { Metadata } from 'next'
import Link from "next/link"

export const metadata: Metadata = {
  title: 'Trang chủ',
  description: 'description'
}

export default function Home() {

  return (
    <div>
      <ul>
        <li>
          <Link href="/facebook">Facebook</Link>
        </li>
        <li>
          <Link href="/youtube">Youtube</Link>
        </li>
        <li>
          <Link href="/tiktok">Tiktok</Link>
        </li>
      </ul>
    </div>

  )
}
