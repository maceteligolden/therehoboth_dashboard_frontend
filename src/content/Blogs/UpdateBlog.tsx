import Toast, { IHandleMotion } from "@/components/Toast";
import { useUpdateBlogMutation, useGetBlogsQuery, useGetBlogQuery } from "@/services/blog.service";
import Blog from "@/services/dto/blog";
import { Grid, Card, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import * as yup from 'yup';

interface IUpdateBlog {
    blogId: string;
}

export default function UpdateBlog(props: IUpdateBlog) {
    const router = useRouter();

  const [ loader, setLoader ] = useState<boolean>(true);

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

  const [ updateBlog, { isLoading }] = useUpdateBlogMutation();

  const { data, isSuccess } = useGetBlogQuery({ id: props.blogId });
  

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
      updateBlog({
        id: props.blogId,
        body: {
            title: values.title,
            content: values.content
        }
      }).then((res: any)=> {
        if (res.data.status === "success") {
          setTimeout(()=> {
            router.push('/blogs');
          }, 1000)
          
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
      }).catch(()=>{
        errorToastHandler({
          message: "server error",
          visibility: true,
          status: false,
        });
      })
    },
});

useEffect(()=>{
    if(isSuccess) {
        formik.setValues({
            title: data.data.title,
            content: data.data.content
        })
    }
},[isSuccess])
    return(
        <>
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
                Update Blog
              </Button>
            </Card>
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
          </Grid>
        </>
    )
}