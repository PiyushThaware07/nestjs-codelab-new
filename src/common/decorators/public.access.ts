import { SetMetadata } from "@nestjs/common";


export const PUBLIC_KEY = "public"
export const PublicAccess = () => SetMetadata(PUBLIC_KEY, true);