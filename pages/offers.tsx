import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, Container, Typography, Button, Grid } from "@mui/material";
import { Accommodation } from "../types/accommodation";
import Layout from "../components/Layout";
import AccommodationCard from "@/components/accommodations/AccommodationCard";
import PromoCodeDialog from "@/components/accommodations/PromoCodeDialog";
import {
  createTestData,
  fetchAccommodations,
  generatePromoCode,
} from "@/backend/services/api";

export default function Offers() {
  const router = useRouter();
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [currentPromoCode, setCurrentPromoCode] = useState("");
  const [selectedAccommodation, setSelectedAccommodation] =
    useState<Accommodation | null>(null);

  useEffect(() => {
    const checkAuthAndLoadData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.replace("/");
        return;
      }

      await fetchAccommodations();
    };

    checkAuthAndLoadData();
  }, [router]);

  const fetchAccommodationsHandler = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/");
      return;
    }

    setLoading(true);
    try {
      const data = await fetchAccommodations();
      setAccommodations(data);
    } catch (err) {
      console.error("Error al cargar hospedajes:", err);
      setError("Error al cargar los hospedajes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccommodationsHandler();
  }, []);

  const handleGeneratePromoCode = async (accommodation: Accommodation) => {
    setLoading(true);
    setError("");

    try {
      const promoCode = await generatePromoCode(accommodation._id);
      setCurrentPromoCode(promoCode.code);
      setSelectedAccommodation(accommodation);
      setOpenDialog(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSeedData = async () => {
    try {
      await createTestData();
      fetchAccommodations();
    } catch (err) {
      console.error("Error al crear los hospedajes de prueba:", err);
    }
  };

  return (
    <Layout>
      <Container maxWidth="lg">
        <Box sx={{ mt: 4, mb: 4 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 4,
            }}
          >
            <Typography variant="h4" component="h1" gutterBottom>
              Descubre tu próxima estancia
            </Typography>
            <Button variant="outlined" color="primary" onClick={handleSeedData}>
              Crear datos de prueba
            </Button>
          </Box>

          <Typography variant="h5" component="h2" gutterBottom>
            Ofertas disponibles
          </Typography>

          <Grid container spacing={4}>
            {accommodations.map((accommodation) => (
              <Grid item key={accommodation._id} xs={12} sm={6} md={4}>
                <AccommodationCard
                  accommodation={accommodation}
                  onGeneratePromoCode={handleGeneratePromoCode}
                  loading={loading}
                />
              </Grid>
            ))}
          </Grid>
        </Box>

        <PromoCodeDialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          accommodation={selectedAccommodation}
          promoCode={currentPromoCode}
        />
      </Container>
    </Layout>
  );
}
