import { Link, useParams } from "react-router-dom";
import { customerAtom } from "../../Atoms/customersAtom";
import { useRecoilState } from "recoil";
import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

function Graph() {
  const { id } = useParams();
  const [customersData, setCustomers] = useRecoilState(customerAtom);
  const [customerTransaction, setCustomerTransaction] = useState(null);
  const [customerName, setCustomerName] = useState(null);
  const chartRef = useRef(null);
  let chartInstance = null;
  function handleCustomerTranaction() {
    const customerData = customersData.filter(
      (customer) => customer.customerId == id
    );
    const transact = [];
    customerData.map((trans) => {
      transact.push(trans.transaction);
    });

    setCustomerTransaction(transact);
  }
  function getUserData() {
    const customerData = customersData.find(
      (customer) => customer.customerId == id
    );
    setCustomerName(customerData.customerName);
  }
  useEffect(() => {
    handleCustomerTranaction();
    getUserData();
  }, []);

  useEffect(() => {
    if (chartRef && chartRef.current && customerTransaction) {
      const ctx = chartRef.current.getContext("2d");
      if (chartInstance) {
        chartInstance.destroy();
      }

      const labels = customerTransaction.length
        ? customerTransaction.map((trans) => trans.date)
        : [];
      const data = {
        labels: labels,
        datasets: [
          {
            label: "Customer Transaction",
            data:
              customerTransaction.length > 0
                ? customerTransaction.map((trans) => trans.amount)
                : [1000, 1500, 2000, 2500, 3000, 3500, 4000],
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      };

      const config = {
        type: "line",
        data: data,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: `${customerName} Transaction Chart`,
            },
          },
        },
      };

      chartInstance = new Chart(ctx, config);
    }

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [customerTransaction, id]);

  return (
    <div className="w-5/6 mx-auto mt-3">
      <div>
        <Link to={'/'}>
        <button className="bg-blue-500 text-white md:font-medium  font-normal md:px-3 py-2 px-1 rounded-md flex items-center my-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5 me-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
            />
          </svg>
          Back to Home
        </button>
        </Link>
      </div>
      <canvas ref={chartRef}></canvas>
    </div>
  );
}

export default Graph;
