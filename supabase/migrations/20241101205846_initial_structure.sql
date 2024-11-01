create table "public"."favourites" (
    "id" bigint generated always as identity not null,
    "user_id" uuid not null,
    "image_name" text not null,
    "created_at" timestamp with time zone not null default (now() AT TIME ZONE 'utc'::text)
);


alter table "public"."favourites" enable row level security;

create table "public"."images" (
    "title" text,
    "image_url" text not null,
    "description" text,
    "public" boolean,
    "user_id" uuid not null,
    "created_at" timestamp with time zone not null default (now() AT TIME ZONE 'utc'::text),
    "updated_at" timestamp with time zone not null default (now() AT TIME ZONE 'utc'::text),
    "id" uuid not null,
    "object_id" uuid
);


alter table "public"."images" enable row level security;

create table "public"."profiles" (
    "id" uuid not null,
    "created_at" timestamp with time zone not null default now(),
    "email" character varying not null,
    "display_name" text,
    "image_url" text
);


alter table "public"."profiles" enable row level security;

CREATE UNIQUE INDEX favourites_pkey ON public.favourites USING btree (id);

CREATE UNIQUE INDEX images_pkey ON public.images USING btree (id);

CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (id);

alter table "public"."favourites" add constraint "favourites_pkey" PRIMARY KEY using index "favourites_pkey";

alter table "public"."images" add constraint "images_pkey" PRIMARY KEY using index "images_pkey";

alter table "public"."profiles" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "public"."favourites" add constraint "favourites_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."favourites" validate constraint "favourites_user_id_fkey";

alter table "public"."images" add constraint "images_object_id_fkey1" FOREIGN KEY (object_id) REFERENCES storage.objects(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."images" validate constraint "images_object_id_fkey1";

alter table "public"."images" add constraint "images_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."images" validate constraint "images_user_id_fkey";

alter table "public"."profiles" add constraint "profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."profiles" validate constraint "profiles_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.create_image_details()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$begin
  insert into public.images(id, user_id, object_id, image_url)
  values(new.path_tokens[2]::uuid, new.owner::uuid, new.id::uuid, new.path_tokens[3]);
  return new;
end;$function$
;

grant delete on table "public"."favourites" to "anon";

grant insert on table "public"."favourites" to "anon";

grant references on table "public"."favourites" to "anon";

grant select on table "public"."favourites" to "anon";

grant trigger on table "public"."favourites" to "anon";

grant truncate on table "public"."favourites" to "anon";

grant update on table "public"."favourites" to "anon";

grant delete on table "public"."favourites" to "authenticated";

grant insert on table "public"."favourites" to "authenticated";

grant references on table "public"."favourites" to "authenticated";

grant select on table "public"."favourites" to "authenticated";

grant trigger on table "public"."favourites" to "authenticated";

grant truncate on table "public"."favourites" to "authenticated";

grant update on table "public"."favourites" to "authenticated";

grant delete on table "public"."favourites" to "service_role";

grant insert on table "public"."favourites" to "service_role";

grant references on table "public"."favourites" to "service_role";

grant select on table "public"."favourites" to "service_role";

grant trigger on table "public"."favourites" to "service_role";

grant truncate on table "public"."favourites" to "service_role";

grant update on table "public"."favourites" to "service_role";

grant delete on table "public"."images" to "anon";

grant insert on table "public"."images" to "anon";

grant references on table "public"."images" to "anon";

grant select on table "public"."images" to "anon";

grant trigger on table "public"."images" to "anon";

grant truncate on table "public"."images" to "anon";

grant update on table "public"."images" to "anon";

grant delete on table "public"."images" to "authenticated";

grant insert on table "public"."images" to "authenticated";

grant references on table "public"."images" to "authenticated";

grant select on table "public"."images" to "authenticated";

grant trigger on table "public"."images" to "authenticated";

grant truncate on table "public"."images" to "authenticated";

grant update on table "public"."images" to "authenticated";

grant delete on table "public"."images" to "service_role";

grant insert on table "public"."images" to "service_role";

grant references on table "public"."images" to "service_role";

grant select on table "public"."images" to "service_role";

grant trigger on table "public"."images" to "service_role";

grant truncate on table "public"."images" to "service_role";

grant update on table "public"."images" to "service_role";

grant delete on table "public"."profiles" to "anon";

grant insert on table "public"."profiles" to "anon";

grant references on table "public"."profiles" to "anon";

grant select on table "public"."profiles" to "anon";

grant trigger on table "public"."profiles" to "anon";

grant truncate on table "public"."profiles" to "anon";

grant update on table "public"."profiles" to "anon";

grant delete on table "public"."profiles" to "authenticated";

grant insert on table "public"."profiles" to "authenticated";

grant references on table "public"."profiles" to "authenticated";

grant select on table "public"."profiles" to "authenticated";

grant trigger on table "public"."profiles" to "authenticated";

grant truncate on table "public"."profiles" to "authenticated";

grant update on table "public"."profiles" to "authenticated";

grant delete on table "public"."profiles" to "service_role";

grant insert on table "public"."profiles" to "service_role";

grant references on table "public"."profiles" to "service_role";

grant select on table "public"."profiles" to "service_role";

grant trigger on table "public"."profiles" to "service_role";

grant truncate on table "public"."profiles" to "service_role";

grant update on table "public"."profiles" to "service_role";

create policy "delete_favourites"
on "public"."favourites"
as permissive
for delete
to authenticated
using ((auth.uid() = user_id));


create policy "insert_favourites"
on "public"."favourites"
as permissive
for insert
to authenticated
with check ((auth.uid() = user_id));


create policy "select_favourites"
on "public"."favourites"
as permissive
for select
to authenticated
using ((auth.uid() = user_id));


create policy "Enable delete access for authenticated users"
on "public"."images"
as permissive
for delete
to authenticated
using (true);


create policy "Enable insert for authenticated users only"
on "public"."images"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for authenticated users"
on "public"."images"
as permissive
for select
to authenticated
using (true);


create policy "allow users to update posts"
on "public"."images"
as permissive
for update
to authenticated
using (true);


create policy "Enable read access for all users"
on "public"."profiles"
as permissive
for select
to authenticated
using (true);



