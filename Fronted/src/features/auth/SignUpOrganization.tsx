// import type React from "react"
// import { useForm } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import Dialog from "@mui/material/Dialog"
// import DialogActions from "@mui/material/DialogActions"
// import DialogContent from "@mui/material/DialogContent"
// import DialogTitle from "@mui/material/DialogTitle"
// import TextField from "@mui/material/TextField"
// import Button from "@mui/material/Button"
// import Box from "@mui/material/Box"
// import Typography from "@mui/material/Typography"
// import { SchemaOrganization, type OrganizationFormData } from "./SchemaSignUpOrganization";
// import { type FormData } from "./SchemaSignUp";
// interface OrganizationDialogProps {
//     open: boolean
//     onClose: () => void
//     userData: FormData | null
// }

// const OrganizationDialog: React.FC<OrganizationDialogProps> = ({ open, onClose, userData }) => {
//     const { register, handleSubmit, formState: { errors }, reset, } = useForm<OrganizationFormData>({
//         resolver: zodResolver(SchemaOrganization),
//         defaultValues: {
//             organization_name: "",
//             organization_description: "",
//             organization_address: "",
//             organization_phone: "",
//         },
//     })


//     const onSubmit = (data: OrganizationFormData) => {
//         console.log("User data:", userData)
//         console.log("Organization data:", data)

//         // Here you would typically send both user and organization data to your backend
//         alert("Registration completed successfully!")
//         onClose()
//         reset()
//     }

//     return (
//         <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
//             <DialogTitle sx={{ fontWeight: "bold", color: "#0d9488", fontSize: "1.25rem" }}>
//                 Organization Registration
//             </DialogTitle>

//             <DialogContent>
//                 <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
//                     Please provide your organization details to complete registration.
//                 </Typography>

//                 <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
//                     <TextField
//                         margin="normal"
//                         fullWidth
//                         id="organization_name"
//                         label="Organization Name"
//                         placeholder="Enter organization name"
//                         {...register("organization_name")}
//                         error={!!errors.organization_name}
//                         helperText={errors.organization_name?.message}
//                     />

//                     <TextField
//                         margin="normal"
//                         fullWidth
//                         id="organization_description"
//                         label="Organization Description"
//                         placeholder="Enter organization description"
//                         multiline
//                         rows={3}
//                         {...register("organization_description")}
//                         error={!!errors.organization_description}
//                         helperText={errors.organization_description?.message}
//                     />

//                     <TextField
//                         margin="normal"
//                         fullWidth
//                         id="organization_address"
//                         label="Organization Address"
//                         placeholder="Enter organization address"
//                         {...register("organization_address")}
//                         error={!!errors.organization_address}
//                         helperText={errors.organization_address?.message}
//                     />

//                     <TextField
//                         margin="normal"
//                         fullWidth
//                         id="organization_phone"
//                         label="Organization Phone"
//                         placeholder="Enter organization phone"
//                         {...register("organization_phone")}
//                         error={!!errors.organization_phone}
//                         helperText={errors.organization_phone?.message}
//                     />
//                 </Box>
//             </DialogContent>

//             <DialogActions sx={{ px: 3, pb: 3 }}>
//                 <Button onClick={onClose} color="primary">
//                     Cancel
//                 </Button>
//                 <Button
//                     onClick={handleSubmit(onSubmit)}
//                     variant="contained"
//                     sx={{
//                         bgcolor: "#0d9488",
//                         "&:hover": { bgcolor: "#0f766e" },
//                     }}
//                 >
//                     Save
//                 </Button>
//             </DialogActions>
//         </Dialog>
//     )
// }

// export default OrganizationDialog
import type React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { SchemaOrganization, type OrganizationFormData } from "./SchemaSignUpOrganization";
import { type FormData } from "./SchemaSignUp";

interface OrganizationDialogProps {
    open: boolean
    onClose: () => void
    userData: FormData | null
    onSuccess?: () => void // פרופ חדש
}

const OrganizationDialog: React.FC<OrganizationDialogProps> = ({ open, onClose, userData, onSuccess }) => {
    const { register, handleSubmit, formState: { errors }, reset, } = useForm<OrganizationFormData>({
        resolver: zodResolver(SchemaOrganization),
        defaultValues: {
            organization_name: "",
            organization_description: "",
            organization_address: "",
            organization_phone: "",
        },
    })


    const onSubmit = (data: OrganizationFormData) => {
        console.log("User data:", userData)
        console.log("Organization data:", data)

        // Here you would typically send both user and organization data to your backend
        alert("Registration completed successfully!")
        onClose()
        reset()
        // קריאה לפונקציה onSuccess אם היא הועברה
        if (onSuccess) {
            onSuccess()
        }
    }

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ fontWeight: "bold", color: "#0d9488", fontSize: "1.25rem" }}>
                Organization Registration
            </DialogTitle>

            <DialogContent>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Please provide your organization details to complete registration.
                </Typography>

                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        fullWidth
                        id="organization_name"
                        label="Organization Name"
                        placeholder="Enter organization name"
                        {...register("organization_name")}
                        error={!!errors.organization_name}
                        helperText={errors.organization_name?.message}
                    />

                    <TextField
                        margin="normal"
                        fullWidth
                        id="organization_description"
                        label="Organization Description"
                        placeholder="Enter organization description"
                        multiline
                        rows={3}
                        {...register("organization_description")}
                        error={!!errors.organization_description}
                        helperText={errors.organization_description?.message}
                    />

                    <TextField
                        margin="normal"
                        fullWidth
                        id="organization_address"
                        label="Organization Address"
                        placeholder="Enter organization address"
                        {...register("organization_address")}
                        error={!!errors.organization_address}
                        helperText={errors.organization_address?.message}
                    />

                    <TextField
                        margin="normal"
                        fullWidth
                        id="organization_phone"
                        label="Organization Phone"
                        placeholder="Enter organization phone"
                        {...register("organization_phone")}
                        error={!!errors.organization_phone}
                        helperText={errors.organization_phone?.message}
                    />
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
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default OrganizationDialog