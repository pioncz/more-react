import { Champion } from '@/types/types';
import axios from 'axios';

export const BASE_URL = 'http://localhost:3001/static/';

export const fetchChampions = (): Promise<Champion[]> =>
  axios.get(`${BASE_URL}Champions.json`).then((res) => res.data);
