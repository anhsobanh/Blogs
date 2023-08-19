"use client"
import useSWR from "swr";
import TableTb from "../app.table";

export default function BlogsPage() {
    const fetcher = (url: string) => fetch(url).then((res) => res.json());

    const { data, error, isLoading } = useSWR(
        "http://localhost:8000/blogs",
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
            <TableTb blogs={data?.sort((a: any, b: any) => b.id - a.id)} />
        </>)
}