/** @format */

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ChakraProvider, Box } from '@chakra-ui/react';
import Layout from './pages/Layout';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ChakraProvider>
            <Layout>
                <App />
            </Layout>
        </ChakraProvider>
    </React.StrictMode>
);
