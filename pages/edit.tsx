import { useState } from "react"

export default function Edit() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [resHtml, setResHtml] = useState('');

    const post = async () => {
        try {
            const res = await (await fetch('/api/article/publish', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, content }),
            })).text();
            console.log(res);
            setResHtml(res);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div>
            <div>
                <style jsx>{`
                input, textarea, button { 
                    display: block;
                    margin-bottom: 20px;
                }
            `}</style>
                <input value={title} onChange={(e) => setTitle(e.target.value)} />
                <textarea value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                <button onClick={post}>Publish it! </button>
            </div>
            <pre>
                <code >
                    {resHtml}
                </code>
            </pre>
        </div>
    )
}