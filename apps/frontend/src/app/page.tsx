'use client';

import React from 'react';

import './page.module.css';

import jsonToTs from 'json-to-ts';

import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'

import {Configuration, OpenAIApi} from 'openai';

const openai = new OpenAIApi(new Configuration({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
}));

import {
    ChatStreamDelta,
    CustomCompletionError,
    getChatCompletionAdvanced, getChatCompletionSimple,
} from '@firtoz/openai-wrappers';


// Create a client
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false, // default: true
        },
    },
});

const onFileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
        return;
    }

    const fileName = file.name;
    const fileType = file.type;

    console.log(process.env['NEXT_PUBLIC_OPENAI_API_KEY']);

    // if file is a json file, create typescript types
    // if file is a csv file, just do a console.log for now

    if (fileType === 'application/json') {
        const reader = new FileReader();
        reader.onload = async () => {
            const json = JSON.parse(reader.result as string);

            let isRootArray = Array.isArray(json);

            const types = jsonToTs(json, {
                rootName: isRootArray ? 'RootItem' : 'Root',
            });

            if (isRootArray) {
                types.unshift('type Root = RootItem[];');
            }

            console.log({
                fileName,
                fileType,
                json,
                types: types.join('\n\n'),
            });

            const prompt = `The user will provide the contents of a typescript file. 

You will simplify this file.

Simplify the types by doing the following:
Merge redundant interfaces and fields.
For example if one interface Interface1 has a field called fieldOne and another interface Interface2 has a field called fieldOne and fieldTwo, then merge these two interfaces into one interface called Interface1, and remove Interface2.
Remove interfaces that are not used.
Then respond only with the simplified typescript output.`;

            console.log('Getting simplified typescript...');

            const simplifiedTypes = await getChatCompletionSimple({
                openai,
                messages: [
                    {
                        role: 'system',
                        content: prompt,
                    },
                    {
                        role: 'user',
                        content: types.join('\n\n'),
                    }
                ], options: {
                    model: 'gpt-3.5-turbo-16k-0613',
                },
            });

            console.log('Got simplified typescript.', simplifiedTypes);

        };
        reader.readAsText(file);
    } else if (fileType === 'text/csv') {
        const reader = new FileReader();
        reader.onload = () => {
            const csv = reader.result as string;
            console.log(csv);
        };
        reader.readAsText(file);
    } else {
        console.log(`Unknown file type: ${fileType}`);
    }
}

const Page = () => {
    return <div>
        <h1>JSON to TS</h1>
        <input type="file" onChange={onFileSelected}/>
    </div>;
}

const MainPage = () => {
    const [isClient, setIsClient] = React.useState(false);

    React.useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }

    return <div>
        <QueryClientProvider client={queryClient}>
            <React.Suspense fallback="Loading...">
                <Page/>
            </React.Suspense>
        </QueryClientProvider>
    </div>
}

export default MainPage;
