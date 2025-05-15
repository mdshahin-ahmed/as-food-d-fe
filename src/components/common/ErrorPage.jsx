import { Button, Grid, GridColumn, Header } from "semantic-ui-react";
import As404Page from "./404Page";

const ErrorPage = ({ heading, subheader, btnLabel, onClick }) => {
  const defaultClick = () => {
    window.location.href = "/";
  };
  return (
    <Grid
      padded
      verticalAlign="middle"
      textAlign="center"
      doubling
      relaxed
      style={{ minHeight: "100vh" }}
    >
      <GridColumn verticalAlign="middle">
        <Header textAlign="center" content={heading} />
        <Header textAlign="center" subheader={subheader} />
        <Header as="div" textAlign="center">
          <As404Page />
        </Header>

        <Button primary onClick={onClick || defaultClick()}>
          {btnLabel || "Go to homepage"}
        </Button>
      </GridColumn>
    </Grid>
  );
};

export default ErrorPage;
