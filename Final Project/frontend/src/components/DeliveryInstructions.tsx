import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme
} from '@mui/material';
import {
  Info as InfoIcon,
  LocalShipping as ShippingIcon,
  AccessTime as TimeIcon,
  LocationOn as LocationIcon,
  ExpandMore as ExpandMoreIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Euro as EuroIcon
} from '@mui/icons-material';

interface DeliveryZone {
  name: string;
  deliveryTime: string;
  deliveryFee: number;
  minOrder: number;
  description: string;
}

const deliveryZones: DeliveryZone[] = [
  {
    name: 'Κέντρο Πόλης',
    deliveryTime: '20-30 λεπτά',
    deliveryFee: 2.00,
    minOrder: 15.00,
    description: 'Περιοχές κέντρου πόλης με γρήγορη παράδοση'
  },
  {
    name: 'Περιφέρεια',
    deliveryTime: '30-45 λεπτά',
    deliveryFee: 3.50,
    minOrder: 20.00,
    description: 'Περιοχές περιφέρειας με κανονική παράδοση'
  },
  {
    name: 'Εξωτερικές Περιοχές',
    deliveryTime: '45-60 λεπτά',
    deliveryFee: 5.00,
    minOrder: 25.00,
    description: 'Εξωτερικές περιοχές με εκτεταμένη παράδοση'
  }
];

interface DeliveryInstructionsProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (instructions: string) => void;
}

const DeliveryInstructions: React.FC<DeliveryInstructionsProps> = ({
  open,
  onClose,
  onConfirm
}) => {
  const [selectedZone, setSelectedZone] = useState<string>('');
  const [customInstructions, setCustomInstructions] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const theme = useTheme();

  const handleConfirm = () => {
    const instructions = `Περιοχή: ${selectedZone}\nΔιεύθυνση: ${deliveryAddress}\nΕιδικές οδηγίες: ${customInstructions}`;
    onConfirm(instructions);
    onClose();
  };

  const selectedZoneData = deliveryZones.find(zone => zone.name === selectedZone);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" gap={1}>
          <ShippingIcon color="primary" />
          <Typography variant="h6">Οδηγίες Παράδοσης</Typography>
        </Box>
      </DialogTitle>
      
      <DialogContent>
        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2">
            Επιλέξτε την περιοχή παράδοσης και συμπληρώστε τις απαραίτητες πληροφορίες
          </Typography>
        </Alert>

        <Grid container spacing={3}>
          {/* Delivery Zones */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Περιοχές Παράδοσης
            </Typography>
            <Grid container spacing={2}>
              {deliveryZones.map((zone) => (
                <Grid item xs={12} md={4} key={zone.name}>
                  <Card 
                    variant={selectedZone === zone.name ? "elevation" : "outlined"}
                    sx={{ 
                      cursor: 'pointer',
                      border: selectedZone === zone.name ? 2 : 1,
                      borderColor: selectedZone === zone.name ? theme.palette.primary.main : theme.palette.divider,
                      '&:hover': { borderColor: theme.palette.primary.main }
                    }}
                    onClick={() => setSelectedZone(zone.name)}
                  >
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {zone.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {zone.description}
                      </Typography>
                      <Box display="flex" flexDirection="column" gap={1} mt={2}>
                        <Box display="flex" alignItems="center" gap={1}>
                          <TimeIcon fontSize="small" color="action" />
                          <Typography variant="body2">
                            {zone.deliveryTime}
                          </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap={1}>
                          <EuroIcon fontSize="small" color="action" />
                          <Typography variant="body2">
                            Τέλος παράδοσης: €{zone.deliveryFee.toFixed(2)}
                          </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap={1}>
                          <CheckCircleIcon fontSize="small" color="action" />
                          <Typography variant="body2">
                            Ελάχιστη παραγγελία: €{zone.minOrder.toFixed(2)}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Delivery Address */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Διεύθυνση Παράδοσης"
              multiline
              rows={3}
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              placeholder="Πληκτρολογήστε την πλήρη διεύθυνση παράδοσης..."
              required
            />
          </Grid>

          {/* Custom Instructions */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Ειδικές Οδηγίες"
              multiline
              rows={2}
              value={customInstructions}
              onChange={(e) => setCustomInstructions(e.target.value)}
              placeholder="Π.χ. Κουδούνι στο 2ο όροφο, κώδικας πόρτας 1234..."
              helperText="Προαιρετικές οδηγίες για την παράδοση"
            />
          </Grid>

          {/* Selected Zone Details */}
          {selectedZoneData && (
            <Grid item xs={12}>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle1" fontWeight="medium">
                    Λεπτομέρειες Παράδοσης - {selectedZoneData.name}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <TimeIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Χρόνος Παράδοσης"
                        secondary={`${selectedZoneData.deliveryTime} από την επιβεβαίωση της παραγγελίας`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <EuroIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Τέλος Παράδοσης"
                        secondary={`€${selectedZoneData.deliveryFee.toFixed(2)}`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircleIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Ελάχιστη Παραγγελία"
                        secondary={`€${selectedZoneData.minOrder.toFixed(2)}`}
                      />
                    </ListItem>
                  </List>
                </AccordionDetails>
              </Accordion>
            </Grid>
          )}

          {/* Important Information */}
          <Grid item xs={12}>
            <Alert severity="warning" icon={<WarningIcon />}>
              <Typography variant="body2">
                <strong>Σημαντικές Πληροφορίες:</strong>
              </Typography>
              <List dense sx={{ mt: 1 }}>
                <ListItem sx={{ py: 0 }}>
                  <ListItemText
                    primary="• Η παράδοση γίνεται μόνο με μετρητά ή κάρτα κατά την παράδοση"
                    primaryTypographyProps={{ variant: 'body2' }}
                  />
                </ListItem>
                <ListItem sx={{ py: 0 }}>
                  <ListItemText
                    primary="• Παρακαλούμε να είστε διαθέσιμοι στο τηλέφωνο που δώσατε"
                    primaryTypographyProps={{ variant: 'body2' }}
                  />
                </ListItem>
                <ListItem sx={{ py: 0 }}>
                  <ListItemText
                    primary="• Σε περίπτωση καθυστέρησης, θα σας ενημερώσουμε άμεσα"
                    primaryTypographyProps={{ variant: 'body2' }}
                  />
                </ListItem>
              </List>
            </Alert>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Ακύρωση</Button>
        <Button 
          onClick={handleConfirm} 
          variant="contained"
          disabled={!selectedZone || !deliveryAddress.trim()}
        >
          Επιβεβαίωση
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeliveryInstructions; 