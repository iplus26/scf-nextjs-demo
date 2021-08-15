import { useEffect, useState } from "react";
import Link from 'next/link';
import config from "../config";

export default function List() {
    const [list, setList] = useState<any[]>([]);

    useEffect(() => {
        fetch(config.cmsRestApi + '/article')
            .then(res => res.json())
            .then(res => {
                console.log(res.data);
                setList(res.data);
            })
    }, [])

    return (
        <ul>
            <style global jsx>{`
                a {
                    color: blue;
                }
                a:visited { 
                    color: purple;
                }
            `}</style>
            {list.map(article => (
                <li key={article._id}>
                    <Link href={`/publish/${article._id}`}>
                        {article.title}
                    </Link>
                    - Publish at:&nbsp;
                    <span>{new Date(article._updateTime).toLocaleDateString()}</span>
                </li>
            ))}
        </ul>
    )
}