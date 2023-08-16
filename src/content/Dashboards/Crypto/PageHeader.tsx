import { useAppSelector } from '@/lib/hooks';
import { User, selectCurrentUser } from '@/lib/slice/authslice';
import { Typography,  Grid } from '@mui/material';

function PageHeader() {

  const user: User = useAppSelector(selectCurrentUser);

  return (
    <Grid container alignItems="center">
      <Grid item>
        {/* <Avatar
          sx={{
            mr: 2,
            width: theme.spacing(8),
            height: theme.spacing(8)
          }}
          variant="rounded"
          alt={user.name}
          src={user.avatar}
        /> */}
      </Grid>
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Welcome, {user.firstname} {user.lastname}!
        </Typography>
        <Typography variant="subtitle2">
          Today is a good day to start writing new blog posts
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
