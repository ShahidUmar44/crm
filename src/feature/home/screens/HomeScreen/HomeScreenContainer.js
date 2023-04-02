import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../../context/UserContext';
import { collection, orderBy, query, onSnapshot, getDocs, limit, getDoc, doc } from 'firebase/firestore';
import { db } from '../../../../utils/Firebase';
import moment from 'moment';

import HomeScreenPresenter from './HomeScreenPresenter';

const HomeScreenContainer = () => {
  const { userData } = useContext(UserContext);
  const exampleData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        data: [830, 762, 810, 700, 723, 493, 677, 641, 509, 213, 335, 198, 29],
      },
    ],
  };

  // get aggregrated data from firestore

  // get last 7 days revenue
  const [dailyRevenue, setDailyRevenue] = useState(null);
  async function getDailyRev() {
    // Generate an array of the last 7 days
    const last7Days = Array.from({ length: 8 }, (_, i) => {
      return moment().subtract(i, 'days').format('YYYY-MM-DD');
    }).reverse();

    const dailyRevenueRef = collection(db, 'businesses', userData.bizData.id, 'stats', 'dailyRevenue', 'revenueByDay');

    // Fetch data for each day in the last 7 days
    const fetchedData = await Promise.all(
      last7Days.map(async date => {
        const docRef = doc(dailyRevenueRef, date);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          return docSnapshot.data();
        } else {
          return { date, revenue: 0 };
        }
      }),
    );

    const dailyRevChartData = fetchedData.map(rev => rev.revenue);
    const dailyRevLabels = fetchedData.map(rev => moment(rev.date).format('dd'));

    setDailyRevenue({
      labels: dailyRevLabels,
      datasets: [
        {
          data: dailyRevChartData,
        },
      ],
    });
  }

  // get average job size for the past 6 months or as long as they have been a customer
  const [avgJobSize, setAvgJobSize] = useState(null);
  const [monthlyJobRev, setMonthlyJobRev] = useState(null);
  async function getAverageJobSizeAndMonthlyRev() {
    const businessStartMonth = moment(new Date(userData.bizData.createdAt?.seconds * 1000)).format('YYYY-MM');
    const numberOfMonthSinceStart = moment().diff(businessStartMonth, 'months');

    const numberOfMonthsToFetch = numberOfMonthSinceStart > 6 ? 6 : numberOfMonthSinceStart;

    const arrayOfMonthsToFetch = Array.from({ length: numberOfMonthsToFetch + 1 }, (_, i) => {
      return moment().subtract(i, 'months').format('YYYY-MM');
    }).reverse();

    const fetchedData = await Promise.all(
      arrayOfMonthsToFetch.map(async date => {
        const docRef = doc(db, 'businesses', userData.bizData.id, 'stats', 'monthlyJobRevenue', 'revenueByMonth', date);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          return docSnapshot.data();
        } else {
          return { date, revenue: 0 };
        }
      }),
    );
    const monthlyJobRev = fetchedData.map(rev => rev.revenue);
    const monthlyJobRevLabels = fetchedData.map(rev => moment(rev.date).format('MMM'));

    setMonthlyJobRev({
      labels: monthlyJobRevLabels,
      datasets: [
        {
          data: monthlyJobRev,
        },
      ],
    });

    const monthlyAverageJobSize = fetchedData.map(rev => (rev.totalJobs ? rev.revenue / rev.totalJobs : 0));

    setAvgJobSize({
      labels: monthlyJobRevLabels,
      datasets: [
        {
          data: monthlyAverageJobSize,
        },
      ],
    });

    const averageJobSize = monthlyJobRev.reduce((a, b) => a + b, 0) / monthlyJobRev.length;
  }

  useEffect(() => {
    getAverageJobSizeAndMonthlyRev();
    getDailyRev();
  }, []);

  return <HomeScreenPresenter dailyRevenue={dailyRevenue} averageJobSize={avgJobSize} monthlyRevenue={monthlyJobRev} />;
};

export default HomeScreenContainer;
