import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { customerAtom } from "../../Atoms/customersAtom";
function Transaction() {
  const [fillterCustomer, setFilterCustomer] = useState([]);
  const [searchValue, setSearchvalue] = useState("");
  const [amountValue, setAmoutvalue] = useState("");
  const [customersData, setCustomers] = useRecoilState(customerAtom);
  const Port= import.meta.env.VITE_PORT;
  async function handleCustomerData() {
    const { data } = await axios.get(`${Port}/customers`);
    const response = await axios.get(`${Port}/transactions`);
    const transaction = await response.data;
    const customers = [];
    data.map((customer) => {
      transaction.map((transaction) => {
        if (customer.id == transaction.customer_id) {
          const cutomerData = {
            customerId: customer.id,
            customerName: customer.name,
            transaction: transaction,
          };
          customers.push(cutomerData);
        }
      });
    });
    setFilterCustomer(customers);
    setCustomers(customers);
  }
  function handleSearch(value) {
    if (value != "" && amountValue == "") {
      const data = customersData.filter((customer) => {
        if (customer.customerName.toLowerCase().includes(value.toLowerCase())) {
          return customer;
        }
      });
      setFilterCustomer(data);
    } else if (value != "" && amountValue != "") {
      const data = customersData.filter((customer) => {
        if (
          customer.customerName.toLowerCase().includes(value.toLowerCase()) &&
          customer.transaction.amount == amountValue
        ) {
          return customer;
        }
      });
      setFilterCustomer(data);
    } else if (value == "" && amountValue != "") {
      {
        handleFillterAmout(amountValue);
      }
    } else {
      setFilterCustomer(customersData);
    }
  }
  function handleFillterAmout(value) {
    if (value != "" && searchValue == "") {
      const data = customersData.filter((customer) => {
        if (customer.transaction.amount == value) {
          return customer;
        }
      });
      setFilterCustomer(data);
    } else if (value != "" && searchValue != "") {
      const data = customersData.filter((customer) => {
        if (
          customer.customerName
            .toLowerCase()
            .includes(searchValue.toLowerCase()) &&
          customer.transaction.amount == value
        ) {
          return customer;
        }
      });
      setFilterCustomer(data);
    } else if (value == "" && searchValue != "") {
      handleSearch(searchValue);
    } else {
      setFilterCustomer(customersData);
    }
  }

  useEffect(() => {
    handleCustomerData();
  }, []);

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-8 sm:w-11/12 w-full mx-auto">
        <div className="flex flex-col sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center  justify-between pb-4">
          <div className="flex-col md:gap-x-3 sm:flex-row flex gap-2 justify-start items-start w-full p-2 ">
            <label htmlFor="amount-filter" className="sr-only">
              filter
            </label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center  ps-3 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 w-5 h-5 text-gray-500 dark:text-gray-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 9.75V10.5"
                  />
                </svg>
              </div>
              <input
                type="number"
                id="amount-filter"
                className="block p-2 ps-10 rtl:pe-10 rtl:ps-4 md:w-80 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="filter by  amount"
                onInput={(e) => handleFillterAmout(e.target.value)}
                onBlur={(e) => setAmoutvalue(e.target.value)}
              />
            </div>
            <label htmlFor="table-search" className="sr-only">
              Search
            </label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 11-1.414 1.414l-4.817-4.817A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="table-search"
                className="block p-2 ps-10 rtl:pe-10 rtl:ps-4  md:w-80 w-full  text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for Customers"
                onChange={(e) => handleSearch(e.target.value)}
                onBlur={(e) => setSearchvalue(e.target.value)}
              />
            </div>
          </div>
        </div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-4 py-3">
                Customer Name
              </th>
              <th scope="col" className="px-4 py-3">
                Date
              </th>
              <th scope="col" className="px-4 py-3">
                Amount
              </th>
              <th scope="col" className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {fillterCustomer.map((customer, index) => {
              return (
                <tr className="border-b dark:border-gray-700" key={index}>
                  <th
                    scope="row"
                    className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {customer.customerName}
                  </th>

                  <td className="px-4 py-3">{customer.transaction.date}</td>
                  <td className="px-4 py-3">
                    {customer.transaction.amount} E£
                  </td>
                  <td className="underline text-blue-600 cursor-pointer">
                    <Link to={`/tranaction/${customer.customerId}`}>
                      view customer Graph
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Transaction;
