// ./frontend/stc/app/[lang]/utils/fetch-api.tsx
import qs from 'qs';
import { API_URL } from '../constants/config';

export function getStrapiURL(path = '') {
  return `${API_URL}${path}`;
}


export async function fetchAPI<T>(path: string, urlParamsObject = {}, options = {}) {
  try {
    // Merge default and user options
    const mergedOptions = {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    };
    // Build request URL
    const queryString = qs.stringify(urlParamsObject);
    const requestUrl = `${getStrapiURL(`${path}${queryString ? `?${queryString}` : ''}`)}`;

    // Trigger API call
    const response = await fetch(requestUrl, mergedOptions);
    const data = await response.json();
    return data as T;
  } catch (error) {
    console.error(error);
    throw new Error(`Please check if your server is running and you set all the required tokens.`);
  }
}

export async function postAPI<T>(path: string, body: any, method: "POST" | "PATCH", options = {}) {
  const url = new URL(path, getStrapiURL());

  try {
    // Trigger API call
    const response = await fetch(url, {
      method: method,
      ...options,
      body: JSON.stringify({ ...body }),
      cache: 'no-cache',
    });

    return response;
  } catch (error) {
    console.error(error);
    throw new Error(
      `Before posting data, please check if your server is running and you set all the required tokens.`,
    );
  }
}


export async function deleteAPI<T>(path: string, options = {}) {
  const url = new URL(path, getStrapiURL());

  try {
    // Trigger API call
    const response = await fetch(url, {
      method: 'DELETE',
      ...options,
      cache: 'no-cache',
    });

    // Handle the response
    if (!response.ok) {
      throw new Error(`Failed to delete resource at ${path}`);
    }

    return response;
  } catch (error) {
    console.error(error);
    throw new Error(
      `Before deleting data, please check if your server is running and you set all the required tokens.`,
    );
  }
}
