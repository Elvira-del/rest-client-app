'use client';

import { useState } from "react";
import { proxyFetch } from "@/utils/proxyFetch";

export default function TestRequest() {
  const [getResponse, setGetResponse] = useState<string>('');
  const [postResponse, setPostResponse] = useState<string>('');

  const handleGet = async () => {
    try {
      const response = await proxyFetch("https://jsonplaceholder.typicode.com/todos/1", {
        method: "GET",
      });
      setGetResponse(JSON.stringify(response, null, 2));
    } catch {
      setGetResponse('Error');
    }
  };

  const handlePost = async () => {
    try {
      const response = await proxyFetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: {
          title: 'foo',
          body: 'bar',
          userId: 1,
        },
      });
      setPostResponse(JSON.stringify(response, null, 2));
    } catch {
      setPostResponse('Error');
    }
  };

  return (
    <div>
      <h1>Test ProxyFetch</h1>
      
      <button onClick={handleGet}>Send GET</button><br/>
      <button onClick={handlePost}>Send POST</button>

      {getResponse && (
        <div>
          <h3>GET Response:</h3>
          <p>{getResponse}</p>
        </div>
      )}

      {postResponse && (
        <div>
          <h3>POST Response:</h3>
          <p>{postResponse}</p>
        </div>
      )}
    </div>
  );
}