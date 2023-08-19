import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'View detail blog list',
    description: 'description'
}


export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            {children}
        </>
    )
}
