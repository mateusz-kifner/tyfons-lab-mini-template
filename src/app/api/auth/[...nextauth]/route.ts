import NextAuth from "next-auth";

import { authOptions } from "@/server/auth";

const {handlers} = NextAuth(authOptions);
export const {GET, POST} = handlers;
