import * as React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function BasicCard(props) {
  console.log('BasicCard prop: ' + JSON.stringify(props));
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="body1" my="1em">
          {props.bookMark.quotation}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.bookMark.bookTitle}
        </Typography>
        <Typography variant="body2" color="text.secondary" mt="1em" align="right">
          marked by {props.bookMark.userName}
        </Typography>
      </CardContent>
    </Card>
  );
}
