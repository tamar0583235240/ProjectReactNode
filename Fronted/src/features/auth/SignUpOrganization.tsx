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
import { SchemaOrganization, type OrganizationFormData } from "../auth/SchemaSignUpOrganization";
import { type FormData } from "../auth/SchemaSignUp";
import { useSignUpMutation, useAddOrganizationMutation, useLazyGetRoleByNameQuery } from "./authApi";
import { User } from "../../types/User"
import { Organization } from "../../types/Organization"

interface OrganizationDialogProps {
    open: boolean
    onClose: () => void
    userData: FormData | null
    onSuccess?: () => void
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

    const [addOrganization] = useAddOrganizationMutation();
    const [addUser] = useSignUpMutation();
    const [getRoleByName] = useLazyGetRoleByNameQuery();
    const onSubmit = async (organizationData: OrganizationFormData) => {
        if (!organizationData || !userData) {
            console.error("Missing organization or user data.");
            return;
        }

        console.log("User data:", userData);
        console.log("Organization data:", organizationData);

        if (organizationData && userData) {
            const organization: Organization = {
                organization_name: organizationData.organization_name,
                organization_description: organizationData.organization_description,
                organization_address: organizationData.organization_address,
                organization_phone: organizationData.organization_phone,
                manager_id: null,
              };
              

            const resOrganization = await addOrganization(organization).unwrap();
            console.log("Organization registration response:", resOrganization);


            const roleResponse = await getRoleByName("Manager").unwrap();
            console.log("Fetched role:", roleResponse);
            const user: User = {
                user_name: userData.username,
                password: userData.password,
                email: userData.email,
                role: roleResponse._id, 
                manager_id: null,
                organization_id: resOrganization._id,
            };
            console.log("User data after change:", user);
            const response = await addUser(user);
            alert("Registration completed successfully!");
            onClose();
            reset();
            if (onSuccess) {
                onSuccess();
            }
        }
    };

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