import './globals.scss'
import favicon from './favicon.ico';

import {Inter} from 'next/font/google'

import 'bootstrap/dist/css/bootstrap.css';

import PlausibleProvider from 'next-plausible'
import React from "react";
import {Metadata} from "next";
import {BootstrapScript} from "../components/BootstrapScript";

const inter = Inter({
    subsets: ['latin'],
})

const title = 'Example Title';

const description = 'Example Description';
const opengraphImage = 'https://placehold.co/600x400.png';

const HOST_URI = process.env['NEXT_PUBLIC_DOMAIN'] ?? 'http://localhost:3000';
const PLAUSIBLE_DOMAIN = process.env['NEXT_PLAUSIBLE_DOMAIN'];

export const metadata: Metadata = {
    title,
    description,
    metadataBase: new URL(HOST_URI),
    icons: [
        {
            type: 'image/x-icon',
            rel: 'icon',
            url: favicon.src,
            href: favicon.src,
            sizes: 'any',
        },
    ],
    openGraph: {
        type: 'website',
        title,
        description,
        images: [opengraphImage],
    },
    twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [opengraphImage],
    }
}

type RootLayoutProps = {
    children: React.ReactNode
};


export default function RootLayout({children}: RootLayoutProps) {
    // noinspection HtmlRequiredTitleElement
    return (
        <html lang="en" data-bs-theme="dark">
        <head>
            {!!PLAUSIBLE_DOMAIN && <PlausibleProvider domain={PLAUSIBLE_DOMAIN} trackOutboundLinks={true}/>}
        </head>
        <body className={inter.className}>
        <BootstrapScript/>
        {children}
        </body>
        </html>
    )
}
