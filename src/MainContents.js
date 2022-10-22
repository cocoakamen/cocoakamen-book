import * as React from 'react';
import BasicCard from "./BasicCard";

export default function MainContents(props) {
  if(props.type=='book'){
    return (
      <BasicCard bookMark={props.bookMark} />
    );  
  } else if(props.type == "about") {
    return (
      <p>
        本の中で出会った。<br />
        心動いたフレーズをランダムに表示する。<br />
        それだけです。
      </p>
    );  
  } else {
    
  }
}
