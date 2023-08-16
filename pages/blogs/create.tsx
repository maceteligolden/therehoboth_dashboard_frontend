import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import { Grid, Container, Card, TextField, Button } from '@mui/material';
import Footer from '@/components/Footer';
import { useCreateBlogMutation } from '@/services/blog.service';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Blog from '@/services/dto/blog';
import Toast, { IHandleMotion } from '@/components/Toast';
import { useState } from 'react';

function CreateBlog() {

  const [successToastStatus, setSuccessToastStatus] = useState<IHandleMotion>({
    message: "",
    visibility: false,
    status: false,
  });
  const [errorToastStatus, setErrorToastStatus] = useState<IHandleMotion>({
    message: "",
    visibility: false,
    status: false,
  });

  const successToastHandler = (args: IHandleMotion) => {
    setSuccessToastStatus(args);
  };

  const errorToastHandler = (args: IHandleMotion) => {
    setErrorToastStatus(args);
  };

  const [ createBlog, { isLoading, isSuccess }] = useCreateBlogMutation();

  const validationSchema = yup.object({
    title: yup
        .string()
        .required('Title is required'),
    content: yup
        .string()
        .required('Content is required'),
  });

const formik = useFormik({
    initialValues: {
        title: '',
        content: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values: Blog) => { 
      createBlog({
        title: values.title,
        content: values.content
      }).then((res: any)=> {
        if (res.data.status === "success") {
          successToastHandler({
            message: res.data.message,
            visibility: true,
            status: true,
          });
          
        } else {
          errorToastHandler({
            message: res.data.message,
            visibility: true,
            status: false,
          });
        }
      }).catch((err: any)=>{
        errorToastHandler({
          message: "server error",
          visibility: true,
          status: false,
        });
      })
    },
});

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
          <Grid item xs={12}>
            <Card sx={{ padding: '20px', display: 'flex', flexDirection:'column', gap: '10px'}}>
              <TextField 
                id="outlined-basic" 
                label="title" 
                variant="outlined"
                name={'title'}
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
              />
              <TextField
                id="outlined-multiline-static"
                label="body"
                multiline
                rows={9}
                sx={{ width: '100%'}}
                name={'content'}
                value={formik.values.content}
                onChange={formik.handleChange}
                error={formik.touched.content && Boolean(formik.errors.content)}
                helperText={formik.touched.content && formik.errors.content}
              />
              <Button
                sx={{ mt: { xs: 2, md: 0 } }}
                variant="contained"
                onClick={() => formik.handleSubmit()}
                disabled={isLoading}
              >
                Create Blog
              </Button>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
      <Toast
          message={successToastStatus.message}
          severity={"success"}
          status={successToastStatus.visibility}
          handler={function (): void {
              setSuccessToastStatus({
              visibility: false,
              });
          }}
      />

      <Toast
          message={errorToastStatus.message}
          severity={"error"}
          status={errorToastStatus.visibility}
          handler={function (): void {
              setErrorToastStatus({
              visibility: false,
              });
          }}
      />
    </>
  );
}

CreateBlog.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default CreateBlog;
