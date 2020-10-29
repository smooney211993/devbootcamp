import { BOOTCAMPS_LIST_REQUEST, BOOTCAMPS_LIST_RESET } from './types';

export const getBootcamps = () => ({
  type: BOOTCAMPS_LIST_REQUEST,
});

export const resetBootCamps = () => ({
  type: BOOTCAMPS_LIST_RESET,
});
