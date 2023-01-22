import axios from 'axios';
import { useState } from 'react';

export const useRequest = ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async () => {
    try {
      setErrors(null)
      const resp = await axios[method](url, body)
      if(onSuccess){
        onSuccess(resp.data)
      }
      return resp.data
    } catch (error) {
      setErrors(
        <div className="alert alert-danger">
          <h4>oops......</h4>
          <ul className="my-0">
            {error.response.data.errors.map((err, index) => (
              <li key={index}>{err.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return {doRequest, errors};
};
