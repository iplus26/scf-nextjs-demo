import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react"
import config from "../../config";

export const getServerSideProps: GetServerSideProps<{ title: string; content: string }> = async (ctx) => {
    if (!ctx.params?.id) {
        throw new Error('Article id is required');
    }

    // Querys CMS to get the latest data.
    const res = await (await fetch(config.cmsRestApi + '/article/' + ctx.params!.id)).json();

    return {
        props: {
            title: res?.data?.title ?? '',
            content: res?.data?.content ?? '',
        }
    }
}

export default function Publish({
    title, content,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const [name, setName] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            fetch('/api/hello')
                .then(res => res.json())
                .then(data => {
                    // console.log(data);
                    setName(data.name);
                });
        }, 3000);
    }, [])

    return (
        <>
            <div>
                {name
                    ? `Welcome, ${name}. Thank for reading my post.`
                    : 'loading...'
                }
            </div>

            <h1>{title}</h1>
            <article>{content}</article>
        </>
    )
}

