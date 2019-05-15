import React, { useState } from "react";
import { withStyles } from "@material-ui/core";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15)
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20
  },
  details: {
    alignItems: "center"
  },
  column: {
    flexBasis: "50%"
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2)
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline"
    }
  },
  description: {
      borderRight: '2px solid #ccc',
      padding: theme.spacing(1),
  }
});

function ComponentReleaseView2(props) {
  const {
    classes,
    components,
    selectedComponent,
    componentReleases,
    selectedComponentRelease
  } = props;

  const [expanded, setExpanded] = useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      {components.map(c => {
          const thisRelease = c.componentReleases.current;

        return (
          <ExpansionPanel
            key={c.id}
            expanded={expanded === c.id}
            onChange={handleChange(c.id)}
          >
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={"panel" + c.id + "-content"}
              id={c.id}
            >
              <div className={classes.column}>
                <Typography className={classes.heading}>{c.title}</Typography>
              </div>
              <div className={classes.column}>
                <Typography className={classes.secondaryHeading}>
                  {thisRelease.number}
                </Typography>
              </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Grid container spacing={2} className={classes.row}>
                <Grid item xs={12} md={4}>
                  <Typography variant="body2" className={classes.description} color="textSecondary"
                    dangerouslySetInnerHTML={{
                      __html: c.description
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="h6">Documentation</Typography>
                  {thisRelease.id &&
                    thisRelease.documents.map(d => {
                      return (
                        <Button
                          key={d.id}
                          variant="outlined"
                          size="large"
                          fullWidth={true}
                          href={d.externalLink}
                          target="_blank"
                          rel="noopener"
                          className={classes.button}
                        >
                          <Typography variant="body2">
                            {d.docType.title}
                          </Typography>
                        </Button>
                      );
                    })}
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="h6">Downloads</Typography>
                  {thisRelease.id &&
                    thisRelease.downloads.map(d => {
                      return (
                        <Button
                          key={d.id}
                          variant="outlined"
                          size="large"
                          fullWidth={true}
                          href={d.externalLink}
                          target="_blank"
                          rel="noopener"
                          className={classes.button}
                        >
                          <Typography variant="body2">{d.title}</Typography>
                        </Button>
                      );
                    })}
                </Grid>
              </Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        );
      })}
    </div>
  );
}

export default withStyles(styles)(ComponentReleaseView2);
