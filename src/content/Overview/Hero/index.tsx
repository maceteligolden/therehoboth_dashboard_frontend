import {
  Button,
  Card,
  Container,
  TextField,
} from '@mui/material';
import * as yup from 'yup';
import { useFormik } from 'formik';
import Toast, { IHandleMotion } from '@/components/Toast';
import Blog from '@/services/dto/blog';
import { useState } from 'react';
import { useLoginMutation } from '@/services/authservice';
import { ILogin } from '@/services/dto/auth';
import { useRouter } from 'next/router';
import { setCredentials } from '@/lib/slice/authslice';
import { useAppDispatch } from '@/lib/hooks';

function Hero() {

  const router = useRouter();
  const dispatch = useAppDispatch();

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

  const [ login, { isLoading }] = useLoginMutation()

const validationSchema = yup.object({
  email: yup
      .string()
      .required('Title is required'),
  password: yup
      .string()
      .required('Content is required'),
});

const formik = useFormik({
  initialValues: {
      email: '',
      password: '',
  },
  validationSchema: validationSchema,
  onSubmit: (values: ILogin) => { 
    login({...values}).then((res: any)=>{
      if (res.data.status === "success") {
        successToastHandler({
          message: res.data.message,
          visibility: true,
          status: true,
        });

        // save logged in user details to redux store and local storage
        const payload = {
          user: res.data.data.user,
          token: res.data.data.token,
        };
        dispatch(setCredentials(payload));
        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.data.user));

        // goto to dashboard page
        router.push('/dashboards');
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

  return (
    <Container maxWidth="lg" sx={{ 
      height: '100%',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Card 
        sx={{ maxWidth: '345px', minWidth: '260px', display: 'flex', flexDirection: 'column', gap: '10px', padding: '20px'}}>
        <TextField
          id="outlined-disabled"
          label="Email"
          name={'email'}
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          name={'password'}
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          onClick={() => formik.handleSubmit()}
        >
          Login
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
    </Container>
    
  );
}

export default Hero;
