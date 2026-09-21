-- La politica "Admins can view all profiles" consulta public.profiles desde una
-- politica de public.profiles, lo que provoca "infinite recursion detected in
-- policy". Cualquier politica que compruebe si el usuario es admin consultando
-- profiles (subida de fotos, property_media, property_values, atributos,
-- bloques, leads, editar/borrar propiedades) falla para usuarios autenticados.
-- Solucion: una funcion SECURITY DEFINER que lee profiles sin pasar por RLS.
-- Los permisos resultantes son identicos a los que se pretendia.

CREATE OR REPLACE FUNCTION public.current_user_is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles p
    WHERE p.user_id = auth.uid() AND p.is_admin = true
  );
$$;

REVOKE ALL ON FUNCTION public.current_user_is_admin() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.current_user_is_admin() TO authenticated;

-- profiles
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
CREATE POLICY "Admins can view all profiles"
ON public.profiles FOR SELECT TO authenticated
USING (public.current_user_is_admin());

-- properties
DROP POLICY IF EXISTS "Owners and admins can update properties" ON public.properties;
CREATE POLICY "Owners and admins can update properties"
ON public.properties FOR UPDATE
USING (auth.uid() = created_by OR public.current_user_is_admin());

DROP POLICY IF EXISTS "Owners and admins can delete properties" ON public.properties;
CREATE POLICY "Owners and admins can delete properties"
ON public.properties FOR DELETE
USING (auth.uid() = created_by OR public.current_user_is_admin());

-- property_media
DROP POLICY IF EXISTS "Owners and admins can manage property media" ON public.property_media;
CREATE POLICY "Owners and admins can manage property media"
ON public.property_media FOR ALL TO authenticated
USING (
  EXISTS (SELECT 1 FROM public.properties pr WHERE pr.id = property_id AND pr.created_by = auth.uid())
  OR public.current_user_is_admin()
)
WITH CHECK (
  EXISTS (SELECT 1 FROM public.properties pr WHERE pr.id = property_id AND pr.created_by = auth.uid())
  OR public.current_user_is_admin()
);

-- property_values
DROP POLICY IF EXISTS "Owners and admins can manage property values" ON public.property_values;
CREATE POLICY "Owners and admins can manage property values"
ON public.property_values FOR ALL TO authenticated
USING (
  EXISTS (SELECT 1 FROM public.properties pr WHERE pr.id = property_id AND pr.created_by = auth.uid())
  OR public.current_user_is_admin()
)
WITH CHECK (
  EXISTS (SELECT 1 FROM public.properties pr WHERE pr.id = property_id AND pr.created_by = auth.uid())
  OR public.current_user_is_admin()
);

-- attributes y blocks
DROP POLICY IF EXISTS "Admins can manage attributes" ON public.attributes;
CREATE POLICY "Admins can manage attributes"
ON public.attributes FOR ALL TO authenticated
USING (public.current_user_is_admin())
WITH CHECK (public.current_user_is_admin());

DROP POLICY IF EXISTS "Admins can manage blocks" ON public.blocks;
CREATE POLICY "Admins can manage blocks"
ON public.blocks FOR ALL TO authenticated
USING (public.current_user_is_admin())
WITH CHECK (public.current_user_is_admin());

-- private_listing_leads
DROP POLICY IF EXISTS "Admins can view leads" ON public.private_listing_leads;
CREATE POLICY "Admins can view leads"
ON public.private_listing_leads FOR SELECT TO authenticated
USING (public.current_user_is_admin());

DROP POLICY IF EXISTS "Admins can update leads" ON public.private_listing_leads;
CREATE POLICY "Admins can update leads"
ON public.private_listing_leads FOR UPDATE TO authenticated
USING (public.current_user_is_admin())
WITH CHECK (public.current_user_is_admin());

DROP POLICY IF EXISTS "Admins can delete leads" ON public.private_listing_leads;
CREATE POLICY "Admins can delete leads"
ON public.private_listing_leads FOR DELETE TO authenticated
USING (public.current_user_is_admin());

-- storage.objects (bucket property-media)
DROP POLICY IF EXISTS "Owners and admins can upload property media files" ON storage.objects;
CREATE POLICY "Owners and admins can upload property media files"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (
  bucket_id = 'property-media' AND (
    (storage.foldername(name))[1] = 'new'
    OR EXISTS (SELECT 1 FROM public.properties pr WHERE pr.id::text = (storage.foldername(name))[1] AND pr.created_by = auth.uid())
    OR public.current_user_is_admin()
  )
);

DROP POLICY IF EXISTS "Owners and admins can update property media files" ON storage.objects;
CREATE POLICY "Owners and admins can update property media files"
ON storage.objects FOR UPDATE TO authenticated
USING (
  bucket_id = 'property-media' AND (
    EXISTS (SELECT 1 FROM public.properties pr WHERE pr.id::text = (storage.foldername(name))[1] AND pr.created_by = auth.uid())
    OR public.current_user_is_admin()
  )
)
WITH CHECK (
  bucket_id = 'property-media' AND (
    EXISTS (SELECT 1 FROM public.properties pr WHERE pr.id::text = (storage.foldername(name))[1] AND pr.created_by = auth.uid())
    OR public.current_user_is_admin()
  )
);

DROP POLICY IF EXISTS "Owners and admins can delete property media files" ON storage.objects;
CREATE POLICY "Owners and admins can delete property media files"
ON storage.objects FOR DELETE TO authenticated
USING (
  bucket_id = 'property-media' AND (
    EXISTS (SELECT 1 FROM public.properties pr WHERE pr.id::text = (storage.foldername(name))[1] AND pr.created_by = auth.uid())
    OR public.current_user_is_admin()
  )
);
