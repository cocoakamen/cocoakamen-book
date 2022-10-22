import React, { useState, useEffect } from "react";
import { createRoot } from 'react-dom/client';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PetsIcon from '@mui/icons-material/Pets';

import ResponsiveAppBar from "./ResponsiveAppBar";
import FixedBottomNavigation from "./FixedBottomNavigation";
import MainContents from "./MainContents";

function App() {

  const bookMarkList = [
    {
      "quotation" : "システムの設計や開発をした経験があるからといって、システムを安定稼働する仕組みが作れるとは限らない。",
      "bookTitle" : "日経コンピュータ. ポストモーテム みずほ銀行システム障害 事後検証報告",
      "amazonUrl" : "https://amzn.to/3CYq9cj",
      "note" : "だよねー",
      "userName" : "cocoakamen"
    },
    {
      "quotation" : "ランシエールは人間の意志がそれほど強くないことを知っています。好き勝手させておけば人が自由に学び始めるなどと楽観的なことは決して言いません。しかし教師は、生徒に対する特権的な知を有しているのではない、という態度を徹底しなければなりません。",
      "bookTitle" : "渡辺健一郎. 自由が上演される",
      "amazonUrl" : "https://amzn.to/3SmY6rh",
      "note" : "意志の弱さをどうにかするのが教師ってことかな。",
      "userName" : "cocoakamen"
    }
  ]

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [bookMarks, setBookMarks] = useState([]);

  // ランダム表示するためのインデックス
  const[bookMarkIndex, setBookMarkIndex] = useState(0);

  const getRandomIndex = (max) => {
    const randomIndex = Math.floor(Math.random() * max);
    console.log('randomIndex: ' + randomIndex);
    return randomIndex;
  }

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    
    fetch('./data/bookMarks.json')
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setBookMarks(result.bookMarks);
          console.log('result: ' + JSON.stringify(result));
          setBookMarkIndex(getRandomIndex(result.bookMarks.length));
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

  const handleChange = () => {
    setBookMarkIndex(getRandomIndex(bookMarks.length));
  }

  // noteのダイアログ表示
  const [noteOpen, setNoteOpen] = React.useState(false);
  
  const handleOpenNote = () => {
    setNoteOpen(true);
  };

  const handleCloseNote = () => {
    setNoteOpen(false);
  };

  // 表示する内容を切り替える
  const [mainContentsType, setMainContentsType] = useState('book');
  const handleMainContents = (type) => {
    setMainContentsType(type);
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <ResponsiveAppBar handleMenu={handleMainContents}/>
      <Box
          sx={{
            mx: 'auto',
            py: '5em',
            px: '1em',
            height: '60vh',
            fontSize: '0.875rem',
            fontWeight: '700',
          }}
        >
  
          <MainContents type={mainContentsType} bookMark={bookMarks[bookMarkIndex]} />
  
        </Box>
        <FixedBottomNavigation  
          type = {mainContentsType}
          bookMark = {bookMarks[bookMarkIndex]}
          handleOpenNote = {handleOpenNote} 
          handleChange = {handleChange}
        />
  
        <Dialog
          open={noteOpen}
          onClose={handleCloseNote}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            <PetsIcon />
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {bookMarks[bookMarkIndex].note}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseNote} autoFocus>
              close
            </Button>
          </DialogActions>
        </Dialog>
  
      </div>
    );
  
  }

};

export default App;


const root = createRoot(document.getElementById('app'));

root.render(<App />);
