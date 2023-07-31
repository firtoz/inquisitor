'use client';

import 'bootstrap-icons/font/bootstrap-icons.css';
import {useEffect} from "react";

export const useBootstrap = () => {
    useEffect(() => {
        require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }, []);
}