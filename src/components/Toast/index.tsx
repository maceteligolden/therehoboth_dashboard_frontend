import { Snackbar, Alert } from "@mui/material";

interface IToast {
    status: boolean;
    handler: () => void;
    severity: "success" | "error";
    message: string;
}

export interface IHandleMotion {
    message?: string,
    visibility?: boolean,
    status?: boolean
}

export default function Toast(props: IToast) {
    return (
        <>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={props.status}
                autoHideDuration={2000}
                onClose={props.handler}
            >
                <Alert onClose={props.handler} severity={props.severity} sx={{ width: '100%' }}>
                   {props.message}
                </Alert>
            </Snackbar>
        </>
    )
}