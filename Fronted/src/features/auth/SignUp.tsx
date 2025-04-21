import type React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import Divider from "@mui/material/Divider"
import { SchemaSignUp, type FormData } from "./SchemaSignUp"
interface SignUpDialogProps {
    open: boolean
    onClose: () => void
}
const SignUp: React.FC<SignUpDialogProps> = ({ open, onClose }) => {
    const form = useForm<FormData>({
        resolver: zodResolver(SchemaSignUp),
        defaultValues: {
            username: "",
            password: "",
            email: "",
            creditCard: "",
            expiryMonth: "",
            expiryYear: "",
            cvvSchema: "",
        },
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = form

    const onSubmit = (data: FormData) => {
        console.log(data)
        alert("Registration successful!")
        onClose()
        reset()
    }
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ fontWeight: "bold", color: "#0d9488", fontSize: "1.25rem" }}>Admin Registration</DialogTitle>

            <DialogContent>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Fill in the form below to register as an admin.
                </Typography>

                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        fullWidth
                        id="username"
                        label="Username"
                        placeholder="Enter username"
                        {...register("username")}
                        error={!!errors.username}
                        helperText={errors.username?.message}
                    />

                    <TextField
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Email"
                        type="email"
                        placeholder="Enter email"
                        {...register("email")}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />

                    <TextField
                        margin="normal"
                        fullWidth
                        id="password"
                        label="Password"
                        type="password"
                        placeholder="Enter password"
                        {...register("password")}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="subtitle1" sx={{ fontWeight: "medium", color: "#0d9488", mb: 1 }}>
                        Payment Information
                    </Typography>

                    <TextField
                        margin="normal"
                        fullWidth
                        id="creditCard"
                        label="Credit Card Number"
                        placeholder="Enter credit card number"
                        {...register("creditCard")}
                        error={!!errors.creditCard}
                        helperText={errors.creditCard?.message}
                    />

                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                id="expiryMonth"
                                label="Month (MM)"
                                placeholder="MM"
                                inputProps={{ maxLength: 2 }}
                                {...register("expiryMonth")}
                                error={!!errors.expiryMonth}
                                helperText={errors.expiryMonth?.message}
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                id="expiryYear"
                                label="Year (YY/YYYY)"
                                placeholder="YY or YYYY"
                                inputProps={{ maxLength: 4 }}
                                {...register("expiryYear")}
                                error={!!errors.expiryYear}
                                helperText={errors.expiryYear?.message}
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                id="cvvSchema"
                                label="CVV"
                                placeholder="CVV"
                                inputProps={{ maxLength: 4 }}
                                {...register("cvvSchema")}
                                error={!!errors.cvvSchema}
                                helperText={errors.cvvSchema?.message}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 3 }}>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button
                    onClick={handleSubmit(onSubmit)}
                    variant="contained"
                    sx={{
                        bgcolor: "#0d9488",
                        "&:hover": { bgcolor: "#0f766e" },
                    }}
                >
                    Register
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default SignUp
