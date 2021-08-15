import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { useEffect, useState } from "react"
import config from "../../config";

export const getStaticProps: GetStaticProps<{ title: string; content: string; generatedAt: string; }> = async (ctx) => {
    if (!ctx.params?.id) {
        throw new Error('Article id is required');
    }

    // Querys CMS to get the latest data.
    const res = await (await fetch(config.cmsRestApi + '/article/' + ctx.params!.id)).json();
    const now = new Date();

    return {
        props: {
            title: res?.data?.title ?? '',
            content: res?.data?.content ?? '',
            generatedAt: now.toLocaleDateString() + ' ' + now.toLocaleTimeString(),
        },
        // https://www.smashingmagazine.com/2021/04/incremental-static-regeneration-nextjs/
        revalidate: 120,
    }
}

export const getStaticPaths: GetStaticPaths = () => {
    return {
        // Generates all static pages at runtime.
        paths: [],
        fallback: 'blocking'
    }
}

export default function Publish({
    title, content, generatedAt,
}: InferGetStaticPropsType<typeof getStaticProps>) {
    const [name, setName] = useState<string | null>(null);

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

            <p>Page is generated at {generatedAt}</p>
        </>
    )
}

