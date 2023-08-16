import { Typography, Button, Grid } from '@mui/material';
import { useRouter } from 'next/router';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

function PageHeader() {
  
  const router = useRouter();

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Blogs
        </Typography>
        <Typography variant="subtitle2">
        </Typography>
      </Grid>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          onClick={() => {
            router.push('/blogs/create')
          }}
        >
          Create Blog
        </Button>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
