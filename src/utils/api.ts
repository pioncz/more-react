import { Champion, Reward } from '@/types/types';
import axios from 'axios';

export const BASE_URL = 'http://localhost:3001/';

export const fetchChampions = (): Promise<Champion[]> =>
  axios
    .get(`${BASE_URL}static/Champions.json`)
    .then((res) => res.data);

export const fetchRewards = (): Promise<Reward[]> =>
  axios.get(`${BASE_URL}static/Rewards.json`).then((res) => res.data);
