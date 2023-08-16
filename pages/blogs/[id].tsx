import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from '@/components/Footer';
import { useRouter } from 'next/router';
import UpdateBlog from '@/content/Blogs/UpdateBlog';

function CreateBlog() {

  const router = useRouter();

  return (
    <>
      <Head>
        <title>Therehoboth - Create Blogs</title>
      </Head>
      <PageTitleWrapper>
        
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
            { router.isReady &&
                <UpdateBlog blogId={router.query.id}/>
            }
        </Grid>
      </Container>
      <Footer />
      
    </>
  );
}

CreateBlog.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default CreateBlog;
