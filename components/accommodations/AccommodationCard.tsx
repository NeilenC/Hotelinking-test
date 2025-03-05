import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  Box,
  Chip,
  Skeleton,
} from "@mui/material";
import { LocalOffer as LocalOfferIcon } from "@mui/icons-material";
import { Accommodation } from "../../types/accommodation";
import { formatPrice, formatDiscount } from "../../utils/formatters";
import PromoCodeButton from "./PromoCodeButton";

interface AccommodationCardProps {
  accommodation: Accommodation;
  onGeneratePromoCode: (accommodation: Accommodation) => void;
  loading: boolean;
  hasExistingCode?: boolean;
}

export default function AccommodationCard({
  accommodation,
  onGeneratePromoCode,
  loading,
  hasExistingCode = false,
}: AccommodationCardProps) {
  if (!accommodation) {
    return <Skeleton variant="rectangular" height={400} />;
  }

  const { name, description, location, price, discount, image } = accommodation;

  return (
    <Card
      sx={{
        position: "relative",
        transition: "transform 0.2s",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        "&:hover": {
          transform: "translateY(-5px)",
        },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={image || "/placeholder-image.jpg"}
        alt={name}
        sx={{ objectFit: "cover" }}
      />
      <CardContent 
        sx={{ 
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          height: '200px',
          p: 2,
        }}
      >
        <Typography 
          gutterBottom 
          variant="h6" 
          component="div"
          sx={{
            height: '32px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 1,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {name || "Sin nombre"}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            height: '80px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            mb: 1,
          }}
        >
          {description || "Sin descripción"}
        </Typography>
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            height: '24px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            mb: 2,
          }}
        >
          {location || "Ubicación no disponible"}
        </Typography>
        <Box
          sx={{
            mt: 'auto',
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: '40px',
          }}
        >
          <Typography
            variant="body1"
            sx={{
              textDecoration: discount > 0 ? 'line-through' : 'none',
              color: discount > 0 ? 'text.secondary' : 'primary.main',
              fontWeight: discount > 0 ? 'normal' : 'bold',
              fontSize: '1.1rem'
            }}
          >
            {formatPrice(price)}
          </Typography>

          {discount > 0 && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip
                icon={<LocalOfferIcon />}
                label={formatDiscount(discount)}
                color="error"
                size="small"
                sx={{ fontWeight: 500 }}
              />
              <Typography
                variant="h6"
                color="primary"
                sx={{ fontWeight: 'bold' }}
              >
                {formatPrice(price * (1 - discount / 100))}
              </Typography>
            </Box>
          )}
        </Box>
      </CardContent>
      <CardActions 
        sx={{ 
          p: 2, 
          pt: 0,
          height: '72px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <PromoCodeButton
          accommodation={accommodation}
          onGeneratePromoCode={onGeneratePromoCode}
          loading={loading}
          hasExistingCode={hasExistingCode}
        />
      </CardActions>
    </Card>
  );
}
