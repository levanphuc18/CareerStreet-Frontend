"use client"
import { useJobContext } from './context/JobContext';
import HomePage from '../components/HomePage';

export default function Page() {
  const { jobListContext } = useJobContext();

  return (
    <>
      <HomePage jobList={jobListContext} />
    </>
  );
}