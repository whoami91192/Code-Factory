import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Terms: React.FC = () => {
  const theme = useTheme();
  
  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
        <Typography variant="h3" fontWeight={700} gutterBottom color="primary">
          Terms & Conditions
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>1. Acceptance of Terms</Typography>
          <Typography paragraph>
            By accessing or using the Food Ordering Platform ("the Service"), you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, you must not use the Service.
          </Typography>
          <Typography variant="h6" fontWeight={600} gutterBottom>2. User Accounts & Security</Typography>
          <Typography paragraph>
            You must create an account to place orders. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. Notify us immediately of any unauthorized use or security breach.
          </Typography>
          <Typography variant="h6" fontWeight={600} gutterBottom>3. Orders, Payments & Availability</Typography>
          <Typography paragraph>
            All orders are subject to acceptance and product availability. Prices and availability may change without notice. Payment must be made in full at the time of order using the available payment methods. We reserve the right to refuse or cancel any order at our discretion.
          </Typography>
          <Typography variant="h6" fontWeight={600} gutterBottom>4. Cancellations & Refunds</Typography>
          <Typography paragraph>
            You may cancel your order within a short period after placing it, provided it has not yet been prepared or dispatched. Refunds are subject to our Refund Policy. Please contact support for assistance with cancellations or refunds.
          </Typography>
          <Typography variant="h6" fontWeight={600} gutterBottom>5. Privacy & Data Protection</Typography>
          <Typography paragraph>
            We value your privacy. Your personal data is collected, processed, and stored in accordance with our Privacy Policy and applicable data protection laws. By using the Service, you consent to such processing.
          </Typography>
          <Typography variant="h6" fontWeight={600} gutterBottom>6. Cookies & Tracking Technologies</Typography>
          <Typography paragraph>
            Our website uses cookies and similar technologies to enhance your experience, analyze usage, and deliver personalized content. By using the Service, you consent to our use of cookies as described in our Cookie Policy.
          </Typography>
          <Typography variant="h6" fontWeight={600} gutterBottom>7. Intellectual Property</Typography>
          <Typography paragraph>
            All content, trademarks, logos, and intellectual property on this website are owned by Food Ordering Platform or its licensors. You may not copy, reproduce, or distribute any content without prior written permission.
          </Typography>
          <Typography variant="h6" fontWeight={600} gutterBottom>8. Limitation of Liability</Typography>
          <Typography paragraph>
            To the maximum extent permitted by law, Food Ordering Platform shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Service. Our total liability for any claim shall not exceed the amount paid by you for the order in question.
          </Typography>
          <Typography variant="h6" fontWeight={600} gutterBottom>9. Changes to Terms</Typography>
          <Typography paragraph>
            We reserve the right to update or modify these Terms & Conditions at any time. Changes will be effective upon posting. Continued use of the Service after changes constitutes acceptance of the new terms.
          </Typography>
          <Typography variant="h6" fontWeight={600} gutterBottom>10. Contact Us</Typography>
          <Typography paragraph>
            If you have any questions, concerns, or requests regarding these Terms & Conditions, please contact us at <b>support@foodordering.com</b>.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Terms; 