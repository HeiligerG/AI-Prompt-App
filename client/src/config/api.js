const BASE_URL = import.meta.env.VITE_API_URL;

export const API = {
    prompts: {
        getAll: (aiType) => `${BASE_URL}/prompts/${aiType}`,
        create: () => `${BASE_URL}/prompts`,
        update: (id) => `${BASE_URL}/prompts/${id}`,
        delete: (id) => `${BASE_URL}/prompts/${id}`,
    }
};

export const apiCall = async (url, options = {}) => {
    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('API call failed:', error);
        throw error;
    }
};

// Verwendungsbeispiel:
// import { API, apiCall } from '../config/api';
// const prompts = await apiCall(API.prompts.getAll('ChatGPT'));