import axios from 'axios';
import { useState } from 'react'
import ConfigModel from '../models/configModel';
import PostModel from '../models/post';

const useHttp = () => {
  const [list, setList] = useState<PostModel[]>([]);
  const [post, setPost] = useState<PostModel | null>(null);
  const [status, setStatus] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [redirect, setRedirect] = useState<boolean>(false);

  const sendRequest = (config: ConfigModel) => {
    const { method, url, data } = config;
    setStatus('pending');
    
    axios({
      method: method ? method : 'GET',
      url: url,
      data: data ? data : {}
    }).then(response => {

      if(Array.isArray(response.data)){
        setList(response.data);
      }else{
        setPost(response.data);
      }
      
      if(method !== "GET" && method !== undefined){
        setRedirect(true);
      };
      
      setStatus('success')
    }).catch(err => {
      setError(err.message);
      setStatus('error')
    });
  };

  const clearError = () => {
    setError('');
    setStatus('');
  };

  return { list, post, status, error, redirect, sendRequest, clearError};
};

export default useHttp;