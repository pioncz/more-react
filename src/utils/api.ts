import {
  HeroType,
  Reward,
  SharedAccount,
  Skill,
  Trial,
} from '@/types/types';
import axios from 'axios';

export const BASE_URL = 'http://localhost:3001/';

export const fetchSharedAccount =
  ({
    sharedKey,
    underscore,
  }: {
    sharedKey: string;
    underscore: string;
  }) =>
  (): Promise<SharedAccount> =>
    axios
      .get(`${BASE_URL}/share?sharedKey=${sharedKey}&_=${underscore}`)
      .then((res) => res.data);

export const fetchRewards = (): Promise<Reward[]> =>
  axios.get(`${BASE_URL}static/Rewards.json`).then((res) => res.data);

export const fetchSkills = (): Promise<Skill[]> =>
  axios.get(`${BASE_URL}static/Skills.json`).then((res) => res.data);

export const fetchTrials = (): Promise<Trial[]> =>
  axios.get(`${BASE_URL}static/Trials.json`).then((res) => res.data);
