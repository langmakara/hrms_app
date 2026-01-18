import { Entity } from "@/types";

export type AuthUser = Entity & {
  id: string,
  email: string;
  username: string;
  roles: string[];
};

export type LoginData = {
  email: string;
  password: string;
};

