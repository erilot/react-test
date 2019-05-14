import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/styles";

const styles = theme => ({});

function NoticeCard(props) {
  const { classes, note } = props;
  return (
    <Card className={classes.card}>
      <CardContent className={classes.CardContent}>
        <Typography variant="h5">{note.title}</Typography>
        <Typography
          variant="body2"
          dangerouslySetInnerHTML={{ __html: note.body }}
        />
      </CardContent>
    </Card>
  );
}

export default withStyles(styles)(NoticeCard);
