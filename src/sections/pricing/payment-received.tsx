import React from 'react';
import Container from "@mui/material/Container";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export function PaymentReceived() {
    return (
        <Container sx={{ pt: 5, pb: 10 }}>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
            >
                <CheckCircleOutlineIcon
                    sx={{ fontSize: 80, color: 'success.main', mb: 2 }}
                />
                <Typography
                    variant='h4'
                    sx={{ mb: 1 }}
                >
                    Thank You for Your Payment!
                </Typography>
                <Typography
                    variant='body1'
                    sx={{ color: 'text.secondary', mb: 3 }}
                >
                    We appreciate your business. Your transaction has been completed, 
                    and a receipt for your purchase has been emailed to you. You can log 
                    into your account to view the details of this transaction.
                </Typography>
                <Button
                    variant='contained'
                    color='primary'
                    sx={{ mt: 2 }}
                    href="/dashboard" // Example link, change to your own routing if necessary
                >
                    Go to Dashboard
                </Button>
            </Box>
        </Container>
    );
}