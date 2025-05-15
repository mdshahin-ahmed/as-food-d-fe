import {
  Card,
  CardContent,
  Grid,
  GridColumn,
  Placeholder,
  PlaceholderHeader,
  PlaceholderLine,
  PlaceholderParagraph,
} from "semantic-ui-react";

const CardLoader = () => {
  const cardArr = [1, 2, 3, 4];
  return (
    <>
      {cardArr?.map((d) => (
        <GridColumn key={d} mobile={16} computer={4}>
          <Card className="w-100">
            <CardContent>
              <Placeholder>
                <PlaceholderHeader>
                  <PlaceholderLine />
                </PlaceholderHeader>
                <PlaceholderParagraph>
                  <PlaceholderLine />
                  <PlaceholderLine />
                  <PlaceholderLine />
                </PlaceholderParagraph>
              </Placeholder>
            </CardContent>
            <CardContent extra>
              <Grid>
                <GridColumn width={8}>
                  <Placeholder>
                    <PlaceholderHeader>
                      <PlaceholderLine />
                    </PlaceholderHeader>
                  </Placeholder>
                </GridColumn>
                <GridColumn width={8}>
                  <Placeholder>
                    <PlaceholderHeader>
                      <PlaceholderLine />
                    </PlaceholderHeader>
                  </Placeholder>
                </GridColumn>
              </Grid>
            </CardContent>
          </Card>
        </GridColumn>
      ))}
    </>
  );
};

export default CardLoader;
