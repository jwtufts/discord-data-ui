export type User = {
  id: string;
  username: string;
  discriminator: string;
  email: string;
  avatar: string;
}

export type DiscordUser = {
  id: string;
  username?: string | null;
  discriminator?: string | null;
  global_name?: string | null;
  avatar?: string | null;
  premium_type?: number | null;
}

export type DiscordRoleColor = {
  primary_color?: number | null;
  secondary_color?: number | null;
  tertiary_color?: number | null;
}

export type DiscordRole = {
  id: string;
  name?: string | null;
  colors?: DiscordRoleColor[];
  icon?: string | null;
  unicode_emoji?: string | null;
  position?: number | null;
}

export type UserGuildMember = {
  user?: DiscordUser | null;
  nick?: string | null;
  avatar?: string | null;
  roles?: string[] | null;
  joined_at?: string | null;
  premium_since?: string | null;
}