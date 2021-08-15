
import React, { useRef, useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 35,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function OutlinedCard({tog,obj,detected,update}) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const elementsIndex = obj.objects.findIndex(element => element.name == detected );
  const[hello,sethello]=useState(obj.objects[elementsIndex].value);
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography style={{marginBottom:"10px"}} className={classes.title} variant="h6" color="black" gutterBottom>
          {obj.objects[elementsIndex].name}
        </Typography>
        <Typography style={{marginBottom:"10px"}} variant="h5" component="h2">
          Status-        {hello ? "ON":"OFF"}
        </Typography>
        <div style={{display:'flex',alignItems:'center',justifyContent: 'space-evenly',marginBottom:"10px"}}>
            <Typography className={classes.pos} color="textSecondary">
            Toggle Mode:
            </Typography>
            <Button variant="contained" color="secondary"
                onClick={()=>sethello(!hello)}
            >{hello ? "OFF":"ON"}</Button>
        </div>
      </CardContent>
      <Button color="primary" onClick={tog}>Close</Button>
    </Card>
  );
}