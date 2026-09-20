import { MapPin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useT } from "@/i18n/LanguageContext";

interface PropertyMapProps {
  lat: number | null;
  lng: number | null;
  address: string | null;
  city: string | null;
  neighborhood: string | null;
}

const PropertyMap = ({ lat, lng, address, city, neighborhood }: PropertyMapProps) => {
  const t = useT();
  const fullAddress = [address, neighborhood, city].filter(Boolean).join(", ");
  
  const hasCoordinates = lat !== null && lng !== null;
  
  const googleMapsUrl = hasCoordinates
    ? `https://www.google.com/maps?q=${lat},${lng}`
    : fullAddress
    ? `https://www.google.com/maps/search/${encodeURIComponent(fullAddress)}`
    : null;

  // Static map image URL (no API key needed for embed preview)
  const staticMapUrl = hasCoordinates
    ? `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=15&size=600x300&markers=color:red%7C${lat},${lng}&key=`
    : null;

  if (!googleMapsUrl) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <MapPin className="w-5 h-5 text-primary" />
          {t.property.location}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Map placeholder with link */}
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <iframe
              title={t.property.mapTitle}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={
                hasCoordinates
                  ? `https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`
                  : `https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}&output=embed`
              }
            />
            
            {/* Overlay para abrir en nueva pestaña */}
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-2 right-2 bg-white rounded-lg px-3 py-1.5 shadow-md flex items-center gap-2 hover:bg-gray-50 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="text-sm font-medium">{t.property.expand}</span>
            </a>
          </div>
        </a>

        {/* Address */}
        {fullAddress && (
          <p className="text-sm text-muted-foreground">{fullAddress}</p>
        )}

        {/* Button */}
        <Button
          variant="outline"
          className="w-full gap-2"
          asChild
        >
          <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
            <MapPin className="w-4 h-4" />
            {t.property.openInMaps}
            <ExternalLink className="w-4 h-4 ml-auto" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
};

export default PropertyMap;
