import React from "react";
import "./BoxInfo.css";
import { Card, CardContent, Typography } from "@material-ui/core";

function BoxInfo({ title, todayCases, total, active, ...props }) {
  return (
    <Card
      className={`boxInfo ${active && "boxInfo__selected"}`}
      variant="outlined"
      onClick={props.onClick}
    >
      <CardContent>
        <Typography variant="h4">{title}</Typography>
        <Typography variant="subtitle1">Today +{todayCases}</Typography>
        <Typography variant="subtitle2">Total +{total}</Typography>
      </CardContent>
    </Card>
  );
}

export default BoxInfo;
