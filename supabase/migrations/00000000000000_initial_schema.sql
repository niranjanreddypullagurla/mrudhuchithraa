-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Profiles Table
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  role text not null check (role in ('admin', 'customer')) default 'customer',
  email text not null,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Categories Table
create table public.categories (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text not null unique,
  icon text,
  banner_image text,
  description text,
  display_order integer default 0,
  is_visible boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Collections Table
create table public.collections (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text not null unique,
  category_id uuid references public.categories(id) on delete set null,
  short_description text,
  detailed_description text,
  starting_price numeric(10, 2),
  is_made_on_order boolean default true,
  estimated_delivery text,
  materials_used text,
  care_instructions text,
  is_featured boolean default false,
  is_visible boolean default true,
  seo_title text,
  seo_description text,
  thumbnail text,
  cover_image text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Gallery Table
create table public.gallery (
  id uuid default uuid_generate_v4() primary key,
  title text,
  category_id uuid references public.categories(id) on delete set null,
  caption text,
  media_url text not null,
  media_type text not null check (media_type in ('image', 'video')),
  is_featured boolean default false,
  is_visible boolean default true,
  display_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Hero Media Table
create table public.hero_media (
  id uuid default uuid_generate_v4() primary key,
  desktop_image text,
  mobile_image text,
  desktop_video text,
  mobile_video text,
  title text,
  subtitle text,
  cta_text text,
  cta_link text,
  overlay_opacity numeric(3, 2) default 0.3,
  duration integer default 5000,
  display_order integer default 0,
  is_visible boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. Custom Requests Table
create table public.custom_requests (
  id uuid default uuid_generate_v4() primary key,
  full_name text not null,
  phone text not null,
  email text,
  collection_id uuid references public.collections(id) on delete set null,
  description text not null,
  required_before date,
  status text not null check (status in ('new', 'contacted', 'completed', 'archived')) default 'new',
  admin_notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 7. Reviews Table
create table public.reviews (
  id uuid default uuid_generate_v4() primary key,
  customer_name text not null,
  rating integer not null check (rating >= 1 and rating <= 5),
  content text not null,
  image_url text,
  is_approved boolean default false,
  is_pinned boolean default false,
  is_hidden boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 8. Website Settings Table (Singleton)
create table public.website_settings (
  id uuid default uuid_generate_v4() primary key,
  logo_url text,
  business_name text default 'Mruduchithraa',
  about_text text,
  footer_text text,
  primary_color text,
  secondary_color text,
  whatsapp text,
  instagram text,
  email text,
  phone text,
  address text,
  business_hours text,
  maps_link text,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Insert initial dummy settings
insert into public.website_settings (business_name) values ('Mruduchithraa');

-- 9. Media Library Table
create table public.media_library (
  id uuid default uuid_generate_v4() primary key,
  file_name text not null,
  file_url text not null,
  size bigint not null,
  mime_type text not null,
  uploaded_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on all tables
alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.collections enable row level security;
alter table public.gallery enable row level security;
alter table public.hero_media enable row level security;
alter table public.custom_requests enable row level security;
alter table public.reviews enable row level security;
alter table public.website_settings enable row level security;
alter table public.media_library enable row level security;

-- Setup Public Read Access for website tables
create policy "Public can view visible categories" on public.categories for select using (is_visible = true);
create policy "Public can view visible collections" on public.collections for select using (is_visible = true);
create policy "Public can view visible gallery" on public.gallery for select using (is_visible = true);
create policy "Public can view visible hero media" on public.hero_media for select using (is_visible = true);
create policy "Public can view approved reviews" on public.reviews for select using (is_approved = true and is_hidden = false);
create policy "Public can view website settings" on public.website_settings for select using (true);
create policy "Public can insert custom requests" on public.custom_requests for insert with check (true);

-- Auth Trigger for auto-creating profile
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', 'customer');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
