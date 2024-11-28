import { SetMetadata } from '@nestjs/common';

//a custom decorator to make public route
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
