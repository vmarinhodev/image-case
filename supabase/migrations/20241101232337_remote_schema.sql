create policy "Give users authenticated access to folder 35ybfd_0"
on "storage"."objects"
as permissive
for select
to authenticated
using (((bucket_id = 'allimages'::text) AND ((storage.foldername(name))[1] = 'users_folder'::text) AND (auth.role() = 'authenticated'::text)));


create policy "Give users authenticated access to folder 35ybfd_1"
on "storage"."objects"
as permissive
for insert
to authenticated
with check (((bucket_id = 'allimages'::text) AND ((storage.foldername(name))[1] = 'users_folder'::text) AND (auth.role() = 'authenticated'::text)));


create policy "Give users authenticated access to folder 35ybfd_2"
on "storage"."objects"
as permissive
for update
to authenticated
using (((bucket_id = 'allimages'::text) AND ((storage.foldername(name))[1] = 'users_folder'::text) AND (auth.role() = 'authenticated'::text)));


create policy "Give users authenticated access to folder 35ybfd_3"
on "storage"."objects"
as permissive
for delete
to authenticated
using (((bucket_id = 'allimages'::text) AND ((storage.foldername(name))[1] = 'users_folder'::text) AND (auth.role() = 'authenticated'::text)));


CREATE TRIGGER create_image_details AFTER INSERT ON storage.objects FOR EACH ROW EXECUTE FUNCTION create_image_details();


