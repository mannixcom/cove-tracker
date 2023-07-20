import { Prompt, Roboto_Condensed} from 'next/font/google';

export const roboto = Roboto_Condensed({
  subsets: ['latin'],
  weight: ['700', '400'],
  variable: '--roboto',
});
export const prompt = Prompt({
  subsets: ['latin'],
  weight: '700'
});
