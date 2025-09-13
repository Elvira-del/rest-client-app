import { z } from 'zod';

export const SignInSchema = z.object({
  email: z.string().email('invalidEmail_Plug'),
  password: z
    .string()
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/, 'passWrong_Plug'),
});
//Тут тексты ошибок это просто заглушки, по факту будет выводиться другие из i18n

export type SignInInput = z.infer<typeof SignInSchema>;
