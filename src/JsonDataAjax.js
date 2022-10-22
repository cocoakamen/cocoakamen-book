
import React, { useState, useEffect } from 'react';

export default function JsonDataAjax(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    
    // fetch('./data/' + props.fileName)
    fetch('https://opendata.resas-portal.go.jp/api/v1/prefectures', { //1
      headers: { //2
        "X-API-KEY": 'hyJX5bSzMZmXxdpEyLj5QlotiFgyO5jQqrdDnysx'
      } //これが足りない
    })
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <p>
        {JSON.stringify(items)}
      </p>
    );
  }
}