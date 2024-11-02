alter table "public"."favourites" add column "object_id" uuid;

alter table "public"."images" add column "user_name" text;

alter table "public"."favourites" add constraint "favourites_object_id_fkey" FOREIGN KEY (object_id) REFERENCES storage.objects(id) not valid;

alter table "public"."favourites" validate constraint "favourites_object_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.create_user_profile()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$begin
  insert into public.profiles (id, email, display_name, image_url)
  values (new.id, 
  new.email,
  new.raw_user_meta_data->>'display_name',
  new.raw_user_meta_data->>'avatar_url');
  return new;
end;$function$
;


