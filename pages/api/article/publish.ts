import { NextApiRequest, NextApiResponse } from "next";
import React from "react";
import { renderToString } from 'react-dom/server';
import Publish from '../../publish/[id]';

export default function publish(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(501).send(req.method + ' is not supported');
        return;
    }
    console.log(req.body);

    const stringifyArticle = renderToString(
        React.createElement(Publish, {
            title: req.body.title ?? '',
            content: req.body.content ?? '',
        })
    )

    res.status(200).end(stringifyArticle);
}