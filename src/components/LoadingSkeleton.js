import { Grid, Card, CardContent, Skeleton } from "@mui/material";

function LoadingSkeleton({ count = 12 }) {
  return (
    <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
      {Array.from({ length: count }).map((_, index) => (
        <Grid
          key={index}
          size={{
            xs: 6,
            sm: 4,
            md: 3,
            lg: 2.4,
          }}
        >
          <Card
            elevation={0}
            sx={{
              height: "100%",
              borderRadius: 3,
              overflow: "hidden",
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Skeleton
              variant="rectangular"
              animation="wave"
              sx={{
                width: "100%",
                aspectRatio: "2 / 3",
              }}
            />

            <CardContent>
              <Skeleton
                variant="text"
                animation="wave"
                height={32}
              />

              <Skeleton
                variant="text"
                animation="wave"
                width="45%"
              />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default LoadingSkeleton;