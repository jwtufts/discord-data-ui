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

export type Author = {
  nickName?: string;
  globalName?: string;
  avatar?: string;
  userName?: string;
  userId?: string;
}

export type Message = {
  id: string;
  channelId?: string | null;
  content?: string | null;
  messageId?: string | null;
  author?: Author | null;
  bot?: boolean | null;
  createdAt?: string | null;
  edited?: boolean | null;
  deleted?: boolean | null;
}

export type RankByUserExp = {
  daily?: number | null,
  weekly?: number | null,
  monthly?: number | null,
  yearly?: number | null,
  total?: number | null,
  unboosted?: number | null
};

export type ExpEvent = {
  id?: string | null;
  userId?: string | null;
  exp?: number | null;
  unboosted?: number | null;
  timestamp?: string | null;
  reason?: string | null;
  eligibleUsers?: number | null;
  timeInVoice?: number | null;
  channelId?: string | null;
  messageId?: string | null;
};

